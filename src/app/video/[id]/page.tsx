import { prisma } from '@/lib/prisma';

type Props = {
  params: { id: string };
};

export default async function VideoPage({ params }: Props) {
  const video = await prisma.video.findUnique({
    where: { id: Number(params.id) },
  });

  if (!video) {
    return <p className="text-center mt-10">Video not found</p>;
  }
  console.log(video.filename)

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Now Playing: {video.title}</h2>
      <video controls className="w-full rounded-lg shadow">
        <source src={`/videos/${video.filename}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
