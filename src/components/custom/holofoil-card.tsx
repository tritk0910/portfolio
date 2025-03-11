"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HolofoilCardProps {
  imagePath: string;
  alt?: string;
  className?: string;
}

export function HolofoilCard({
  imagePath,
  alt = "Card image",
  className,
}: HolofoilCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate position relative to card center (values from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-sm transition-transform duration-200",
        "h-full w-full transform-gpu",
        hovered ? "scale-105" : "",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: hovered
          ? `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`
          : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card image */}
      <div className="absolute inset-0 z-10">
        <Image
          src={imagePath || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Holofoil effect overlay */}
      <div
        className={cn(
          "absolute inset-0 z-20 opacity-0 transition-opacity duration-300",
          hovered ? "opacity-60" : "",
        )}
        style={{
          background: `
            linear-gradient(
              125deg,
              #f80e35,
              #eedf10,
              #21e985,
              #0dbde9,
              #c929f1,
              #f80e35
            )
          `,
          backgroundSize: "400% 400%",
          mixBlendMode: "color-dodge",
          animation: "holoGradient 3s ease infinite",
          filter: "brightness(1.2) contrast(1.2)",
          backgroundPosition: `${50 + x * 100}% ${50 + y * 100}%`,
        }}
      />

      {/* Light reflection effect */}
      {/* <div
        className={cn(
          "absolute inset-0 z-30 opacity-0 transition-opacity duration-300",
          hovered ? "opacity-100" : "",
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          backgroundSize: "200% 200%",
          backgroundPosition: `${50 + x * 100}% ${50 + y * 100}%`,
          mixBlendMode: "overlay",
        }}
      /> */}

      {/* Card border glow */}
      <div
        className={cn(
          "absolute inset-0 z-0 rounded-sm opacity-0 transition-opacity duration-300",
          hovered ? "opacity-100" : "",
        )}
        style={{
          background: `
            linear-gradient(
              125deg,
              #f80e35,
              #eedf10,
              #21e985,
              #0dbde9,
              #c929f1,
              #f80e35
            )
          `,
          backgroundSize: "400% 400%",
          filter: "blur(15px)",
          animation: "holoGradient 3s ease infinite",
          transform: "scale(1.03)",
        }}
      />
    </div>
  );
}
