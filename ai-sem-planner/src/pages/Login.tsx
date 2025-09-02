import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaUserGraduate } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-bg">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition hover:scale-[1.01] duration-300 relative z-10">
        {/* Logo / Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full shadow-md mb-3">
            <FaUserGraduate size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">AI Semester Planner</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Please login to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social login */}
        <div className="flex flex-col gap-3">
          <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
          <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <FaGithub className="text-gray-800" />
            Continue with GitHub
          </button>
        </div>

        {/* Register */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Gradient Animation CSS */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient-bg {
            background-size: 300% 300%;
            animation: gradientBG 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
}
