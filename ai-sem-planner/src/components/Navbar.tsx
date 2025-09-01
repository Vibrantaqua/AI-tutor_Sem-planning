import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-knowledgeGreen/90 backdrop-blur-md text-white px-6 py-3 shadow-md sticky top-0 z-50">
      {/* Left: Title */}
      <h1
        className="text-2xl font-bold cursor-pointer hover:text-lightGreen transition"
        onClick={() => navigate("/")}
      >
        AI Semester Planner
      </h1>

      {/* Right: Account/Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/account")}
          className="flex items-center gap-2 bg-darkGreen hover:bg-lightGreen transition px-3 py-1 rounded"
        >
          <FaUserCircle className="text-xl" />
          <span>Account</span>
        </button>
      </div>
    </nav>
  );
}
