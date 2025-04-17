"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  VolumeX,
  X,
  Rewind,
  FastForward,
} from "lucide-react";

const playbackRates = [0.5, 1, 1.5, 2];

interface AudioPlayerProps {
  src: string;
  title: string;
  podcastName: string;
  onClose?: () => void;
}

export default function AudioPlayer({
  src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  title = "Sample Podcast Title",
  podcastName = "Sample Channel",
  onClose,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [rateIndex, setRateIndex] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
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

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const togglePlaybackRate = () => {
    const nextIndex = (rateIndex + 1) % playbackRates.length;
    setRateIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRates[nextIndex];
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * (duration || 0);

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const nextEpisode = () => {
    console.log("Next episode");
  };

  const previousEpisode = () => {
    console.log("Previous episode");
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 5, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="hidden md:flex fixed bottom-0 left-0 right-0 h-[80px] bg-[#1A1A1A] text-[#F5F5F5] shadow-lg p-2 items-center gap-4">
      {/* Image and Title Section */}
      <div className="flex items-center gap-3">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-xl"
        >
          <rect width="64" height="64" fill="#272727" rx="8" />
          <circle cx="32" cy="32" r="16" fill="#4639B3" />
        </svg>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold truncate" style={{ marginTop: "-4px" }}>
            {title}
          </h2>
          <p className="text-xs text-[#F5F5F5] opacity-75 truncate">{podcastName}</p>
        </div>
      </div>

      {/* Playback Controls and Progress Bar - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={previousEpisode}
            className="p-2 hover:bg-[#4639B3] rounded-full"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={skipBackward}
            className="p-2 hover:bg-[#4639B3] rounded-full"
          >
            <Rewind size={20} />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-2 hover:bg-[#4639B3] rounded-full"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={skipForward}
            className="p-2 hover:bg-[#4639B3] rounded-full"
          >
            <FastForward size={20} />
          </button>
          <button
            onClick={nextEpisode}
            className="p-2 hover:bg-[#4639B3] rounded-full"
          >
            <SkipForward size={20} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 w-full max-w-2xl mt-1">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            className="w-64 lg:w-96 h-2 bg-[#343434] cursor-pointer rounded"
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

      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlaybackRate}
          className="text-xs border border-[#343434] rounded px-2 py-1 hover:bg-[#4639B3] hidden lg:block"
        >
          {playbackRates[rateIndex]}x
        </button>

        <div className="hidden lg:flex items-center gap-2 w-24">
          {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#4639B3] hover:accent-[#4639B3]"
          />
        </div>

        <button className="hover:text-[#4639B3]">
          <Heart size={20} />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#4639B3] rounded-full"
            aria-label="Close player"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}