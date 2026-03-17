import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt  from "bcryptjs"; 

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  if (!credentials?.email || !credentials?.password){
  return null; 
  };

const user = await prisma.user.findUnique({
  where: {email: credentials.email}
})    

if(!user){
  return null; 
}

const validPassword = await bcrypt.compare(
  credentials.password,
  user.password
)
if(!validPassword){
  return null; 
}
return {
    id: String(user.id),
    name: user.username,
    email: user.email
}
      
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
