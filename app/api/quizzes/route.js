// app/api/quizzes/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import the singleton client

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: { include: { answers: true } } },
    });
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}
