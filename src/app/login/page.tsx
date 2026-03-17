'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/',
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form style={{color: 'black'}} onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
        style={{color: 'white'}}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
