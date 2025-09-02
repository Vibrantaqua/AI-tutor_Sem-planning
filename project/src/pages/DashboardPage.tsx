import React, { useState, useEffect } from 'react';
import { Calendar } from '../components/Calendar';
import { Sidebar } from '../components/Sidebar';
import { ChatPanel } from '../components/ChatPanel';
import { CalendarEvent, CalendarView } from '../types';
import { MessageSquare } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Mathematics Lecture',
      date: new Date().toISOString(),
      startTime: '09:00',
      endTime: '10:30',
      type: 'class',
      userId: '1',
      description: 'Calculus II - Integration techniques'
    },
    {
      id: '2',
      title: 'Physics Assignment Due',
      date: new Date(Date.now() + 86400000).toISOString(),
      startTime: '23:59',
      endTime: '23:59',
      type: 'assignment',
      userId: '1',
      description: 'Chapter 12 problems'
    }
  ]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventAdd = (date: Date) => {
    // This would typically open a modal to add a new event
    console.log('Add event for date:', date);
  };

  const handleNewChat = () => {
    setIsChatOpen(true);
  };

  const handleHistoryClick = () => {
    // Implement chat history functionality
    console.log('Show chat history');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} onHistoryClick={handleHistoryClick} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isChatOpen ? 'mr-96' : ''
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Academic Dashboard</h1>
              <p className="text-gray-600">Plan your semester with AI-powered insights</p>
            </div>
            <button
              onClick={toggleChat}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isChatOpen 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2">
                <Calendar
                  events={events}
                  view={calendarView}
                  onViewChange={setCalendarView}
                  onDateSelect={handleDateSelect}
                  onEventAdd={handleEventAdd}
                  selectedDate={selectedDate}
                />
              </div>

              {/* Today's Plan */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedDateEvents.length} events scheduled
                    </p>
                  </div>
                  
                  <div className="p-6">
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateEvents.map(event => (
                          <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">
                              {event.startTime} - {event.endTime}
                            </p>
                            {event.description && (
                              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">
                          <Calendar className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-500">No events scheduled</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Click on a date to add an event
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-gray-600">Assignments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
};