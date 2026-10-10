import { AuthOptions } from "next-auth";
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
  session:{
strategy:"jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({token, user})=>{
      if(!user)return token; 
      token.id = user.id; 
      
      
        return token; 
    },
    session: ({session, token}) =>{
      if(!token) return session; 

      session.user.id = token.id; 
      
      
      return session; 
    }
  }
};
export default authOptions;