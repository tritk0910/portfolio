"use client";

import { cn } from "@/lib/utils";
import { animatePageOut } from "@/utils/animations";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface TransitionLinkProps extends PropsWithChildren {
  href: string;
  className?: string;
}

export default function TransitionLink({
  href,
  className,
  children,
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) animatePageOut(href, router);
  };

  return (
    <button className={cn(className)} onClick={handleClick}>
      {children}
    </button>
  );
}
