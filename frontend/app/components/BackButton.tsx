"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur"
    >
      <ChevronLeft size={24} className="text-white" />
    </button>
  );
}
