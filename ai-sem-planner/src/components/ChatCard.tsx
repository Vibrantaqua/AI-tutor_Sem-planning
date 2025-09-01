import { useState} from "react";
import { useRef} from "react";
import { useEffect} from "react";
import type { ChangeEvent } from "react";


interface Message {
  sender: "User" | "AI";
  text: string;
}

interface ChatCardProps {
  title: string;
  collapsed: boolean;
  onClick?: () => void;
}

export default function ChatCard({ title, collapsed, onClick }: ChatCardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "User", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = { sender: "AI", text: "This is an AI response." };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <div
      className={`flex flex-col border rounded p-2 mb-2 bg-gray-100 text-black ${
        collapsed ? "hidden" : "flex"
      }`}
      onClick={onClick}
    >
      <h3 className="font-bold mb-2">{title}</h3>

      {/* Chat messages */}
      <div className="flex-1 max-h-96 overflow-y-auto px-2 flex flex-col justify-end space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded max-w-xs break-words 
                ${msg.sender === "User"
                  ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                  : "bg-gray-300 text-black rounded-r-lg rounded-tl-lg"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border rounded-l px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-3 rounded-r hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
