"use client"

import { useState } from "react"
import { Search } from "lucide-react"

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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-black text-white pb-24 px-4">
        <div className="mb-6 relative top-[2px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search for Podcast or Podcaster Name"
            className="w-full text-sm pl-10 rounded-full px-4 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 focus:placeholder:text-zinc-600 border border-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h2 className="text-lg font-semibold mb-2 -mt-1">Category</h2>
        <div className="mt-2 grid grid-cols-3 gap-3">
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
    </div>
  )
}
