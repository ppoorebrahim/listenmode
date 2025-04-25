import Link from "next/link"
import {
  Home,
  Compass,
  Clock,
  Bookmark,
  Heart,
  Download,
  Instagram,
  Youtube,
  Twitter,
  Send,
  Mic,
  Music,
  Film,
  BookOpen,
  Brain,
  Globe,
  Rocket,
  Users,
} from "lucide-react"

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto bg-background md:block sidebar-scroll custom-scrollbar w-[75px] lg:w-64">
      <div className="flex h-full flex-col justify-between py-6 px-2 lg:px-4">
        <div className="flex flex-col items-center lg:items-start">
          <Link
            href="/"
            className="flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-white hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Home</span>
          </Link>

          <Link
            href="/explore"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Compass className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Explore</span>
          </Link>

          <Link
            href="/history"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Clock className="h-5 w-5" />
            <span className="hidden text-sm lg:block">History</span>
          </Link>

          <Link
            href="/saved"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Bookmark className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Saved</span>
          </Link>

          <Link
            href="/liked"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Liked</span>
          </Link>

          <Link
            href="/downloads"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Download className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Downloads</span>
          </Link>

          <Link
            href="/subscriptions"
            className="mt-1 flex w-full items-center justify-center lg:justify-start gap-3 rounded-md px-3 py-2 text-gray-400 hover:text-primary"
          >
            <Users className="h-5 w-5" />
            <span className="hidden text-sm lg:block">Subscriptions</span>
          </Link>

          <div className="mt-6 w-full pt-3 hidden lg:block">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
              Categories
            </h3>
            <div className="mt-2 flex w-full flex-col space-y-1">
              {[
                { name: "Technology", icon: Rocket },
                { name: "Music", icon: Music },
                { name: "Education", icon: BookOpen },
                { name: "Science", icon: Brain },
                { name: "Culture", icon: Globe },
                { name: "Movies", icon: Film },
                { name: "Podcasts", icon: Mic },
                { name: "People", icon: Users },
              ].map(({ name, icon: Icon }, index) => (
                <Link
                  key={index}
                  href={`/category/${name.toLowerCase()}`}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden truncate lg:block">{name}</span>
                </Link>
              ))}
              <Link
                href="/categories"
                className="mt-2 text-xs text-primary px-3 py-1 hover:underline"
              >
                All Categories
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full pt-4">
          <div className="hidden lg:flex justify-center text-[10px] text-gray-500 gap-2">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contacts" className="hover:underline">
              Contacts
            </Link>
            <Link href="/ux-report" className="hover:underline">
              UX-Report
            </Link>
            <Link href="/help" className="hover:underline">
              Help
            </Link>
            <span>@2025</span>
          </div>
        </div>
      </div>
    </div>
  )
}
