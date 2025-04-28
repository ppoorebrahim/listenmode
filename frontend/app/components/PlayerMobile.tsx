// frontend/components/PlayerMobile.tsx

"use client";

import { useAudioPlayer } from "@/components/AudioPlayerProvider";
import PlayPauseButton from "@/components/PlayPauseButton";
import { usePlayButtonSize } from "@/hooks/usePlayButtonSize";
import { ChevronUp, ChevronDown, X, Share2, Download, Heart, MessageCircle, RotateCw, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface PlayerMobileProps {
  audioUrl: string;
  title: string;
  show: string;
  thumbnailUrl: string;
}

export default function PlayerMobile({
  audioUrl,
  title,
  show,
  thumbnailUrl,
}: PlayerMobileProps) {
  const { audioRef, playing, togglePlay, hidePlayer } = useAudioPlayer();
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const progressRef = useRef<HTMLDivElement>(null);

  const miniButtonSize = usePlayButtonSize("mini", 20);
  const fullButtonSize = usePlayButtonSize("fullscreen", 64);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const click = (e.clientX - rect.left) / rect.width;
    const duration = audioRef.current.duration || 1;
    audioRef.current.currentTime = click * duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleSpeed = () => {
    setPlaybackRate(prev => {
      const next = prev === 2 ? 1 : prev + 0.5;
      if (audioRef.current) {
        audioRef.current.playbackRate = next;
      }
      return next;
    });
  };

  const currentTime = audioRef.current?.currentTime || 0;
  const duration = audioRef.current?.duration || 0;

  return (
    <>
      {!isExpanded ? (
        <div className="fixed bottom-[56px] left-0 right-0 z-50 flex items-center bg-[#1A1A1A] h-[64px] p-0 md:hidden">
          <audio ref={audioRef} hidden />

          <button onClick={() => setIsExpanded(true)} className="p-2">
            <ChevronUp size={18} className="text-white" />
          </button>

          <div className="relative flex-1 flex items-center gap-2 mx-0 overflow-hidden">
            <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 ml-1">
              <Image
                src={thumbnailUrl || "/placeholder.svg"}
                alt="cover"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <PlayPauseButton isPlaying={playing} onToggle={togglePlay} size={miniButtonSize} />
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee text-xs font-semibold text-white">
                {title}
              </div>
              <div className="mt-[2px] text-[10px] text-zinc-400 truncate">{show}</div>
            </div>
          </div>

          <span className="text-xs w-12 text-center text-white p-2 mr-0">
            {formatTime(currentTime)}
          </span>

          <button onClick={hidePlayer} className="p-2 ml-0">
            <X size={18} className="text-white" />
          </button>

          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#343434] cursor-pointer"
          >
            <div
              className="h-full bg-[#4639B3]"
              style={{ width: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#272727] md:hidden">
          <audio ref={audioRef} hidden />

          <div className="flex items-center justify-between p-4">
            <button onClick={() => setIsExpanded(false)}>
              <ChevronDown size={24} className="text-white" />
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2">
                <Share2 size={20} className="text-white" />
              </button>
              <button onClick={hidePlayer} className="p-0">
                <X size={24} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-[75vw] h-[75vw] max-w-[300px] max-h-[300px] mt-0 rounded-lg overflow-hidden">
              <Image
                src={thumbnailUrl || "/placeholder.svg"}
                alt="cover"
                fill
                className="object-cover brightness-75"
              />
            </div>

            <div className="text-center mt-6 mb-6">
              <div className="text-base text-white font-bold truncate">{title}</div>
              <div className="text-sm text-gray-400 mt-[2px]">{show}</div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-6 mb-6">
              <div className="flex flex-col items-center">
                <button onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime -= 5;
                }}>
                  <RotateCcw size={24} className="text-white" />
                </button>
                <span className="text-[10px] text-white mt-1">5s</span>
              </div>

              <PlayPauseButton isPlaying={playing} onToggle={togglePlay} size={fullButtonSize} />

              <div className="flex flex-col items-center">
                <button onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime += 15;
                }}>
                  <RotateCw size={24} className="text-white" />
                </button>
                <span className="text-[10px] text-white mt-1">15s</span>
              </div>
            </div>

            <div className="px-6 w-full">
              <div className="flex flex-col items-center">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="relative w-full h-[6px] bg-[#343434] rounded cursor-pointer mb-2"
                >
                  <div
                    className="h-full bg-[#4639B3] rounded"
                    style={{ width: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
                  />
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2"
                    style={{ left: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 mb-6">
              <button className="p-2 w-10 h-10 bg-[#343434] rounded-full flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </button>
              <button className="p-2 w-10 h-10 bg-[#343434] rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </button>
              <button className="p-2 w-10 h-10 bg-[#343434] rounded-full flex items-center justify-center">
                <Download size={20} className="text-white" />
              </button>
              <button onClick={toggleSpeed} className="p-2 w-10 h-10 bg-[#343434] rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{playbackRate}x</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}