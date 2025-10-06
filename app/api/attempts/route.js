// app/api/attempts/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId, quizId, answers } = await request.json();

    if (!userId || !quizId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let score = 0;
    for (const answer of answers) {
      const correctAnswer = await prisma.answer.findFirst({
        where: {
          questionId: answer.questionId,
          isCorrect: true,
        },
      });

      if (correctAnswer && correctAnswer.id === answer.answerId) {
        score++;
      }
    }

    const attempt = await prisma.attempt.create({
      data: {
        userId: userId,
        quizId: quizId,
        score: score,
      },
    });

    return NextResponse.json({ attempt, score }, { status: 201 });
  } catch (error) {
    console.error('Failed to create attempt:', error);
    return NextResponse.json({ error: 'Failed to submit attempt' }, { status: 500 });
  }
}
