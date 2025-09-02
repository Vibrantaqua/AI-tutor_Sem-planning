import React, { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Pencil } from 'lucide-react';
import { CalendarEvent, CalendarView } from '../types';

interface CalendarProps {
  events: CalendarEvent[];
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onDateSelect: (date: Date) => void;
  onEventAdd: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  selectedDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  view,
  onViewChange,
  onDateSelect,
  onEventAdd,
  onEventEdit,
  onEventDelete,
  selectedDate = new Date()
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsByDate = useMemo(() => {
    const eventMap: Record<string, CalendarEvent[]> = {};
    events.forEach(event => {
      const dateKey = format(new Date(event.date), 'yyyy-MM-dd');
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      eventMap[dateKey].push(event);
    });
    return eventMap;
  }, [events]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    const colors = {
      class: 'bg-blue-500',
      assignment: 'bg-orange-500',
      exam: 'bg-red-500',
      meeting: 'bg-green-500',
      holiday: 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  if (view === 'month') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {(['month', 'week', 'day'] as CalendarView[]).map((viewType) => (
              <button
                key={viewType}
                onClick={() => onViewChange(viewType)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {monthDays.map(day => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDate[dateKey] || [];
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] p-3 border-r border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50 ring-2 ring-blue-600 ring-inset' : ''
                }`}
                onClick={() => onEventAdd(day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isCurrentDay
                        ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                        : 'text-gray-900'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventAdd(day);
                    }}
                    className="opacity-0 hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded"
                  >
                    <Plus className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between text-xs px-2 py-1 rounded text-white truncate ${getEventTypeColor(event.type)} cursor-pointer hover:opacity-90`}
                      title={event.title}
                    >
                      <span className="truncate" onClick={e => { e.stopPropagation(); onEventEdit(event); }}>{event.title}</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={e => { e.stopPropagation(); onEventEdit(event); }}
                          className="text-white hover:text-yellow-200"
                          title="Edit"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); onEventDelete(event.id); }}
                          className="text-white hover:text-red-300"
                          title="Delete"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Day view implementation
  if (view === 'day') {
    const day = selectedDate || currentDate;
    const dateKey = format(day, 'yyyy-MM-dd');
    const dayEvents = eventsByDate[dateKey] || [];
    const isCurrentDay = isToday(day);
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Day Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 1)))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {format(day, 'EEEE, MMMM d, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 1)))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {(['month', 'week', 'day'] as CalendarView[]).map((viewType) => (
              <button
                key={viewType}
                onClick={() => onViewChange(viewType)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>
        {/* Day Content */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className={`text-lg font-bold ${isCurrentDay ? 'text-blue-600' : 'text-gray-900'}`}>{format(day, 'MMMM d, yyyy')}</span>
            <button
              onClick={() => onEventAdd(day)}
              className="ml-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >+ Add Event</button>
          </div>
          {dayEvents.length > 0 ? (
            <div className="space-y-4">
              {dayEvents.map(event => (
                <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2 flex items-center justify-between hover:bg-blue-50">
                  <div className="flex-1 cursor-pointer" onClick={() => onEventEdit(event)}>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                    {event.description && <p className="text-sm text-gray-500 mt-1">{event.description}</p>}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); onEventDelete(event.id); }}
                    className="ml-2 text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No events for this day.</div>
          )}
        </div>
      </div>
    );
  }
  if (view === 'week') {
    // Calculate start and end of current week (Sunday to Saturday)
    const today = currentDate;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Week Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              Week of {format(weekDays[0], 'MMM d, yyyy')} - {format(weekDays[6], 'MMM d, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {(['month', 'week', 'day'] as CalendarView[]).map((viewType) => (
              <button
                key={viewType}
                onClick={() => onViewChange(viewType)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>
        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        {/* Week Grid */}
        <div className="grid grid-cols-7">
          {weekDays.map(day => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDate[dateKey] || [];
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] p-3 border-r border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50 ring-2 ring-blue-600 ring-inset' : ''
                }`}
                onClick={() => onEventAdd(day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isCurrentDay
                        ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                        : 'text-gray-900'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onEventAdd(day);
                    }}
                    className="opacity-0 hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded"
                  >
                    <Plus className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between text-xs px-2 py-1 rounded text-white truncate ${getEventTypeColor(event.type)} cursor-pointer hover:opacity-90`}
                      title={event.title}
                      onClick={e => {
                        e.stopPropagation();
                        onEventEdit(event);
                      }}
                    >
                      <span className="truncate">{event.title}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onEventEdit(event);
                        }}
                        className="ml-2 text-white hover:text-yellow-200"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
