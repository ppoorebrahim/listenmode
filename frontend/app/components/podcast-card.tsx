"use client"

import { Heart, MessageSquare, Play, Bookmark } from 'lucide-react'

export default function PodcastCard({ podcast }) {
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
    <div className="mb-4 overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800">
      <div className="relative aspect-square">
        <img 
          src={thumbnail || "/placeholder.svg?height=200&width=200"} 
          alt={title} 
          className="h-full w-full object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/80 text-white transition-transform hover:scale-105 hover:bg-purple-600">
            <Play className="h-8 w-8" fill="white" />
          </button>
        </div>
        <button className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70">
          <Bookmark className="h-5 w-5" />
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
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{likes}</span>
            </div>
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