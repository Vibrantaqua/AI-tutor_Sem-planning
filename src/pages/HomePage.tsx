import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { BookOpen, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';

export const HomePage: React.FC = () => {
  const { loginAsGuest } = useAuth();

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Smart Scheduling',
      description: 'AI-powered semester planning with intelligent scheduling'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'AI Tutor Chat',
      description: 'Get instant help and guidance from your personal AI tutor'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Study Management',
      description: 'Organize assignments, exams, and study sessions efficiently'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your academic progress with detailed analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tutor
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Academic Journey</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience intelligent semester planning with AI-powered tutoring, smart scheduling, and personalized learning guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={loginAsGuest}
                className="w-full sm:w-auto text-purple-600 hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-300"
              >
                Try Demo Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for academic success
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform combines intelligent planning, personalized tutoring, and seamless organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to excel academically?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using AI Tutor to achieve their academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3">
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={loginAsGuest}
                className="border-white text-white hover:bg-white/10 px-8 py-3"
              >
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};