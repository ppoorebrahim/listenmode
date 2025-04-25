"use client"

import { useState } from "react"
import HorizontalPodcastCard from "@/components/HorizontalPodcastCard"
import { Search } from "lucide-react"
import { format, isToday, isYesterday, parseISO } from "date-fns"

const mockPodcasts = [
  {
    id: 1,
    title: "Sample Podcast Episode",
    channel: "Sample Channel",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "24:00",
    likes: 10,
    comments: 3,
    views: 150,
    timeAgo: "Yesterday",
    file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    date: "2025-04-23",
  },
  {
    id: 2,
    title: "Another Episode Title",
    channel: "Sample Channel",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "19:12",
    likes: 23,
    comments: 7,
    views: 280,
    timeAgo: "Yesterday",
    file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    date: "2025-04-23",
  },
  {
    id: 3,
    title: "Third Episode",
    channel: "Sample Channel",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "33:00",
    likes: 15,
    comments: 5,
    views: 200,
    timeAgo: "Yesterday",
    file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    date: "2025-04-22",
  }
]

function formatDateLabel(dateString: string): string {
  const date = parseISO(dateString)
  if (isToday(date)) return "Today"
  if (isYesterday(date)) return "Yesterday"
  return format(date, "dd MMM")
}

function groupByDate(podcasts: typeof mockPodcasts) {
  return podcasts.reduce((acc: Record<string, typeof mockPodcasts>, podcast) => {
    const label = formatDateLabel(podcast.date)
    if (!acc[label]) acc[label] = []
    acc[label].push(podcast)
    return acc
  }, {})
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPodcasts = mockPodcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const grouped = groupByDate(filteredPodcasts)

  return (
    <div className="px-[4.5rem] sm:px-[4.5rem] pt-[7rem] pb-24 bg-black text-white">
      <div className="flex flex-col items-start gap-4 mb-6">
        <h1 className="text-2xl font-bold">Your Listening History</h1>
        <div className="relative w-80">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
          <input
            type="text"
            placeholder="Search in your history"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-2 py-1 bg-transparent text-white placeholder:text-zinc-500 border-0 border-b border-zinc-700 rounded-none focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 items-start">
        {Object.entries(grouped).map(([label, items]) => (
          <div key={label} className="w-full">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-zinc-400 px-1">{label}</h2>
            </div>
            <div className="flex flex-col gap-6 w-full items-start">
              {items.map((podcast) => (
                <div key={podcast.id} className="w-full max-w-[612px]">
                  <HorizontalPodcastCard podcast={podcast} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
