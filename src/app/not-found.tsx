import TransitionLink from "@/components/custom/transition-link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="font-akira mb-4 text-2xl md:text-6xl">404 Not Found</h1>
      <p className="mb-8 text-xl">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <TransitionLink
        href="/"
        className="bg-primary text-secondary rounded-md px-4 py-2 transition-opacity hover:opacity-90"
      >
        Return Home
      </TransitionLink>
    </div>
  );
}
