"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  innerClassName?: string;
}

export default function Card({
  className,
  innerClassName,
  children,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "border-muted flex size-full flex-col justify-between rounded-2xl border p-px backdrop-blur-lg",
        className,
      )}
    >
      <div
        className={cn(
          "size-full overflow-hidden rounded-xl border",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
