import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const videoId = Number(id);

  if (!Number.isInteger(videoId) || videoId <= 0) {
    notFound();
  }

  const video = await prisma.video.findUnique({
    where: { id: videoId },
  });

  if (!video) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {video.title}
      </h1>

      <video
        controls
        className="w-full rounded-lg"
        src={`/videos/${encodeURIComponent(video.filename)}`}
      >
        Your browser does not support video playback.
      </video>
    </main>
  );
}