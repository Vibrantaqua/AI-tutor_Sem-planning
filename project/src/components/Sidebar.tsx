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
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

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
          className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <HelpCircle className="w-5 h-5 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Help</span>}
        </button>
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