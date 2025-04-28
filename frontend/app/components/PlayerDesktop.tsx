"use client";

import { useAudioPlayer } from "@/components/AudioPlayerProvider";
import PlayPauseButton from "@/components/PlayPauseButton";
import { usePlayButtonSize } from "@/hooks/usePlayButtonSize";
import { RotateCcw, RotateCw, X, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface PlayerDesktopProps {
  audioUrl: string;
  title: string;
  show: string;
  thumbnailUrl: string;
}

export default function PlayerDesktop({
  audioUrl,
  title,
  show,
  thumbnailUrl,
}: PlayerDesktopProps) {
  const { audioRef, playing, togglePlay, hidePlayer } = useAudioPlayer();
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [showRemaining, setShowRemaining] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [dragging, setDragging] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const desktopButtonSize = usePlayButtonSize("default", 48);
  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    let frameId: number;
    const update = () => {
      if (audioRef.current && !dragging) {
        setCurrentTime(audioRef.current.currentTime);
      }
      frameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameId);
  }, [audioRef, dragging]);

  useEffect(() => {
    const lastPosition = localStorage.getItem("listenmode-last-position");
    if (audioRef.current && lastPosition) {
      audioRef.current.currentTime = parseFloat(lastPosition);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        localStorage.setItem("listenmode-last-position", audioRef.current.currentTime.toString());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate, audioRef]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const click = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = click * duration;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const time = Math.max(0, Math.min(position * duration, duration));
    setHoverTime(time);

    if (dragging && audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setDragging(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMuteToggle = () => {
    if (volume > 0 && !isMuted) {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    } else {
      setVolume(previousVolume || 1);
      setIsMuted(false);
    }
  };

  const toggleSpeed = () => {
    setPlaybackRate(prev => (prev >= 2 ? 1 : prev + 0.5));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white h-[5rem] shadow-lg flex items-center px-[1rem]">
      <audio ref={audioRef} hidden />

      {/* همه آیتم‌ها در یک ردیف با فاصله مساوی */}
      <div className="flex items-center w-full gap-[2rem]">
        {/* کاور و عنوان */}
        <div className="flex items-center gap-[0.75rem] shrink-0">
          <div className="w-[3rem] h-[3rem] overflow-hidden rounded-xl">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-semibold">{title}</span>
            <span className="text-xs text-gray-400 truncate">{show}</span>
          </div>
        </div>

        {/* دکمه سرعت */}
        <button
          onClick={toggleSpeed}
          className="text-xs px-[0.5rem] py-[0.25rem] rounded bg-[#343434] hover:bg-[#4639B3] shrink-0"
        >
          {playbackRate}x
        </button>

        {/* کنترل ها */}
        <div className="flex items-center gap-[1rem] shrink-0">
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime -= 5;
              }}
              className="p-2 hover:bg-[#4639B3] rounded-full"
            >
              <RotateCcw size={20} />
            </button>
            <span className="text-[0.625rem] mt-[-0.25rem]">5s</span>
          </div>

          <PlayPauseButton
            isPlaying={playing}
            onToggle={togglePlay}
            size={desktopButtonSize}
          />

          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime += 15;
              }}
              className="p-2 hover:bg-[#4639B3] rounded-full"
            >
              <RotateCw size={20} />
            </button>
            <span className="text-[0.625rem] mt-[-0.25rem]">15s</span>
          </div>
        </div>

        {/* نوار پیشرفت */}
        <div className="flex flex-col flex-grow items-center">
        <div
            ref={progressRef}
            onClick={handleProgressClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            className="relative h-[0.25rem] w-full bg-[#343434] rounded cursor-pointer mt-[16px]"
          >

            <div
              className="h-full bg-[#4639B3] rounded"
              style={{ width: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{ left: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
            >
              <div className="w-[0.75rem] h-[0.75rem] bg-white rounded-full" />
            </div>
            {hoverTime !== null && (
              <div
                className="absolute -top-[1.5rem] text-xs bg-black text-white px-[0.25rem] py-[0.125rem] rounded"
                style={{
                  left: `${(hoverTime / duration) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>
          <div className="flex justify-between w-full text-xs text-white mt-[0.25rem]">
            <span className="cursor-pointer" onClick={() => setShowRemaining(!showRemaining)}>
              {showRemaining ? `-${formatTime(duration - currentTime)}` : formatTime(currentTime)}
            </span>
            <span className="cursor-pointer" onClick={() => setShowRemaining(!showRemaining)}>
              {showRemaining ? formatTime(currentTime) : `-${formatTime(duration - currentTime)}`}
            </span>
          </div>
        </div>

        {/* کنترل صدا */}
        <div className="flex items-center gap-[0.75rem] shrink-0">
          <button onClick={handleMuteToggle} className="hover:text-[#4639B3]">
            {volume > 0 && !isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-[0.25rem] w-[6rem] accent-[#4639B3] cursor-pointer"
          />
        </div>

        {/* ضربدر */}
        <button onClick={hidePlayer} className="p-2 hover:bg-[#4639B3] rounded-full shrink-0">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
