"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Plus, Search, Headphones } from 'lucide-react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-black px-4 md:px-6">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
            <Headphones className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Listenmode</span>
        </Link>
      </div>

      <div className="relative mx-4 hidden flex-1 max-w-md md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="search"
            placeholder="Search podcasts..."
            className="w-full bg-gray-800 pl-10 pr-4 py-2 rounded-md text-white placeholder:text-gray-400 border-none focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:flex hidden">
        <button className="rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 flex items-center">
          <Plus className="mr-1 h-4 w-4" />
          <span>Upload</span>
        </button>
        <button className="text-gray-400 hover:text-white p-2">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
          <span className="text-white">U</span>
        </div>
      </div>
    </header>
  )
}