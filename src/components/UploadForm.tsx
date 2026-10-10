'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
export default function UploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title) {
      alert('Please provide a title and video.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      alert('Upload successful!')
      
      console.log(data)
                router.push('/');

    } catch (err) {
      console.error(err)
      alert('Upload failed.')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload a Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-black border rounded p-4"
        />

        <label>
          Upload your Video
          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </label>

        <label>
          Upload your Thumbnail
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  )
}