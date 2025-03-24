"use client";
import { avatarUrl, format, isAvailableForWork } from "@/lib/constant";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemeToggle } from "../../audio-toggle";
import Card from "../../custom/card";
import { MorphingText } from "../../magicui/morphing-text";

export default function Status({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

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
    <Card>
      <div className="flex h-full flex-col justify-between p-3 max-md:min-h-72 md:p-5">
        <div>
          <div className="flex items-start justify-between gap-5 pb-3">
            <div className="flex items-center gap-4">
              <Image
                width={50}
                height={50}
                src={avatarUrl}
                alt="avatar"
                className="cursor-pointer rounded-full transition-transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              />
              <div className="flex flex-col leading-none">
                <p className="text-lg font-bold">Neo.</p>
                <p className="text-zinc-500">_zos</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex flex-col">
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
