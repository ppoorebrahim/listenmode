"use client"

import Image from "next/image"

export default function PodcastProfileCard() {
  return (
    <div className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 text-sm">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt="Podcast Avatar"
          width={64}
          height={64}
          className="object-cover"
        />
      </div>

      {/* Name */}
      <div className="text-base font-semibold">Tech Talks</div>

      {/* Follower count */}
      <div className="text-xs text-gray-400">42.3K followers</div>

      {/* Follow button (simple) */}
      <button className="w-full bg-primary text-white hover:bg-primary/90 text-xs py-2 rounded-md transition">
        Follow Podcast
      </button>
    </div>
  )
}
