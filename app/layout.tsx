import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Navbar /> {children}
        <Footer />
      </body>
    </html>
  );
}
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});
