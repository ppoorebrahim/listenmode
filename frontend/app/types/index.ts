import { Dispatch, ElementType } from 'react';

export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  fileUrl: string;
  thumbnailUrl?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
  views?: number;
  timeAgo?: string;
  channel?: string;
  channelAvatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  podcast: Podcast | null;
  visible?: boolean;
}

export interface AudioPlayerControls {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPodcast: (podcast: Podcast) => void;
}

export type AudioPlayerContextType = AudioPlayerState & AudioPlayerControls;

export type AudioPlayerAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_PODCAST'; payload: Podcast }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_VISIBLE'; payload: boolean };

export interface PodcastFormData {
  title: string;
  description: string;
  audioFile: File | null;
  thumbnail?: File | null;
}

export interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
  active?: boolean;
}

// React component prop types
export interface PodcastCardProps {
  podcast: Podcast & {
    likes: number;
    comments: number;
    views: number;
    timeAgo: string;
    channel: string;
    channelAvatar?: string;
  };
}

export interface AudioPlayerProviderProps {
  children: React.ReactNode;
} 