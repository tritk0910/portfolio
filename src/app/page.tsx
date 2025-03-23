"use client";
import { DraggableMotion } from "@/components/custom/draggable-motion";
import DailyToolStack from "@/components/pages/homepage/daily-tool-stack";
import Links from "@/components/pages/homepage/links";
import Status from "@/components/pages/homepage/status";
import TechStack from "@/components/pages/homepage/techstack";
import { memo, useCallback, useEffect, useState } from "react";
import { MouseParallaxChild } from "react-parallax-mouse";
// import { useMediaQuery } from "react-responsive";

const MemoizedLinks = memo(Links);
const MemoizedDailyToolStack = memo(DailyToolStack);

export default function Home() {
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
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
    <div className="relative top-0 flex h-full flex-col items-center justify-center rounded-lg p-4 select-none">
      <div className="mx-auto grid size-full min-h-screen max-w-[1000px] gap-2 md:min-h-[770px] md:grid-cols-8 md:grid-rows-5 lg:gap-3">
        <MouseParallaxChild className="md:col-span-2 md:row-span-4">
          <DraggableMotion id="tech-stack">
            <TechStack />
          </DraggableMotion>
        </MouseParallaxChild>
        <MouseParallaxChild className="max-md:row-start-1 md:col-span-4 md:row-span-2">
          <DraggableMotion id="status" className="size-full">
            <Status />
          </DraggableMotion>
        </MouseParallaxChild>

        <MouseParallaxChild className="max-md:row-start-2 md:col-span-2 md:row-span-1">
          <DraggableMotion id="links" onDragStateChange={handleDragStateChange}>
            <MemoizedLinks
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
              isDragging={isDragging}
            />
          </DraggableMotion>
        </MouseParallaxChild>

        {/* <motion.div
          className="md:col-span-2"
        >
          <ProjectComponent />
        </motion.div> */}
        <MouseParallaxChild className="md:col-span-4 md:row-span-4">
          <DraggableMotion id="daily-tool-stack">
            <MemoizedDailyToolStack
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
            />
          </DraggableMotion>
        </MouseParallaxChild>
      </div>
    </div>
  );
}
