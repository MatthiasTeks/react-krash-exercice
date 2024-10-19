import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Providers from "./providers";
import { Navbar } from "@/components/common/Navbar";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rebels Alliance System",
  description: "Empire down",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex flex-col bg-background font-sans antialiased", fontSans.variable)}>
        <div className="px-6 py-4">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
