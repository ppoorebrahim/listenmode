import { AudioPlayerProvider } from "@/components/AudioPlayerProvider"
import MobileNavbar from "@/components/mobile-navbar"

export const metadata = {
  title: "Bookmarks | Listenmode",
  description: "Your saved, liked, and downloaded podcasts.",
}

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return (
    <AudioPlayerProvider>
      <div className="bg-black text-white flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto scrollbar-none px-0 pt-0 pb-20 m-0">
          {children}
        </main>
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <MobileNavbar />
        </div>
      </div>
    </AudioPlayerProvider>
  )
}
