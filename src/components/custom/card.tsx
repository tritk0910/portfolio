"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function Card({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				"border-muted flex h-full w-full flex-col justify-between rounded-2xl border p-[1px] backdrop-blur-lg",
				className,
			)}
		>
			<div className="h-full rounded-xl border">{children}</div>
		</div>
	);
}
