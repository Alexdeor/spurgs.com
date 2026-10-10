import {prisma} from '@/lib/prisma';
import Image from 'next/image';



export default async function Profile (){
    const video = await prisma.video.findMany(
        
    );

return(
    <>
    <h1>Hello World!</h1>
    
    </>
)
}