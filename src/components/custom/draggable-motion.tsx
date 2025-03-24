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
import type React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
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
    zIndex: transform ? 10000 : 0,
    position: "relative" as const,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn("size-full cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </div>
  );
}

interface DraggableMotionProps extends PropsWithChildren {
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
    return <div className={className}>{children}</div>;
  }

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <Draggable id={id} className={className} setIsDragging={setIsDragging}>
        {children}
      </Draggable>
    </DndContext>
  );
}
