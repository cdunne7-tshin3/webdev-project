# Class Management System

**Authors:**

- Christian Dunne (cdunne7@nd.edu)
- Tristan Shin (tshin3@nd.edu)

## Project Overview

A comprehensive class management platform built with React and Parse (Back4App) that allows teachers to manage classes, students, and attendance tracking with email verification.

## Features

### 1. **Class Management**

- Create and view classes
- Add descriptions to classes
- View all students in a class

### 2. **Student Management**

- Add students to classes
- View all students or filter by class
- **Search functionality** - Search students by name or email in real-time

### 3. **Attendance Tracking**

- Take attendance for specific class sessions by date
- Mark students as Present, Absent, or Excused
- View missed classes by student with dates
- Track attendance history

### 4. **Email Verification**

- User email verification system
- Warning banner for unverified emails
- Mock verification flow (demo mode)
- Verification status tracking

## Tech Stack

- **Frontend:** React 18, React Router DOM
- **Backend:** Parse Server (Back4App)
- **Authentication:** Parse User Authentication
- **Styling:** Inline CSS

## Database Schema

### User (Parse Built-in)

- username (email)
- firstName
- lastName
- email
- password
- customEmailVerified (Boolean)

### Class

- Name (String)
- Description (String)

### Student

- firstName (String)
- lastName (String)
- email (String)
- Class (Pointer → Class)

### Attendance

- Student (Pointer → Student)
- Class (Pointer → Class)
- date (Date)
- status (String: "present", "absent", "excused")

## Setup Instructions

### Prerequisites

- Node.js installed
- Back4App account with app created

### Installation

1. **Clone the repository**

```bash
git clone
cd
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Back4App**

   - Update `src/environments.js` with your Back4App credentials:
     - APPLICATION_ID
     - JAVASCRIPT_KEY
     - SERVER_URL

4. **Set up Back4App Database Classes**

   Create the following classes in Back4App Dashboard → Database → Browser:

   **Class:**

   - Name (String)
   - Description (String)

   **Student:**

   - firstName (String)
   - lastName (String)
   - email (String)
   - Class (Pointer → Class)

   **Attendance:**

   - Student (Pointer → Student)
   - Class (Pointer → Class)
   - date (Date)
   - status (String)

   **User (Add custom column):**

   - customEmailVerified (Boolean, default: false)

5. **Run the application**

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Application Routes

- `/` - Landing page (redirects to home or login)
- `/register` - User registration
- `/login` - User login
- `/home` - Dashboard (protected)
- `/classes` - View and manage classes (protected)
- `/students` - View and manage students with search (protected)
- `/attendance` - Take attendance and view missed classes (protected)
- `/verify-email` - Email verification page (protected)

## Key Features Explained

### Student Search

- Real-time filtering as you type
- Searches first name, last name, and email
- Shows result count
- Clear button to reset search

### Attendance Tracking

- **Take Attendance:** Select a class and date, mark each student's status
- **View Missed Classes:** Select a student to see all absences with dates
- Color-coded status badges (Green=Present, Red=Absent, Orange=Excused)

### Email Verification

- Warning banner appears for unverified users
- Demo mode displays mock verification token
- In production, would integrate with email service (SendGrid, AWS SES, etc.)
- Uses `customEmailVerified` field to track verification status

## Development Notes

- **Email Verification:** Currently in demo mode - shows verification tokens on screen for testing. In production, integrate with an email service.
- **Parse Restrictions:** The built-in `emailVerified` field is protected by Parse, so we use `customEmailVerified` instead.
- **Session Storage:** Verification tokens are stored in browser sessionStorage for demo purposes.

## Future Enhancements

- Real email service integration for verification
- Delete/Edit functionality for classes and students
- Attendance reports and analytics
- Export attendance data to CSV
- Multi-class attendance view
- Student profile pages

## Learn More

- [React Documentation](https://reactjs.org/)
- [Parse Documentation](https://docs.parseplatform.org/)
- [Back4App Documentation](https://www.back4app.com/docs)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## License

This project was created for educational purposes.
