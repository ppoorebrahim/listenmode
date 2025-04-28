"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import PlayPauseButton from "@/components/PlayPauseButton";

const suggestions = [
  {
    id: 1,
    title: "AI and the Future",
    duration: "24:30",
    podcastName: "Tech Talks",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Startup Stories",
    duration: "38:10",
    podcastName: "Founders Weekly",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 3,
    title: "The Brain and Thinking",
    duration: "42:05",
    podcastName: "Neurocast",
    thumbnail: "/placeholder.svg",
  },
];

export default function SuggestedEpisodes() {
  return (
    <div className="flex flex-col gap-4 text-sm w-[22.25rem] md:w-full px-0 md:px-0">
      <h3 className="text-base font-semibold text-white px-2 md:px-0">You might also like</h3>

      {suggestions.map((item) => (
        <div
          key={item.id}
          className="flex justify-between hover:bg-white/5 px-2 py-2 rounded-md transition relative w-full md:w-[312px]"
        >
          <div className="absolute top-4 right-2">
            <Bookmark className="w-4 h-4 text-zinc-400" />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-[96px] h-[96px]">
              <Image
                src={item.thumbnail}
                alt="thumb"
                fill
                className="rounded-md object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayPauseButton size={40} />
              </div>
            </div>

            <div className="flex flex-col self-start pt-2">
              <span className="text-white text-xs">{item.title}</span>
              <div className="flex items-center gap-1 mt-12">
                <Image
                  src={item.thumbnail}
                  alt="profile"
                  width={16}
                  height={16}
                  className="rounded-full object-cover"
                />
                <span className="text-xs text-zinc-400">{item.podcastName}</span>
              </div>
            </div>
          </div>

          <span
            className="text-xs text-zinc-400 absolute right-2"
            style={{ bottom: "0.85rem" }}
          >
            {item.duration}
          </span>
        </div>
      ))}
    </div>
  );
}
