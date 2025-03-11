"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Define the polymorphic component types
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface HoverMorphTextProps {
  initialText: React.ReactNode;
  hoverText: React.ReactNode;
  transitionDuration?: number; // in seconds
  className?: string;
}

type HoverMorphTextComponentProps<C extends React.ElementType> =
  PolymorphicComponentProp<C, HoverMorphTextProps>;

export const HoverMorphText = <C extends React.ElementType = "div">({
  initialText,
  hoverText,
  transitionDuration = 0.75, // Default transition duration
  className,
  as,
  ...restProps
}: HoverMorphTextComponentProps<C>) => {
  const [, setIsHovering] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const initialTextRef = useRef<HTMLDivElement>(null);
  const hoverTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0); // 0 = initial text, 1 = hover text
  const timeRef = useRef(new Date());
  const animationRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);

  // Use the provided element type or default to "div"
  const Component = as || "div";

  const setStyles = useCallback((progress: number) => {
    const [initialEl, hoverEl] = [initialTextRef.current, hoverTextRef.current];
    if (!initialEl || !hoverEl) return;

    // Ensure progress is between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // When progress is 0, initialEl is fully visible
    // When progress is 1, hoverEl is fully visible
    initialEl.style.filter = `blur(${Math.min(8 / (1 - progress) - 8, 100)}px)`;
    initialEl.style.opacity = `${Math.pow(1 - progress, 0.4) * 100}%`;

    hoverEl.style.filter = `blur(${Math.min(8 / progress - 8, 100)}px)`;
    hoverEl.style.opacity = `${Math.pow(progress, 0.4) * 100}%`;
  }, []);

  const animate = useCallback(() => {
    const newTime = new Date();
    const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
    timeRef.current = newTime;

    // Determine direction based on target
    const direction = targetProgressRef.current > progressRef.current ? 1 : -1;

    // Update progress based on direction
    progressRef.current += direction * (dt / transitionDuration);

    // Clamp progress to target if we've reached or passed it
    if (
      (direction > 0 && progressRef.current >= targetProgressRef.current) ||
      (direction < 0 && progressRef.current <= targetProgressRef.current)
    ) {
      progressRef.current = targetProgressRef.current;

      // If we've reached the target, we're no longer transforming
      if (progressRef.current === 0 || progressRef.current === 1) {
        setIsTransforming(false);
      }
    }

    // Apply the current progress to the styles
    setStyles(progressRef.current);

    // Continue animation if we haven't reached the target
    if (progressRef.current !== targetProgressRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  }, [setStyles, transitionDuration]);

  const updateHoverState = useCallback(
    (hovering: boolean) => {
      setIsHovering(hovering);
      targetProgressRef.current = hovering ? 1 : 0;

      // We're starting a transformation
      setIsTransforming(true);

      // Start animation if not already running
      if (!animationRef.current) {
        timeRef.current = new Date();
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [animate],
  );

  // Initialize styles
  useEffect(() => {
    if (initialTextRef.current && hoverTextRef.current) {
      initialTextRef.current.style.opacity = "100%";
      initialTextRef.current.style.filter = "none";
      hoverTextRef.current.style.opacity = "0%";
      hoverTextRef.current.style.filter = "blur(8px)";
    }

    // Reset progress
    progressRef.current = 0;
    targetProgressRef.current = 0;
  }, [initialText, hoverText]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Component
      className={cn(
        "relative mx-auto h-16 w-full cursor-pointer text-center font-sans text-[40pt] leading-none font-bold [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [font-smooth:always] [text-rendering:optimizeLegibility] md:h-24 lg:text-[6rem]",
        // Only apply the filter when transforming
        isTransforming && "[filter:url(#threshold)_blur(0.3px)]",
        className,
      )}
      onMouseEnter={() => updateHoverState(true)}
      onMouseLeave={() => updateHoverState(false)}
      {...restProps}
    >
      <div
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={initialTextRef}
      >
        {initialText}
      </div>
      <div
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={hoverTextRef}
      >
        {hoverText}
      </div>
      <svg
        id="filters"
        className="fixed h-0 w-0"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="threshold">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 255 -120"
            />
          </filter>
        </defs>
      </svg>
    </Component>
  );
};
