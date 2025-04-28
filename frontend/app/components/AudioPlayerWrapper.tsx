"use client";

import { useAudioPlayer } from "@/components/AudioPlayerProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PlayerMobile from "@/components/PlayerMobile";
import PlayerDesktop from "@/components/PlayerDesktop";

export default function AudioPlayerWrapper() {
  const { audio, isVisible } = useAudioPlayer();
  const isMobile = useMediaQuery("(max-width:400px)");

  if (!isVisible) return null; // فقط همین شرط!

  const audioUrl = audio?.audioUrl || "/audio/sample.mp3";
  const thumbnailUrl = audio?.thumbnailUrl || "/placeholder.svg";
  const title = audio?.title || "Sample Episode";
  const show = audio?.show || "Sample Podcast";

  return isMobile ? (
    <PlayerMobile
      audioUrl={audioUrl}
      title={title}
      show={show}
      thumbnailUrl={thumbnailUrl}
    />
  ) : (
    <PlayerDesktop
      audioUrl={audioUrl}
      title={title}
      show={show}
      thumbnailUrl={thumbnailUrl}
    />
  );
}
