import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaPhone, FaBook, FaQuestion, FaUserGraduate } from "react-icons/fa";

export default function Help() {
  const navigate = useNavigate();

  const helpSections = [
    {
      title: "Getting Started",
      icon: <FaBook className="text-3xl text-knowledgeGreen" />,
      content: "Learn how to use AI Tutor to plan your semester, organize your study schedule, and get academic help.",
      items: [
        "Create your first chat",
        "Ask academic questions",
        "Plan your semester",
        "Track your progress"
      ]
    },
    {
      title: "Study Features",
      icon: <FaUserGraduate className="text-3xl text-knowledgeGreen" />,
      content: "Explore our advanced learning features designed to enhance your academic performance.",
      items: [
        "Smart topic suggestions",
        "Custom study plans",
        "Progress tracking",
        "Resource recommendations"
      ]
    },
    {
      title: "FAQ",
      icon: <FaQuestion className="text-3xl text-knowledgeGreen" />,
      content: "Find answers to commonly asked questions about AI Tutor.",
      items: [
        "How to start a new chat?",
        "Can I save my study plans?",
        "How to contact support?",
        "Subscription details"
      ]
    }
  ];

  return (
    <div className="fixed top-0 bottom-0 right-0 left-64 flex flex-col bg-gray-50 shadow-xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-sm flex items-center sticky top-0">
        <button 
          onClick={() => navigate("/chat")}
          className="p-2 hover:bg-gray-100 rounded-full mr-4 transition-colors"
        >
          <FaArrowLeft className="text-knowledgeGreen" />
        </button>
        <h2 className="text-xl font-semibold text-knowledgeGreen">Help Center</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {/* Help Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {helpSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {section.icon}
                <h3 className="text-lg font-semibold ml-3 text-knowledgeGreen">{section.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{section.content}</p>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-knowledgeGreen rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-knowledgeGreen mb-4">Contact Support</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="mailto:support@ai-tutor.com" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaEnvelope className="text-knowledgeGreen mr-3" />
              <span>support@ai-tutor.com</span>
            </a>
            <a href="tel:+911234567890" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaPhone className="text-knowledgeGreen mr-3" />
              <span>+91 12345 67890</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
