import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  History,
  HelpCircle,
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';
import { Button } from './Button';

interface SidebarProps {
  onNewChat: () => void;
  onHistoryClick: () => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onHistoryClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const closeHelp = () => {
    setShowHelp(false);
  };

  return (
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tutor
              </span>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className={`${isCollapsed ? 'w-10 h-10 p-0 justify-center' : 'w-full'}`}
          variant="primary"
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>



      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <button
          onClick={onHistoryClick}
          className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <History className="w-5 h-5 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">History</span>}
        </button>

        <button
          onClick={handleHelpClick}
          className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 rounded-lg transition-colors shadow-sm ${
            isCollapsed ? 'justify-center' : ''
          } animate-pulse`}
          title="Get Help"
        >
          <HelpCircle className="w-5 h-5 text-purple-600" />
          {!isCollapsed && <span className="text-purple-700 font-semibold">Help</span>}
        </button>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
              <button onClick={closeHelp} className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-2xl font-bold">&times;</button>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Need Help?</h2>
                <p className="text-gray-700 text-base">Welcome to <span className="font-semibold text-blue-600">AI Tutor</span>! Here’s how you can make the most of your experience:</p>
                <ul className="text-left text-gray-600 space-y-2 list-disc list-inside">
                  <li><span className="font-semibold text-purple-600">Plan your semester</span> by chatting with the AI about your courses, deadlines, and study goals.</li>
                  <li><span className="font-semibold text-purple-600">Add events</span> to your calendar directly from the chat.</li>
                  <li><span className="font-semibold text-purple-600">Upload PDFs or images</span> for quick academic help or extraction of key points.</li>
                  <li><span className="font-semibold text-purple-600">Ask any academic question</span> and get instant, AI-powered answers.</li>
                  <li>Need more support? Contact us at <a href="mailto:support@aitutor.com" className="text-blue-600 underline">support@aitutor.com</a></li>
                </ul>
                <Button onClick={closeHelp} className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition-all">Got it!</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/account"
          className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <User className="w-5 h-5 text-gray-600" />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.subscriptionPlan?.toUpperCase() || 'FREE'}
              </p>
            </div>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};