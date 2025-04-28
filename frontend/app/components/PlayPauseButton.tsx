"use client";

import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "@/components/AudioPlayerProvider";

interface AudioContextProps {
  audioUrl: string;
  title: string;
  show: string;
  duration?: number;
  thumbnailUrl: string;
}

interface PlayPauseButtonProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  episodeData?: AudioContextProps; // ✅ حالا episodeData تعریف شده
}

export default function PlayPauseButton({ size = 48, className = "", onClick, episodeData }: PlayPauseButtonProps) {
  const { playing, audio, playNewAudio, togglePlay } = useAudioPlayer();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (episodeData) {
      if (!audio || audio.audioUrl !== episodeData.audioUrl) {
        playNewAudio(episodeData);
      } else {
        togglePlay();
      }
    } else {
      togglePlay();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition ${className}`}
      style={{ width: size, height: size }}
    >
      {playing ? (
        <Pause size={size * 0.5} className="text-white animate-pingOnce" />
      ) : (
        <Play size={size * 0.5} className="text-white animate-pingOnce" />
      )}
    </button>
  );
}
