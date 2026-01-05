'use server'

import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
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
   const { username, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

try {
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
    select: { id: true },
  })
} catch (e: any) {
  // P2002 = unique constraint failed
  if (e.code === 'P2002') return { errors: { email: ['Email already in use'] } }
  return { message: 'Server error' }
}
  return { message: 'Account created successfully' }
}