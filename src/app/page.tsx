// app/page.tsx

const videos = [
  { id: "test", title: "My First Video", thumbnail: "/thumb1.jpg" },
  { id: "sample", title: "Sample Clip", thumbnail: "/thumb2.jpg" },
  { id: "meme", title: "Funny Meme", thumbnail: "/thumb3.jpg" },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Latest Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`/video/${video.id}`}
            className="bg-white rounded shadow hover:shadow-lg transition"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-2 font-medium">{video.title}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
