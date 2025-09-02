import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  // Local state for profile
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    college: "ABC University",
  });

  const [currentPlan, setCurrentPlan] = useState("Free");

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
    // Later: call API to save to backend
  };

  return (
    <div className="min-h-screen bg-lightGreen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-knowledgeGreen">Account</h2>

        {/* Profile Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-darkGreen">Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-2 border border-darkGreen rounded w-full focus:outline-none focus:ring-2 focus:ring-knowledgeGreen ${
                !isEditing && "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-2 border border-darkGreen rounded w-full focus:outline-none focus:ring-2 focus:ring-knowledgeGreen ${
                !isEditing && "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="Email"
            />
            <input
              type="text"
              name="college"
              value={profile.college}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-2 border border-darkGreen rounded w-full focus:outline-none focus:ring-2 focus:ring-knowledgeGreen ${
                !isEditing && "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="College / School"
            />
          </div>

          <div className="mt-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded bg-knowledgeGreen hover:bg-darkGreen transition"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white rounded bg-darkGreen hover:bg-knowledgeGreen transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Subscription Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-darkGreen">Current Subscription</h3>
          <p>
            Plan:{" "}
            <span className="font-bold text-knowledgeGreen">{currentPlan}</span>
          </p>
          <button
            onClick={() => navigate("/upgrade")}
            className="mt-2 px-4 py-2 text-white rounded bg-darkGreen hover:bg-knowledgeGreen transition"
          >
            Upgrade Plan
          </button>
        </div>

        {/* Go to Dashboard */}
        <button
          onClick={() => navigate("/chat")}
          className="mt-4 px-4 py-2 bg-lightGreen text-darkGreen rounded hover:bg-darkGreen hover:text-white transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
