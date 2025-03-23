import ParallaxProvider from "@/providers/parallax-provider";
import type { Metadata } from "next";
import {
  Montserrat,
  Recursive,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
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

const balatro = localFont({
  src: "../../public/fonts/balatro.otf",
  variable: "--font-balatro",
});

const circular = localFont({
  src: "../../public/fonts/CircularSpUIAra-Bold.otf",
  variable: "--font-circular",
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
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${recursive.className} ${digital.variable} ${space_grotesk.variable} ${montserrat.variable} ${space_mono.variable} ${circular.variable} ${akira.variable} ${balatro.variable} antialiased`}
      >
        <ParallaxProvider>{children}</ParallaxProvider>
      </body>
    </html>
  );
}
