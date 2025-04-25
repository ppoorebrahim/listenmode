"use client"

import { useState, useEffect } from "react"
import PodcastCard from "@/components/podcast-card"
import MobilePodcastCard from "@/components/mobile-podcast-card"

export default function Home() {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://194.146.123.160:4001/api/podcasts")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("API Response:", data) // ✅ لاگ برای دیباگ پاسخ API
        const transformedData = data.map(podcast => ({
          id: podcast.id,
          title: podcast.title,
          channel: podcast.author || "Unknown",
          channelAvatar: "/placeholder.svg",
          thumbnail: "/placeholder.svg",
          duration: podcast.duration || "Unknown",
          file_url: podcast.file_url || "", // اطمینان از وجود file_url
          likes: podcast.likes || 0,
          comments: podcast.comments || 0,
          views: 0,
          timeAgo: "Unknown",
        }))
        // فیلتر کردن پادکست‌هایی که file_url معتبر دارند
        const validPodcasts = transformedData.filter(podcast => podcast.file_url);
        console.log("Transformed Podcasts:", validPodcasts); // ✅ لاگ برای دیباگ داده‌های تبدیل‌شده
        setPodcasts(validPodcasts.slice(0, 15))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching podcasts:", error)
        setPodcasts(mockPodcasts)
        setLoading(false)
      }
    }
    fetchPodcasts()
  }, [])

  const mockPodcasts = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: `Mock Podcast #${i + 1}`,
    channel: "Mock Channel",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "1:00:00",
    file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // ✅ URL معتبر برای تست
    likes: 100,
    comments: 20,
    views: 1000,
    timeAgo: "Today",
  }))

  if (!isMounted) {
    return (
      <div className="podcast-container px-3 pb-6 pt-0 bg-transparent relative z-0">
        <p className="text-gray-400">Loading podcasts...</p>
      </div>
    )
  }

  const displayPodcasts = podcasts.length > 0 ? podcasts : mockPodcasts

  return (
    <div className="podcast-container px-3 pb-6 pt-0 bg-transparent relative z-0">
      {loading ? (
        <p className="text-gray-400">Loading podcasts...</p>
      ) : displayPodcasts.length === 0 ? (
        <p className="text-gray-400">No podcasts available.</p>
      ) : (
        <div>
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-3">
            {displayPodcasts.map((podcast, i) =>
              podcast ? <PodcastCard key={podcast.id || i} podcast={podcast} /> : null
            )}
          </div>

          <div className="mobile-podcast-container md:hidden relative z-0 mt-3">
            {displayPodcasts.map((podcast, i) =>
              podcast ? <MobilePodcastCard key={podcast.id || i} podcast={podcast} /> : null
            )}
          </div>
        </div>
      )}
    </div>
  )
}