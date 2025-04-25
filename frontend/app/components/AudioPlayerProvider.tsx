"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react"

interface AudioContextProps {
  audioUrl: string
  title: string
  show: string
  duration: string
  thumbnailUrl: string
}

interface AudioPlayerContextType {
  audio: AudioContextProps | null
  setAudio: (audio: AudioContextProps | null) => void
  isVisible: boolean
  showPlayer: () => void
  hidePlayer: () => void
  togglePlay: () => void
  audioRef: React.RefObject<HTMLAudioElement>
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [audio, _setAudio] = useState<AudioContextProps | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const showPlayer = () => setIsVisible(true)

  const hidePlayer = () => {
    setIsVisible(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play()
    } else {
      el.pause()
    }
  }

  const setAudio = (audioData: AudioContextProps | null) => {
    _setAudio(audioData)
    if (audioData) {
      setIsVisible(true) // نمایش پلیر هنگام ست کردن صدا
    }
  }

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onEnded = () => {
      _setAudio(null)
      setIsVisible(false)
    }

    el.addEventListener("ended", onEnded)
    return () => {
      el.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <AudioPlayerContext.Provider
      value={{ audio, setAudio, isVisible, showPlayer, hidePlayer, togglePlay, audioRef }}
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
