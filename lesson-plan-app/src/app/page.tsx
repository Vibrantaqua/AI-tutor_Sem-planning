import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Calendar, Download } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LessonPlan Pro</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Amazing
            <span className="text-blue-600"> Lesson Plans</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline your teaching with our intuitive lesson plan manager. 
            Create, organize, and export professional lesson plans in minutes.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Start Planning Today</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Weekly Planning</CardTitle>
              <CardDescription>
                Organize your lessons by weeks and topics for better structure
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Collaborative</CardTitle>
              <CardDescription>
                Share and collaborate with fellow educators seamlessly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>PDF Export</CardTitle>
              <CardDescription>
                Export your lesson plans as professional PDF documents
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  )
}