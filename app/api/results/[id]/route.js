// app/api/results/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton prisma client

export async function GET(request, { params }) {
  try {
    const { id } = params; // Get the attempt ID from the URL

    // Find the specific attempt by its ID
    const attempt = await prisma.attempt.findUnique({
      where: { id: parseInt(id) },
      // Include the related quiz and its questions to calculate results
      include: {
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    // If no attempt is found, return a 404 error
    if (!attempt) {
      return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });
    }

    // If found, return the attempt data
    return NextResponse.json(attempt, { status: 200 });

  } catch (error) {
    // If any other error occurs, log it and return a 500 error
    console.error('Failed to fetch results:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
