import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import MobileNavbar from "@/components/mobile-navbar"
import { AudioPlayerProvider } from "@/components/AudioPlayerProvider"
import Player_MobileView from "@/components/Player_MobileView"
import AudioPlayer from "@/components/AudioPlayer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ListenMode",
  description: "A podcast platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AudioPlayerProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="mt-16 w-full md:ml-16 lg:ml-64">{children}</main>
            </div>
            <MobileNavbar />
            <Player_MobileView />
            <AudioPlayer />
          </div>
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
