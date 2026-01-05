import { prisma } from '@/lib/prisma';
import Link from 'next/link'; 
import Image from 'next/image'; 

export default async function Home() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'asc' },
  });
  console.log(videos)
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Latest Videos</h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {videos.map((video) => (
          
      
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="rounded shadow hover:shadow-lg transition"
          >
  <div className="relative w-full aspect-video"> 
    
<Image
    src={video.thumbnail == null ? `/thumb1.jpg` : `${video.thumbnail}`}
  alt={video.title}
  fill
  
  className="object-cover rounded-t"
/>
</div>
 <div className="p-2">
        <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
      </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
