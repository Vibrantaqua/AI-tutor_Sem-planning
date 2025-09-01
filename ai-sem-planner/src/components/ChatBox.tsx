import { useState, useRef, useEffect } from "react";

interface ChatBoxProps {
  selectedChat: string | null;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatBox({ selectedChat }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! How can I assist with your semester plan?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // TODO: Call AI API and append response
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {!selectedChat ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          Start a new conversation or select a chat from the sidebar.
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto mb-2 space-y-2 scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-gray-300">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs p-3 rounded-lg break-words shadow ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-lightGreen to-knowledgeGreen self-end text-gray-900 animate-fade-in"
                    : "bg-gradient-to-r from-knowledgeGreen to-darkGreen self-start text-white animate-fade-in"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-knowledgeGreen focus:outline-none transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-knowledgeGreen text-white rounded hover:bg-darkGreen transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
