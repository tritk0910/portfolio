"use client";
import TransitionLink from "@/components/custom/transition-link";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";

export default function ProjectComponent({
  className,
}: {
  className?: string;
}) {
  return (
    <TransitionLink href={"/works"} className={cn("group z-50", className)}>
      <CardContainer className="inter-var">
        <CardBody className="relative">
          <CardItem
            translateZ="30"
            className="overflow-hidden rounded-lg max-md:max-h-[200px]"
          >
            <video
              className="pointer-events-none transition"
              preload="none"
              autoPlay
              loop
              muted
            >
              <source src="/video/bg.mp4" type="video/mp4" />
            </video>
          </CardItem>
          <CardItem
            translateZ="50"
            className="absolute inset-0 flex w-full items-center justify-center"
          >
            <span className="font-akira text-xl text-white select-none max-md:text-2xl lg:text-2xl">
              my works
            </span>
          </CardItem>
        </CardBody>
      </CardContainer>
    </TransitionLink>
  );
}
