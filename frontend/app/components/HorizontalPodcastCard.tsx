"use client"

import { useState } from "react"
import { Heart, MessageSquare, Bookmark, Play, Clock3 } from "lucide-react"

interface Podcast {
  id: number
  title: string
  channel: string
  channelAvatar: string
  thumbnail: string
  duration: string
  likes: number
  comments: number
  views: number
  timeAgo: string
  file_url: string
  date: string
}

export default function HorizontalPodcastCard({ podcast }: { podcast: Podcast }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="w-full bg-[#1A1A1A] rounded-lg flex flex-col md:flex-row md:items-start items-center px-0 mb-4 mx-auto relative overflow-hidden">
      <div className="relative flex shrink-0 w-full md:w-[230px] md:h-[230px] h-auto aspect-square">
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <button className="bg-[#4639B3] p-4 rounded-full">
            <Play className="h-8 w-8" fill="white" />
          </button>
        </div>
      </div>

      <div className="ml-[0.75rem] flex flex-col flex-grow md:h-full h-auto pr-4 relative w-full max-w-[432px] md:max-w-none">
        <div className="absolute top-[14px] right-2">
          <Bookmark
            size={18}
            className={`cursor-pointer ${bookmarked ? "text-purple-500" : "text-white"}`}
            onClick={() => setBookmarked(!bookmarked)}
          />
        </div>

        <h3 className="text-lg font-semibold text-white line-clamp-2 mt-[0.75rem]">
          {podcast.title}
        </h3>

        <div className="flex items-center gap-2 mt-4">
          <img src={podcast.channelAvatar} alt="avatar" className="w-6 h-6 rounded-full" />
          <span className="text-xs text-zinc-400">{podcast.channel}</span>
        </div>

        <div className="flex items-center gap-[12px] text-sm text-zinc-400 mt-[7.5rem] pb-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Heart
              size={16}
              fill={liked ? "red" : "none"}
              onClick={() => setLiked(!liked)}
              className="cursor-pointer"
            />
            <span>{podcast.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>{podcast.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Play size={16} />
            <span>{podcast.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock3 size={16} />
            <span>{podcast.duration}</span>
          </div>

          <div className="ml-auto text-xs text-zinc-500">{podcast.date}</div>
        </div>
      </div>
    </div>
  )
}
