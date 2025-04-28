"use client";

import { useEffect, useRef, useState } from "react";
import { Rewind, FastForward, Heart, Volume2, VolumeX, X } from "lucide-react";
import { useAudioPlayer } from "@/components/AudioPlayerProvider";
import PlayPauseButton from "@/components/PlayPauseButton";
import Image from "next/image";

const playbackRates = [0.5, 1, 1.5, 2];

export default function AudioPlayer() {
  const { audio, isVisible, hidePlayer, audioRef, playing } = useAudioPlayer();
  const progressRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(1);
  const [rateIndex, setRateIndex] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const updateTime = () => {
      setCurrentTime(el.currentTime);
    };

    const updateDuration = () => {
      console.log("⏳ metadata loaded, setting local duration", el.duration);
      setLocalDuration(el.duration || 0);
    };

    const onEnd = () => {
      setCurrentTime(0);
    };

    el.addEventListener("timeupdate", updateTime);
    el.addEventListener("loadedmetadata", updateDuration);
    el.addEventListener("ended", onEnd);

    return () => {
      el.removeEventListener("timeupdate", updateTime);
      el.removeEventListener("loadedmetadata", updateDuration);
      el.removeEventListener("ended", onEnd);
    };
  }, [audioRef, audio?.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  if (!isVisible || !audio) return null;

  const togglePlaybackRate = () => {
    const next = (rateIndex + 1) % playbackRates.length;
    setRateIndex(next);
    if (audioRef.current) audioRef.current.playbackRate = playbackRates[next];
  };

  const handleVolumeChange = (e: any) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const handleProgressClick = (e: any) => {
    if (!progressRef.current || !audioRef.current || !localDuration || isNaN(localDuration)) return;

    const rect = progressRef.current.getBoundingClientRect();
    const click = (e.clientX - rect.left) / rect.width;
    const newTime = Math.min(Math.max(click * localDuration, 0), localDuration);

    if (!isNaN(newTime) && isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const t = Math.min(audioRef.current.currentTime + 15, localDuration);
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const t = Math.max(audioRef.current.currentTime - 5, 0);
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
      <div className="md:fixed md:bottom-0 md:left-0 md:right-0 md:z-50 bg-[#1A1A1A] text-[#F5F5F5]">{/* Audio Element */}
      {isClient && <audio ref={audioRef} preload="metadata" />}

      <div className="flex h-[80px] items-center justify-between px-3 md:px-4 shadow-lg">
        {/* Episode Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#272727] rounded-xl overflow-hidden">
            <Image
              src={audio.thumbnailUrl || "/placeholder.svg"}
              alt="Episode cover"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="hidden md:flex flex-col overflow-hidden">
            <h3 className="text-xs md:text-sm font-semibold truncate animate-scrollText">{audio.title}</h3>
            <span className="text-[10px] md:text-xs text-gray-400">{audio.show}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center flex-1 px-2 md:px-4">
          <div className="flex items-center gap-2 md:gap-3 mb-1">
            <button onClick={skipBackward} className="p-1 md:p-2 hover:bg-[#4639B3] rounded-full">
              <Rewind size={20} />
            </button>
            <PlayPauseButton size={48} />
            <button onClick={skipForward} className="p-1 md:p-2 hover:bg-[#4639B3] rounded-full">
              <FastForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-[500px]">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div
              ref={progressRef}
              className="flex-1 h-[6px] bg-[#343434] cursor-pointer rounded"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-[#4639B3] rounded"
                style={{ width: `${(currentTime / (localDuration || 1)) * 100}%` }}
              />
            </div>
            <span className="text-xs">-{formatTime(localDuration - currentTime)}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
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
          <button onClick={hidePlayer} className="p-1 md:p-2 hover:bg-[#4639B3] rounded-full">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
