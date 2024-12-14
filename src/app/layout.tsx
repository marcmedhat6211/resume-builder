import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SidebarProvider open={false}>
          <AppSidebar />
          <main className="w-full p-4">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
