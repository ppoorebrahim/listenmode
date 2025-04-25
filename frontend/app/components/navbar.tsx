"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Bell, Plus, Search, User } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()

  // مسیرهایی که نباید نوار بالا نمایش داده بشه
  const hiddenRoutes = ["/auth", "/bookmarks", "/search"]
  if (hiddenRoutes.includes(pathname)) return null

  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-[#1A1A1A]/10 backdrop-blur-[16px] px-4 md:px-6 md:bg-background md:backdrop-blur-none">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-2 ml-[-4px] md:ml-0">
          <div className="h-10 w-10 relative">
            <Image src="/LogoMark_40-40.svg" alt="Logo" width={40} height={40} />
          </div>
          <span className="text-lg font-bold text-white">Listenmode</span>
        </Link>
        <div className="md:hidden">
          <Bell className="text-foreground" />
        </div>
      </div>

      <div className="relative mx-4 hidden flex-1 max-w-md md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="search"
            placeholder="Search podcasts..."
            className={`w-full h-9 pl-10 pr-4 rounded-md text-white placeholder:text-gray-400 border transition-colors ${
              searchFocused
                ? "border-primary bg-[#2a2a2a]"
                : "bg-muted border-transparent hover:bg-[#262626]"
            } focus:outline-none`}
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
          <Link
             href="/upload"
             className="h-9 text-sm rounded-full bg-primary px-4 text-white hover:bg-primary/90 flex items-center transition">
            <Plus className="mr-1 h-4 w-4" />
            <span>Upload</span>
          </Link>
        <button className="text-gray-400 hover:text-primary p-2 transition">
          <Bell className="h-5 w-5" />
        </button>
        <Link
          href="/auth"
          className="h-8 w-8 rounded-full bg-[#272727] flex items-center justify-center cursor-pointer text-gray-400 hover:text-primary transition"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </header>
  )
}
