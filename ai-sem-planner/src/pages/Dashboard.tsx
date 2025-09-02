import { useState } from "react";
import ChatBox from "../components/ChatBox";
import Calendar from "../components/Calendar"; // You’ll create this
import { FaCalendarAlt, FaComments } from "react-icons/fa";

interface DashboardProps {
  selectedChat: string | null;
  setSelectedChat: (chat: string | null) => void;
  collapsed: boolean;
}

export default function Dashboard({ selectedChat, setSelectedChat, collapsed }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "calendar">("chat");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-darkGreen">Dashboard</h1>

      {/* Tabs for Chat and Calendar */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${
            activeTab === "chat"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          <FaComments /> Chat
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${
            activeTab === "calendar"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          <FaCalendarAlt /> Calendar
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Chat Panel */}
        {activeTab === "chat" && (
          <div className="flex-1 bg-white shadow rounded-xl p-4 flex flex-col">
            <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
          </div>
        )}

        {/* Calendar Panel */}
        {activeTab === "calendar" && (
          <div className="flex-1 bg-white shadow rounded-xl p-4 flex flex-col">
            <Calendar />
          </div>
        )}
      </div>
    </div>
  );
}
