"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Bookmark, User } from "lucide-react"
import clsx from "clsx"

const navItems = [
  { href: "/", icon: Home },
  { href: "/search", icon: Search },
  { href: "/bookmarks", icon: Bookmark },
  { href: "/auth", icon: User },
]

export default function MobileNavbar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 h-16 items-center bg-[#1A1A1A]/10 backdrop-blur-[16px] md:hidden">
      {navItems.map(({ href, icon: Icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center justify-center h-full transition",
              isActive ? "text-[#4639B3]" : "text-white/70 hover:text-[#4639B3]"
            )}
          >
            <Icon className="h-6 w-6" />
          </Link>
        )
      })}
    </div>
  )
}
