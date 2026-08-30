import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TaskFlow — Real-time Collaborative Task Board",
  description:
    "A real-time, collaborative task management board built with Next.js 15, Auth.js, Prisma, and Socket.io. Drag, assign, and track tasks in real-time.",
  keywords: [
    "task management",
    "kanban board",
    "real-time",
    "collaboration",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Diyaneshwar-Pugazhendhi" }],
  openGraph: {
    title: "TaskFlow — Real-time Collaborative Task Board",
    description: "Drag, assign, and track tasks in real-time with your team.",
    type: "website",
    siteName: "TaskFlow",
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}