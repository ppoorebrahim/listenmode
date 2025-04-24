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
    <div
      className={clsx(
        "flex flex-col min-h-[100dvh] text-white bg-black",
        isHomePage ? "pt-16" : "pt-3"
      )}
    >
      <div className="flex flex-1 relative">
        {!isAuthPage && <Sidebar />}
        <main
          className={clsx(
            !isAuthPage && "md:ml-16 lg:ml-64",
            "flex-1 overflow-y-auto",
            disableScrollbarOnMobile && "scrollbar-none md:scrollbar"
          )}
        >
          <div className="w-full flex-1 pb-28 px-0">
            {children}
          </div>
        </main>
      </div>

      {/* نوار پایین موبایل - همیشه ثابت و جدا از محتوا */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNavbar />
        <Player_MobileView />
      </div>

      {/* پلیر دسکتاپ - ثابت در پایین صفحه با z-index مناسب */}
      <div className="hidden md:fixed md:bottom-0 md:left-0 md:right-0 md:z-50 md:block">
        <AudioPlayer />
      </div>
    </div>
  );
}
