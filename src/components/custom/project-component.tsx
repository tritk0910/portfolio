import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function ProjectComponent({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("group z-50", className)}>
      <CardContainer className="inter-var">
        <CardBody className="relative size-60">
          <CardItem
            translateZ="30"
            className="absolute inset-0 overflow-hidden rounded-lg"
          >
            <video
              className="pointer-events-none transition"
              width="500"
              height="500"
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
            <span className="font-akira text-2xl text-white select-none">
              my works
            </span>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
