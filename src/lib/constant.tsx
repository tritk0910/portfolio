import Image from "next/image";
import { ReactNode } from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";

export const isAvailableForWork = true;

export const format = "MM/DD/YY, h:mm:ss A";

export const musicUrl = {
  url: "https://open.spotify.com/track/5VnaOLeK1lKfULuNwet8ck?si=2315fe083148438c",
  thumbnail: "/imgs/spotify.jpg",
  title: "Flowers",
  artist: "In Love With A Ghost",
  year: "2017",
};

export const techStacks: { [key: string]: string[] }[] = [
  {
    Frontend: [
      "React",
      "Next.js",
      "Shadcn",
      "Tailwindcss",
      "Framer-Motion",
      "Tanstack Query",
    ],
    Backend: [".NET", "C#", "SignalR"],
    "Db & Services": [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Prisma ORM",
      "Postman",
      "Cloudinary",
    ],
  },
];

export const tools: {
  label: string;
  src: string;
  expandable?: boolean;
  invertable?: boolean;
}[] = [
  { label: "VSCode", src: "/imgs/vscode.svg" },
  { label: "v0", src: "/imgs/v0.webp", invertable: true },
  {
    label: "Github Copilot",
    src: "/imgs/github-copilot.svg",
    invertable: true,
  },
  { label: "Chatgpt", src: "/imgs/chatgpt.svg", invertable: true },
  { label: "Postman", src: "/imgs/postman.png", expandable: true },
  { label: "Docker", src: "/imgs/docker.png" },
  // { label: "Figma", src: "/imgs/figma.svg", invertable: true },
];

export const links: {
  content: ReactNode;
  label: string;
}[] = [
  {
    content: (
      <a
        href="https://github.com/tritk0910"
        target="_blank"
        className="flex size-full items-center justify-center"
      >
        <FaGithub className="size-7" />
      </a>
    ),
    label: "Github",
  },
  {
    content: (
      <a
        href="https://steamcommunity.com/profiles/76561198436687391"
        target="_blank"
        className="flex size-full items-center justify-center"
      >
        <FaSteam className="size-7" />
      </a>
    ),
    label: "Steam",
  },
  {
    content: (
      <a
        href="mailto:khaitri074@gmail.com"
        className="flex size-full items-center justify-center"
      >
        <Image
          width={200}
          height={200}
          alt="gmail"
          src="/imgs/gmail.svg"
          className="size-7"
        />
      </a>
    ),
    label: "Gmail",
  },
  {
    content: (
      <div className="flex size-full items-center justify-center">
        <FaDiscord className="size-8" />
      </div>
    ),
    label: "Discord",
  },
  {
    content: (
      <a
        href="https://www.linkedin.com/in/khaitri074"
        target="_blank"
        className="flex size-full items-center justify-center"
      >
        <FaLinkedin className="size-8 rounded-lg" />
      </a>
    ),
    label: "Linkedin",
  },
];
