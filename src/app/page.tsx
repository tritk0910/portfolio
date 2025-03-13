"use client";
import { CustomTooltipContent } from "@/components/custom/custom-tooltip";
import { DraggableHolofoilCard } from "@/components/custom/draggable-holofoil-card";
import ProjectComponent from "@/components/custom/project-component";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Ripple } from "@/components/magicui/ripple";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { ThemeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  isAvailableForWork,
  links,
  musicUrl,
  techStacks,
  tools,
} from "@/lib/constant";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Download, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "../components/custom/card";
import { MorphingText } from "../components/magicui/morphing-text";

const format = "MM/DD/YY, h:mm:ss A";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null,
  );
  const [hoveredToolIndex, setHoveredToolIndex] = useState<number | null>(null);
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [hoveredJoker, setHoveredJoker] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const downloadCv = () => {
    const cv = "/downloads/cv.pdf";
    const link = document.createElement("a");
    link.href = cv;
    link.download = "resume.pdf";
    link.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format(format));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center rounded-lg p-4 md:overflow-hidden">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.3}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="mx-auto grid size-full max-h-screen max-w-[1000px] gap-2 md:max-h-[80vh] md:grid-cols-8 md:grid-rows-10 lg:gap-3">
        <Card
          className="group/card min-h-0 font-mono md:col-span-2 md:row-span-8"
          innerClassName="flex flex-col overflow-y-hidden"
        >
          <div>
            <div className="p-3 text-5xl leading-12 font-bold uppercase">
              <h1 className="pb-2 text-4xl">
                <span className="pr-1">{"{"}</span>
                <span className="transition-all group-hover/card:pl-3">
                  {"}"}
                </span>
              </h1>
              <p className="whitespace-pre-line">Tech {"\n"}Stack</p>
            </div>
            <div className="h-1 w-0 rounded-lg bg-white transition-all duration-500 group-hover/card:w-[80%]" />
          </div>
          <div className="overflow-y-auto">
            {Object.entries(techStacks[0]).map(([category, technologies]) => (
              <div key={category} className="font-space p-4">
                <h2>{category}:</h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge variant="secondary" key={index}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="max-md:row-start-1 md:col-span-4 md:row-span-4">
          <div className="flex h-full flex-col justify-between p-3 max-md:min-h-72">
            <div>
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Image
                    width={60}
                    height={60}
                    src={"/imgs/avatar.jpg"}
                    alt="avatar"
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">Neo.</p>
                    <p className="text-zinc-500">_zos</p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
              <div className="mt-5 flex flex-col">
                <div className="flex justify-start gap-2 text-[18pt] text-nowrap">
                  I build{" "}
                  <MorphingText
                    className="relative top-1.5 !h-10 !text-[18pt]"
                    texts={["Frontends", "Backends", "WebApps"]}
                  />
                </div>
                <div className="mt-2 flex gap-2 text-[10pt] whitespace-pre-line">
                  Hello! My name is Khai Tri! {"\n"}a 22 year old developer from
                  Vietnam.
                </div>
              </div>
            </div>
            <div className="font-space flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-muted-foreground font-mono text-[10px] whitespace-pre-line">
                  &quot;How do I center {"\n"}a div again??&quot;
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={downloadCv}
                    className="cursor-pointer transition-transform hover:scale-125"
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end text-end">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  {isAvailableForWork ? (
                    <StatusIndicator
                      className={cn("size-2 rounded-full bg-green-500")}
                      text="Available for work"
                    />
                  ) : (
                    <StatusIndicator
                      className={cn("size-2 rounded-full bg-red-500")}
                      text="Not available right now"
                    />
                  )}
                </div>
                <div className="text-muted-foreground/50 font-digital flex items-center gap-2 text-sm">
                  {currentTime}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="max-md:row-start-2 md:col-span-2 md:row-span-2">
          <TooltipProvider>
            <Tooltip open={hoveredButtonIndex !== null} delayDuration={0}>
              <div className="relative mx-auto flex gap-1 max-md:justify-center md:grid md:grid-cols-[repeat(3,60px)] md:grid-rows-[repeat(2,60px)]">
                <TooltipContent className="px-5 py-0">
                  <p className="font-space text-lg font-extrabold lowercase">
                    {hoveredButtonIndex !== null
                      ? links[hoveredButtonIndex].label
                      : currentContext}
                  </p>
                </TooltipContent>

                <TooltipTrigger asChild>
                  <div className="size-[60px] overflow-hidden rounded-sm text-3xl leading-none font-extrabold whitespace-pre-line uppercase max-md:hidden">
                    Lin{"\n"}ks.
                  </div>
                </TooltipTrigger>
                {links.map(({ content, label }, index) => (
                  <Card
                    className="max-md:size-[55px]"
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
        </div>
        <ProjectComponent className="md:col-span-2" />
        <div className="md:col-span-4 md:row-span-8">
          <div className="grid h-full justify-items-center gap-2 gap-y-3 md:grid-flow-col md:grid-cols-5 md:grid-rows-7 md:justify-items-end">
            <Card
              className="w-fit max-md:overflow-x-auto md:row-span-7"
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
            <div className="row-start-1 w-full md:col-span-2 md:row-span-2">
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
            <div className="overflow-hidden rounded-xl max-md:hidden md:col-span-2 md:w-[90%] md:justify-self-start">
              <Image
                width={300}
                height={300}
                alt="watch-tower"
                className="relative bg-cover bg-center md:bottom-5"
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
            <div className="relative row-span-3 flex size-full cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all hover:scale-95 max-md:min-h-[300px] md:col-span-2">
              <p className="font-montserrat z-10 pr-2 text-center text-2xl font-bold tracking-tight text-white uppercase italic lg:text-3xl">
                Timelines
              </p>
              <Ripple mainCircleSize={80} mainCircleOpacity={0.4} />
            </div>
          </div>
          <div className="mx-auto w-[80%] py-5 text-end md:hidden">
            <div className="bg-muted-foreground dark:bg-muted h-px" />
            <span className="text-muted-foreground dark:text-muted px-5 font-mono font-bold lowercase">
              Peace out.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatusIndicator = ({
  className,
  text,
}: {
  className: string;
  text: string;
}) => (
  <>
    <span className={className} /> {text}
  </>
);
