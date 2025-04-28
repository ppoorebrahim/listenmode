"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import PlayPauseButton from "@/components/PlayPauseButton";
import { useState } from "react";

const suggestions = [
  { id: 1, title: "AI and the Future", duration: "24:30", podcastName: "Tech Talks", thumbnail: "/placeholder.svg" },
  { id: 2, title: "Startup Stories", duration: "38:10", podcastName: "Founders Weekly", thumbnail: "/placeholder.svg" },
  { id: 3, title: "The Brain and Thinking", duration: "42:05", podcastName: "Neurocast", thumbnail: "/placeholder.svg" },
  { id: 4, title: "Deep Space Mysteries", duration: "30:15", podcastName: "Cosmos Radio", thumbnail: "/placeholder.svg" },
  { id: 5, title: "Healthy Habits", duration: "28:45", podcastName: "Wellness Weekly", thumbnail: "/placeholder.svg" },
  { id: 6, title: "History Untold", duration: "35:20", podcastName: "Past Chronicles", thumbnail: "/placeholder.svg" },
];

export default function SuggestedEpisodes() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 text-sm w-[22.25rem] md:w-full px-0 md:px-0">
      <h3 className="text-base font-semibold text-white px-2 md:px-0">
        You might also like
      </h3>

      {suggestions.map((item) => (
        <div key={item.id} className="flex justify-between hover:bg-white/5 px-2 py-2 rounded-md transition relative w-full md:w-[312px] min-h-[120px]">
          <div className="absolute top-4 right-2">
            <Bookmark className="w-4 h-4 text-zinc-400" />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-[96px] h-[96px]">
              <Image src={item.thumbnail} alt="thumb" fill className="rounded-md object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayPauseButton
                  isPlaying={playingId === item.id}
                  onToggle={() => setPlayingId(prev => (prev === item.id ? null : item.id))}
                  size={40}
                />
              </div>
            </div>

            <div className="flex flex-col h-full pt-1">
              <span className="text-white text-xs line-clamp-2 leading-tight mb-2">{item.title}</span>
              <div className="flex items-center gap-2">
                <Image src={item.thumbnail} alt="profile" width={25} height={25} className="rounded-full object-cover" />
                <span className="text-xs text-zinc-400">{item.podcastName}</span>
              </div>
            </div>
          </div>

          <span className="text-xs text-zinc-400 absolute right-2 bottom-3">
            {item.duration}
          </span>
        </div>
      ))}
    </div>
  );
}
