
import {authOptions} from '@/app/lib/auth';
import {DefaultSession} from 'next-auth'; 
import NextAuth from 'next-auth';
declare module "next-auth/jwt" {
  interface JWT{
    id: string; 
  }
}

declare module "next-auth" { 
  interface Session {
    user: {
      id: string; 
    }& DefaultSession["user"];
  } 
}



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };