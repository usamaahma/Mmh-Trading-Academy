import LandingPage from "@/components/LandingPage";
import "./globals.css";

// 🔥 Professional SEO Metadata
export const metadata = {
  title: "MMH Trading | High-Accuracy Forex, Stocks & Crypto Signals",
  description: "Get professional trading signals, real-time market analysis, and high-probability setups for Forex, Crypto, and Stocks. Start trading with MMH Terminal.",
  keywords: ["Forex Signals", "Crypto Signals", "Stock Analysis", "MMH Trading", "Trading Terminal"],
  openGraph: {
    title: "MMH Trading | Professional Signals",
    description: "Expert market analysis and real-time signals.",
    images: ["/og-image.png"], // Agar aapke paas koi image hai public folder mein
  },
};

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}