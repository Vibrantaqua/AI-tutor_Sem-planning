import React, { useState } from 'react';
import { loadData } from '../utils/realtimeDb';
import { Calendar } from '../components/Calendar';
import { Sidebar } from '../components/Sidebar';
import { ChatPanel } from '../components/ChatPanel';
import { CalendarEvent, CalendarView } from '../types';
import { MessageSquare } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  // Chat session state (for multi-session support)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newChatTrigger, setNewChatTrigger] = useState(0);

  // Delete event handler
  const handleEventDelete = (eventId: string) => {
    setEvents((prevEvents: CalendarEvent[]) => prevEvents.filter((ev: CalendarEvent) => ev.id !== eventId));
    if (editingEvent && editingEvent.id === eventId) setEditingEvent(null);
  };
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
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editForm, setEditForm] = useState({ title: '', startTime: '', endTime: '', description: '' });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };


  // Add Event Modal state
  const [addEventDate, setAddEventDate] = useState<Date | null>(null);
  const [addEventForms, setAddEventForms] = useState<{
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    type: 'class' | 'assignment' | 'exam' | 'meeting' | 'holiday';
  }[]>([
    { title: '', startTime: '', endTime: '', description: '', type: 'class' }
  ]);

  const handleEventAdd = (date: Date) => {
    setAddEventDate(date);
    setAddEventForms([
      { title: '', startTime: '', endTime: '', description: '', type: 'class' }
    ]);
  };

  const handleAddEventFormChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddEventForms(forms => forms.map((f, i) => i === idx ? { ...f, [name]: value } : f));
  };

  const handleAddEvent = () => {
    if (!addEventDate) return;
    const newEvents = addEventForms.map(form => ({
      id: Date.now().toString() + Math.random(),
      title: form.title,
      date: addEventDate.toISOString(),
      startTime: form.startTime,
      endTime: form.endTime,
      type: form.type,
      userId: '1',
      description: form.description
    }));
    setEvents(prev => [...prev, ...newEvents]);
    setAddEventDate(null);
  };

  const handleAddAnotherEvent = () => {
    setAddEventForms(forms => [...forms, { title: '', startTime: '', endTime: '', description: '', type: 'class' }]);
  };

  const handleRemoveEventForm = (idx: number) => {
    setAddEventForms(forms => forms.length > 1 ? forms.filter((_, i) => i !== idx) : forms);
  };

  const handleAddEventCancel = () => {
    setAddEventDate(null);
  };

  const handleEventEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || ''
    });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    if (!editingEvent) return;
    setEvents(prevEvents => prevEvents.map(ev =>
      ev.id === editingEvent.id
        ? { ...ev, ...editForm }
        : ev
    ));
    setEditingEvent(null);
  };

  const handleEditCancel = () => {
    setEditingEvent(null);
  };


  // Chat history state and logic
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleHistoryClick = async () => {
    // Load chat messages from Firebase when opening history
    try {
      const messagesObj = await loadData(`chats/1/messages`);
      // messagesObj is an object with keys, convert to array
      const messages = messagesObj ? Object.values(messagesObj) : [];
      setChatHistory(messages);
    } catch (err) {
      setChatHistory([]);
    }
    setShowHistory(true);
  };

  const handleHistoryClose = () => {
    setShowHistory(false);
  };

  const handleNewChat = () => {
    setIsChatOpen(true);
    setNewChatTrigger(prev => prev + 1);
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
      <Sidebar 
        onNewChat={handleNewChat} 
        onHistoryClick={handleHistoryClick}
      />

      {/* Chat History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button onClick={handleHistoryClose} className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">Chat History</h2>
            {chatHistory.length === 0 ? (
              <p className="text-gray-500">No chat messages yet.</p>
            ) : (
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {chatHistory.map((msg, idx) => (
                  <li key={msg.id || idx} className={`px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'}`}>
                    <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'AI'}:</span> {msg.content}
                    <div className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Add Multiple Events Modal */}
      {addEventDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]">
            <button onClick={handleAddEventCancel} className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">Add Events for {addEventDate.toLocaleDateString()}</h2>
            <div className="space-y-8">
              {addEventForms.map((form, idx) => (
                <div key={idx} className="border rounded-lg p-4 relative bg-gray-50">
                  {addEventForms.length > 1 && (
                    <button onClick={() => handleRemoveEventForm(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg">&times;</button>
                  )}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={e => handleAddEventFormChange(idx, e)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={e => handleAddEventFormChange(idx, e)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">End Time</label>
                      <input
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={e => handleAddEventFormChange(idx, e)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={e => handleAddEventFormChange(idx, e)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="class">Class</option>
                      <option value="assignment">Assignment</option>
                      <option value="exam">Exam</option>
                      <option value="meeting">Meeting</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={e => handleAddEventFormChange(idx, e)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddAnotherEvent}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >+ Add Another Event</button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >Save Events</button>
            </div>
          </div>
        </div>
      )}

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
            {/* Week and Day Events */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* This Week's Events */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-blue-700">This Week's Events</h3>
                </div>
                <div className="p-6">
                  {(() => {
                    const today = new Date();
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - today.getDay());
                    const endOfWeek = new Date(today);
                    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                    const weekEvents = events.filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate >= startOfWeek && eventDate <= endOfWeek;
                    });
                    return weekEvents.length > 0 ? (
                      <div className="space-y-4">
                        {weekEvents.map(event => (
                          <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2 cursor-pointer hover:bg-blue-50" onClick={() => handleEventEdit(event)}>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                            {event.description && <p className="text-sm text-gray-500 mt-1">{event.description}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">No events this week.</div>
                    );
                  })()}
                </div>
              </div>
              {/* Today's Events */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-purple-700">Today's Events</h3>
                </div>
                <div className="p-6">
                  {(() => {
                    const today = new Date();
                    const dayEvents = events.filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
                    });
                    return dayEvents.length > 0 ? (
                      <div className="space-y-4">
                        {dayEvents.map(event => (
                          <div key={event.id} className="border-l-4 border-purple-600 pl-4 py-2 cursor-pointer hover:bg-purple-50" onClick={() => handleEventEdit(event)}>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                            {event.description && <p className="text-sm text-gray-500 mt-1">{event.description}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">No events today.</div>
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2">
                <Calendar
                  events={events}
                  view={calendarView}
                  onViewChange={setCalendarView}
                  onDateSelect={handleDateSelect}
                  onEventAdd={handleEventAdd}
                  onEventEdit={handleEventEdit}
                  onEventDelete={handleEventDelete}
                  selectedDate={selectedDate}
                />
              </div>
              {/* Today's Plan (keep for context, or remove if redundant) */}
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
                          <span className="w-12 h-12 mx-auto inline-block" style={{fontSize: '2.5rem', lineHeight: 1}}>📅</span>
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

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button onClick={handleEditCancel} className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={editForm.startTime}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={editForm.endTime}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleEditCancel}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >Cancel</button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
  <ChatPanel isOpen={isChatOpen} onToggle={toggleChat} newChatTrigger={newChatTrigger} />
    </div>
  );
};