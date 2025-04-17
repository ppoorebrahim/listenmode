"use client";

import { useState, useEffect } from "react";
import PodcastCard from "@/components/podcast-card";
import MobilePodcastCard from "@/components/mobile-podcast-card";
import AudioPlayer from "@/components/AudioPlayer";
import Player_MobileView from "@/components/Player_MobileView";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showDesktopPlayer, setShowDesktopPlayer] = useState(false);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://194.146.123.160:4001/api/podcasts");
        const data = await response.json();
        const transformedData = data.map((podcast) => ({
          id: podcast.id,
          title: podcast.title,
          channel: podcast.author || "Unknown",
          channelAvatar: "/placeholder.svg?height=32&width=32",
          thumbnail: "/placeholder.svg?height=200&width=200",
          duration: podcast.duration || "Unknown",
          likes: podcast.likes || 0,
          comments: podcast.comments || 0,
          views: 0,
          timeAgo: "Unknown",
          audioUrl: podcast.file_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        }));
        setPodcasts(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setPodcasts(mockPodcasts);
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  const mockPodcasts = [
    {
      id: 1,
      title: "The Joe Rogan Experience #1234",
      channel: "Joe Rogan",
      channelAvatar: "/placeholder.svg?height=32&width=32",
      thumbnail: "/placeholder.svg?height=200&width=200",
      duration: "2:45:30",
      likes: 1200,
      comments: 340,
      views: 15000,
      timeAgo: "2 days ago",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Lex Fridman Podcast #567",
      channel: "Lex Fridman",
      channelAvatar: "/placeholder.svg?height=32&width=32",
      thumbnail: "/placeholder.svg?height=200&width=200",
      duration: "1:30:00",
      likes: 800,
      comments: 200,
      views: 10000,
      timeAgo: "1 week ago",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ];

  const handlePlay = (podcast) => {
    setCurrentPodcast(podcast);
    setShowDesktopPlayer(true);
    setShowMobilePlayer(true);
  };

  if (!isMounted) {
    return (
      <div className="podcast-container px-4">
        <p className="text-[#F5F5F5]">Loading podcasts...</p>
      </div>
    );
  }

  const displayPodcasts = podcasts.length > 0 ? podcasts : mockPodcasts;

  return (
    <div className="podcast-container px-4 min-h-screen bg-[#0A0A0A] md:overflow-auto overflow-hidden">
      {/* Header (assumed) */}
      <div className="header md:border-b border-[#343434] border-b-0 border-none mb-4"></div>

      {loading ? (
        <p className="text-[#F5F5F5]">Loading podcasts...</p>
      ) : displayPodcasts.length === 0 ? (
        <p className="text-[#F5F5F5]">No podcasts available.</p>
      ) : (
        <div>
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlay={() => handlePlay(podcast)}
              />
            ))}
          </div>

          <div className="mobile-podcast-container md:hidden mb-[112px] max-h-[calc(100vh-112px)] overflow-hidden">
            {displayPodcasts.map((podcast) => (
              <MobilePodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlay={() => handlePlay(podcast)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Desktop Audio Player - only visible in desktop view (above 376px) */}
      {showDesktopPlayer && currentPodcast && (
        <AudioPlayer
          title={currentPodcast.title}
          podcastName={currentPodcast.channel}
          src={currentPodcast.audioUrl}
          onClose={() => setShowDesktopPlayer(false)}
        />
      )}

      {/* Mobile Player - only visible in mobile view (below 376px) */}
      {showMobilePlayer && currentPodcast && (
        <div className="md:hidden fixed bottom-[56px] left-0 right-0 z-[100]">
          <Player_MobileView
            title={currentPodcast.title}
            show={currentPodcast.channel}
            duration={currentPodcast.duration}
            thumbnailUrl={currentPodcast.thumbnail}
            audioUrl={currentPodcast.audioUrl}
            onClose={() => setShowMobilePlayer(false)}
          />
        </div>
      )}

      {/* Bottom Navigation Bar (assumed) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-[#0A0A0A] z-[50] flex items-center justify-center">
        <div className="flex gap-[10px]">
          <button className="text-[#F5F5F5] hover:text-[#4639B3] p-2">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-12a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z" />
            </svg>
          </button>
          <button className="text-[#F5F5F5] hover:text-[#4639B3] p-2">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5l4-3-4-3v6z" />
            </svg>
          </button>
          <button className="text-[#F5F5F5] hover:text-[#4639B3] p-2">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-4-8h8v2H8v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}