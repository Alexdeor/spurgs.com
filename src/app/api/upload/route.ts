import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  console.log(session)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const thumbnail = formData.get('thumbnail') as File; 

  if (!file || !title) {
    return NextResponse.json({ error: 'Missing title or file' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), 'public', 'videos');
  const uploadThumbnail =  path.join(process.cwd(), 'public', 'thumbnail');
  // video file 
  const filename = `${Date.now()}_${file.name}`;
  const filepath = path.join(uploadDir, filename);

  //thumbnail file
  const thumbnailName= `${Date.now()}_${thumbnail.name}`;
  const thumbnailPath = path.join(uploadThumbnail, thumbnailName); 

  // Save file to public/videos folder
  await writeFile(filepath, buffer);
 
  
  if (thumbnail) {
    const thumbBytes = await thumbnail.arrayBuffer();
    const thumbBuffer = Buffer.from(thumbBytes);
    //save file to public/thumbnails folder
  await writeFile(thumbnailPath, thumbBuffer);
}


  const video = await prisma.video.create({
    data: {
      userId: parseInt(session.user.id),
      title: title,
      filename: filename,
      thumbnail: thumbnail ? thumbnailName : null,
    },
  });

  return NextResponse.json({ success: true, video });
}
