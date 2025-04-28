"use client"

import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Bell, Plus, Search, User, LogOut, Mic, Contact, Info, Shield, Share2 } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/hooks/use-user"

export default function Navbar() {
  const pathname = usePathname()

  const hiddenRoutes = ["/auth", "/bookmarks", "/search"]
  if (hiddenRoutes.includes(pathname)) return null

  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [hovering, setHovering] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!hovering) {
      const timeout = setTimeout(() => {
        setProfileOpen(false)
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [hovering])

  return (
    <>
      {/* Overlay */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setProfileOpen(false)}></div>
      )}

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

        <div className="hidden md:flex items-center gap-3 relative">
          <Link
            href="/upload"
            className="h-9 text-sm rounded-full bg-primary px-4 text-white hover:bg-primary/90 flex items-center transition"
          >
            <Plus className="mr-1 h-4 w-4" />
            <span>Upload</span>
          </Link>

          <button className="text-gray-400 hover:text-primary p-2 transition">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile Button */}
          <div
            className="relative"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="h-8 w-8 rounded-full bg-[#272727] flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {user?.avatar ? (
                <Image src={user.avatar} alt="avatar" width={32} height={32} />
              ) : (
                <User className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-12 right-0 w-64 bg-[#1A1A1A] rounded-xl border border-white/10 shadow-lg overflow-hidden z-50"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {/* بخش پروفایل */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#333] flex items-center justify-center">
                      <User className="text-gray-400 w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium text-sm text-white">{user?.name}</div>
                    <div className="text-xs text-gray-400">@{user?.username}</div>
                  </div>
                </div>

                {/* منو لینک ها */}
                <div className="flex flex-col gap-2 py-3">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <Mic size={16} /> My Podcasts
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <User size={16} /> Profile edit
                  </Link>
                  <Link href="/policies" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <Shield size={16} /> Policies
                  </Link>
                  <Link href="/about" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <Share2 size={16} /> About us
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <Contact size={16} /> Contact us
                  </Link>
                  <Link href="/help" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
                    <Info size={16} /> Help
                  </Link>
                </div>

                {/* بخش لاگ اوت */}
                <div className="border-t border-white/10 flex">
                  <button
                    onClick={() => {
                      // logout handler
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-white/5 text-sm"
                  >
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
