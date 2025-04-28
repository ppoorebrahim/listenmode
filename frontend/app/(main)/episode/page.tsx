"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAudioPlayer } from "@/components/AudioPlayerProvider";
import WaveformPlayer from "@/components/WaveformPlayer";
import SuggestedEpisodes from "@/components/SuggestedEpisodes";
import CommentBox from "@/components/CommentBox";
import PlayPauseButton from "@/components/PlayPauseButton";
import { ChevronLeft, Share2, Heart, MessageCircle, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"), { ssr: false });

export default function EpisodePage() {
  const { audioRef, audio, setAudio } = useAudioPlayer();
  const router = useRouter();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const episodeData = {
    audioUrl: "/audio/sample.mp3",
    title: "Understanding Artificial Intelligence",
    show: "Tech Talks Podcast",
    duration: 0,
    thumbnailUrl: "/placeholder.svg",
  };

  useEffect(() => {
    if (audioRef.current && (!audio || audio.audioUrl !== episodeData.audioUrl)) {
      audioRef.current.src = episodeData.audioUrl;
      audioRef.current.load();
      setAudio(episodeData);
    }
  }, []);

  return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-4 px-4 md:px-8 pt-4 pb-24 bg-black text-white relative">

      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 flex items-center justify-between h-14 px-3 z-50 bg-transparent">
        <button
          onClick={() => router.back()}
          className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur"
        >
          <Share2 size={20} className="text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4 md:gap-4 max-w-4xl pt-9 xs:pt-16">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-3 items-start p-0 md:p-4 bg-[#1A1A1A] rounded-lg">      {/* Episode Cover */}
          <div className="relative w-full aspect-square sm:w-[250px] sm:h-[250px] bg-[#121212] overflow-hidden flex items-center justify-center rounded-lg">
            <Image
              src={episodeData.thumbnailUrl}
              alt="Episode cover"
              width={600}
              height={600}
              className="object-cover w-full h-full opacity-80 rounded-lg"
            />
            {/* Gradient and Play Button for Mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden" />
            <div className="absolute inset-0 flex items-center justify-center md:hidden">
              <PlayPauseButton size={64} episodeData={episodeData} />
            </div>
            {/* Waveform Mobile */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 md:hidden">
              <WaveformPlayer />
            </div>
          </div>

          {/* Episode Details */}
          <div className="flex flex-col justify-center gap-4 flex-1 pt-0 pr-4 pb-4 pl-4 md:p-0">
          <h1 className="text-base md:text-2xl font-bold leading-tight hover:text-primary cursor-pointer">
              {episodeData.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary cursor-pointer">
              <Image
                src="/placeholder.svg"
                alt="Podcast avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              {episodeData.show}
            </div>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-300 mt-2">
              <span className="bg-white/10 rounded-full px-3 py-1">#AI</span>
              <span className="bg-white/10 rounded-full px-3 py-1">#Technology</span>
              <span className="bg-white/10 rounded-full px-3 py-1">#Future</span>
            </div>

            {/* Play + Waveform Desktop */}
            <div className="hidden md:flex items-center gap-4 mt-6 w-full">
              <PlayPauseButton size={48} episodeData={episodeData} />
              <div className="flex-1">
                <WaveformPlayer />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#1A1A1A] p-4 rounded-lg text-gray-300 text-sm sm:text-base leading-relaxed flex flex-col gap-2">
          <span className="text-xs text-gray-500">11 hr ago</span>
          <p>
            {showFullDescription ? (
              <>
                In this episode, we dive deep into the world of AI and explore its impact on the future.
                Join us as we discuss advancements, ethical concerns, and opportunities in artificial intelligence.
                <button
                  onClick={() => setShowFullDescription(false)}
                  className="ml-2 text-primary text-xs inline"
                >
                  Less
                </button>
              </>
            ) : (
              <>
                In this episode, we dive deep into the world of AI and explore its impact on the future...
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="ml-2 text-primary text-xs inline"
                >
                  More
                </button>
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-2">
          <div className="flex w-full max-w-[356px] justify-between md:w-auto md:justify-start md:gap-2">
            <div className="flex items-center gap-1 bg-[#1A1A1A] w-[84px] md:min-w-[100px] justify-center px-2 py-2 rounded-lg text-sm hover:text-primary cursor-pointer">
              <Heart size={20} />
              <span>24</span>
            </div>
            <div className="flex items-center gap-1 bg-[#1A1A1A] w-[84px] md:min-w-[100px] justify-center px-2 py-2 rounded-lg text-sm hover:text-primary cursor-pointer">
              <MessageCircle size={20} />
              <span>17</span>
            </div>
            <div className="flex items-center gap-1 bg-[#1A1A1A] w-[84px] md:min-w-[100px] justify-center px-2 py-2 rounded-lg text-sm hover:text-primary cursor-pointer">
              <Play size={20} />
              <span>5.5k</span>
            </div>
            <div className="flex items-center gap-1 bg-[#1A1A1A] w-[84px] md:hidden justify-center px-2 py-2 rounded-lg text-sm hover:text-primary cursor-pointer">
              <Share2 size={20} />
              <span>12</span>
            </div>
          </div>

          {/* Share Button Separate in Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-[#1A1A1A] min-w-[100px] justify-center px-2 py-2 rounded-lg text-sm hover:text-primary cursor-pointer">
            <Share2 size={20} />
            <span>12</span>
          </div>
        </div>

        {/* CommentBox with responsive container */}
        <div className="p-0 max-w-[356px] mx-auto md:max-w-none">
        <CommentBox />
        </div>

        {/* Suggested Episodes Mobile */}
        <div className="block md:hidden pt-4">
          <SuggestedEpisodes />
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex md:max-w-[280px] flex-col gap-6 pt-12">
        <SuggestedEpisodes />
      </div>

      {/* AudioPlayer */}
      <AudioPlayer />
    </div>
  );
}
