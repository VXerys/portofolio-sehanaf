import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import GSAPProvider from "@/components/anim/gsap-provider";
import LenisProvider from "@/components/anim/lenis-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sehan Alfarisi | Creative Developer Portfolio",
  description: "Official portfolio of Sehan Alfarisi, a Creative Developer specializing in Web Development, UI/UX Design, and AI Solutions based in Sukabumi, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GSAPProvider>
          <LenisProvider>{children}</LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
