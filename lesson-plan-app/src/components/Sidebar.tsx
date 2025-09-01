import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <div className="mb-6 font-bold">Menu</div>
      <ul className="space-y-2">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/lesson-plans">Lesson Plans</Link></li>
        <li><Link href="/dashboard/lesson-plans/new">New Plan</Link></li>
      </ul>
    </aside>
  )
}
