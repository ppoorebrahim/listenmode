"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronUp,
  ChevronDown,
  Heart,
  Play,
  Pause,
  X,
  Rewind,
  FastForward,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { useAudioPlayer } from "@/components/AudioPlayerProvider"
import Image from "next/image"

export default function Player_MobileView() {
  const {
    audioUrl,
    title,
    show,
    duration: durationFromContext,
    thumbnailUrl,
    isPlaying,
    togglePlay,
    visible,
    closePlayer,
  } = useAudioPlayer()

  const [isExpanded, setIsExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rateIndex, setRateIndex] = useState(1)
  const playbackRates = [0.5, 1, 1.5, 2]
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!audioUrl) {
      console.log("No audio URL provided");
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const update = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setCurrentTime(0);
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);

    audio.play().catch((err) => {
      console.error("Audio play error:", err);
    });

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
    };
  }, [audioUrl]);

  const togglePlaybackRate = () => {
    const nextIndex = (rateIndex + 1) % playbackRates.length;
    setRateIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRates[nextIndex];
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      let next = audioRef.current.currentTime + seconds;
      if (next < 0) next = 0;
      if (next > duration) next = duration;
      audioRef.current.currentTime = next;
      setCurrentTime(next);
    }
  };

  const handlePreviousTrack = () => {
    console.log("Previous track clicked");
  };

  const handleNextTrack = () => {
    console.log("Next track clicked");
  };

  if (!visible) return null;

  return (
    <>
      {!isExpanded ? (
        <>
          {console.log("Rendering minimized player")}
          <div className="fixed bottom-[56px] left-0 right-0 z-[60] bg-[#1A1A1A] text-[#F5F5F5] md:hidden">
            <audio src={audioUrl} autoPlay preload="metadata" />

            <div className="h-[64px] flex items-center justify-between px-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <button
                  onClick={() => {
                    console.log("ChevronUp clicked, setting isExpanded to true");
                    setIsExpanded(true);
                  }}
                  className="text-white hover:text-[#4639B3]"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <div className="relative h-[54px] w-[54px] overflow-hidden rounded-[6px]">
                  <Image
                    src={thumbnailUrl || "/placeholder.svg"}
                    alt={title}
                    width={54}
                    height={54}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="text-white bg-black/30 rounded-full p-1"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{title}</span>
                  <span className="text-xs text-gray-400 truncate">{show}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs">{durationFromContext || formatTime(duration)}</span>
                <button
                  onClick={closePlayer}
                  className="text-white hover:text-[#A83339]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={progressRef}
              className="h-[2px] bg-[#343434] w-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-[#4639B3]"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {console.log("Rendering full-screen player")}
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#1A1A1A]">
            <audio src={audioUrl} autoPlay preload="metadata" />
            <div className="absolute top-4 left-4 z-50">
              <button onClick={() => setIsExpanded(false)} className="text-white">
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>

            <div className="relative flex flex-col items-center h-full">
              <div className="absolute top-[15%] flex flex-col items-center">
                <div className="relative mx-auto aspect-square w-[63vw] max-w-[63vw] max-h-[63vw] mb-2 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg"
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold mb-1">{title}</h2>
                  <p className="text-sm text-gray-400">{show}</p>
                </div>
              </div>

              <div className="absolute bottom-[24%] flex flex-col items-center w-full">
                <div className="flex justify-center items-center mb-8 w-full gap-8 text-gray-300">
                  <button className="flex items-center" style={{ padding: 0, margin: 0, lineHeight: 1 }}>
                    <Heart className="h-6 w-6" fill={liked ? "red" : "none"} />
                  </button>
                  <button className="flex items-center" style={{ padding: 0, margin: 0, lineHeight: 1 }}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </button>
                  <button className="flex items-center" style={{ padding: 0, margin: 0, lineHeight: 1 }}>
                    <Play className="h-6 w-6" />
                  </button>
                  <button onClick={togglePlaybackRate} className="flex items-center" style={{ padding: 0, margin: 0, lineHeight: 1 }}>
                    <span style={{ width: "24px", height: "24px", fontSize: "16px", lineHeight: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>{playbackRates[rateIndex]}x</span>
                  </button>
                  <button className="flex items-center" style={{ padding: 0, margin: 0, lineHeight: 1 }}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="absolute bottom-[5%] flex flex-col items-center w-full">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={handlePreviousTrack}
                    className="flex flex-col items-center"
                  >
                    <SkipBack className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => skip(-15)}
                    className="flex flex-col items-center"
                  >
                    <Rewind className="h-6 w-6" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="h-14 w-14 rounded-full bg-[#4639B3] flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => skip(10)}
                    className="flex flex-col items-center"
                  >
                    <FastForward className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextTrack}
                    className="flex flex-col items-center"
                  >
                    <SkipForward className="h-6 w-6" />
                  </button>
                </div>

                <div
                  ref={progressRef}
                  className="relative h-[6px] bg-[#343434] w-5/6 cursor-pointer rounded-full mb-2"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-[#4639B3] rounded-full"
                    style={{
                      width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#4639B3] rounded-full"
                    style={{
                      left: duration ? `calc(${(currentTime / duration) * 100}% - 8px)` : "0%",
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 w-5/6">
                  <span className="text-xs">{formatTime(currentTime)}</span>
                  <div className="flex-1" />
                  <span className="text-xs">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}