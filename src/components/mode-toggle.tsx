"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div className="relative">
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				className="relative overflow-hidden"
				aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
			>
				{theme === "dark" ? (
					<Sun className="relative z-10 h-5 w-5" />
				) : (
					<Moon className="relative z-10 h-5 w-5" />
				)}
			</Button>
		</div>
	);
}
