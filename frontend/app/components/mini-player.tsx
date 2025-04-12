"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

export default function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 mx-4 mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 md:bottom-0 md:mx-0 md:mb-0 md:ml-64">
      <div className="flex items-center">
        <img
          src="/placeholder.svg"
          alt="Podcast thumbnail"
          width={40}
          height={40}
          className="mr-3 h-10 w-10 rounded-md"
        />
        <div>
          <h3 className="text-sm font-medium text-white">Podcast Title</h3>
          <p className="text-xs text-gray-400">Podcast Author</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Skip backward"
          className="text-gray-400 hover:text-white"
        >
          <SkipBack className="h-6 w-6" />
        </button>
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        <button
          aria-label="Skip forward"
          className="text-gray-400 hover:text-white"
        >
          <SkipForward className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}