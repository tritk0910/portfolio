import BeamsBackground from "@/components/custom/beams-background";
import type { Metadata } from "next";
import { Recursive, Space_Grotesk, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import MaxWidthCenteredComponent from "../components/custom/max-width-centered";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space",
});
const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});
const digital = localFont({
  src: "../../public/fonts/digital-7.ttf",
  variable: "--font-digital",
});

const akira = localFont({
  src: "../../public/fonts/akira.otf",
  variable: "--font-akira",
});

export const metadata: Metadata = {
  title: "Neo.",
  description: "Neo's portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${recursive.className} ${digital.variable} ${space_grotesk.variable} ${space_mono.variable} ${akira.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BeamsBackground>
            <MaxWidthCenteredComponent>{children}</MaxWidthCenteredComponent>
          </BeamsBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
