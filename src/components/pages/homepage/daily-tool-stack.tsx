import { musicUrl, tools } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Card from "../../custom/card";
import { CustomTooltipContent } from "../../custom/custom-tooltip";
import { DraggableHolofoilCard } from "../../custom/draggable-holofoil-card";
import { Ripple } from "../../magicui/ripple";
import { TypingAnimation } from "../../magicui/typing-animation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface DailyToonStackProps {
  setCurrentContext: (context: string) => void;
  currentContext: string | null;
}

export default function DailyToolStack({
  setCurrentContext,
  currentContext,
}: DailyToonStackProps) {
  const [hoveredJoker, setHoveredJoker] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hoveredToolIndex, setHoveredToolIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid h-full justify-items-center gap-2 gap-y-3 md:grid-flow-col md:grid-cols-5 md:grid-rows-7 md:justify-items-end">
        <Card
          className="w-fit justify-self-center max-md:overflow-x-auto md:row-span-7"
          innerClassName="p-2 md:w-fit size-full flex items-center max-md:overflow-x-auto gap-2"
        >
          <div className="grid gap-2 max-md:grid-cols-[repeat(6,minmax(0,3rem))] md:grid-rows-[repeat(6,minmax(0,3rem))] md:flex-col">
            {tools.map(({ label, src, invertable, expandable }, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredToolIndex(index)}
                onMouseLeave={() => {
                  setHoveredToolIndex(null);
                  setCurrentContext(label);
                }}
                className="aspect-square shrink-0 overflow-hidden rounded-lg bg-zinc-800 opacity-90 transition-all duration-300 ease-in-out hover:scale-125 dark:bg-white"
              >
                <Image
                  className={cn("aspect-square p-1.5", {
                    "invert dark:invert-0": invertable,
                    "p-0": expandable,
                  })}
                  width={500}
                  height={500}
                  alt={label}
                  src={src}
                />
              </div>
            ))}
          </div>
        </Card>
        <div className="row-span-2 row-start-1 w-full md:col-span-2">
          <TooltipProvider>
            <Tooltip open={hoveredToolIndex !== null} delayDuration={0}>
              <div className="flex flex-col font-mono text-wrap break-words">
                <p className="text-4xl leading-none font-extrabold uppercase">
                  Daily
                </p>{" "}
                <TooltipTrigger asChild>
                  <span className="font-space w-fit text-3xl leading-none">
                    Tool
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" className="px-5 py-0">
                  <p className="font-space text-lg font-extrabold lowercase">
                    {hoveredToolIndex !== null
                      ? tools[hoveredToolIndex].label
                      : currentContext}
                  </p>
                </TooltipContent>
                <p className="text-5xl leading-none font-extrabold text-nowrap uppercase">
                  Stack
                </p>
              </div>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative row-span-1 size-full overflow-hidden rounded-xl max-md:hidden md:col-span-2 md:justify-self-start">
          <Image
            fill
            className="object-cover object-center transition hover:scale-125"
            alt="watch-tower"
            src="/imgs/watchtower.png"
          />
        </div>
        <div className="group relative flex w-fit items-center justify-center overflow-hidden rounded-xl md:col-span-2 md:row-span-3 md:size-full">
          <Image
            width={700}
            height={700}
            alt="spotify"
            className="scale-125 bg-cover bg-center"
            src={musicUrl.thumbnail}
          />
          <a
            href={musicUrl.url}
            target="_blank"
            className="absolute right-0 bottom-0 m-3 translate-x-2 translate-y-7 scale-50 opacity-0 transition duration-300 group-hover:translate-0 group-hover:scale-100 group-hover:opacity-100"
          >
            <div className="rounded-full border border-zinc-700 bg-zinc-900/70 p-[1px]">
              <div className="rounded-full border border-zinc-500 p-2">
                <Play className="size-4 fill-white stroke-white" />
              </div>
            </div>
          </a>
        </div>
        <div className="row-span-1 size-full rounded-xl md:col-span-2">
          <a
            href={musicUrl.url}
            target="_blank"
            className="font-circular text-2xl font-extrabold"
          >
            {musicUrl.title}
          </a>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{musicUrl.artist}</span>
            <span className="text-muted-foreground font-mono">
              {musicUrl.year}
            </span>
          </div>
        </div>
        <div className="row-span-4 size-full max-md:hidden md:col-span-2">
          <TooltipProvider>
            <Tooltip
              open={hoveredJoker && !isDragging && !isAnimating}
              delayDuration={0}
            >
              <DraggableHolofoilCard
                id="joker-card"
                className="m-3"
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                setIsAnimating={setIsAnimating}
              >
                <TooltipTrigger
                  asChild
                  onMouseEnter={() => setHoveredJoker(true)}
                  onMouseLeave={() => setHoveredJoker(false)}
                >
                  <Image
                    width={300}
                    height={300}
                    className="transition-transform hover:scale-115"
                    src="/imgs/joker.webp"
                    alt="Joker card"
                  />
                </TooltipTrigger>
              </DraggableHolofoilCard>
              <CustomTooltipContent side="right">
                <TypingAnimation
                  duration={30}
                  className="font-balatro text-base"
                >
                  I&apos;m here for fun
                </TypingAnimation>
              </CustomTooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Link
          href={"/timelines"}
          className="relative row-span-3 flex size-full cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all hover:scale-95 max-md:min-h-[300px] md:col-span-2"
        >
          <p className="font-montserrat z-10 pr-2 text-center text-2xl font-bold tracking-tight text-white uppercase italic lg:text-3xl">
            Timelines
          </p>
          <Ripple mainCircleSize={80} mainCircleOpacity={0.4} />
        </Link>
      </div>
      <div className="mx-auto w-[80%] py-5 text-end md:hidden">
        <div className="bg-muted-foreground dark:bg-muted h-px" />
        <span className="text-muted-foreground dark:text-muted px-5 font-mono font-bold lowercase">
          Peace out.
        </span>
      </div>
    </>
  );
}
