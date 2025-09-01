import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

export default function Dashboard() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar sets selectedChat, including null for New */}
        <Sidebar setSelectedChat={setSelectedChat} />
        {/* Pass selectedChat directly; ChatBox handles null */}
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
}
