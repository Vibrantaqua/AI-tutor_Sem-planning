import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "./ChatCard";
import { FaPlus, FaQuestionCircle, FaUser, FaHistory } from "react-icons/fa";

interface SidebarProps {
  setSelectedChat: (chat: string | null) => void;
}

export default function Sidebar({ setSelectedChat }: SidebarProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false); // history toggle

  const [chats] = useState([
    { title: "Semester Plan - Math", lastMessage: "Draft completed..." },
    { title: "Physics Lessons", lastMessage: "Add lab exercises" },
  ]);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (chat: string | null) => {
    setSelectedChat(chat);
    setCollapsed(false);
  };

  return (
    <div
      className={`flex flex-col bg-darkGreen text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* AI Tutor Icon / Toggle */}
      <div className="flex justify-center items-center mt-4 mb-4">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 bg-knowledgeGreen rounded-full flex justify-center items-center cursor-pointer hover:bg-lightGreen transition"
          title={collapsed ? "Expand Sidebar" : "AI Tutor"}
        >
          {!collapsed ? (
            <span className="text-xl font-bold">A</span>
          ) : (
            <span className="text-lg font-bold">A</span>
          )}
        </div>
      </div>

      {/* New Chat */}
      <button
        onClick={() => handleSelectChat("new")}
        className="mb-2 flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition mx-4"
      >
        <FaPlus />
        {!collapsed && "New Chat"}
      </button>

      {/* Search */}
      {!collapsed && (
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-2 p-2 rounded text-black placeholder-gray-400 focus:ring-2 focus:ring-lightGreen focus:outline-none mx-4"
        />
      )}

      {/* Chat History Button */}
      <button
        onClick={() => setHistoryOpen(!historyOpen)}
        className="flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition mx-4 mb-2"
      >
        <FaHistory />
        {!collapsed && "History"}
      </button>

      {/* Chat History List */}
      {historyOpen && !collapsed && (
        <div className="flex flex-col space-y-2 px-4 mb-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-knowledgeGreen">
          {filteredChats.map((chat, index) => (
            <ChatCard
              key={index}
              title={chat.title}
              lastMessage={chat.lastMessage}
              onClick={() => handleSelectChat(chat.title)}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}

      {/* Help & Account */}
      <div className="mt-auto flex flex-col gap-2 p-4">
        <button
          onClick={() => { navigate("/help"); setCollapsed(false); }}
          className="flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition"
        >
          <FaQuestionCircle />
          {!collapsed && "Help"}
        </button>
        <button
          onClick={() => { navigate("/account"); setCollapsed(false); }}
          className="flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition"
        >
          <FaUser />
          {!collapsed && "Account & Subscription"}
        </button>
      </div>
    </div>
  );
}
