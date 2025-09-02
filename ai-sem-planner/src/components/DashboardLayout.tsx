import ChatBox from "../components/ChatBox";
import Calendar from "../components/Calendar";

interface DashboardProps {
  selectedChat: string | null;
  setSelectedChat: (chat: string | null) => void;
  collapsed: boolean;
}

export default function Dashboard({ selectedChat, setSelectedChat, collapsed }: DashboardProps) {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-darkGreen">Dashboard</h1>

      {/* Layout: Chat on left, Calendar on right */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chat Box */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-knowledgeGreen">AI Tutor Chat</h2>
          <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </div>

        {/* Calendar */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-knowledgeGreen">Your Calendar</h2>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
