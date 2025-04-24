"use client"

import { useEffect, useRef, useState } from "react"
import PodcastCard from "@/components/podcast-card"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

const categories = [
  "Psychology",
  "Self-help & Motivation",
  "Relationships & Dating",
  "True Crime",
  "Personal Development",
  "Gaming",
  "Movies & TV Series",
  "Startups",
  "Politics",
  "Economics & Investing",
  "Technology",
  "Music",
  "History",
  "Immigration",
  "Book Summaries",
  "Language Learning",
  "Lifestyle",
  "Philosophy",
  "Art & Literature",
  "Religion & Spirituality",
  "Health & Nutrition",
  "Environment & Nature",
  "Sports",
  "Physics"
]

const mockPodcast = {
  id: 1,
  title: "Sample Podcast Episode",
  channel: "Sample Channel",
  channelAvatar: "/placeholder.svg",
  thumbnail: "/placeholder.svg",
  duration: "24:00",
  likes: 10,
  comments: 3,
  views: 150,
  timeAgo: "Yesterday",
  file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
}

export default function ExplorePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollLeft = (idx: number) => {
    const el = rowRefs.current[idx]
    if (!el) return
    const card = el.querySelector(".scroll-item")
    if (card) {
      const cardWidth = (card as HTMLElement).offsetWidth + 16 // 16px gap
      el.scrollBy({ left: -cardWidth, behavior: "smooth" })
    }
  }

  const scrollRight = (idx: number) => {
    const el = rowRefs.current[idx]
    if (!el) return
    const card = el.querySelector(".scroll-item")
    if (card) {
      const cardWidth = (card as HTMLElement).offsetWidth + 16
      el.scrollBy({ left: cardWidth, behavior: "smooth" })
    }
  }

  // اسکرول خودکار و حلقه‌ای (از اول به آخر)
  useEffect(() => {
    rowRefs.current.forEach((el) => {
      if (!el) return

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault()
          el.scrollBy({ left: e.deltaY, behavior: "smooth" })
        }
      }

      el.addEventListener("wheel", handleWheel)

      return () => el.removeEventListener("wheel", handleWheel)
    })
  }, [isMounted])

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []

    rowRefs.current.forEach((el, idx) => {
      if (!el) return
      const interval = setInterval(() => {
        const card = el.querySelector(".scroll-item")
        if (card) {
          const cardWidth = (card as HTMLElement).offsetWidth + 16
          el.scrollBy({ left: cardWidth, behavior: "smooth" })
        }
      }, 3000 + idx * 400) // اسکرول هر ردیف با تأخیر متفاوت
      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div className="hidden md:block px-6 pb-24 pt-16">
      {categories.map((category, idx) => (
        <div
          key={category}
          className="mb-12 group relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h2 className="text-xl font-semibold text-white mb-4">{category}</h2>

          {/* دکمه اسکرول چپ */}
          <button
            onClick={() => scrollLeft(idx)}
            className={`absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-full p-2 opacity-90 transition ${
              hoveredIndex === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-label={`Scroll ${category} left`}
          >
            <ArrowLeft size={20} />
          </button>

          {/* دکمه اسکرول راست */}
          <button
            onClick={() => scrollRight(idx)}
            className={`absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-full p-2 opacity-90 transition ${
              hoveredIndex === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-label={`Scroll ${category} right`}
          >
            <ArrowRight size={20} />
          </button>

          <div
            ref={(el) => (rowRefs.current[idx] = el)}
            className="scroll-container gap-4 pr-2 pb-1"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`${category}-${i}`} className="scroll-item">
                <PodcastCard podcast={{ ...mockPodcast, id: i + 1 }} />
              </div>
            ))}
                <Link
                href={`/explore/${encodeURIComponent(category)}`}
                className="scroll-item shrink-0 flex items-center justify-center px-4 text-sm text-white border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 rounded-lg"
                style={{
                    height: "326px",  // ارتفاع 332px
                    width: "170px",   // عرض 170px
                }}
                >
                View All
                </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
