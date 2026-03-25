import React from "react";
import {
  Phone,
  Mail,
  ChevronDown,
  Calculator,
  Zap,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Gift,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const signalCategories = [
    {
      name: "Forex",
      sub: ["Scalping", "Long Term", "Live Updates", "Results"],
    },
    { name: "Stocks", sub: ["Intraday", "Swing Trading", "Analysis"] },
    { name: "Crypto", sub: ["Spot", "Futures", "DeFi Gems"] },
  ];

  const brokerCategories = [
    {
      name: "Low Spread Brokers",
      brands: ["Exness", "IC Markets", "FP Markets"],
    },
    {
      name: "Best For News Trading",
      brands: ["XM Global", "Pepperstone", "OctaFX"],
    },
    { name: "Best For Crypto Trading", brands: ["Bybit", "Binance", "Exness"] },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* 🔥 ATTRACTIVE TOP BAR */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 py-2 px-4 shadow-lg overflow-hidden">
        <div className="flex items-center justify-center gap-3 text-black text-center animate-pulse">
          <Gift size={16} className="shrink-0 animate-bounce" />
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
            Limited Time Offer:{" "}
            <span className="underline decoration-black/30">
              Get 50% Discount
            </span>{" "}
            for the First 100 Students!
          </p>
          <button className="hidden sm:flex items-center gap-1 bg-black text-yellow-500 px-3 py-0.5 rounded-full text-[9px] font-bold hover:bg-zinc-800 transition ml-2">
            Claim Now <ArrowRight size={10} />
          </button>
        </div>
      </div>

      <nav className="bg-[#050505]/95 backdrop-blur-xl border-b border-yellow-500/20 shadow-2xl">
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          {/* 🔥 LUXURY TEXT LOGO */}
          <div className="flex flex-col leading-tight cursor-pointer group shrink-0">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-500 transition-colors">
              MMH{" "}
              <span className="text-yellow-500 group-hover:text-white">
                TRADING
              </span>
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-gray-500 font-bold -mt-1">
              Academy of Excellence
            </span>
          </div>

          {/* 🚀 FULL MODERN MENU */}
          <ul className="hidden xl:flex items-center gap-7 text-[11px] font-extrabold uppercase tracking-widest text-gray-300">
            {/* SIGNALS */}
            <li className="relative group py-2 cursor-pointer hover:text-yellow-400 transition-all">
              <span className="flex items-center gap-1">
                Signals{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform"
                />
              </span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-[#0f0f0f] border border-yellow-500/20 p-2 rounded-xl w-56 shadow-2xl">
                  {signalCategories.map((cat) => (
                    <div key={cat.name} className="group/sub relative">
                      <div className="flex items-center justify-between p-3 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-colors">
                        <span>{cat.name}</span>
                        <ChevronRight size={14} className="opacity-40" />
                      </div>
                      <div className="absolute left-full top-0 ml-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 translate-x-1 group-hover/sub:translate-x-0">
                        <div className="bg-[#111] border border-yellow-500/20 p-2 rounded-xl w-40 shadow-2xl">
                          {cat.sub.map((s) => (
                            <p
                              key={s}
                              className="p-2.5 text-[10px] text-gray-400 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              {s}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* BROKERS */}
            <li className="relative group py-2 cursor-pointer hover:text-yellow-400 transition-all">
              <span className="flex items-center gap-1">
                Brokers{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform"
                />
              </span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-[#0f0f0f] border border-yellow-500/20 p-2 rounded-xl w-64 shadow-2xl">
                  {brokerCategories.map((cat) => (
                    <div key={cat.name} className="group/sub relative">
                      <div className="flex items-center justify-between p-3 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-colors">
                        <span className="whitespace-nowrap">{cat.name}</span>
                        <ChevronRight size={14} className="opacity-40" />
                      </div>
                      <div className="absolute left-full top-0 ml-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 translate-x-1 group-hover/sub:translate-x-0">
                        <div className="bg-[#111] border border-yellow-500/20 p-2 rounded-xl w-44 shadow-2xl">
                          {cat.brands.map((brand) => (
                            <p
                              key={brand}
                              className="p-2.5 text-[10px] text-gray-400 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              {brand}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* COURSES */}
            <li className="relative group py-2 cursor-pointer hover:text-yellow-400 transition-all">
              <span className="flex items-center gap-1">
                Courses{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform"
                />
              </span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0f0f0f] border border-yellow-500/20 p-3 rounded-xl w-52 shadow-2xl">
                  {[
                    "MSNR Courses",
                    "SMC Courses",
                    "ICT Courses",
                    "Psychology",
                    "Trading Strategies",
                  ].map((c) => (
                    <p
                      key={c}
                      className="p-2.5 hover:bg-white/5 rounded-lg transition text-[10px]"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            </li>

            <li className="cursor-pointer hover:text-yellow-400 transition flex items-center gap-1.5">
              <TrendingUp size={15} className="text-yellow-500" /> Market
              Analysis
            </li>
            <li className="cursor-pointer hover:text-yellow-400 transition flex items-center gap-1.5">
              <Calculator size={15} className="text-yellow-500" /> Lot Size
              Calculator
            </li>
            <li className="cursor-pointer hover:text-yellow-400 transition flex items-center gap-1.5">
              <MessageSquare size={15} className="text-yellow-500" /> Live Chat
            </li>
            <li className="cursor-pointer hover:text-yellow-400 transition flex items-center gap-1.5 text-yellow-500 font-black tracking-widest">
              <Zap size={14} fill="currentColor" /> Offers
            </li>
          </ul>

          {/* 🔹 GOLDEN CONTACT ICONS & CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 border-r border-white/10 pr-4">
              <a
                href="#"
                className="group p-2 bg-yellow-500/5 hover:bg-yellow-500 rounded-full transition-all duration-300"
              >
                <FaWhatsapp className="text-yellow-500 group-hover:text-black text-lg transition-colors" />
              </a>
              <a
                href="#"
                className="group p-2 bg-yellow-500/5 hover:bg-yellow-500 rounded-full transition-all duration-300"
              >
                <Phone
                  className="text-yellow-500 group-hover:text-black transition-colors"
                  size={16}
                />
              </a>
              <a
                href="#"
                className="group p-2 bg-yellow-500/5 hover:bg-yellow-500 rounded-full transition-all duration-300"
              >
                <Mail
                  className="text-yellow-500 group-hover:text-black transition-colors"
                  size={16}
                />
              </a>
            </div>

            <button className="bg-gradient-to-b from-yellow-400 to-yellow-600 hover:brightness-110 text-black px-5 py-2 rounded-lg font-black text-[9px] uppercase tracking-tighter shadow-xl shadow-yellow-500/10 active:scale-95 transition-all">
              Join Now
            </button>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent w-full"></div>
      </nav>
    </div>
  );
}
