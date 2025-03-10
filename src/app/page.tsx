"use client";
import { ThemeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";
import Card from "../components/custom/card";
import { MorphingText } from "../components/magicui/morphing-text";

const format = "MM/DD/YY, h:mm:ss A";

export default function Home() {
	const [currentTime, setCurrentTime] = useState(dayjs().format(format));
	const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
		null,
	);
	const [currentContext, setCurrentContext] = useState<string | null>(null);

	const { data, isLoading, isSuccess } = useQuery<boolean>({
		queryKey: ["work-status"],
		queryFn: async () => {
			const result = await axios.get(
				`https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID}/values/Sheet1!A2:A2?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`,
			);
			return result.data.values[0];
		},
	});

	const downloadCv = () => {
		const cv = "/downloads/cv.pdf";
		const link = document.createElement("a");
		link.href = cv;
		link.download = "resume.pdf";
		link.click();
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(dayjs().format(format));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const techStack: { [key: string]: string[] }[] = [
		{
			Frontend: [
				"React",
				"Next.js",
				"Shadcn",
				"Tailwindcss",
				"Framer-Motion",
				"Tanstack Query",
			],
			Backend: [".NET", "C#"],
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

	const links: {
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
					<FaLinkedin className="size-8 rounded-lg fill-zinc-300" />
				</a>
			),
			label: "Linkedin",
		},
	];

	return (
		<div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg p-20">
			<div className="mx-auto grid size-full max-h-[80vh] max-w-[1000px] grid-cols-8 grid-rows-10 gap-3">
				<Card className="group/card col-span-2 row-span-8 font-mono">
					<div className="p-3 text-5xl leading-12 font-bold uppercase">
						<h1 className="pb-2 text-4xl">
							<span className="pr-1">{"{"}</span>
							<span className="transition-all group-hover/card:pl-3">
								{"}"}
							</span>
						</h1>
						<p className="whitespace-pre-line">Tech {"\n"}Stack</p>
					</div>
					<div className="h-1 w-0 rounded-lg bg-white transition-all duration-500 group-hover/card:w-[80%]" />
					<ScrollArea
						type="scroll"
						className="h-[450px] w-full rounded-md pt-2 whitespace-nowrap"
					>
						{Object.entries(techStack[0]).map(([category, technologies]) => (
							<div key={category} className="font-space p-4">
								<h2>{category}:</h2>
								<div className="flex flex-wrap gap-2">
									{technologies.map((tech, index) => (
										<Badge variant="secondary" key={index}>
											{tech}
										</Badge>
									))}
								</div>
							</div>
						))}
					</ScrollArea>
				</Card>
				<Card className="col-span-4 row-span-4">
					<div className="flex h-full flex-col justify-between p-5">
						<div>
							<div className="flex items-start justify-between gap-5">
								<div className="flex items-center gap-4">
									<Image
										width={60}
										height={60}
										src={"/imgs/avatar.jpg"}
										alt="avatar"
										className="rounded-full"
									/>
									<div className="flex flex-col">
										<p className="text-lg font-bold">Neo.</p>
										<p className="text-zinc-500">_zos</p>
									</div>
								</div>
								<ThemeToggle />
							</div>
							<div className="mt-5 flex flex-col">
								<div className="flex justify-start gap-2 text-[18pt] text-nowrap">
									I build{" "}
									<MorphingText
										className="relative top-1.5 !h-10 !text-[18pt]"
										texts={["Frontends", "Backends", "WebApps"]}
									/>
								</div>
								<div className="mt-2 flex gap-2 text-[10pt] whitespace-pre-line">
									Hello! My name is Khai Tri! {"\n"}a 22 year old developer from
									Vietnam.
								</div>
							</div>
						</div>
						<div className="font-space flex items-center justify-between">
							<div className="flex flex-col gap-2">
								<div className="text-muted-foreground font-mono text-[10px] whitespace-pre-line">
									&quot;How do I center {"\n"}a div again??&quot;
								</div>
								<div className="flex gap-3">
									<button
										onClick={downloadCv}
										className="cursor-pointer transition-transform hover:scale-125"
									>
										<Download className="size-4" />
									</button>
								</div>
							</div>
							<div className="flex flex-col items-end text-end">
								<div className="text-muted-foreground flex items-center gap-2 text-xs">
									{isLoading && (
										<StatusIndicator
											className={cn("size-2 rounded-full bg-yellow-500")}
											text="Hmmmm..."
										/>
									)}
									{isSuccess && (
										<>
											{data ? (
												<StatusIndicator
													className={cn("size-2 rounded-full bg-green-500")}
													text="Available for work"
												/>
											) : (
												<StatusIndicator
													className={cn("size-2 rounded-full bg-red-500")}
													text="Not available right now"
												/>
											)}
										</>
									)}
								</div>
								<div className="text-muted-foreground/50 font-digital flex items-center gap-2 text-sm">
									{currentTime}
								</div>
							</div>
						</div>
					</div>
				</Card>
				<div className="col-span-2 row-span-2">
					<TooltipProvider>
						<Tooltip open={hoveredButtonIndex !== null} delayDuration={0}>
							<div className="relative mr-auto flex max-w-[79%] flex-wrap justify-between gap-1 max-sm:flex-row max-sm:justify-center">
								<TooltipContent className="px-5 py-0">
									<p className="font-space text-lg font-extrabold lowercase">
										{hoveredButtonIndex !== null
											? links[hoveredButtonIndex].label
											: currentContext}
									</p>
								</TooltipContent>

								<TooltipTrigger asChild>
									<div className="size-[60px] overflow-hidden rounded-sm text-3xl leading-8 font-extrabold whitespace-pre-line uppercase">
										Lin{"\n"}ks.
									</div>
								</TooltipTrigger>
								{links.map(({ content, label }, index) => (
									<Card
										className="size-[60px]"
										key={index}
										onMouseEnter={() => setHoveredButtonIndex(index)}
										onMouseLeave={() => {
											setHoveredButtonIndex(null);
											setCurrentContext(label);
										}}
									>
										{content}
									</Card>
								))}
							</div>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Card className="col-span-2 row-span-4"></Card>
				<Card className="col-span-4 row-span-8"></Card>
			</div>
		</div>
	);
}

const StatusIndicator = ({
	className,
	text,
}: {
	className: string;
	text: string;
}) => (
	<>
		<span className={className} /> {text}
	</>
);
