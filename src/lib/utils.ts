import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleRandomAudio = () => {
  const path = "/audio/audio-";
  const randomAudio = Math.floor(Math.random() * 2) + 1;
  return `${path}${randomAudio}.mp3`;
};
