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
        const response = await fetch("/api/podcasts")
        const data = await response.json()
        const transformedData = data.map(podcast => ({
          id: podcast.id,
          title: podcast.title,
          channel: podcast.author || "Unknown",
          channelAvatar: "/placeholder.svg",
          thumbnail: "/placeholder.svg",
          duration: podcast.duration || "Unknown",
          likes: podcast.likes || 0,
          comments: podcast.comments || 0,
          views: 0,
          timeAgo: "Unknown",
        }))
        setPodcasts(transformedData.slice(0, 15))
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
    likes: 100,
    comments: 20,
    views: 1000,
    timeAgo: "Today",
  }))

  if (!isMounted) {
    return (
      <div className="podcast-container px-3 pb-6 pt-3 bg-transparent isolate">
        <p className="text-gray-400">Loading podcasts...</p>
      </div>
    )
  }

  const displayPodcasts = podcasts.length > 0 ? podcasts : mockPodcasts

  return (
    <div className="podcast-container px-3 pb-6 pt-3 bg-transparent isolate">
      {loading ? (
        <p className="text-gray-400">Loading podcasts...</p>
      ) : displayPodcasts.length === 0 ? (
        <p className="text-gray-400">No podcasts available.</p>
      ) : (
        <div>
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {displayPodcasts.map((podcast, i) =>
              podcast ? <PodcastCard key={podcast.id || i} podcast={podcast} /> : null
            )}
          </div>

          <div className="mobile-podcast-container md:hidden">
            {displayPodcasts.map((podcast, i) =>
              podcast ? <MobilePodcastCard key={podcast.id || i} podcast={podcast} /> : null
            )}
          </div>
        </div>
      )}
    </div>
  )
}
