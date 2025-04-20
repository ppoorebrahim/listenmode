"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Plus, Search, Headphones, User } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[#343434] bg-background px-4 md:px-6">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 relative">
            <Image src="/LogoMark_40-40.svg" alt="Logo" width={32} height={32} />
          </div>
          <span className="text-lg font-bold text-white hidden md:inline">Listenmode</span>
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
            className={`w-full bg-muted pl-10 pr-4 py-2 rounded-md text-white placeholder:text-gray-400 border transition-colors ${
              searchFocused ? "border-primary bg-[#1A1A1A]" : "border-transparent"
            } focus:outline-none`}
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button className="rounded-full bg-primary px-4 py-2 text-white hover:bg-primary/90 flex items-center transition">
          <Plus className="mr-1 h-4 w-4" />
          <span>Upload</span>
        </button>
        <button className="text-gray-400 hover:text-primary p-2 transition">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-[#272727] flex items-center justify-center cursor-pointer text-white hover:text-secondary transition">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
