'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [timeExpired, setTimeExpired] = useState(false); // New state to track if time is up

  // Fetch the quiz data
  useEffect(() => {
    if (params.id) {
      fetch(`/api/quizzes/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setQuiz(data);
          setLoading(false);
        });
    }
  }, [params.id]);

  // Handle the countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeExpired(true); // Set the time expired flag and stop the timer
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (timeExpired) return; // Disable changing answers after time is up
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const handleSubmit = async () => {
    // If time is up, show the user's requested message and do not submit
    if (timeExpired) {
      alert('Time is up! You did not complete the test in the given timeframe, so it cannot be submitted.');
      return;
    }

    const response = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        quizId: quiz.id,
        answers: Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
          questionId: parseInt(questionId),
          answerId,
        })),
      }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      alert(`Submission failed: ${errorResult.error}`);
      return;
    }

    const result = await response.json();
    router.push(`/results/${result.attempt.id}`);
  };

  if (loading || !quiz) {
    return <div className="text-center mt-20 text-xl">Loading quiz...</div>;
  }

  const question = quiz.questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-indigo-700">{quiz.title}</h1>
        <div className={`font-semibold text-lg p-2 rounded ${timeExpired || timeLeft < 60 ? 'text-red-600' : 'text-gray-700'}`}>
          Time Left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="mb-5 text-gray-700">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">{question.questionText}</h2>
        <div className="space-y-3">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(question.id, answer.id)}
              className={`w-full p-4 rounded border text-left cursor-pointer transition hover:bg-indigo-100 ${
                selectedAnswers[question.id] === answer.id ? 'bg-indigo-200 border-indigo-500' : 'border-gray-300'
              }`}
              disabled={timeExpired} // Disable answer buttons when time is up
            >
              {answer.answerText}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0 || timeExpired} // Disable navigation
          className="px-6 py-2 rounded bg-gray-300 text-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            disabled={timeExpired} // Disable navigation
            className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
