import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Account from "./pages/Account";
import Help from "./pages/Help";
import ChatPage from "./pages/ChatPage";
import CalendarPage from "./pages/CalendarPage";
import Home from "./pages/Home";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setSelectedChat={setSelectedChat}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={<ChatPage />}
            />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
