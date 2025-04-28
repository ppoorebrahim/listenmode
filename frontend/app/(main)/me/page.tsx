"use client"

import { LogOut, Mic, Contact, Info, Shield, User, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MobileProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-2 px-4 flex flex-col text-sm">
      
      {/* پروفایل */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/placeholder.svg"
          alt="avatar"
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="text-base font-semibold">Peyman Poorebrahim</div>
          <div className="text-xs text-gray-400">@p.poorebrahim</div>
        </div>
      </div>

      {/* منوها */}
      <div className="w-full flex flex-col divide-y divide-white/10 mb-10">
        <div className="flex items-center justify-between px-1 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Mic className="w-5 h-5" />
            <span>My Podcasts</span>
          </Link>
          <Link
            href="/upload"
            className="text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md text-xs flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Upload
          </Link>
        </div>

        <Link href="/profile" className="flex items-center gap-3 px-1 py-4">
          <User className="w-5 h-5" />
          Profile edit
        </Link>
        <Link href="/policies" className="flex items-center gap-3 px-1 py-4">
          <Shield className="w-5 h-5" />
          Policies
        </Link>
        <Link href="/about" className="flex items-center gap-3 px-1 py-4">
          <Image src="/LogoMark_40-40.svg" alt="Logo" width={24} height={24} />
          About us
        </Link>
        <Link href="/contact" className="flex items-center gap-3 px-1 py-4">
          <Contact className="w-5 h-5" />
          Contact us
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-1 py-4">
          <Info className="w-5 h-5" />
          Help
        </Link>

        <button className="flex items-center gap-3 px-1 py-4 text-red-500">
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>

      {/* شبکه‌های اجتماعی */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-6">
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          <Image src="/icons/telegram.svg" alt="Telegram" width={20} height={20} />
          <Image src="/icons/instagram.svg" alt="Instagram" width={20} height={20} />
          <Image src="/icons/youtube.svg" alt="YouTube" width={20} height={20} />
        </div>
        <div className="text-xs text-gray-400">@Listenmode_ir</div>
      </div>
    </div>
  )
}
