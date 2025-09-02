import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaComments } from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <div className={`sticky top-0 left-0 h-screen shrink-0 flex flex-col bg-darkGreen text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Toggle AI Tutor Icon */}
      <div className="flex justify-center items-center mt-4 mb-4">
        <div 
          role="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setCollapsed(!collapsed);
            }
          }}
          tabIndex={0}
          className="w-10 h-10 bg-knowledgeGreen rounded-full flex justify-center items-center cursor-pointer hover:bg-lightGreen transition"
          title={collapsed ? "Expand Sidebar" : "AI Tutor"}
        >
          <span className="text-xl font-bold">A</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 p-3 w-full hover:bg-lightGreen hover:text-darkGreen transition text-left px-4"
        >
          <FaComments className="min-w-[20px]" />
          {!collapsed && "AI Chat"}
        </button>
        <button
          onClick={() => navigate("/calendar")}
          className="flex items-center gap-2 p-3 w-full hover:bg-lightGreen hover:text-darkGreen transition text-left px-4"
        >
          <FaCalendarAlt className="min-w-[20px]" />
          {!collapsed && "Calendar"}
        </button>
      </div>

      {/* New Chat */}
      <button
        onClick={() => handleSelectChat("new")}
        className="mb-2 flex items-center gap-2 p-3 w-full hover:bg-lightGreen hover:text-darkGreen transition text-left px-4"
      >
        <FaPlus className="min-w-[20px]" />
        {!collapsed && "New Chat"}
      </button>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 mb-2">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded text-black placeholder-gray-400 focus:ring-2 focus:ring-lightGreen focus:outline-none"
          />
        </div>
      )}

      {/* Chat History Toggle */}
      <button
        onClick={() => setHistoryOpen(!historyOpen)}
        className="flex items-center gap-2 p-3 w-full hover:bg-lightGreen hover:text-darkGreen transition px-4 mb-2"
      >
        <FaHistory />
        {!collapsed && "History"}
      </button>

      {/* Chat History List */}
      {historyOpen && !collapsed && (
        <div className="flex flex-col overflow-hidden">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-knowledgeGreen">
            {filteredChats.length === 0 ? (
              <div className="text-gray-300 text-sm px-4 py-2">No chats found.</div>
            ) : (
              filteredChats.map((chat, index) => (
                <div
                  key={index}
                  className="flex flex-col px-4 py-2 hover:bg-lightGreen cursor-pointer transition-colors"
                  onClick={() => handleSelectChat(chat.title)}
                >
                  <span className="font-semibold text-sm truncate">{chat.title}</span>
                  <span className="text-xs text-gray-200 truncate">{chat.lastMessage}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="mt-auto flex flex-col gap-2 p-4">
        <button
          onClick={() => navigate("/help")}
          className="flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition"
        >
          <FaQuestionCircle />
          {!collapsed && "Help"}
        </button>
        <button
          onClick={() => navigate("/account")}
          className="flex items-center gap-2 p-2 rounded hover:bg-lightGreen hover:text-darkGreen transition"
        >
          <FaUser />
          {!collapsed && "Account & Subscription"}
        </button>
      </div>
    </div>
  );
}
