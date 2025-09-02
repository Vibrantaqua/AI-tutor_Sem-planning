import Calendar from '../components/Calendar';

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-darkGreen">Calendar</h1>
      <div className="bg-white rounded-2xl shadow p-4">
        <Calendar />
      </div>
    </div>
  );
}
