import { NextResponse } from "next/server"

export async function GET() {
  // Dummy file response, replace with real PDF generation later
  const dummyPdf = Buffer.from("This is a dummy PDF content.", "utf-8")
  return new NextResponse(dummyPdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="lesson-plans.pdf"',
    },
  })
}
