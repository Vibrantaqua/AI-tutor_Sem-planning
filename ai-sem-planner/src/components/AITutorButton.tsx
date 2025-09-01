import { useState } from "react";
import type { ChangeEvent } from "react";
import { ChatBubbleLeftIcon, ClockIcon } from "@heroicons/react/24/solid";

interface ChatMessage {
  sender: "User" | "AI";
  text: string;
}

export default function AITutorButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "AI", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "User", text: input }]);
    setInput("");
    // Optionally, add AI response logic here
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 z-50">
      {/* Chat History Panel */}
      {showHistory && (
        <div className="w-64 h-48 bg-white shadow-lg rounded-lg p-2 overflow-y-auto transition-all duration-300">
          <h2 className="font-bold mb-2">Chat History</h2>
          <ul className="text-sm space-y-1">
            {messages.map((msg, idx) => (
              <li key={idx} className={msg.sender === "User" ? "text-blue-600" : "text-gray-800"}>
                {msg.sender}: {msg.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Chat Panel */}
      {isOpen && (
        <div className="w-72 h-96 bg-white shadow-xl rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">AI Tutor</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto border rounded p-2">
            {messages.map((msg, idx) => (
              <p key={idx} className={msg.sender === "User" ? "text-blue-600" : "text-gray-800"}>
                {msg.sender}: {msg.text}
              </p>
            ))}
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-500 text-white p-2 rounded-r hover:bg-indigo-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Main Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Open AI Tutor"
        >
          <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300 transition"
          title="Chat History"
        >
          <ClockIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
