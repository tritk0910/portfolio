"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { createContext, useContext, useRef, useState } from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const HolofoilCard = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // For 3D rotation
    const rotateX = (e.clientX - left - width / 2) / 25;
    const rotateY = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;

    // For holographic effect position
    const normalizedX = (e.clientX - left) / width - 0.5;
    const normalizedY = (e.clientY - top) / height - 0.5;
    setPosition({ x: normalizedX, y: normalizedY });
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "120px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className,
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Original children */}
          {children}

          {/* Holographic effect overlay */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xl bg-no-repeat opacity-0 transition-opacity duration-300",
              isMouseEntered ? "opacity-75" : "",
            )}
            style={{
              background: `
                linear-gradient(
                  125deg,
                  #f80e35 0%,
                  #ff3366 10%,
                  #eedf10 25%,
                  #21e985 40%,
                  #0dbde9 55%,
                  #c929f1 70%,
                  #f80e35 85%,
                  #f80e35 100%
                )
              `,
              backgroundSize: "400% 400%",
              mixBlendMode: "color-dodge",
              backgroundPosition: `${50 + x * 80}% ${50 + y * 80}%`,
              transform: "translateZ(20px)",
            }}
          />

          {/* Light reflection effect */}
          {/* <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300",
              isMouseEntered ? "opacity-100" : "",
            )}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
              backgroundSize: "150% 150%",
              backgroundPosition: `${50 + x * 100}% ${50 + y * 100}%`,
              mixBlendMode: "overlay",
              transform: "translateZ(40px)",
            }}
          /> */}

          {/* Shimmer effect */}
          {/* <div
            className={cn(
              "pointer-events-none absolute inset-0 z-15 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300",
              isMouseEntered ? "opacity-60" : "",
            )}
            style={{
              backgroundImage: `
                linear-gradient(
                  ${45 + x * 30}deg,
                  transparent 20%, 
                  rgba(255, 255, 255, 0.6) 45%,
                  rgba(255, 255, 255, 0.6) 55%, 
                  transparent 80%
                )
              `,
              backgroundSize: "400% 400%",
              backgroundPosition: `${x * 100 + 50}% ${y * 100 + 50}%`,
              backgroundRepeat: "no-repeat",
              mixBlendMode: "overlay",
              animation: "shimmerEffect 1.5s ease-in-out infinite",
              transform: "translateZ(30px)",
            }}
          /> */}

          {/* Card border glow */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-0 rounded-xl opacity-0 transition-opacity duration-300",
              isMouseEntered ? "opacity-100" : "",
            )}
            style={{
              background: `
                linear-gradient(
                  125deg,
                  #f80e35 0%,
                  #ff3366 10%,
                  #eedf10 25%,
                  #21e985 40%,
                  #0dbde9 55%,
                  #c929f1 70%,
                  #f80e35 85%,
                  #f80e35 100%
                )
              `,
              backgroundSize: "300% 300%",
              filter: "blur(16px)",
              backgroundPosition: `${50 + x * 80}% ${50 + y * 80}%`,
              transform: "translateZ(-20px) scale(1.05)",
            }}
          />
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
