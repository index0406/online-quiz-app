Online Quiz Application
Project Description
This is a full-stack online quiz application built with Next.js, Prisma, and a SQLite database. The application allows users to take a multiple-choice quiz on JavaScript basics, navigate between questions, submit their answers, and view a detailed score on a results page.

The project demonstrates a complete end-to-end user flow, from starting the quiz to receiving a final score. It features a well-designed API to support the quiz logic and robust state management on the frontend.

Setup and Installation
To set up and run this project locally, please follow these steps:

Clone the repository:

bash
git clone <your-repository-url>
cd online-quiz-app
Install dependencies:

bash
npm install
Create and seed the database:
This command will set up your SQLite database schema and populate it with a sample quiz and a test user.

bash
npx prisma migrate dev --name init
npx prisma db seed
Run the development server:

bash
npm run dev
Open the application:
Open your browser and navigate to http://localhost:3000.

How to Run Tests
The backend API tests are configured with Jest. To run the test suite, use the following command:

bash
npm test
Assumptions and Design Choices
Frameworks: The project is built with Next.js 13+ App Router, which is the current standard for building modern React applications. Tailwind CSS was chosen for styling due to its rapid development capabilities.

Database: SQLite was used for its simplicity and file-based nature, making local setup easy without requiring a separate database server. Prisma was chosen as the ORM for its type safety and developer-friendly API.

API Design: The API is designed to be RESTful. For instance, fetching a specific quiz is done via a dynamic route (/api/quizzes/[id]), which is more efficient than fetching all quizzes and filtering on the client.

User Management: For simplicity, a single dummy user with id: 1 is created in the seed script. All quiz attempts are associated with this user, avoiding the complexity of a full authentication system for this project.
