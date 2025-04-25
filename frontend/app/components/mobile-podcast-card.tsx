"use client"

import { useState } from "react"
import { Heart, MessageSquare, Play, Bookmark, Clock } from "lucide-react"
import { useAudioPlayer } from "@/components/AudioPlayerProvider"

export default function MobilePodcastCard({ podcast }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const { setAudio, showPlayer } = useAudioPlayer() // ✅ اضافه کردن showPlayer

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
    file_url,
  } = podcast

  const handlePlay = () => {
    if (!file_url) {
      console.warn("No audio file_url found", { podcast }); // ✅ دیباگ
      return;
    }
    console.log("Playing podcast with file_url:", file_url); // ✅ دیباگ
    setAudio({
      audioUrl: file_url,
      title: title,
      show: channel,
      duration: duration,
      thumbnailUrl: thumbnail || "/placeholder.svg",
    })
    showPlayer(); // ✅ فراخوانی showPlayer برای اطمینان از نمایش پلیر
  }

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="mb-5 border-b border-[#272727] pb-[0.9rem]">
      <div className="flex ml-[2px]">
        <div className="relative mt-[-4px] mr-0 h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4639B3]/30 text-white backdrop-blur-md shadow-md"
            >
              <Play className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col pl-[12px] pb-1">
          <h3 className="mb-[10px] line-clamp-2 text-sm font-medium text-white relative left-[-2px]">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-14 relative left-[-2px]">
            <div className="h-6 w-6 rounded-full bg-gray-600" />
            <span className="text-xs text-gray-400">{channel}</span>
          </div>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`ml-2 self-start ${bookmarked ? "text-[#33AAA4]" : "text-gray-400"}`}
        >
          <Bookmark className="h-6 w-6" fill={bookmarked ? "#F5F5F5" : "none"} />
        </button>
      </div>

      <div className="mt-4 ml-[-2px] flex items-center justify-between px-1 text-sm text-gray-400">
        <div className="flex items-center gap-6">
          <button onClick={toggleLike} className="flex items-center gap-1 hover:text-[#4639B3]">
            <Heart className="h-5 w-5" fill={liked ? "red" : "none"} />
            <span>{Math.min(likes, 99)}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span>{Math.min(comments, 99)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="h-5 w-5" />
            <span>{Math.min(views, 99)}</span>
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