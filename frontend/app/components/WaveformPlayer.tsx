"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioPlayer } from "@/components/AudioPlayerProvider";

export default function WaveformPlayer() {
  const { audio } = useAudioPlayer();
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current || !audio?.audioUrl) return;

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#666",
      progressColor: "#4639B3",
      cursorColor: "#4639B3",
      barWidth: 2,
      height: 48,
      normalize: true,
      backend: "WebAudio", // ✅ بجای MediaElement
      url: audio.audioUrl, // ✅ مستقیم فایل صوتی
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audio?.audioUrl]);

  return (
    <div className="w-full">
      <div ref={containerRef} />
    </div>
  );
}
