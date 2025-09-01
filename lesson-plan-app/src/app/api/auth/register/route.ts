import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
  if (!email || !password || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { name, email, password: hashedPassword } })

  return NextResponse.json({ message: "User created" })
}
