"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface LessonPlan {
  id: string
  subject: string
  weeks: number
  topics: string[]
}

const DUMMY_DATA: LessonPlan[] = [
  { id: "1", subject: "Math", weeks: 4, topics: ["Algebra", "Geometry"] },
  { id: "2", subject: "Science", weeks: 3, topics: ["Physics", "Chemistry"] },
]

export default function EditLessonPlanPage() {
  const params = useParams()
  const router = useRouter()
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null)
  const [subject, setSubject] = useState("")
  const [weeks, setWeeks] = useState(1)

  useEffect(() => {
    const plan = DUMMY_DATA.find((p) => p.id === params.id)
    if (plan) {
      setLessonPlan(plan)
      setSubject(plan.subject)
      setWeeks(plan.weeks)
    }
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Lesson plan updated: ${subject}, ${weeks} weeks`)
    router.push("/dashboard/lesson-plans")
  }

  if (!lessonPlan) return <div className="p-6">Lesson plan not found</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Lesson Plan</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Subject</label>
          <input
            className="border rounded p-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Weeks</label>
          <input
            type="number"
            className="border rounded p-2"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            min={1}
            required
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}
