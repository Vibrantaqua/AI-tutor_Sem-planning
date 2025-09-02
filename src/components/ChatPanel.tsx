import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, Paperclip, FileUp, Image as ImageIcon } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockApi } from '../utils/api';
import { pushData } from '../utils/realtimeDb';
import { Button } from './Button';

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI tutor. I can help you plan your semester, add events to your calendar, and answer academic questions. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      userId: '1'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      userId: '1'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Store user message in Firebase
    try {
      await pushData(`chats/1/messages`, userMessage);
    } catch (err) {
      console.error('Failed to save user message to history:', err);
    }

    try {
      const aiResponse = await mockApi.sendMessage(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      // Store AI message in Firebase
      try {
        await pushData(`chats/1/messages`, aiResponse);
      } catch (err) {
        console.error('Failed to save AI message to history:', err);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePdfUpload = () => {
    pdfInputRef.current?.click();
    setShowUploadMenu(false);
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
    setShowUploadMenu(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `📎 Uploaded file: ${file.name}`,
          sender: 'user',
          timestamp: new Date().toISOString(),
          userId: '1'
        }
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col z-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Tutor</h3>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`flex-1 max-w-[280px] ${
              message.sender === 'user' ? 'text-right' : ''
            }`}>
              <div className={`inline-block p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 relative">
        <div className="flex items-center space-x-2">
          {/* Expandable upload menu */}
          <div className="relative">
            <Button onClick={() => setShowUploadMenu(!showUploadMenu)} className="p-3">
              <Paperclip className="w-4 h-4" />
            </Button>
            {showUploadMenu && (
              <div className="absolute bottom-12 left-0 bg-white border rounded-lg shadow-md p-2 space-y-2 z-50">
                <button
                  onClick={handlePdfUpload}
                  className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 w-full text-sm"
                >
                  <FileUp className="w-4 h-4" />
                  <span>Upload PDF</span>
                </button>
                <button
                  onClick={handleImageUpload}
                  className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 w-full text-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
              </div>
            )}
          </div>

          {/* Hidden inputs */}
          <input
            type="file"
            accept="application/pdf"
            ref={pdfInputRef}
            onChange={onFileChange}
            className="hidden"
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={onFileChange}
            className="hidden"
          />

          {/* Message input */}
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
