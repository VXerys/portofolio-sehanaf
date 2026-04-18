import type { Metadata } from "next";
import localFont from "next/font/local";
import GSAPProvider from "@/components/anim/gsap-provider";
import LenisProvider from "@/components/anim/lenis-provider";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const maghfirea = localFont({
  src: "../public/fonts/maghfirea/Maghfirea.ttf",
  variable: "--font-maghfirea",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
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
      className={`${inter.variable} ${maghfirea.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GSAPProvider>
          <LenisProvider>{children}</LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
