import { useState, useRef, useEffect} from "react";
import type { ChangeEvent } from"react";
interface Message {
  sender: "User" | "AI";
  text: string;
}

interface ChatBoxProps {
  selectedChat: string | null;
  setSelectedChat: (chat: string | null) => void;
}

export default function ChatBox({ selectedChat, setSelectedChat }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "User", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage: Message = { sender: "AI", text: "This is an AI response." };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow p-3">
      <h3 className="text-xl font-bold text-darkGreen mb-2">{selectedChat || "New Chat"}</h3>
      
      <div className="flex-1 overflow-y-auto mb-2 flex flex-col space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded max-w-xs break-words ${
                msg.sender === "User"
                  ? "bg-green-500 text-white rounded-l-lg rounded-tr-lg"
                  : "bg-gray-300 text-black rounded-r-lg rounded-tl-lg"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 rounded-r-lg hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
