"use client";
import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="banner-1"
        className="fixed top-0 left-0 z-[1000] min-h-screen w-1/4 bg-zinc-950"
      />
      <div
        id="banner-2"
        className="fixed top-0 left-1/4 z-[1000] min-h-screen w-1/4 bg-zinc-950"
      />
      <div
        id="banner-3"
        className="fixed top-0 left-2/4 z-[1000] min-h-screen w-1/4 bg-zinc-950"
      />
      <div
        id="banner-4"
        className="fixed top-0 left-3/4 z-[1000] min-h-screen w-1/4 bg-zinc-950"
      />
      {children}
    </div>
  );
}
