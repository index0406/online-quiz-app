'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/results/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading || !result) {
    return <div className="text-center mt-20 text-xl">Loading results...</div>;
  }

  const totalQuestions = result.quiz.questions.length;
  const correctAnswers = result.score;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="container mx-auto p-10 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-12 text-green-700">Quiz Results</h1>
      <div className="bg-white rounded-lg shadow-2xl p-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">{result.quiz.title}</h2>
        <div className="text-left space-y-4 text-xl text-gray-700">
          <div className="flex justify-between">
            <span>Total Questions:</span>
            <span className="font-semibold">{totalQuestions}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Correct Answers:</span>
            <span className="font-semibold">{correctAnswers}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Wrong Answers:</span>
            <span className="font-semibold">{wrongAnswers}</span>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between text-blue-700 font-bold">
            <span>Final Score:</span>
            <span>{percentage.toFixed(2)}%</span>
          </div>
        </div>
        <Link href="/" className="block mt-12 text-lg text-indigo-700 hover:text-indigo-900 font-semibold">
          Take Another Quiz →
        </Link>
      </div>
    </div>
  );
}
