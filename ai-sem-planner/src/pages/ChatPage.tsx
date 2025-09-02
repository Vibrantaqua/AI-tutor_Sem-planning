import ChatBox from '../components/ChatBox';
import { useState } from 'react';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-darkGreen">AI Tutor Chat</h1>
      <div className="bg-white rounded-2xl shadow p-4">
        <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  );
}
