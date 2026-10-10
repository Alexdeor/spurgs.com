
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import { redirect } from 'next/navigation'; 
import UploadForm from "@/components/UploadForm"



export default async function UploadPage() {
const session = await getServerSession(authOptions); 

  if(!session){
    redirect('/login');

  }
return <UploadForm/>

}