import { NextResponse } from "next/server"

// Using the same in-memory array from route.ts
let lessonPlans = [
  { id: "1", subject: "Math", weeks: 4, topics: ["Algebra", "Geometry"] },
  { id: "2", subject: "Science", weeks: 3, topics: ["Physics", "Chemistry"] },
]

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const plan = lessonPlans.find((p) => p.id === params.id)
  if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(plan)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const index = lessonPlans.findIndex((p) => p.id === params.id)
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

  lessonPlans[index] = { ...lessonPlans[index], ...data }
  return NextResponse.json(lessonPlans[index])
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const index = lessonPlans.findIndex((p) => p.id === params.id)
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const deleted = lessonPlans.splice(index, 1)
  return NextResponse.json(deleted[0])
}
