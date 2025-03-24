"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";

export default function ParallaxProvider({ children }: PropsWithChildren) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const randomizeVideoBackground = () => {
    const urlPath = "/video/video-";
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    setVideoUrl(`${urlPath}${randomNumber}.mp4`);
  };

  useEffect(() => {
    randomizeVideoBackground();
  }, [videoUrl]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!videoUrl) {
    return null;
  }

  // For mobile devices, render without parallax
  if (isMobile) {
    return (
      <div className="relative top-0 flex min-h-screen flex-col items-center justify-center rounded-lg">
        {children}
        <div className="fixed top-0 -z-10 size-full scale-110">
          <video
            src={videoUrl}
            muted
            autoPlay
            loop
            className="size-full object-cover object-center opacity-50"
          />
        </div>
      </div>
    );
  }

  // For desktop, keep the parallax effect
  return (
    <MouseParallaxContainer
      globalFactorX={0.02}
      globalFactorY={0.02}
      className="relative top-0 flex min-h-screen flex-col items-center justify-center rounded-lg"
    >
      <>{children}</>
      <MouseParallaxChild
        inverted
        factorX={0.7}
        factorY={0.8}
        className="fixed top-0 -z-10 size-full scale-110"
      >
        <video
          src={videoUrl}
          muted
          autoPlay
          loop
          className="size-full object-cover object-center opacity-0 transition-all duration-500"
          onLoadedData={(e) => {
            e.currentTarget.classList.replace("opacity-0", "opacity-50");
          }}
        />
      </MouseParallaxChild>
    </MouseParallaxContainer>
  );
}
