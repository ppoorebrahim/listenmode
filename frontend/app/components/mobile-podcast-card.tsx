"use client"

import { useState } from "react"
import { Heart, MessageSquare, Play, Bookmark, Clock } from "lucide-react"
import { useAudioPlayer } from "@/components/AudioPlayerProvider"

export default function MobilePodcastCard({ podcast }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const { setAudio } = useAudioPlayer()

  const {
    id,
    title,
    channel,
    channelAvatar,
    thumbnail,
    duration,
    likes,
    comments,
    views,
    timeAgo,
  } = podcast

  const handlePlay = () => {
    setAudio({
      audioUrl: podcast.file_url || "",
      title: title,
      show: channel,
      duration: duration,
      thumbnailUrl: thumbnail || "/placeholder.svg",
    })
  }

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="mb-5 border-b border-[#272727] pb-6">
      <div className="flex">
        <div className="relative mr-4 h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4639B3]/80 text-white"
            >
              <Play className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-sm font-medium text-white">{title}</h3>
          <div className="mb-3 flex items-center">
            <span className="text-xs text-gray-400">{channel}</span>
          </div>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`ml-2 self-start ${bookmarked ? "text-[#33AAA4]" : "text-gray-400"}`}
        >
          <Bookmark className="h-5 w-5" fill={bookmarked ? "#F5F5F5" : "none"} />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between px-1 text-sm text-gray-400">
        <div className="flex items-center space-x-5">
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 hover:text-[#4639B3]"
          >
            <Heart className="h-5 w-5" fill={liked ? "red" : "none"} />
            <span>{likes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="h-5 w-5" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-5 w-5" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">{timeAgo}</div>
      </div>
    </div>
  )
}
