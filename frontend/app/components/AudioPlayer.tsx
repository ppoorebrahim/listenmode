"use client"

import { useEffect, useRef, useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Heart,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"
import { useAudioPlayer } from "@/components/AudioPlayerProvider"

const playbackRates = [0.5, 1, 1.5, 2]

export default function AudioPlayer() {
  const {
    audio,
    isVisible,
    hidePlayer,
    audioRef,
  } = useAudioPlayer()

  // ✅ دیباگ وضعیت نمایش پلیر
  console.log("AudioPlayer DEBUG => isVisible:", isVisible, "audio:", audio)

  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [rateIndex, setRateIndex] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return
    const update = () => setCurrentTime(audioEl.currentTime)
    const onEnd = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    audioEl.addEventListener("timeupdate", update)
    audioEl.addEventListener("durationchange", () => setDuration(audioEl.duration))
    audioEl.addEventListener("ended", onEnd)
    return () => {
      audioEl.removeEventListener("timeupdate", update)
      audioEl.removeEventListener("durationchange", () => {})
      audioEl.removeEventListener("ended", onEnd)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current && audio?.audioUrl) {
      audioRef.current.src = audio.audioUrl
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [audio?.audioUrl])

  // ✅ شرط نمایش پلیر
  if (!isVisible || !audio?.audioUrl) return null

  const togglePlayPause = () => {
    if (!audioRef.current) return
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const togglePlaybackRate = () => {
    const next = (rateIndex + 1) % playbackRates.length
    setRateIndex(next)
    if (audioRef.current) audioRef.current.playbackRate = playbackRates[next]
  }

  const handleVolumeChange = e => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    setIsMuted(v === 0)
  }

  const handleProgressClick = e => {
    if (!progressRef.current || !audioRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const click = (e.clientX - rect.left) / rect.width
    const newTime = click * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skipForward = () => {
    if (audioRef.current) {
      const t = Math.min(audioRef.current.currentTime + 15, duration)
      audioRef.current.currentTime = t
      setCurrentTime(t)
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      const t = Math.max(audioRef.current.currentTime - 5, 0)
      audioRef.current.currentTime = t
      setCurrentTime(t)
    }
  }

  const formatTime = time => {
    if (!time || isNaN(time)) return "00:00"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="hidden md:flex fixed bottom-0 left-0 right-0 h-[80px] bg-[#1A1A1A] text-[#F5F5F5] shadow-lg px-4 items-center justify-between z-50">
      <audio ref={audioRef} preload="metadata" />
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#272727] rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 bg-[#4639B3] rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold truncate">{audio.title}</h3>
          <span className="text-xs text-gray-400 mt-1">{audio.show}</span>
        </div>
      </div>

      <div className="flex flex-col items-center flex-1 px-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={skipBackward} className="p-2 hover:bg-[#4639B3] rounded-full">
            <Rewind size={20} />
          </button>
          <button onClick={togglePlayPause} className="p-2 hover:bg-[#4639B3] rounded-full">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={skipForward} className="p-2 hover:bg-[#4639B3] rounded-full">
            <FastForward size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            className="flex-1 h-[6px] bg-[#343434] cursor-pointer rounded"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#4639B3] rounded"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={togglePlaybackRate} className="text-xs border border-[#343434] px-2 py-1 rounded hover:bg-[#4639B3] hidden lg:block">
          {playbackRates[rateIndex]}x
        </button>
        <div className="hidden lg:flex items-center gap-2 w-24">
          <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#4639B3]">
            {volume > 0 && !isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#4639B3]"
          />
        </div>
        <button onClick={() => setLiked(!liked)} className="hover:text-[#4639B3]">
          <Heart size={20} fill={liked ? "red" : "none"} />
        </button>
        <button onClick={hidePlayer} className="p-2 hover:bg-[#4639B3] rounded-full" aria-label="Close player">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
