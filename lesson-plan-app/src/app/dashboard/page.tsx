"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LessonPlan {
  id: string
  subject: string
  weeks: number
  topics: string[]
}

export default function DashboardPage() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLessonPlans([
        { id: "1", subject: "Math", weeks: 4, topics: ["Algebra", "Geometry"] },
        { id: "2", subject: "Science", weeks: 3, topics: ["Physics", "Chemistry"] },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const totalPlans = lessonPlans.length
  const thisMonthPlans = lessonPlans.filter(
    (plan) => new Date().getMonth() === new Date().getMonth() // placeholder
  ).length
  const avgWeeks = totalPlans > 0 ? Math.round(lessonPlans.reduce((acc, plan) => acc + plan.weeks, 0) / totalPlans) : 0

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/lesson-plans/new">New Lesson Plan</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Lesson Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPlans}</div>
            <CardDescription>All your lesson plans</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthPlans}</div>
            <CardDescription>Plans created this month</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Weeks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgWeeks}</div>
            <CardDescription>Weeks per lesson plan</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Lesson Plans</CardTitle>
          <CardDescription>Your latest lesson plans</CardDescription>
        </CardHeader>
        <CardContent>
          {lessonPlans.length === 0 ? (
            <div className="text-center py-8">No lesson plans yet</div>
          ) : (
            <div className="space-y-4">
              {lessonPlans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{plan.subject}</h3>
                    <p className="text-sm text-gray-600">{plan.weeks} weeks</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/lesson-plans/${plan.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
