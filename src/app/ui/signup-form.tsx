'use client'
 
import { signup } from '@/app/actions/auth'
import { useActionState, useState, useEffect } from 'react'
 import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (state?.success && email !== '') {

      signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then((res) => {
        if (res?.ok) router.push('/')
      })
    }
  }, [state, router])
  
  
  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
 
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}