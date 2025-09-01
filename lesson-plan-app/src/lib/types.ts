/**
 * Type definitions for Lesson Plans, Users, etc.
 * You can expand these as your app grows.
 */

// Basic User type
export interface User {
  id: string
  name: string
  email: string
}

// Basic LessonPlan type
export interface LessonPlan {
  id: string
  title: string
  subject: string
  weeks: number
  topics: string[]          // array of topic names
  planData: Record<string, any>  // detailed plan info
  createdAt: string         // ISO string
  updatedAt?: string        // optional
  userId: string
}
