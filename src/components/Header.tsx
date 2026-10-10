'use client'

import { useSession, signOut } from 'next-auth/react'


import Link from 'next/link';
export default function Header() {
  const { data: session, status } = useSession()


  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1  className="text-xl font-bold text-blue-600"><Link href="/">Spurgs Video</Link></h1>
      {status === 'authenticated' ? (
        <>
        <div className="flex items-center gap-4">

         <Link href={'/profile'}> <span className="text-gray-700 hover:bg-gray-700">Hi, {session.user?.name}</span></Link>
                           <Link href={"/upload"}><button className="bg-gray-600 text-white px-3 m-1 p-1 rounded hover:bg-gray-700">Upload</button></Link>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        </>
      ) : (
        <>     
        <div>   
        <Link href="/login"><button className="bg-gray-600 text-white px-3 m-1 p-1 rounded hover:bg-gray-700">Login</button></Link>
       <Link href="/register"><button  
        className="bg-gray-600 text-white px-3 m-1 p-1 rounded hover:bg-gray-700">Register</button></Link> 
        </div>
        </>

      )}
    </header>
  )
}
