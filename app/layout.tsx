"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { playfair, poppins } from "@/lib/fonts"; // 👈 Yahan se import karein
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      {/* Dono fonts ki classes body mein add kar dein */}
      <body className={`${poppins.className} ${playfair.variable} bg-[#010409]`}>
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}