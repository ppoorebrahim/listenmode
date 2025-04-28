"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileNavbar from "@/components/mobile-navbar";
import AudioPlayerWrapper from "@/components/AudioPlayerWrapper";
import Navbar from "@/components/navbar";
import clsx from "clsx";

export default function LayoutStructure({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAuthPage = pathname?.startsWith("/auth");
  const isHomePage = pathname === "/";
  const isUploadPage = pathname === "/upload";
  const isProfilePage = pathname === "/me";

  const disableScrollbarOnMobile = ["/search", "/bookmarks", "/auth"].some((p) =>
    pathname.startsWith(p)
  );

  const hideTopNavbar =
    isMobile &&
    (isUploadPage ||
      isProfilePage ||
      pathname.startsWith("/podcast") ||
      pathname.startsWith("/episode"));

  const hideBottomNavbar = isMobile && isUploadPage;

  return (
    <div
      className={clsx(
        "flex flex-col min-h-[100dvh] text-white bg-black",
        isHomePage ? "pt-16" : "pt-3"
      )}
    >
      {/* Top Navbar */}
      {!hideTopNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      )}

      {/* Main Content Area */}
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

      {/* Mobile Bottom Navbar */}
      {!hideBottomNavbar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          <MobileNavbar />
        </div>
      )}

      {/* Audio Player (Mobile & Desktop) */}
      {!hideBottomNavbar && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AudioPlayerWrapper />
        </div>
      )}
    </div>
  );
}
