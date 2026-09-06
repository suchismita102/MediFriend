Medi-Friend 💊

A full-stack medication tracking platform (MERN stack) that helps users manage and track their medicine schedules — with automatic detection of missed doses and timely reminders.

🤝 Built collaboratively as a team project.

Features ✨
Dose Tracking: Mark doses as taken within a 30-minute window of the scheduled time
Automatic Missed-Dose Detection: A scheduled background job (cron) automatically flags doses as missed if not marked within the window
Secure Authentication: Sign Up and Login functionality with protected routes
Profile Management: Users can update and maintain their personal information
Flexible Reminders: Supports daily, weekly, and one-time medication schedules
Schedule-Based Notifications: Timely reminders based on each medication's schedule
Tech Stack 🛠️
Frontend: React.js (Create React App)
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT-based auth
Scheduled Jobs: Node cron jobs for automatic missed-dose detection
Project Structure 📁
MediFriend/
├── backend/
│   ├── Controllers/       # Request handlers / business logic
│   ├── Middlewares/       # Auth & error-handling middlewares
│   ├── Models/             # Mongoose schemas (User, Medication, etc.)
│   ├── Routes/             # API route definitions
│   ├── cron/                # Scheduled jobs for missed-dose detection
│   ├── index.js            # Backend entry point
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   ├── src/                # React components, pages, and app logic
│   ├── package.json
│   └── vercel.json
│
└── .gitignore
Setup Instructions 🚀
1. Clone the Project
bash
git clone https://github.com/suchismita102/MediFriend.git
cd MediFriend
2. Install Dependencies
bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
3. Configure Environment Variables

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
4. Run the Application
bash
# Start backend (from /backend)
node index.js

# Start frontend (from /frontend, in a new terminal)
npm start

The frontend will open in your browser at http://localhost:3000, with the backend running on http://localhost:5000 (or the port set in .env).

How to Use 📖
Sign Up / Login: Create an account or log in to your existing account
Add Medication: Enter medicine details along with the schedule (daily, weekly, or one-time)
Track Doses: Mark a dose as "taken" within the 30-minute window when the reminder is due
View Status: Missed doses are automatically flagged by a background cron job if not marked in time
Manage Profile: Update your personal information anytime from the profile section
Team & Contribution 👥

This project was built collaboratively with a teammate as part of a full-stack development learning exercise. Contributions can be viewed in the repository's commit history.

License 📄

Feel free to use and modify this project for learning purposes.

Happy Tracking! 💊
