"use client"

import { useState } from "react"

export default function PodcastForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("file", file)

    try {
        const response = await fetch("http://194.146.123.160:4000/api/podcasts", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        alert("Podcast uploaded successfully!")
        setTitle("")
        setDescription("")
        setFile(null)
      } else {
        alert("Failed to upload podcast.")
      }
    } catch (error) {
      console.error("Error uploading podcast:", error)
      alert("Error uploading podcast.")
    }
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="mb-4 text-2xl font-bold text-white">Upload a Podcast</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-2 text-white focus:border-purple-600 focus:ring-purple-600"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-2 text-white focus:border-purple-600 focus:ring-purple-600"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-300">
            Audio File
          </label>
          <input
            type="file"
            id="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 block w-full text-gray-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Upload Podcast
        </button>
      </form>
    </div>
  )
}
