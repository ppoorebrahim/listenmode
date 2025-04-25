"use client"

import PodcastCard from "../components/podcast-card"

const mockPodcast = {
  id: "123",
  title: "Mock Podcast Title",
  file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // تست صوت آنلاین
  thumbnail: "/placeholder.svg",
  duration: "15:30",
  channel: "Mock Channel",
  channelAvatar: "/placeholder.svg",
  likes: 45,
  comments: 12,
  views: 87,
  timeAgo: "3 hours ago",
}

export default function MockPlayTestPage() {
  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">🎧 تست نمایش پلیر دسکتاپ</h1>
      <PodcastCard podcast={mockPodcast} />
    </div>
  )
}
