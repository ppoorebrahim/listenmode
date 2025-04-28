"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface AudioContextProps {
  audioUrl: string;
  title: string;
  show: string;
  duration?: number; // ✅ duration رو به صورت عددی تعریف کردیم
  thumbnailUrl: string;
}

interface AudioPlayerContextType {
  audio: AudioContextProps | null;
  setAudio: (audio: AudioContextProps | null) => void;
  isVisible: boolean;
  showPlayer: () => void;
  hidePlayer: () => void;
  togglePlay: () => void;
  playNewAudio: (audio: AudioContextProps) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  playing: boolean;
  setPlaying: (value: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [audio, _setAudio] = useState<AudioContextProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const showPlayer = () => setIsVisible(true);

  const hidePlayer = () => {
    setIsVisible(false);
    _setAudio(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => {
        setPlaying(true);
      }).catch((err) => {
        console.error("❌ togglePlay error:", err);
      });
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const waitForAudioRef = (callback: () => void) => {
    if (audioRef.current) {
      callback();
    } else {
      console.log("⏳ Waiting for audioRef...");
      setTimeout(() => waitForAudioRef(callback), 100);
    }
  };

  const playNewAudio = (audioData: AudioContextProps) => {
    _setAudio(audioData);
    setIsVisible(true);

    waitForAudioRef(() => {
      if (!audioRef.current) {
        console.error("❌ audioRef still null after waiting");
        return;
      }

      console.log("🎵 Setting audio src and playing:", audioData.audioUrl);
      audioRef.current.src = audioData.audioUrl;
      audioRef.current.currentTime = 0;

      const tryPlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.readyState >= 2) {
          audioRef.current.play()
            .then(() => {
              console.log("✅ Audio started playing");
              setPlaying(true);
            })
            .catch((err) => {
              console.error("❌ playNewAudio error:", err);
            });
        } else {
          console.log("⏳ Audio not ready, waiting...");
          setTimeout(tryPlay, 200);
        }
      };

      tryPlay();
    });
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoadedMetadata = () => {
      if (!audio) return;

      const duration = el.duration || 0;
      console.log("🎯 loadedmetadata, duration:", duration);

      _setAudio(prev => prev ? { ...prev, duration } : null); // ✅ درست شد
    };

    const onEnded = () => {
      _setAudio(null);
      setIsVisible(false);
      setPlaying(false);
    };

    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("ended", onEnded);
    };
  }, [audio]);

  return (
    <AudioPlayerContext.Provider
      value={{
        audio,
        setAudio: _setAudio, // ✅ اکسپورت public
        isVisible,
        showPlayer,
        hidePlayer,
        togglePlay,
        playNewAudio,
        audioRef,
        playing,
        setPlaying,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}
