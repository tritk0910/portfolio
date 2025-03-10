"use client";

import type React from "react";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 3;

const useMorphingText = (texts: string[]) => {
	const [isTransforming, setIsTransforming] = useState(false);
	const textIndexRef = useRef(0);
	const morphRef = useRef(0);
	const cooldownRef = useRef(0);
	const timeRef = useRef(new Date());

	const text1Ref = useRef<HTMLSpanElement>(null);
	const text2Ref = useRef<HTMLSpanElement>(null);

	const setStyles = useCallback(
		(fraction: number) => {
			const [current1, current2] = [text1Ref.current, text2Ref.current];
			if (!current1 || !current2) return;

			current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
			current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

			const invertedFraction = 1 - fraction;
			current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
			current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

			current1.textContent = texts[textIndexRef.current % texts.length];
			current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
		},
		[texts],
	);

	const doMorph = useCallback(() => {
		// Set isTransforming to true when morphing starts
		setIsTransforming(true);

		morphRef.current -= cooldownRef.current;
		cooldownRef.current = 0;

		let fraction = morphRef.current / morphTime;

		if (fraction > 1) {
			cooldownRef.current = cooldownTime;
			fraction = 1;
		}

		setStyles(fraction);

		if (fraction === 1) {
			textIndexRef.current++;
		}
	}, [setStyles]);

	const doCooldown = useCallback(() => {
		// Set isTransforming to false during cooldown
		setIsTransforming(false);

		morphRef.current = 0;
		const [current1, current2] = [text1Ref.current, text2Ref.current];
		if (current1 && current2) {
			current2.style.filter = "none";
			current2.style.opacity = "100%";
			current1.style.filter = "none";
			current1.style.opacity = "0%";
		}
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);

			const newTime = new Date();
			const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
			timeRef.current = newTime;

			cooldownRef.current -= dt;

			if (cooldownRef.current <= 0) doMorph();
			else doCooldown();
		};

		animate();
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [doMorph, doCooldown]);

	return { text1Ref, text2Ref, isTransforming };
};

interface MorphingTextProps {
	className?: string;
	texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
	const { text1Ref, text2Ref, isTransforming } = useMorphingText(texts);

	// Pass isTransforming to parent component
	return (
		<>
			<span
				className="absolute inset-x-0 top-0 m-auto inline-block w-full"
				ref={text1Ref}
			/>
			<span
				className="absolute inset-x-0 top-0 m-auto inline-block w-full"
				ref={text2Ref}
			/>
			{/* Hidden span to expose isTransforming to parent */}
			<span className="hidden" data-is-transforming={isTransforming} />
		</>
	);
};

const SvgFilters: React.FC = () => (
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
                0 0 0 255 -140"
				/>
			</filter>
		</defs>
	</svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
	texts,
	className,
}) => {
	const [isTransforming, setIsTransforming] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Use a mutation observer to detect when the data-is-transforming attribute changes
	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "data-is-transforming"
				) {
					const target = mutation.target as HTMLElement;
					setIsTransforming(target.dataset.isTransforming === "true");
				}
			});
		});

		const transformingIndicator = containerRef.current.querySelector(
			"[data-is-transforming]",
		);
		if (transformingIndicator) {
			observer.observe(transformingIndicator, { attributes: true });
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative mx-auto h-16 w-full font-sans text-[40pt] leading-none font-bold [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [font-smooth:always] [text-rendering:optimizeLegibility] md:h-24 lg:text-[6rem]",
				// Only apply the filter when transforming
				isTransforming && "[filter:url(#threshold)_blur(0.3px)]",
				className,
			)}
		>
			<Texts texts={texts} />
			<SvgFilters />
		</div>
	);
};
