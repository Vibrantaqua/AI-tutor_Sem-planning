import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  })

  // Create sample lesson plans
  const sampleLessonPlans = [
    {
      subject: 'Introduction to Mathematics',
      weeks: 4,
      topics: ['Basic Arithmetic', 'Fractions', 'Decimals', 'Word Problems'],
      planData: {
        objectives: [
          'Students will understand basic arithmetic operations',
          'Students will work with fractions and decimals',
          'Students will solve real-world math problems'
        ],
        materials: ['Textbook', 'Calculator', 'Worksheets', 'Whiteboard'],
        activities: [
          'Group problem solving sessions',
          'Interactive math games',
          'Real-world application exercises',
          'Peer tutoring activities'
        ],
        assessment: 'Weekly quizzes, midterm exam, and final project',
        notes: 'Focus on building strong foundational skills'
      },
      userId: user.id,
    },
    {
      subject: 'English Literature',
      weeks: 6,
      topics: ['Poetry Analysis', 'Short Stories', 'Essay Writing', 'Grammar Review'],
      planData: {
        objectives: [
          'Analyze literary devices in poetry',
          'Understand narrative structure in short stories',
          'Develop essay writing skills'
        ],
        materials: ['Literature anthology', 'Writing journals', 'Grammar workbook'],
        activities: [
          'Poetry recitation and analysis',
          'Creative writing exercises',
          'Book club discussions',
          'Peer editing sessions'
        ],
        assessment: 'Portfolio assessment, analytical essays, and oral presentations',
        notes: 'Encourage creative expression and critical thinking'
      },
      userId: user.id,
    }
  ]

  for (const planData of sampleLessonPlans) {
    await prisma.lessonPlan.create({
      data: planData,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })