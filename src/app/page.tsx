"use client";
import { DraggableMotion } from "@/components/custom/draggable-motion";
import DailyToolStack from "@/components/pages/homepage/daily-tool-stack";
import Links from "@/components/pages/homepage/links";
import Status from "@/components/pages/homepage/status";
import TechStack from "@/components/pages/homepage/techstack";
import { useState, useCallback, memo } from "react";
// import { useMediaQuery } from "react-responsive";

const MemoizedLinks = memo(Links);
const MemoizedDailyToolStack = memo(DailyToolStack);

export default function Home() {
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // const isAboveMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const handleDragStateChange = useCallback((dragging: boolean) => {
    setIsDragging(dragging);
  }, []);

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center rounded-lg p-4">
        <div className="mx-auto grid size-full max-h-screen max-w-[1000px] gap-2 md:max-h-[80vh] md:grid-cols-8 md:grid-rows-5 lg:gap-3">
          <DraggableMotion
            id="tech-stack"
            className="md:col-span-2 md:row-span-4"
            // initial={{ translateX: isAboveMobile ? -50 : 0, opacity: 0 }}
            // whileInView={{ translateX: 0, opacity: 1 }}
            // transition={{ duration: 0.75 }}
            // viewport={{ once: true }}
          >
            <TechStack />
          </DraggableMotion>
          <DraggableMotion
            id="status"
            className="max-md:row-start-1 md:col-span-4 md:row-span-2"
            // initial={{ translateY: isAboveMobile ? -50 : 0, opacity: 0 }}
            // whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.75 }}
            // viewport={{ once: true }}
          >
            <Status />
          </DraggableMotion>
          <DraggableMotion
            id="links"
            className="max-md:row-start-2 md:col-span-2 md:row-span-1"
            // initial={{ translateX: isAboveMobile ? 50 : 0, opacity: 0 }}
            // whileInView={{ translateX: 0, opacity: 1 }}
            // transition={{ duration: 0.75 }}
            // viewport={{ once: true }}
            onDragStateChange={handleDragStateChange}
          >
            <MemoizedLinks
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
              isDragging={isDragging}
            />
          </DraggableMotion>
          {/* <motion.div
          className="md:col-span-2"
          // initial={{ translateX: isAboveMobile ? 50 : 0, opacity: 0 }}
          // whileInView={{ translateX: 0, opacity: 1 }}
          // transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <ProjectComponent />
        </motion.div> */}
          <DraggableMotion
            id="daily-tool-stack"
            className="md:col-span-4 md:row-span-4"
            // initial={{ translateY: isAboveMobile ? 50 : 0, opacity: 0 }}
            // whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.75 }}
            // viewport={{ once: true }}
          >
            <MemoizedDailyToolStack
              currentContext={currentContext}
              setCurrentContext={setCurrentContext}
            />
          </DraggableMotion>
        </div>
      </div>
    </>
  );
}
