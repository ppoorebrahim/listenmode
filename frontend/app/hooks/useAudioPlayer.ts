import { useRef, useEffect } from 'react';
import { AudioPlayerState, AudioPlayerAction, AudioPlayerContextType, Podcast } from '@/types';

export function useAudioPlayerLogic(
  state: AudioPlayerState,
  dispatch: React.Dispatch<AudioPlayerAction>
): AudioPlayerContextType {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        dispatch({ type: 'PAUSE' });
      });

      audio.addEventListener('timeupdate', () => {
        dispatch({
          type: 'SET_CURRENT_TIME',
          payload: audio.currentTime
        });
      });

      audio.addEventListener('loadedmetadata', () => {
        dispatch({
          type: 'SET_DURATION',
          payload: audio.duration
        });
      });

      audio.addEventListener('volumechange', () => {
        dispatch({
          type: 'SET_VOLUME',
          payload: audio.volume
        });
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && state.podcast) {
      audioRef.current.src = state.podcast.fileUrl;
      if (state.isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [state.podcast, state.isPlaying]);

  const controls = {
    play: () => {
      if (audioRef.current && state.podcast) {
        audioRef.current.play().catch(console.error);
        dispatch({ type: 'PLAY' });
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        dispatch({ type: 'PAUSE' });
      }
    },
    toggle: () => {
      if (state.isPlaying) {
        controls.pause();
      } else {
        controls.play();
      }
    },
    seek: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    },
    setPodcast: (podcast: Podcast) => {
      dispatch({
        type: 'SET_PODCAST',
        payload: podcast
      });
    }
  };

  return {
    ...state,
    ...controls
  };
} 