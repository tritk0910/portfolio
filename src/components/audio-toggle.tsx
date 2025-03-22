"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const autoElementRef = useRef<HTMLAudioElement>(null);
  const [audioPath, setAudioPath] = useState<string>("");

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handleRandomAudio = () => {
    const path = "/audio/audio-";
    const randomAudio = Math.floor(Math.random() * 2) + 1;
    setAudioPath(`${path}${randomAudio}.mp3`);
  };

  useEffect(() => {
    if (isAudioPlaying && autoElementRef.current) {
      autoElementRef.current.play();
    } else if (autoElementRef.current) {
      autoElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    handleRandomAudio();
  }, []); // Run once on mount

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleAudioIndicator}
        className="relative gap-1 overflow-hidden"
      >
        <audio
          ref={autoElementRef}
          className="hidden"
          src={audioPath}
          loop
          preload="auto"
        />
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`indicator-line mt-2 !bg-zinc-300 ${isIndicatorActive && "active"}`}
            style={{ animationDelay: `${bar * 0.1}s` }}
          />
        ))}
      </Button>
    </div>
  );
}
