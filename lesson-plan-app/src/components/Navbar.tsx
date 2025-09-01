import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">Lesson Planner</div>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/lesson-plans">Lesson Plans</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  )
}
