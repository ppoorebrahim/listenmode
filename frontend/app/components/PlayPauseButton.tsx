"use client";

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  size: number; // سایز ورودی حتما باید باشه
}

export default function PlayPauseButton({
  isPlaying,
  onToggle,
  size,
}: PlayPauseButtonProps) {
  const iconSize = size * 0.5;
  const pauseWidth = iconSize * 0.3;
  const pauseHeight = iconSize * 0.8;
  const playTriangleShift = 2;

  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "#4639B3",
      }}
    >
      <div className="relative flex items-center justify-center transition-all duration-300">
        {isPlaying ? (
          <div
            className="flex justify-between items-center"
            style={{
              width: `${iconSize}px`,
              height: `${pauseHeight}px`,
            }}
          >
            <div
              style={{
                width: `${pauseWidth}px`,
                height: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "0.1rem",
              }}
            />
            <div
              style={{
                width: `${pauseWidth}px`,
                height: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "0.1rem",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: `${iconSize / 2}px solid transparent`,
              borderBottom: `${iconSize / 2}px solid transparent`,
              borderLeft: `${iconSize * 0.7}px solid #FFFFFF`,
              borderRadius: "0.2rem",
              transform: `translateX(${playTriangleShift}px)`,
            }}
          />
        )}
      </div>
    </button>
  );
}
