'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) throw new Error('Failed to load quizzes');
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Loading quizzes...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-indigo-50 to-purple-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Available Quizzes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl border border-gray-200 transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <Link href={`/quiz/${quiz.id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Start Quiz &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
