"use client";

import MaxWidthCenteredComponent from "@/components/custom/max-width-centered";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden p-4">
      {/* Background pattern */}
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.3}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "absolute",
        )}
      />

      {/* Not found content */}
      <MaxWidthCenteredComponent className="z-10 flex flex-col text-center">
        <h1 className="font-akira mb-4 text-2xl md:text-6xl">404 Not Found</h1>
        <p className="mb-8 text-xl">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-primary text-secondary rounded-md px-4 py-2 transition-opacity hover:opacity-90"
        >
          Return Home
        </Link>
      </MaxWidthCenteredComponent>
    </div>
  );
}
