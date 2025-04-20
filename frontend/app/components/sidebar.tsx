import Link from "next/link"
import {
  Home,
  Compass,
  Clock,
  Bookmark,
  Heart,
  Download,
  Settings,
  Instagram,
  Youtube,
  Twitter,
  Send,
} from "lucide-react"

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-16 overflow-y-auto border-r border-[#343434] bg-background md:block lg:w-64">
      <div className="flex h-full flex-col justify-between py-6 px-2 lg:px-4">
        <div>
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-muted hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Home</span>
          </Link>

          <Link
            href="/explore"
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-primary"
          >
            <Compass className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Explore</span>
          </Link>

          <Link
            href="/history"
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-primary"
          >
            <Clock className="h-5 w-5" />
            <span className="hidden text-sm lg:block">History</span>
          </Link>

          <Link
            href="/saved"
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-primary"
          >
            <Bookmark className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Saved</span>
          </Link>

          <Link
            href="/liked"
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Liked</span>
          </Link>

          <Link
            href="/downloads"
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-primary"
          >
            <Download className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Downloads</span>
          </Link>

          <div className="mt-8 w-full border-t border-[#343434] pt-4">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500 lg:block hidden">
              Subscriptions
            </h3>
            <div className="mt-2 flex w-full flex-col space-y-1">
              {[
                { id: 1, name: "Joe Rogan", avatar: "/placeholder.svg" },
                { id: 2, name: "Lex Fridman", avatar: "/placeholder.svg" },
                { id: 3, name: "Tagbhe16", avatar: "/placeholder.svg" },
              ].map((channel) => (
                <Link
                  key={channel.id}
                  href={`/channel/${channel.id}`}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-muted hover:text-primary"
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
        </div>

        <div className="w-full border-t border-[#343434] pt-4">
          <div className="flex flex-col items-center gap-3">
            {[Instagram, Youtube, Twitter, Send].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-muted hover:text-secondary"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <Link
            href="/settings"
            className="mt-6 flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-400 hover:bg-muted hover:text-secondary"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
