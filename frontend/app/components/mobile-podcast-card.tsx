"use client"

import { Heart, MessageSquare, Play, Bookmark, Clock } from 'lucide-react'

export default function MobilePodcastCard({ podcast }) {
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

  return (
    <div className="mb-5 border-b border-gray-800 pb-5">
      <div className="flex">
        <div className="relative mr-4 h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={thumbnail || "/placeholder.svg?height=112&width=112"} 
            alt={title} 
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/80 text-white">
              <Play className="h-6 w-6" fill="white" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-sm font-medium text-white">{title}</h3>

          <div className="mb-3 flex items-center">
            <span className="text-xs text-gray-400">{channel}</span>
          </div>
        </div>

        <button className="ml-2 self-start text-gray-400">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="h-3.5 w-3.5" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">{timeAgo}</div>
      </div>
    </div>
  )
}