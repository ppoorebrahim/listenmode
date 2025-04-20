"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"

interface AudioPlayerContextType {
  audioUrl: string
  title: string
  show: string
  duration: string
  thumbnailUrl: string
  isPlaying: boolean
  setAudio: (audio: {
    audioUrl: string
    title: string
    show: string
    duration: string
    thumbnailUrl: string
  }) => void
  togglePlay: () => void
  stop: () => void
  visible: boolean
  closePlayer: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [audioUrl, setAudioUrl] = useState("")
  const [title, setTitle] = useState("")
  const [show, setShow] = useState("")
  const [duration, setDuration] = useState("0:00")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audioRef.current = audio
      audio.addEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const setAudio = ({
    audioUrl,
    title,
    show,
    duration,
    thumbnailUrl,
  }: {
    audioUrl: string
    title: string
    show: string
    duration: string
    thumbnailUrl: string
  }) => {
    setAudioUrl(audioUrl)
    setTitle(title)
    setShow(show)
    setDuration(duration)
    setThumbnailUrl(thumbnailUrl)
    setVisible(true)
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play().catch((err) => console.error("Playback error:", err))
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => console.error("Playback error:", err))
    }
    setIsPlaying(!isPlaying)
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  const closePlayer = () => {
    stop()
    setVisible(false)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        audioUrl,
        title,
        show,
        duration,
        thumbnailUrl,
        isPlaying,
        setAudio,
        togglePlay,
        stop,
        visible,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) throw new Error("useAudioPlayer must be used within AudioPlayerProvider")
  return context
}
