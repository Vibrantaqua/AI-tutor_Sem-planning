import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-knowledgeGreen to-darkGreen text-white px-4 overflow-hidden">
      {/* Moving background circles */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 animate-bounce-slow -top-20 -left-20"></div>
      <div className="absolute w-56 h-56 bg-indigo-400 rounded-full opacity-30 animate-bounce-slow-slow top-10 right-0"></div>
      <div className="absolute w-96 h-96 bg-green-400 rounded-full opacity-20 animate-bounce-slow bottom-0 left-1/3"></div>

      {/* Main content */}
      <h1 className="text-5xl font-bold mb-6 text-center z-10">AI Semester Planner</h1>
      <p className="text-lg max-w-xl text-center mb-10 z-10">
        Design semester-long teaching plans, lesson aids, and assessments effortlessly with our AI-powered tutor.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-darkGreen font-semibold rounded-lg shadow-lg hover:scale-105 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-darkGreen font-semibold rounded-lg shadow-lg hover:scale-105 transition"
        >
          Register
        </Link>
        <Link
          to="/chat"
          className="px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-darkGreen transition"
        >
          Start AI Chat
        </Link>
      </div>
    </div>
  );
}
