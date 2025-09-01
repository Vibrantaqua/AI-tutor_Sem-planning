import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Lesson Plan App',
  description: 'Manage and create lesson plans easily',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              LessonPlanApp
            </Link>
            <nav className="space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link href="/auth/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner mt-auto py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LessonPlanApp. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
