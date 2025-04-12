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
        const data = await response.json()
        const transformedData = data.map(podcast => ({
          id: podcast.id,
          title: podcast.title,
          channel: podcast.author || "Unknown",
          channelAvatar: "/placeholder.svg?height=32&width=32",
          thumbnail: "/placeholder.svg?height=200&width=200",
          duration: podcast.duration || "Unknown",
          likes: podcast.likes || 0,
          comments: podcast.comments || 0,
          views: 0,
          timeAgo: "Unknown",
        }))
        setPodcasts(transformedData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching podcasts:", error)
        setPodcasts(mockPodcasts)
        setLoading(false)
      }
    }
    fetchPodcasts()
  }, [])

  const mockPodcasts = [
    {
      id: 1,
      title: "The Joe Rogan Experience #1234",
      channel: "Joe Rogan",
      channelAvatar: "/placeholder.svg?height=32&width=32",
      thumbnail: "/placeholder.svg?height=200&width=200",
      duration: "2:45:30",
      likes: 1200,
      comments: 340,
      views: 15000,
      timeAgo: "2 days ago",
    },
    {
      id: 2,
      title: "Lex Fridman Podcast #567",
      channel: "Lex Fridman",
      channelAvatar: "/placeholder.svg?height=32&width=32",
      thumbnail: "/placeholder.svg?height=200&width=200",
      duration: "1:30:00",
      likes: 800,
      comments: 200,
      views: 10000,
      timeAgo: "1 week ago",
    },
  ]

  if (!isMounted) {
    return (
      <div className="podcast-container px-4 py-6">
        <p className="text-gray-400">Loading podcasts...</p>
      </div>
    )
  }

  const displayPodcasts = podcasts.length > 0 ? podcasts : mockPodcasts

  return (
    <div className="podcast-container px-4 py-6">
      {loading ? (
        <p className="text-gray-400">Loading podcasts...</p>
      ) : displayPodcasts.length === 0 ? (
        <p className="text-gray-400">No podcasts available.</p>
      ) : (
        <div>
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
          
          <div className="mobile-podcast-container md:hidden">
            {displayPodcasts.map((podcast) => (
              <MobilePodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}