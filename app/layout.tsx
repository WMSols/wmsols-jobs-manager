import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Manager",
  description: "Minimalist job application tracking",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <Sidebar />
        <main className="ml-64 min-h-screen pl-8 pr-8 pb-8 pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}