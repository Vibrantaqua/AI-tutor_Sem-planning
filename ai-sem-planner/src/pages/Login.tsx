import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-darkGreen">Login</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="p-2 bg-knowledgeGreen text-white rounded hover:bg-darkGreen transition">Login</button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-knowledgeGreen">Register</Link>
        </p>
      </div>
    </div>
  );
}
