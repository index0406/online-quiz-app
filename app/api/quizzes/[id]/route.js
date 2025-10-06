// app/api/quizzes/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params; // Get the ID from the URL
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
  }
}
