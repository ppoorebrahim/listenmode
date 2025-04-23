"use client"

import { useState, useEffect } from "react"
import {
  History,
  Heart,
  Bookmark,
  Download,
  Rss
} from "lucide-react"
import MobilePodcastCard from "@/components/mobile-podcast-card"

const tabs = [
  { label: "History", icon: History },
  { label: "Subscriptions", icon: Rss },
  { label: "Saved", icon: Bookmark },
  { label: "Liked", icon: Heart },
  { label: "Downloads", icon: Download }
]

const mockData = [
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
    file_url: ""
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
    file_url: ""
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
    file_url: ""
  },
  {
    id: 4,
    title: "Last Shown Podcast",
    channel: "Sample Channel",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "28:45",
    likes: 7,
    comments: 1,
    views: 98,
    timeAgo: "Yesterday",
    file_url: ""
  }
]

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState("History")
  const [search, setSearch] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="bg-black min-h-screen overflow-y-auto scrollbar-none">
      <div className="px-3 pb-20">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.label === activeTab
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className="flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isActive ? "bg-[#4639B3] text-white" : "bg-[#2A2A2A] text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-[6px] ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search in ${activeTab.toLowerCase()}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A1A] rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />
        </div>

        {/* Date label */}
        <div className="text-sm text-gray-500 mb-2">Yesterday</div>

        {/* Cards */}
        <div className="space-y-4">
          {mockData
            .filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 4)
            .map((podcast) => (
              <MobilePodcastCard key={podcast.id} podcast={podcast} />
            ))}
        </div>
      </div>
    </div>
  )
}
