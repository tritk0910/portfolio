"use client";
import { DraggableMotion } from "@/components/custom/draggable-motion";
import ProjectComponent from "@/components/pages/homepage/project-component";
import DailyToolStack from "@/components/pages/homepage/daily-tool-stack";
import Links from "@/components/pages/homepage/links";
import Status from "@/components/pages/homepage/status";
import TechStack from "@/components/pages/homepage/techstack";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isAboveMobile = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center rounded-lg p-4">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.3}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="mx-auto grid size-full max-h-screen max-w-[1000px] gap-2 md:max-h-[80vh] md:grid-cols-8 md:grid-rows-5 lg:gap-3">
        <DraggableMotion
          id="tech-stack"
          className="md:col-span-2 md:row-span-4"
          initial={{ translateX: isAboveMobile ? -50 : 0, opacity: 0 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <TechStack />
        </DraggableMotion>
        <DraggableMotion
          id="status"
          className="max-md:row-start-1 md:col-span-4 md:row-span-2"
          initial={{ translateY: isAboveMobile ? -50 : 0, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <Status />
        </DraggableMotion>
        <DraggableMotion
          id="links"
          className="max-md:row-start-2 md:col-span-2 md:row-span-1"
          initial={{ translateX: isAboveMobile ? 50 : 0, opacity: 0 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          onDragStateChange={(dragging) => setIsDragging(dragging)}
        >
          <Links
            currentContext={currentContext}
            setCurrentContext={setCurrentContext}
            isDragging={isDragging}
          />
        </DraggableMotion>
        <motion.div
          className="md:col-span-2"
          initial={{ translateX: isAboveMobile ? 50 : 0, opacity: 0 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <ProjectComponent />
        </motion.div>
        <DraggableMotion
          id="daily-tool-stack"
          className="md:col-span-4 md:row-span-4"
          initial={{ translateY: isAboveMobile ? 50 : 0, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <DailyToolStack
            currentContext={currentContext}
            setCurrentContext={setCurrentContext}
          />
        </DraggableMotion>
      </div>
    </div>
  );
}
