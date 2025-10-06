/**
 * @jest-environment node
 */
import { GET } from '@/app/api/quizzes/route';

// Mock the prisma singleton
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    quiz: {
      findMany: jest.fn(),
    },
  },
}));

// Import the mocked prisma instance AFTER the mock is defined
import prisma from '@/lib/prisma';

describe('Quiz API Route', () => {
  // Clear mock history before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of quizzes with a 200 status', async () => {
    // Arrange: Tell the mock what to return for this test
    const mockQuizzes = [{ id: 1, title: 'JavaScript Basics' }];
    prisma.quiz.findMany.mockResolvedValue(mockQuizzes);

    // Act: Run the actual API route function
    const response = await GET();
    const body = await response.json();

    // Assert: Check the results
    expect(response.status).toBe(200);
    expect(body).toEqual(mockQuizzes);
  });

  it('should return a 500 error if the database call fails', async () => {
    // Arrange: Tell the mock to simulate an error
    prisma.quiz.findMany.mockRejectedValue(new Error('Database error'));

    // Act
    const response = await GET();
    const body = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(body.error).toBe('Failed to fetch quizzes');
  });
});
