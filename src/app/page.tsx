"use client";
import { HolofoilCard } from "@/components/custom/holofoil-card";
import ProjectComponent from "@/components/custom/project-component";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { ThemeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isAvailableForWork, musicUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Download, Play } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";
import Card from "../components/custom/card";
import { MorphingText } from "../components/magicui/morphing-text";

const format = "MM/DD/YY, h:mm:ss A";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(dayjs().format(format));
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null,
  );
  const [hoveredToolIndex, setHoveredToolIndex] = useState<number | null>(null);
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [hoveredJoker, setHoveredJoker] = useState<boolean>(false);

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

  const techStack: { [key: string]: string[] }[] = [
    {
      Frontend: [
        "React",
        "Next.js",
        "Shadcn",
        "Tailwindcss",
        "Framer-Motion",
        "Tanstack Query",
      ],
      Backend: [".NET", "C#"],
      "Db & Services": [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
        "Prisma ORM",
        "Postman",
        "Cloudinary",
      ],
    },
  ];

  const tools: {
    label: string;
    src: string;
    expandable?: boolean;
    invertable?: boolean;
  }[] = [
    { label: "VSCode", src: "/imgs/vscode.svg" },
    { label: "v0", src: "/imgs/v0.webp", invertable: true },
    { label: "Figma", src: "/imgs/figma.svg", invertable: true },
    { label: "Chatgpt", src: "/imgs/chatgpt.svg", invertable: true },
    {
      label: "Github Copilot",
      src: "/imgs/github-copilot.svg",
      invertable: true,
    },
    { label: "Postman", src: "/imgs/postman.png", expandable: true },
    { label: "Docker", src: "/imgs/docker.png" },
  ];

  const links: {
    content: ReactNode;
    label: string;
  }[] = [
    {
      content: (
        <a
          href="https://github.com/tritk0910"
          target="_blank"
          className="flex size-full items-center justify-center"
        >
          <FaGithub className="size-7" />
        </a>
      ),
      label: "Github",
    },
    {
      content: (
        <a
          href="https://steamcommunity.com/profiles/76561198436687391"
          target="_blank"
          className="flex size-full items-center justify-center"
        >
          <FaSteam className="size-7" />
        </a>
      ),
      label: "Steam",
    },
    {
      content: (
        <a
          href="mailto:khaitri074@gmail.com"
          className="flex size-full items-center justify-center"
        >
          <Image
            width={200}
            height={200}
            alt="gmail"
            src="/imgs/gmail.svg"
            className="size-7"
          />
        </a>
      ),
      label: "Gmail",
    },
    {
      content: (
        <div className="flex size-full items-center justify-center">
          <FaDiscord className="size-8" />
        </div>
      ),
      label: "Discord",
    },
    {
      content: (
        <a
          href="https://www.linkedin.com/in/khaitri074"
          target="_blank"
          className="flex size-full items-center justify-center"
        >
          <FaLinkedin className="size-8 rounded-lg" />
        </a>
      ),
      label: "Linkedin",
    },
  ];

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg p-20">
      <div className="mx-auto grid size-full max-h-[80vh] max-w-[1000px] grid-cols-8 grid-rows-10 gap-3">
        <Card className="group/card col-span-2 row-span-8 font-mono">
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
          <ScrollArea
            type="scroll"
            className="h-[450px] w-full rounded-md pt-2 whitespace-nowrap"
          >
            {Object.entries(techStack[0]).map(([category, technologies]) => (
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
          </ScrollArea>
        </Card>
        <Card className="col-span-4 row-span-4">
          <div className="flex h-full flex-col justify-between p-5">
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
        <div className="col-span-2 row-span-2">
          <TooltipProvider>
            <Tooltip open={hoveredButtonIndex !== null} delayDuration={0}>
              <div className="relative mr-auto flex max-w-[79%] flex-wrap justify-between gap-1 max-sm:flex-row max-sm:justify-center">
                <TooltipContent className="px-5 py-0">
                  <p className="font-space text-lg font-extrabold lowercase">
                    {hoveredButtonIndex !== null
                      ? links[hoveredButtonIndex].label
                      : currentContext}
                  </p>
                </TooltipContent>

                <TooltipTrigger asChild>
                  <div className="size-[60px] overflow-hidden rounded-sm text-3xl leading-8 font-extrabold whitespace-pre-line uppercase">
                    Lin{"\n"}ks.
                  </div>
                </TooltipTrigger>
                {links.map(({ content, label }, index) => (
                  <Card
                    className="size-[60px]"
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
        <ProjectComponent className="col-span-2" />
        <div className="col-span-4 row-span-8">
          <div className="grid h-full grid-flow-col grid-cols-5 grid-rows-7 justify-items-end gap-2 gap-y-3">
            <Card className="row-span-7 max-w-[75%]">
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                {tools.map(({ label, src, invertable, expandable }, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredToolIndex(index)}
                    onMouseLeave={() => {
                      setHoveredToolIndex(null);
                      setCurrentContext(label);
                    }}
                    className="aspect-square w-[3rem] overflow-hidden rounded-lg bg-zinc-800 opacity-90 transition-all duration-300 ease-in-out hover:scale-125 max-sm:max-w-[2.75rem] dark:bg-white"
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
            <div className="col-span-2 row-span-2 w-full">
              <TooltipProvider>
                <Tooltip open={hoveredToolIndex !== null} delayDuration={0}>
                  <div className="flex flex-col font-mono text-wrap break-words">
                    <p className="text-4xl font-extrabold uppercase">Daily</p>{" "}
                    <TooltipTrigger asChild>
                      <span className="font-space w-fit text-3xl">Tool</span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="px-5 py-0">
                      <p className="font-space text-lg font-extrabold lowercase">
                        {hoveredToolIndex !== null
                          ? tools[hoveredToolIndex].label
                          : currentContext}
                      </p>
                    </TooltipContent>
                    <p className="text-5xl font-extrabold uppercase">Stack.</p>
                  </div>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-2 w-[90%] justify-self-start overflow-hidden rounded-xl">
              <Image
                width={300}
                height={300}
                alt="watch-tower"
                className="relative bottom-5"
                src="/imgs/watchtower.png"
              />
            </div>
            <div className="group relative col-span-2 row-span-3 size-full overflow-hidden rounded-3xl">
              <Image
                width={300}
                height={300}
                alt="spotify"
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
            <div className="col-span-2 row-span-1 size-full rounded-xl">
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
            <div className="col-span-2 row-span-4 size-full">
              <TooltipProvider>
                <Tooltip open={hoveredJoker} delayDuration={0}>
                  <TooltipTrigger
                    onMouseEnter={() => setHoveredJoker(true)}
                    onMouseLeave={() => setHoveredJoker(false)}
                  >
                    <HolofoilCard className="m-5">
                      <Image
                        width={300}
                        height={300}
                        className="transition-transform hover:scale-115"
                        src="/imgs/joker.webp"
                        alt="Joker card"
                      />
                    </HolofoilCard>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <TypingAnimation
                      duration={30}
                      className="font-balatro text-base"
                    >
                      the polychrome effect on me is pretty cool, huh?
                    </TypingAnimation>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
