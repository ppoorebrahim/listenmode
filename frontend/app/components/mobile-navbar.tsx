"use client"

import Link from "next/link"
import { Search, Bookmark, User, Headphones } from 'lucide-react'

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-800 bg-gray-900 px-4 md:hidden">
      <Link href="/" className="flex items-center justify-center text-purple-500">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4639B3]">
          <Headphones className="h-4 w-4 text-white" />
        </div>
      </Link>

      <Link href="/search" className="flex items-center justify-center text-gray-400 hover:text-[#4639B3]">
        <Search className="h-6 w-6" />
      </Link>

      <Link href="/bookmarks" className="flex items-center justify-center text-gray-400 hover:text-[#4639B3]">
        <Bookmark className="h-6 w-6" />
      </Link>

      <Link href="/profile" className="flex items-center justify-center text-gray-400 hover:text-[#4639B3]">
        <User className="h-6 w-6" />
      </Link>
    </div>
  )
}
