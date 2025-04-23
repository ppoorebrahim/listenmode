"use client"

import { useState } from "react"

const categories = [
  "Psychology",
  "Self-help & Motivation",
  "Relationships & Dating",
  "True Crime",
  "Personal Development",
  "Gaming",
  "Movies & TV Series",
  "Startups",
  "Politics",
  "Economics & Investing",
  "Technology",
  "Music",
  "History",
  "Immigration",
  "Book Summaries",
  "Language Learning",
  "Lifestyle",
  "Philosophy",
  "Art & Literature",
  "Religion & Spirituality",
  "Health & Nutrition",
  "Environment & Nature",
  "Sports",
  "Physics",
]

export default function MobileSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col min-h-screen bg-black text-white pb-24 px-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for Podcast or Podcaster Name"
          className="w-full rounded-full px-4 py-2 bg-zinc-900 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-semibold mb-3">Category</h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="bg-zinc-900 rounded-lg h-24 flex items-center justify-center text-center text-sm px-2 text-white border border-zinc-800"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}
