"use client"

import { useState } from "react"
import { Info, LayoutList, Rss, Share2 } from "lucide-react"
import Image from "next/image"
import HorizontalPodcastCard from "@/components/HorizontalPodcastCard"
import MobilePodcastCard from "@/components/mobile-podcast-card"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

const mockEpisodes = [
  {
    id: 1,
    title: "The Fall - Audiobook",
    channel: "Ali Shariati",
    channelAvatar: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    duration: "2:45:10",
    views: 1870,
    comments: 149,
    likes: 79,
    shares: 23,
    file_url: "/audio/sample.mp3",
    date: "2025-04-23",
  },
]

export default function PodcastPage() {
  const [tab, setTab] = useState<"latest" | "playlists" | "about">("latest")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 400px)")

  return (
    <div className="px-0 pt-0 pb-24 bg-black text-white text-left">
      {/* Header Section */}
      <div className="relative w-full bg-neutral-900 pt-4 pb-0 px-4 md:px-8" style={{ minHeight: "266px" }}>
        <div
          className={`relative z-10 flex flex-col ${isSmallScreen ? "gap-8" : "gap-4"} h-full`}
          style={{ paddingTop: "3.5rem" }}
        >
          {/* Avatar + Title + Share */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg"
                width={isSmallScreen ? 45 : 65}
                height={isSmallScreen ? 45 : 65}
                alt="Podcast Avatar"
                className="rounded-full object-cover"
              />
              <div className={`font-semibold ${isSmallScreen ? "text-sm" : "text-base"}`}>Level 16 Podcast</div>
            </div>

            {!isSmallScreen && (
              <Button className="bg-neutral-800 text-white hover:bg-neutral-700 px-4 py-2 rounded-full text-sm flex items-center gap-2 border-0 w-fit">
                <Share2 size={16} />
                Share
              </Button>
            )}
          </div>

          {/* Hashtags */}
          <div className={`flex flex-wrap gap-2 ${isSmallScreen ? "text-xs mt-[-4px]" : "text-sm mt-0"} text-gray-300`}>
            <span className={`bg-white/10 rounded-full ${isSmallScreen ? "px-2 py-0.5" : "px-3 py-1"}`}>#Technology</span>
            <span className={`bg-white/10 rounded-full ${isSmallScreen ? "px-2 py-0.5" : "px-3 py-1"}`}>#Startup</span>
            <span className={`bg-white/10 rounded-full ${isSmallScreen ? "px-2 py-0.5" : "px-3 py-1"}`}>#AI</span>
            <span className={`bg-white/10 rounded-full ${isSmallScreen ? "px-2 py-0.5" : "px-3 py-1"}`}>#Entrepreneurship</span>
          </div>

          {/* Subscribe + Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-end sm:items-end gap-4 mt-auto">
            <div className="flex items-center gap-4">
              <Button
                className="text-sm px-5 py-2 rounded-full bg-primary text-white hover:bg-primary/90 w-fit"
                style={{ marginRight: "24px" }}
              >
                Subscribe
              </Button>
              <div className="flex gap-6 sm:gap-8">
                <div className={`flex flex-col items-center ${isSmallScreen ? "text-[10px]" : "text-base"}`}>
                  <div className={`font-bold ${isSmallScreen ? "text-base" : "text-xl"}`}>125</div>
                  <div className="text-gray-400">Episodes</div>
                </div>
                <div className={`flex flex-col items-center ${isSmallScreen ? "text-[10px]" : "text-base"}`}>
                  <div className={`font-bold ${isSmallScreen ? "text-base" : "text-xl"}`}>1,245</div>
                  <div className="text-gray-400">Mins played</div>
                </div>
                <div className={`flex flex-col items-center ${isSmallScreen ? "text-[10px]" : "text-base"}`}>
                  <div className={`font-bold ${isSmallScreen ? "text-base" : "text-xl"}`}>11K</div>
                  <div className="text-gray-400">Followers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-b border-white/10 mt-0 sm:mt-4">
            <div className="flex gap-6 sm:gap-14 text-sm">
              <button
                className={`pb-2 flex items-center gap-2 ${
                  tab === "latest"
                    ? "text-primary border-b-2 border-primary font-bold"
                    : "text-gray-400 font-normal"
                }`}
                onClick={() => setTab("latest")}
              >
                <Rss size={16} />
                Latest Updates
              </button>
              <button
                className={`pb-2 flex items-center gap-2 ${
                  tab === "playlists"
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-gray-400 font-normal"
                }`}
                onClick={() => setTab("playlists")}
              >
                <LayoutList size={16} />
                Playlists
              </button>
              <button
                className={`pb-2 flex items-center gap-2 ${
                  tab === "about"
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-gray-400 font-normal"
                }`}
                onClick={() => setTab("about")}
              >
                <Info size={16} />
                About
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 md:px-8 pt-8 flex flex-col gap-6">
        {tab === "latest" && (
          <div className="flex flex-col gap-6 items-start">
            {mockEpisodes.map((podcast) => (
              <div key={podcast.id} className="w-full max-w-[612px]">
                {isMobile ? (
                  <MobilePodcastCard podcast={podcast} />
                ) : (
                  <HorizontalPodcastCard podcast={podcast} />
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "playlists" && (
          <div className="text-sm text-zinc-400">Playlists coming soon...</div>
        )}

        {tab === "about" && (
          <div className="text-sm leading-relaxed text-zinc-300 max-w-2xl">
            This podcast explores trending topics in technology, startups, and the future of AI. The hosts engage in deep conversations with guests from the entrepreneurial and tech world.
          </div>
        )}
      </div>
    </div>
  )
}
