"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { HolofoilCard } from "./holofoil-card";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

function Draggable({
  id,
  children,
  className,
  setIsDragging,
  setIsAnimating,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging, setIsDragging]);

  useEffect(() => {
    if (transform) {
      setIsAnimating(true);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [transform, setIsAnimating]);

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

interface DraggableHolofoilCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  containerClassName?: string;
}

export function DraggableHolofoilCard({
  id,
  children,
  className,
  containerClassName,
  isDragging,
  setIsDragging,
  setIsAnimating,
}: DraggableHolofoilCardProps) {
  // Configure the pointer sensor with a small activation delay to avoid
  // conflict with the card's hover effect
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <Draggable
        setIsDragging={setIsDragging}
        setIsAnimating={setIsAnimating}
        id={id}
        className={containerClassName}
      >
        <HolofoilCard
          className={cn(isDragging ? "cursor-grabbing" : "", className)}
        >
          {children}
        </HolofoilCard>
      </Draggable>
    </DndContext>
  );
}
