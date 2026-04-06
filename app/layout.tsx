"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/whatsapp";
import { usePathname } from "next/navigation";
import { playfair, poppins } from "@/lib/fonts";
import { SessionProvider } from "next-auth/react"; // 👈 Ye add kiya
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page par bhi Navbar/Footer nahi dikhana chahiye aksar
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const hideLayout = isAdminPage || isLoginPage;

  return (
    <html lang="en">
      <body className={`${poppins.className} ${playfair.variable} bg-[#010409]`}>
        {/* 🔐 SessionProvider se wrap kiya taake Auth kaam kare */}
        <SessionProvider>
          {!hideLayout && <Navbar />}

          <main className="min-h-screen">
            {children}
          </main>

          {!hideLayout && <WhatsAppFloat />}
          {!hideLayout && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}