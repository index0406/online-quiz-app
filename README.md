🧠 Online Quiz Application

A full-stack online quiz application built with Next.js, Prisma, and SQLite.
This app allows users to take a multiple-choice quiz on JavaScript basics, navigate between questions, submit answers, and view a detailed score on the results page.

The project demonstrates a complete end-to-end user flow — from starting the quiz to receiving the final score — with a robust backend API and clean frontend state management.

🚀 Features

Take interactive multiple-choice quizzes

Navigate between questions seamlessly

Submit answers and view detailed results

RESTful API built with Next.js App Router

Database integration via Prisma + SQLite

Tailwind CSS for responsive UI

🧩 Tech Stack
Layer	Technology
Frontend	Next.js 13+ (App Router), React, Tailwind CSS
Backend	Next.js API Routes
Database	SQLite with Prisma ORM
Testing	Jest

⚙️ Setup & Installation

Follow these steps to set up and run the project locally:

1️⃣ Clone the repository
git clone <your-repository-url>
cd online-quiz-app

2️⃣ Install dependencies
npm install

3️⃣ Create & seed the database

This command sets up your SQLite schema and populates it with a sample quiz and test user.

npx prisma migrate dev --name init
npx prisma db seed

4️⃣ Run the development server
npm run dev

5️⃣ Open the application

Visit http://localhost:3000
 in your browser.

🧪 Running Tests

Backend API tests are configured with Jest.
Run the complete test suite with:

npm test

🧱 Assumptions & Design Choices

Frameworks: Built with Next.js 13+ App Router, the modern standard for React applications.
Tailwind CSS was chosen for fast and flexible UI development.

Database: Used SQLite for simplicity and portability, avoiding the need for a dedicated server.
Prisma ORM adds type safety and an intuitive query interface.

API Design: RESTful API endpoints (e.g., /api/quizzes/[id]) provide efficient, modular data access.

User Management: A single dummy user (id: 1) is created via the seed script for simplicity.
All quiz attempts are associated with this user—no authentication is required for this demo.

👩‍🎓 Author

Snehal Jadhav
📍 Pune, India
📧 jadhavsnehal563@gmail.com

🪪 License

This project is open source and available under the MIT License
