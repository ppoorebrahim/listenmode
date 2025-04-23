import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import MobileNavbar from "@/components/mobile-navbar"
import Player_MobileView from "@/components/Player_MobileView"
import AudioPlayer from "@/components/AudioPlayer"
import { AudioPlayerProvider } from "@/components/AudioPlayerProvider"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ListenMode",
  description: "A podcast platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <AudioPlayerProvider>
            <div className="flex flex-col min-h-[100dvh]">
              <Navbar />
              <div className="flex flex-1 relative">
                <Sidebar />
                <main className="w-full mt-16 md:ml-16 lg:ml-64 overflow-y-auto">
                  {children}
                </main>
              </div>
              <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <MobileNavbar />
                <Player_MobileView />
              </div>
              <div className="hidden md:block">
                <AudioPlayer />
              </div>
            </div>
          </AudioPlayerProvider>
        </Providers>
      </body>
    </html>
  )
}
