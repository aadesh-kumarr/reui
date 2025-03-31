

Overview

This project is a web application built using modern technologies, following best practices and the Metronic design system. It includes user authentication, database management, and email notifications.

Technologies Used

Next.js – Server-side rendering and frontend framework

TypeScript – Type safety and improved development experience

MongoDB + Prisma – Database management with ORM

Auth.js (NextAuth.js) – Authentication with Google and GitHub

NodeMailer – Email notifications for password reset

Metronic – UI components and styling


Features

User Authentication

Sign-in, Sign-up, Sign-out

OAuth with Google and GitHub using Auth.js

Forgot Password with email reset via NodeMailer


Landing Page

User Management

Register users and manage profiles


Database Schema

Prisma schema for structured data handling


Secure API Routes

Protected routes with authentication middleware



Installation

1. Clone the repository:

git clone [repository_url]


2. Navigate to the project directory:

cd project-name


3. Install dependencies:

npm install


4. Set up environment variables: Create a .env file and add:

DATABASE_URL=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
EMAIL_SERVER=smtp://your-smtp-server


5. Run database migrations:

npx prisma migrate dev


6. Start the development server:

npm run dev



Usage

Visit http://localhost:3000

Register or sign in with Google/GitHub

Reset password using the forgot password option





