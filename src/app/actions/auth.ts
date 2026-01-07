'use server'

import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma';
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export async function signup(state: FormState, formData: FormData) {
  //1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
    // 2. Prepare data for insertion into database
   const { username, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
  // 3. Insert the user into the database or call an Library API
  let user
try {
   user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
    select: { id: true },
  })
} catch (e: any) {
  // P2002 = unique constraint failed
  if (e.code === 'P2002') return { errors: { email: ['Email already in use'] } }
  return { message: 'Server error' }
}
  return { message: 'Account created successfully' }

  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/')


}