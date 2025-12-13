import type React from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const _jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LanDropr - Local Network File Sharing",
  description:
    "Share files across your local network with ease. Upload, organize, and download with compression.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(_jost.className, "dark")}>
      <body className="antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
