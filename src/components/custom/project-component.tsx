import { cn } from "@/lib/utils";
import { CardBody, CardContainer } from "../ui/3d-card";

export default function ProjectComponent({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("group z-50", className)}>
      <CardContainer className="inter-var">
        <CardBody className="size-60">
          <div
            className={cn(
              "font-akira relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg",
            )}
          >
            <span className="text-xl text-white transition-all duration-200 select-none group-hover:text-2xl">
              my works
            </span>
            <video
              className="pointer-events-none absolute inset-0 -z-10 transition"
              width="300"
              height="300"
              preload="none"
              autoPlay
              loop
              muted
            >
              <source src="/video/bg.mp4" type="video/mp4" />
            </video>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
