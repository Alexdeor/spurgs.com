// app/video/[id]/page.tsx

type Props = {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: Props) {
  const { id } = params

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Now Playing: {id}</h2>
      
      <video controls className="w-full rounded-lg shadow">
        <source src={`/${id}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
