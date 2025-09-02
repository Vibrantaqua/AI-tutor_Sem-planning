import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaUserGraduate } from "react-icons/fa";

export default function Register() {
  return (
    <div className="relative min-h-[calc(100vh-40px)] flex items-center justify-center overflow-hidden animate-gradient-bg py-10">
      {/* Floating blobs */}
      <div className="absolute top-16 left-5 w-64 h-64 bg-pink-400 opacity-30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-32 right-5 w-72 h-72 bg-purple-400 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-16 left-1/3 w-80 h-80 bg-blue-400 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Register card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md transition hover:scale-[1.01] hover:shadow-3xl duration-300">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full shadow-md mb-3">
            <FaUserGraduate size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Join us and start planning smarter 🚀
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Register */}
        <div className="flex flex-col gap-3">
          <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <FaGoogle className="text-red-500" />
            Sign up with Google
          </button>
          <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <FaGithub className="text-gray-800" />
            Sign up with GitHub
          </button>
        </div>

        {/* Already have account */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Gradient & Blob Animation CSS */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient-bg {
            background: linear-gradient(270deg, #f472b6, #a78bfa, #60a5fa);
            background-size: 300% 300%;
            animation: gradientBG 15s ease infinite;
          }

          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }

          .animate-blob {
            animation: blob 8s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
}
