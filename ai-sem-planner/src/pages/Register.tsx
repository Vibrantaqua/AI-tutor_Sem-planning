import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-darkGreen">Register</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-2 border rounded" />
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="p-2 bg-knowledgeGreen text-white rounded hover:bg-darkGreen transition">Register</button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-knowledgeGreen">Login</Link>
        </p>
      </div>
    </div>
  );
}
