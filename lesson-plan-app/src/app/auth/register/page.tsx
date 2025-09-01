"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) setError(data.error || "Failed to register")
    else {
      await signIn("credentials", { email, password, redirect: false })
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-2">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
        <label className="block mb-2 mt-4">Email</label>
        <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label className="block mb-2 mt-4">Password</label>
        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  )
}
