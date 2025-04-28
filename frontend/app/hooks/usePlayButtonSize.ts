"use client";

import { useEffect, useState } from "react";

export function usePlayButtonSize(
  variant: "default" | "mini" | "fullscreen" | "cover-mobile" | "cover-desktop",
  baseSize: number = 48
) {
  const [size, setSize] = useState(baseSize);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;

        if (variant === "fullscreen" && isMobile) {
          setSize(48); // ✅ موبایل fullscreen → ثابت 48px
        } else if (variant === "mini" && isMobile) {
          setSize(baseSize * 1.4); // mini موبایل → ۲۰×1.4 = ۲۸px
        } else if (variant === "cover-mobile" && isMobile) {
          setSize(48); // ✅ کاور موبایل → ثابت 48px
        } else if (variant === "cover-desktop" && !isMobile) {
          setSize(48); // کاور دسکتاپ → ثابت 48px
        } else {
          setSize(baseSize); // حالت‌های دیگه طبق baseSize
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [variant, baseSize]);

  return size;
}
