import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, Paperclip, FileUp, Image as ImageIcon } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockApi } from '../utils/api';
import { pushData, updateData, loadData } from '../utils/realtimeDb';
import { Button } from './Button';

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  sessionId: string | null;
}

export const ChatPanel = React.forwardRef<unknown, ChatPanelProps>(({ isOpen, onToggle, sessionId }, ref) => {
  const initialMessage: ChatMessage = {
    id: '1',
    content: 'Hello! I\'m your AI tutor. I can help you plan your semester, add events to your calendar, and answer academic questions. How can I assist you today?',
    sender: 'ai',
    timestamp: new Date().toISOString(),
    userId: '1'
  };
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  // Expose resetChat to parent via ref
  React.useImperativeHandle(ref, () => ({
    resetChat: () => setMessages([{
      ...initialMessage,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }]),
    loadSession: async (sid: string) => {
      // Load messages for a session
      const { loadData } = await import('../utils/realtimeDb');
      const sessionObj = await loadData(`chats/1/sessions/${sid}`);
      if (sessionObj && sessionObj.messages) setMessages(sessionObj.messages);
    }
  }));
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
    console.log('handleSendMessage called', { inputMessage, isLoading, sessionId });
    if (!inputMessage.trim()) {
      console.log('Blocked: inputMessage is empty');
      return;
    }
    if (isLoading) {
      console.log('Blocked: isLoading is true');
      return;
    }
    if (!sessionId) {
      console.log('Blocked: sessionId is null');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      userId: '1'
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      return updated;
    });
    setInputMessage('');
    setIsLoading(true);

    // Store user message in Firebase under session (messages array)
    let updatedMessages;
    try {
      // Load current session
      const sessionObj = await loadData(`chats/1/sessions/${sessionId}`);
      updatedMessages = sessionObj && sessionObj.messages ? [...sessionObj.messages, userMessage] : [userMessage];
      // Update session with new messages and summary title
      let summary = sessionObj && sessionObj.title ? sessionObj.title : 'New Chat';
      const firstUserMsg = updatedMessages.find((m: any) => m.sender === 'user');
      if (firstUserMsg) {
        summary = firstUserMsg.content.length > 30 ? firstUserMsg.content.slice(0, 30) + '...' : firstUserMsg.content;
      }
      await updateData(`chats/1/sessions/${sessionId}`, {
        ...sessionObj,
        messages: updatedMessages,
        title: summary,
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to update user message in session:', err);
    }

    try {
      const aiResponse = await mockApi.sendMessage(inputMessage);
      setMessages(prev => {
        const updated = [...prev, aiResponse];
        return updated;
      });
      // Update session with new AI message and summary title
      try {
        // Reload session to get latest messages
        const sessionObj = await loadData(`chats/1/sessions/${sessionId}`);
        const updatedMessages2 = sessionObj && sessionObj.messages ? [...sessionObj.messages, aiResponse] : [aiResponse];
        let summary = sessionObj && sessionObj.title ? sessionObj.title : 'New Chat';
        const firstUserMsg = updatedMessages2.find((m: any) => m.sender === 'user');
        if (firstUserMsg) {
          summary = firstUserMsg.content.length > 30 ? firstUserMsg.content.slice(0, 30) + '...' : firstUserMsg.content;
        }
        await updateData(`chats/1/sessions/${sessionId}`, {
          ...sessionObj,
          messages: updatedMessages2,
          title: summary,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to update AI message in session:', err);
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
  <div className="fixed right-0 top-0 h-full w-[420px] bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl border-l border-gray-200 flex flex-col z-50">
      {/* Chat Header */}
  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-t-xl shadow-md">
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
  <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse gap-2' : ''
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gradient-to-br from-purple-400 via-purple-200 to-blue-200 text-purple-700 border border-purple-200'
            }`}>
              {message.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`flex-1 max-w-[320px] ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block px-4 py-3 rounded-2xl shadow-md transition-all ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-gradient-to-br from-white via-purple-50 to-blue-50 text-purple-900 border border-purple-100 rounded-bl-md'
                }`}
              >
                <p className="text-base leading-relaxed font-medium whitespace-pre-line">{message.content}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
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
      <div className="p-5 border-t border-gray-200 bg-white/80 backdrop-blur-xl rounded-b-xl shadow-inner">
        <form className="flex items-end gap-3" onSubmit={e => { e.preventDefault(); handleSendMessage(); }}>
          {/* Expandable upload menu */}
          <div className="relative">
            <Button onClick={() => setShowUploadMenu(!showUploadMenu)} className="p-3 bg-white border border-gray-200 shadow hover:bg-gray-50">
              <span className="flex items-center gap-1">
                <Paperclip className="w-5 h-5 text-blue-500" />
                <span className="sr-only">Upload</span>
              </span>
            </Button>
            {showUploadMenu && (
              <div className="absolute bottom-12 left-0 bg-white border rounded-lg shadow-md p-2 space-y-2 z-50">
                <button
                  type="button"
                  onClick={handlePdfUpload}
                  className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 w-full text-sm"
                >
                  <FileUp className="w-4 h-4" />
                  <span>Upload PDF</span>
                </button>
                <button
                  type="button"
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
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base resize-none transition-all min-h-[48px] max-h-32"
                rows={1}
                disabled={isLoading}
                style={{ boxShadow: '0 2px 8px 0 rgba(80,80,180,0.06)' }}
              />
              <span className="absolute right-3 bottom-3 text-gray-300 text-xs select-none">⏎</span>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
});
