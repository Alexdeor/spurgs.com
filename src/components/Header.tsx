'use client'

import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Spurgs Video</h1>
      {status === 'authenticated' ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Hi, {session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <span className="text-sm text-gray-500">Not logged in</span>
      )}
    </header>
  )
}
