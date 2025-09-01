import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`bg-white shadow rounded-md p-4 ${className}`}>{children}</div>
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2">{children}</div>
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-semibold text-lg">{children}</h3>
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
