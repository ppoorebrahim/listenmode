"use client"

import { useState, KeyboardEvent, useEffect } from "react"
import { Mic, ArrowLeft } from "lucide-react"

const mockPodcasts = [
  { id: 1, name: "Tech Talks", categories: ["AI", "Web", "Mobile"] },
  { id: 2, name: "Life Lessons", categories: ["Motivation", "Health"] },
  { id: 3, name: "Deep Dives", categories: ["History", "Science"] },
]

export default function UploadPage() {
  const [selectedPodcast, setSelectedPodcast] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState("")

  useEffect(() => {
    const hideNavbarsOnMobile = () => {
      const bottomNav = document.getElementById("mobile-bottom-navbar")
      const topNav = document.getElementById("mobile-top-navbar")
      if (bottomNav) bottomNav.style.display = "none"
      if (topNav) topNav.style.display = "none"
    }
    hideNavbarsOnMobile()
    return () => {
      const bottomNav = document.getElementById("mobile-bottom-navbar")
      const topNav = document.getElementById("mobile-top-navbar")
      if (bottomNav) bottomNav.style.display = ""
      if (topNav) topNav.style.display = ""
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded && uploaded.size <= 250 * 1024 * 1024) {
      setFile(uploaded)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded && uploaded.size <= 2 * 1024 * 1024) {
      setImage(uploaded)
    }
  }

  const handleHashtagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = hashtagInput.trim()
      if (trimmed && !hashtags.includes(trimmed) && hashtags.length < 5) {
        setHashtags([...hashtags, trimmed])
        setHashtagInput("")
      }
    }
  }

  return (
    <div className="pt-0 pl-4 pr-4 pb-32 max-w-xl text-white">
      <div className="fixed top-0 left-0 w-full z-10 bg-black px-4 h-14 py-2 flex items-center gap-2 border-b border-white/5">
        <ArrowLeft className="w-5 h-5 text-white" />
        <Mic className="w-5 h-5 text-primary" />
        <h1 className="text-base font-semibold">New Upload</h1>
      </div>

      <div className="mt-16">
        {/* Title */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Title</label>
            <span className="text-xs text-gray-400">max 100 characters</span>
          </div>
          <input
            type="text"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-transparent rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#4639B3] hover:border-[#4639B3]"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Description</label>
            <span className="text-xs text-gray-400">max 500 characters</span>
          </div>
          <textarea
            value={description}
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-[#1A1A1A] border border-transparent rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#4639B3] hover:border-[#4639B3]"
          />
        </div>

        {/* Audio File */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Audio File</label>
            <span className="text-xs text-gray-400">max 250MB, mp3/wav/aac</span>
          </div>
          <input
            type="file"
            accept="audio/mp3,audio/wav,audio/aac"
            onChange={handleFileChange}
            className="w-full text-sm file:mr-4 file:border-0 file:bg-[#272727] file:text-white file:rounded-md file:px-4 file:py-2 file:text-sm bg-[#1A1A1A]"
            title=""
          />
          {file && <p className="text-xs text-gray-400 mt-1">{file.name}</p>}
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Cover Image</label>
            <span className="text-xs text-gray-400">250x250, JPG/PNG, max 2MB</span>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            className="w-full text-sm file:mr-4 file:border-0 file:bg-[#272727] file:text-white file:rounded-md file:px-4 file:py-2 file:text-sm bg-[#1A1A1A]"
            title=""
          />
          {image && <p className="text-xs text-gray-400 mt-1">{image.name}</p>}
        </div>

        {/* Podcast Select */}
        <label className="block mb-2 text-sm">Select Podcast</label>
        <select
          value={selectedPodcast ?? ''}
          onChange={(e) => setSelectedPodcast(Number(e.target.value))}
          className="w-full bg-[#1A1A1A] pr-10 border border-transparent rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#4639B3] hover:border-[#4639B3]"
        >
          <option value="" disabled>-- Choose a podcast --</option>
          {mockPodcasts.map((pod) => (
            <option key={pod.id} value={pod.id}>{pod.name}</option>
          ))}
        </select>

        {/* Playlist Select */}
        <label className="block mt-6 mb-2 text-sm">Select Playlist</label>
        <select className="w-full bg-[#1A1A1A] pr-10 border border-transparent rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#4639B3] hover:border-[#4639B3]">
          <option value="" disabled selected>-- Choose a playlist --</option>
          <option value="Favorites">Favorites</option>
          <option value="My Morning Drive">My Morning Drive</option>
          <option value="Work Focus">Work Focus</option>
        </select>

        {/* Hashtags */}
        <div className="mt-6 mb-1 flex justify-between items-center">
          <label className="text-sm">Hashtags</label>
          <span className="text-xs text-gray-400">max 5</span>
        </div>
        <input
          type="text"
          value={hashtagInput}
          onChange={(e) => setHashtagInput(e.target.value)}
          onKeyDown={handleHashtagKeyDown}
          placeholder="#example"
          className="w-full bg-[#1A1A1A] border border-transparent rounded-md px-4 py-2 text-sm mb-1 placeholder:text-gray-500 focus:outline-none focus:border-[#4639B3] hover:border-[#4639B3]"
        />
        <p className="text-xs text-gray-500 mb-2">Type your hashtag and press Enter to add.</p>

        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, i) => (
            <span key={i} className="bg-[#4639B3] px-3 py-1.5 rounded-full text-xs text-white">
              #{tag}
            </span>
          ))}
        </div>

        <button className="mt-6 w-full py-2 bg-[#4639B3] text-white rounded-md hover:bg-[#4639B3]/90 text-sm">
          Upload
        </button>
      </div>
    </div>
  )
}
