"use client"

import { useState, useEffect } from "react"
import PodcastCard from "@/components/podcast-card"
import MobilePodcastCard from "@/components/mobile-podcast-card"
import PodcastForm from "@/components/podcast-form"

export default function Home() {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch podcasts from the backend
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/podcasts")
        const data = await response.json()
        setPodcasts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching podcasts:", error)
        setLoading(false)
      }
    }
    fetchPodcasts()
  }, [])

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-white">Welcome to ListenMode</h1>

      {/* Podcast Upload Form */}
      <div className="mb-8">
        <PodcastForm />
      </div>

      {/* Podcasts List */}
      <h2 className="mb-4 text-2xl font-semibold text-white">Latest Podcasts</h2>
      {loading ? (
        <p className="text-gray-400">Loading podcasts...</p>
      ) : podcasts.length === 0 ? (
        <p className="text-gray-400">No podcasts available.</p>
      ) : (
        <div>
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {podcasts.map((podcast) => (
              <MobilePodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
