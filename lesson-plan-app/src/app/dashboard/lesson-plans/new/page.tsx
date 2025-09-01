"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function NewLessonPlanPage() {
  const [subject, setSubject] = useState("")
  const [weeks, setWeeks] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Lesson plan created: ${subject}, ${weeks} weeks`)
    setSubject("")
    setWeeks(1)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">New Lesson Plan</h1>
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
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}
