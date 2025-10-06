const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order
  await prisma.attempt.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.user.deleteMany();

  // Create user
  await prisma.user.create({
    data: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    }
  });

  // Create quiz with 5 questions (4 options each)
  await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics',
      description: 'Test your fundamental JavaScript knowledge.',
      questions: {
        create: [
          {
            questionText: 'What does API stand for?',
            points: 1,
            answers: {
              create: [
                { answerText: 'Application Programming Interface', isCorrect: true },
                { answerText: 'Advanced Programming Interface', isCorrect: false },
                { answerText: 'Application Program Interface', isCorrect: false },
                { answerText: 'Automated Programming Interface', isCorrect: false },
              ],
            },
          },
          {
            questionText: 'Which keyword is used to declare a constant variable?',
            points: 1,
            answers: {
              create: [
                { answerText: 'let', isCorrect: false },
                { answerText: 'const', isCorrect: true },
                { answerText: 'var', isCorrect: false },
                { answerText: 'static', isCorrect: false },
              ],
            },
          },
          {
            questionText: 'Which company developed JavaScript?',
            points: 1,
            answers: {
              create: [
                { answerText: 'Netscape', isCorrect: true },
                { answerText: 'Microsoft', isCorrect: false },
                { answerText: 'Sun Microsystems', isCorrect: false },
                { answerText: 'Apple', isCorrect: false }
              ]
            }
          },
          {
            questionText: 'What symbol is used for single-line comments in JavaScript?',
            points: 1,
            answers: {
              create: [
                { answerText: '//', isCorrect: true },
                { answerText: '<!--', isCorrect: false },
                { answerText: '#', isCorrect: false },
                { answerText: '/* */', isCorrect: false }
              ]
            }
          },
          {
            questionText: 'Which method converts a JSON string into a JavaScript object?',
            points: 1,
            answers: {
              create: [
                { answerText: 'JSON.parse()', isCorrect: true },
                { answerText: 'JSON.stringify()', isCorrect: false },
                { answerText: 'parseObject()', isCorrect: false },
                { answerText: 'convertJSON()', isCorrect: false }
              ]
            }
          }
        ]
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
