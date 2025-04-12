import Link from "next/link"
import { Home, Compass, Clock, Bookmark, Heart, Download, Settings, Instagram, Youtube, Twitter, Send } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-16 overflow-y-auto border-r border-gray-800 bg-black md:block lg:w-64">
      <div className="flex h-full flex-col items-start justify-start py-6 px-2 lg:px-4">
        <Link href="/" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-gray-800 hover:text-purple-400">
          <Home className="h-5 w-5" />
          <span className="hidden text-sm lg:block">Home</span>
        </Link>

        <Link
          href="/explore"
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
        >
          <Compass className="h-5 w-5" />
          <span className="hidden text-sm lg:block">Explore</span>
        </Link>

        <Link
          href="/history"
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
        >
          <Clock className="h-5 w-5" />
          <span className="hidden text-sm lg:block">History</span>
        </Link>

        <Link
          href="/saved"
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
        >
          <Bookmark className="h-5 w-5" />
          <span className="hidden text-sm lg:block">Saved</span>
        </Link>

        <Link
          href="/liked"
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
        >
          <Heart className="h-5 w-5" />
          <span className="hidden text-sm lg:block">Liked</span>
        </Link>

        <Link
          href="/downloads"
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
        >
          <Download className="h-5 w-5" />
          <span className="hidden text-sm lg:block">Downloads</span>
        </Link>

        <div className="mt-8 w-full border-t border-gray-800 pt-4">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500 lg:block">
            <span className="hidden lg:inline">Subscriptions</span>
          </h3>

          <div className="mt-2 flex w-full flex-col space-y-1">
            {[
              { id: 1, name: "Joe Rogan Experience", avatar: "/placeholder.svg?height=32&width=32" },
              { id: 2, name: "WPDWTD", avatar: "/placeholder.svg?height=32&width=32" },
              { id: 3, name: "Tagbhe16", avatar: "/placeholder.svg?height=32&width=32" },
              { id: 4, name: "The Ben Shapiro Show", avatar: "/placeholder.svg?height=32&width=32" },
              { id: 5, name: "Lex Fridman", avatar: "/placeholder.svg?height=32&width=32" },
            ].map((channel) => (
              <Link
                key={channel.id}
                href={`/channel/${channel.id}`}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-purple-400"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <img
                    src={channel.avatar || "/placeholder.svg"}
                    alt={channel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden truncate lg:block">{channel.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full border-t border-gray-800 pt-4">
          <div className="flex justify-around px-3 py-2">
            <Link
              href="https://instagram.com"
              className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </Link>

            <Link
              href="https://youtube.com"
              className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" />
            </Link>

            <Link
              href="https://twitter.com"
              className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </Link>

            <Link
              href="https://telegram.org"
              className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-auto w-full border-t border-gray-800 pt-4">
          <Link
            href="/settings"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-purple-400"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}