"use client";
import { links } from "@/lib/constant";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import Card from "../../custom/card";

export default function Links({
  currentContext,
  setCurrentContext,
  isDragging = false,
}: {
  currentContext: string | null;
  setCurrentContext: (context: string) => void;
  isDragging?: boolean;
}) {
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null,
  );

  return (
    <TooltipProvider>
      <Tooltip
        open={hoveredButtonIndex !== null && !isDragging}
        delayDuration={0}
      >
        <div className="pointer relative mx-auto flex h-full w-fit gap-2 max-md:justify-center md:mr-auto md:ml-0 md:grid md:grid-cols-[repeat(3,minmax(60px,60px))] md:grid-rows-[repeat(auto-fit,minmax(60px,60px))]">
          <TooltipContent className="px-5 py-0">
            <p className="font-space text-lg font-extrabold lowercase">
              {hoveredButtonIndex !== null
                ? links[hoveredButtonIndex].label
                : currentContext}
            </p>
          </TooltipContent>

          <TooltipTrigger asChild>
            <div className="overflow-hidden rounded-sm text-3xl leading-none font-extrabold whitespace-pre-line uppercase max-md:hidden">
              Lin{"\n"}ks.
            </div>
          </TooltipTrigger>
          {links.map(({ content, label }, index) => (
            <Card
              className="size-full max-md:size-[55px]"
              key={index}
              onMouseEnter={() => setHoveredButtonIndex(index)}
              onMouseLeave={() => {
                setHoveredButtonIndex(null);
                setCurrentContext(label);
              }}
            >
              {content}
            </Card>
          ))}
        </div>
      </Tooltip>
    </TooltipProvider>
  );
}
