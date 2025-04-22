"use client"

import { useState } from "react"
import { Heart, MessageSquare, Play, Bookmark } from "lucide-react"
import { useAudioPlayer } from "@/components/AudioPlayerProvider"

interface Podcast {
  id: string;
  title: string;
  file_url: string;
  thumbnail?: string;
  duration: string;
  channel: string;
  channelAvatar?: string;
  likes: number;
  comments: number;
  views: number;
  timeAgo: string;
}

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
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

  return (
    <div className="mb-4 overflow-hidden rounded-lg bg-[#1A1A1A] hover:bg-[#272727] transition-colors">
      <div className="relative aspect-square">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4639B3]/80 text-white transition-transform hover:scale-105 hover:bg-[#4639B3]"
          >
            <Play className="h-8 w-8" fill="white" />
          </button>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`absolute top-2 right-2 rounded-full p-1.5 transition-colors ${
            bookmarked ? "bg-[#33AAA4]" : "bg-black/50"
          } text-white hover:bg-black/70`}
        >
          <Bookmark className="h-5 w-5" fill={bookmarked ? "#F5F5F5" : "none"} />
        </button>
        <div className="absolute bottom-3 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
          {duration}
        </div>
      </div>

      <div className="p-3">
        <h3 className="mb-2 line-clamp-2 text-base font-medium text-white">{title}</h3>
        <div className="mb-3 flex items-center">
          <span className="text-sm text-gray-400">{channel}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1 hover:text-[#4639B3]"
            >
              <Heart className="h-4 w-4" fill={liked ? "red" : "none"} />
              <span>{likes}</span>
            </button>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Play className="h-4 w-4" />
              <span>{views}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">{timeAgo}</div>
        </div>
      </div>
    </div>
  )
}
