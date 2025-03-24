"use client";
import Card from "@/components/custom/card";
import { DraggableMotion } from "@/components/custom/draggable-motion";
import Cubes from "@/components/pages/homepage/cubes";
import DailyToolStack from "@/components/pages/homepage/daily-tool-stack";
import Links from "@/components/pages/homepage/links";
import Status from "@/components/pages/homepage/status";
import TechStack from "@/components/pages/homepage/techstack";
import { avatarUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import { MouseParallaxChild } from "react-parallax-mouse";
// import { useMediaQuery } from "react-responsive";

const MemoizedLinks = memo(Links);
const MemoizedDailyToolStack = memo(DailyToolStack);

export default function Home() {
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const isAboveMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const handleDragStateChange = useCallback((dragging: boolean) => {
    setIsDragging(dragging);
  }, []);

  // Fix for SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative top-0 flex h-full flex-col items-center justify-center rounded-lg p-4 select-none md:py-8">
      <div className="mx-auto grid size-full min-h-screen max-w-[1200px] gap-2 md:min-h-[770px] md:grid-cols-8 md:grid-rows-[repeat(auto-fit,minmax(50px,140px))] lg:gap-3">
        <MouseParallaxChild className="md:col-span-2 md:row-span-4">
          <DraggableMotion id="tech-stack">
            <TechStack />
          </DraggableMotion>
        </MouseParallaxChild>
        <MouseParallaxChild className="max-md:row-start-1 md:col-span-4 md:row-span-2">
          <DraggableMotion id="status" className="size-full">
            <Status setIsModalOpen={setIsModalOpen} />
          </DraggableMotion>
        </MouseParallaxChild>

        <MouseParallaxChild className="max-md:row-start-2 md:col-span-2 md:row-span-1">
          <DraggableMotion
            id="links"
            onDragStateChange={handleDragStateChange}
            className="size-full"
          >
            <MemoizedLinks
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
              isDragging={isDragging}
            />
          </DraggableMotion>
        </MouseParallaxChild>

        <MouseParallaxChild className="size-full max-md:invisible md:col-span-2 md:row-span-2">
          <Card className="relative">
            <Cubes />
          </Card>
        </MouseParallaxChild>
        <MouseParallaxChild className="md:col-span-4 md:row-span-4">
          <DraggableMotion id="daily-tool-stack" className="size-full">
            <MemoizedDailyToolStack
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
            />
          </DraggableMotion>
        </MouseParallaxChild>
      </div>
      <div className="mx-auto w-[80%] py-5 text-end md:hidden">
        <div className="bg-muted-foreground dark:bg-muted h-px" />
        <span className="text-muted-foreground dark:text-muted px-5 font-mono font-bold lowercase">
          Peace out.
        </span>
      </div>

      {/* Image Modal Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/70 opacity-100 backdrop-blur-xl transition-all",
          { "pointer-events-none opacity-0": !isModalOpen },
        )}
        onClick={() => setIsModalOpen(false)}
      >
        <MouseParallaxChild
          inverted
          className="relative max-h-[90vh] max-w-[90vw]"
        >
          <Image
            src={avatarUrl}
            alt="avatar"
            width={500}
            height={500}
            className="rounded-lg object-cover object-center"
            onClick={(e) => e.stopPropagation()}
          />
        </MouseParallaxChild>
      </div>
    </div>
  );
}
