import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lightGreen p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-knowledgeGreen">Help & Contact</h2>
        <p className="text-darkGreen">
          If you need assistance with the AI-Agent Tutor, contact us at:
        </p>
        <ul className="list-disc list-inside text-darkGreen">
          <li>Email: support@ai-tutor.com</li>
          <li>Phone: +91 12345 67890</li>
        </ul>
        <p className="text-darkGreen">
          You can also refer to the documentation or FAQs in the Dashboard.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-darkGreen text-white rounded hover:bg-knowledgeGreen transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
