import { NextResponse } from "next/server"

// Dummy in-memory storage
let lessonPlans = [
  { id: "1", subject: "Math", weeks: 4, topics: ["Algebra", "Geometry"] },
  { id: "2", subject: "Science", weeks: 3, topics: ["Physics", "Chemistry"] },
]

export async function GET() {
  return NextResponse.json(lessonPlans)
}

export async function POST(req: Request) {
  const data = await req.json()
  const newPlan = {
    id: (lessonPlans.length + 1).toString(),
    subject: data.subject || "Untitled",
    weeks: data.weeks || 1,
    topics: data.topics || [],
  }
  lessonPlans.push(newPlan)
  return NextResponse.json(newPlan)
}
