"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface UseAudioPlayerLogic {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
}

export function useAudioPlayerLogic(audioUrl: string): UseAudioPlayerLogic {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    audioEl.src = audioUrl;

    const onTimeUpdate = () => setCurrentTime(audioEl.currentTime);
    const onDurationChange = () => {
      if (!isNaN(audioEl.duration)) {
        setDuration(audioEl.duration);
      }
    };

    audioEl.addEventListener("timeupdate", onTimeUpdate);
    audioEl.addEventListener("loadedmetadata", onDurationChange);
    audioEl.addEventListener("durationchange", onDurationChange);

    console.log("🎵 Audio source:", audioEl.src);

    return () => {
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
      audioEl.removeEventListener("loadedmetadata", onDurationChange);
      audioEl.removeEventListener("durationchange", onDurationChange);
    };
  }, [audioUrl]);

  const togglePlay = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      audioEl.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const seek = useCallback(
    (time: number) => {
      const audioEl = audioRef.current;
      if (audioEl && !isNaN(duration)) {
        audioEl.currentTime = Math.min(Math.max(time, 0), duration);
        setCurrentTime(audioEl.currentTime);
      }
    },
    [duration]
  );

  const skipForward = useCallback((seconds = 15) => {
    seek(currentTime + seconds);
  }, [currentTime, seek]);

  const skipBackward = useCallback((seconds = 5) => {
    seek(currentTime - seconds);
  }, [currentTime, seek]);

  const setPlaybackRate = useCallback((rate: number) => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.playbackRate = rate;
      setPlaybackRateState(rate);
    }
  }, []);

  return {
    audioRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    skipForward,
    skipBackward,
    playbackRate,
    setPlaybackRate,
  };
}
