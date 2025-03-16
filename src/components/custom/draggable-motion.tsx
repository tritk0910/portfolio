"use client";

import { cn } from "@/lib/utils";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

function Draggable({ id, children, className, setIsDragging }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  // Update the parent component's isDragging state
  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging, setIsDragging]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transform ? undefined : "transform 250ms ease-in-out",
    zIndex: transform ? 50 : 0,
    position: "relative" as const,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn("cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </div>
  );
}

interface DraggableMotionProps extends HTMLMotionProps<"div"> {
  id: string;
  className?: string;
  disableDraggingOnMobile?: boolean;
  onDragStateChange?: (isDragging: boolean) => void;
}

export function DraggableMotion({
  id,
  children,
  className,
  disableDraggingOnMobile = true,
  onDragStateChange,
  ...motionProps
}: DraggableMotionProps) {
  const isAboveMobile = useMediaQuery({ query: "(min-width: 768px)" });
  const enableDragging = !disableDraggingOnMobile || isAboveMobile;
  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  // Call the callback when isDragging changes
  useEffect(() => {
    if (onDragStateChange) {
      onDragStateChange(isDragging);
    }
  }, [isDragging, onDragStateChange]);

  // If dragging is disabled or on mobile, just render the motion.div without dragging
  if (!enableDragging) {
    return (
      <motion.div className={className} {...motionProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <Draggable id={id} className={className} setIsDragging={setIsDragging}>
        <motion.div {...motionProps} className="size-full">
          {children}
        </motion.div>
      </Draggable>
    </DndContext>
  );
}
