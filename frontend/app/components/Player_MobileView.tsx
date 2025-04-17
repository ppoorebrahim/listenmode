"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronUp, Play, Pause, X } from "lucide-react";
import Image from "next/image";

interface AudioPlayerProps {
  title: string;
  show: string;
  duration: string;
  thumbnailUrl: string;
  audioUrl: string;
  onClose?: () => void;
}

export default function Player_MobileView({
  title = "Sample Podcast Title",
  show = "Sample Channel",
  duration = "45:23",
  thumbnailUrl = "/simple-placeholder.svg?height=54&width=54",
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  onClose,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setTotalDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * (totalDuration || 0);

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="md:hidden bg-[#1A1A1A] text-[#F5F5F5] z-[100] border-t border-[#343434]">
      <audio ref={audioRef} src={audioUrl} className="hidden" />

      {/* Main player - fixed height of 56px */}
      <div className="h-[56px] flex items-center px-2">
        {/* Chevron on the left */}
        <button className="text-[#F5F5F5] hover:text-[#4639B3] mr-2">
          <ChevronUp className="h-5 w-5" />
        </button>

        {/* Thumbnail - 54x54px with 3% border radius */}
        <div
          className="relative h-[54px] w-[54px] flex-shrink-0 mr-3 cursor-pointer overflow-hidden rounded-[3%]"
          onClick={togglePlay}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            width={54}
            height={54}
            className="object-cover"
          />
          {/* Play/Pause icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="h-6 w-6 text-[#F5F5F5] bg-[#0A0A0A]/30 p-1 rounded-full" />
            ) : (
              <Play className="h-6 w-6 text-[#F5F5F5] bg-[#0A0A0A]/30 p-1 rounded-full" />
            )}
          </div>
        </div>

        {/* Text content */}
        <div
          className="flex-1 min-w-0 cursor-pointer flex flex-col justify-center"
          onClick={togglePlay}
        >
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <p className="text-xs text-[#F5F5F5] opacity-75 truncate">{show}</p>
        </div>

        {/* Duration and close button */}
        <div className="flex items-center">
          <span className="text-sm text-[#F5F5F5] mr-2 pl-6">{duration}</span>
          <button
            onClick={handleClose}
            className="p-2 text-[#F5F5F5] hover:text-[#4639B3]"
            aria-label="Close player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progress bar - 2px height, no circle handle */}
      <div
        ref={progressRef}
        className="w-full h-[2px] bg-[#343434] cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[#4639B3]"
          style={{ width: `${(currentTime / (totalDuration || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}