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
      {children}
    </div>
  );
}
