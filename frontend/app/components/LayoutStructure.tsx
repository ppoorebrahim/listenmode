'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/sidebar";
import MobileNavbar from "@/components/mobile-navbar";
import Player_MobileView from "@/components/Player_MobileView";
import AudioPlayer from "@/components/AudioPlayer";
import clsx from "clsx";

export default function LayoutStructure({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const isHomePage = pathname === "/";
  const disableScrollbarOnMobile = ["/search", "/bookmarks", "/auth"].some(p => pathname.startsWith(p));

  return (
    <div className={`flex flex-col min-h-[100dvh] ${isHomePage ? 'pt-16' : 'pt-3'}`}>
      <div className="flex flex-1 relative">
        {!isAuthPage && <Sidebar />}
        <main
          className={clsx(
            !isAuthPage && "md:ml-16 lg:ml-64",
            "w-full overflow-y-auto",
            disableScrollbarOnMobile && "scrollbar-none md:scrollbar"
          )}
        >
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
  );
}
