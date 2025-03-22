import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface MaxWidthCenteredComponentProps extends PropsWithChildren {
  className?: string;
}

export default function MaxWidthCenteredComponent({
  className,
  children,
}: MaxWidthCenteredComponentProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full items-center justify-center",
        className,
      )}
    >
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center rounded-lg p-4 md:overflow-hidden">
        {/* <AnimatedGridPattern
          numSquares={20}
          maxOpacity={0.3}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        /> */}
        {children}
      </div>
    </div>
  );
}
