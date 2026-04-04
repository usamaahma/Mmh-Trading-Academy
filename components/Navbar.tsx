"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  ChevronDown,
  Calculator,
  Zap,
  TrendingUp,
  ChevronRight,
  Gift,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 🔥 Fix: Mobile Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

const signalCategories = [
  {
    name: "Forex",
    slug: "forex",
    sub: [
      { label: "Scalping", strategy: "SCALPING" },
      { label: "Long Term", strategy: "LONG_TERM" },
      { label: "Results", strategy: "RESULTS" }
    ]
  },
  {
    name: "Stocks",
    slug: "stocks",
    sub: [
      // Yahan tabdeeli ki hai: INTRADAY aur SWING (Bina underscore)
      { label: "Intraday", strategy: "INTRADAY" }, 
      { label: "Swing Trading", strategy: "SWING" },
      { label: "Analysis", strategy: "ANALYSIS" }
    ]
  },
  {
    name: "Crypto",
    slug: "crypto",
    sub: [
      { label: "Spot", strategy: "SPOT" },
      { label: "Futures", strategy: "FUTURE" },
    ]
  },
];
  const brokerCategories = [
    { name: "Low Spread", brands: ["Exness", "IC Markets", "FP Markets"] },
    { name: "News Trading", brands: ["XM Global", "Pepperstone", "OctaFX"] },
    { name: "Crypto Trading", brands: ["Bybit", "Binance", "Exness"] },
  ];

  const courseList = ["MSNR Courses", "SMC Courses", "ICT Courses", "Psychology", "Strategies"];

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      {/* 🔥 TERMINAL TOP BAR */}
      <div className="bg-cyan-500 py-1.5 px-4 shadow-lg overflow-hidden relative z-[110]">
        <div className="flex items-center justify-center gap-3 text-black text-center">
          <Gift size={14} className="shrink-0 animate-bounce" />
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
            Institutional Protocol: <span className="underline">50% Discount</span> for First 100 Students
          </p>
          <button className="hidden xs:flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded text-[8px] font-bold hover:bg-zinc-800 transition ml-2 uppercase">
            Claim <ArrowRight size={10} />
          </button>
        </div>
      </div>

      <nav className={`transition-all duration-300 border-b ${scrolled || isOpen ? "bg-[#010409]/95 backdrop-blur-xl border-cyan-500/20" : "bg-transparent border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 py-3 md:py-4">

          {/* 🔥 LUXURY LOGO */}
          <Link href="/" className="flex flex-col items-center leading-tight cursor-pointer group shrink-0 z-[110] text-center">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase group-hover:text-cyan-400 transition-colors">
              MMH <span className="text-cyan-400 group-hover:text-white">TRADING</span>
            </span>
            <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-slate-500 font-bold">
              Academy
            </span>
          </Link>

          {/* 🚀 DESKTOP MENU */}
          <ul className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">

            {/* SIGNALS DROPDOWN */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <span className="flex items-center gap-1">Signals <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" /></span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0D1117] border border-white/10 p-2 rounded-xl w-52 shadow-2xl">
                  {signalCategories.map((cat) => (
                    <div key={cat.name} className="group/sub relative">
                      <Link href={`/signals/${cat.slug}`} className="flex items-center justify-between p-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-colors">
                        <span>{cat.name}</span>
                        <ChevronRight size={12} className="opacity-40" />
                      </Link>
                      <div className="absolute left-full top-0 ml-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 translate-x-1 group-hover/sub:translate-x-0">
                        <div className="bg-[#161B22] border border-white/10 p-2 rounded-xl w-44 shadow-2xl">
                          {cat.sub.map((s) => (
                            <Link
                              key={s.label}
                              href={`/signals/${cat.slug}?strategy=${s.strategy}`}
                              className="block p-2 text-[9px] text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* BROKERS DROPDOWN */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <span className="flex items-center gap-1">Brokers <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" /></span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0D1117] border border-white/10 p-2 rounded-xl w-60 shadow-2xl">
                  {brokerCategories.map((cat) => (
                    <div key={cat.name} className="group/sub relative">
                      <div className="flex items-center justify-between p-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-colors">
                        <span className="whitespace-nowrap">{cat.name}</span>
                        <ChevronRight size={12} className="opacity-40" />
                      </div>
                      <div className="absolute left-full top-0 ml-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 translate-x-1 group-hover/sub:translate-x-0">
                        <div className="bg-[#161B22] border border-white/10 p-2 rounded-xl w-40 shadow-2xl">
                          {cat.brands.map((brand) => (
                            <p key={brand} className="p-2 text-[9px] text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors">{brand}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* COURSES DROPDOWN */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <span className="flex items-center gap-1">Courses <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" /></span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0D1117] border border-white/10 p-2 rounded-xl w-48 shadow-2xl">
                  {courseList.map((c) => (
                    <p key={c} className="p-2.5 hover:bg-white/5 rounded-lg transition text-[9px] hover:text-cyan-400">{c}</p>
                  ))}
                </div>
              </div>
            </li>

            <Link href="/analysis" className="cursor-pointer hover:text-cyan-400 transition flex items-center gap-1.5"><TrendingUp size={14} className="text-cyan-500" /> Analysis</Link>
            <Link href="/calculator" className="cursor-pointer hover:text-cyan-400 transition flex items-center gap-1.5"><Calculator size={14} className="text-cyan-500" /> Calculator</Link>
            <Link href="/offers" className="cursor-pointer hover:text-cyan-400 transition flex items-center gap-1.5 text-cyan-400 font-black"><Zap size={12} fill="currentColor" /> Offers</Link>
          </ul>

          {/* 🔹 CONTACT & MOBILE TOGGLE */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-4">
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 transition-all"><FaWhatsapp size={16} /></a>
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 transition-all"><Phone size={14} /></a>
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 transition-all"><Mail size={14} /></a>
            </div>

            <Link href="/join" className="bg-cyan-500 text-black px-4 md:px-6 py-2 rounded font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95">
              Join <span className="hidden sm:inline">Now</span>
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 text-white z-[110] outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 📱 MOBILE MENU DRAWER */}
        <div className={`fixed top-0 right-0 h-[100dvh] w-full bg-[#010409] z-[105] transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } xl:hidden`}>
          <div className="flex flex-col h-full pt-32 px-6 pb-10 overflow-y-auto scrollbar-hide">

            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-4">Terminal Menu</p>

              {/* MOBILE DROPDOWNS */}
              <div className="border-b border-white/5">
                <button onClick={() => toggleDropdown('signals')} className="w-full flex items-center justify-between py-4 text-left outline-none">
                  <span className={`text-lg font-black uppercase tracking-tighter ${activeDropdown === 'signals' ? 'text-cyan-400' : 'text-white'}`}>Signals</span>
                  <ChevronDown size={18} className={`transition-transform ${activeDropdown === 'signals' ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                {activeDropdown === 'signals' && (
                  <div className="pl-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {signalCategories.map(cat => (
                      <div key={cat.name} className="mb-4">
                        <Link href={`/signals/${cat.slug}`} onClick={() => setIsOpen(false)} className="text-cyan-500 text-[9px] font-bold uppercase mb-2 tracking-widest block">{cat.name}</Link>
                        <div className="grid grid-cols-2 gap-2">
                          {cat.sub.map(s => (
                            <Link key={s.label} href={`/signals/${cat.slug}?strategy=${s.strategy}`} onClick={() => setIsOpen(false)} className="text-slate-400 text-xs">{s.label}</Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Course & Analysis Simple Links for Mobile */}
              <Link href="/analysis" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 border-b border-white/5 text-white uppercase font-black text-lg">
                Market Analysis <ChevronRight size={18} className="text-slate-700" />
              </Link>
              <Link href="/calculator" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 border-b border-white/5 text-white uppercase font-black text-lg">
                Lot Calculator <ChevronRight size={18} className="text-slate-700" />
              </Link>
            </div>

            {/* SOCIALS & FOOTER */}
            <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
              <div className="flex justify-center gap-8">
                <FaWhatsapp size={22} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                <Phone size={22} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                <Mail size={22} className="text-slate-400 hover:text-cyan-400 transition-colors" />
              </div>
              <button className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 py-4 rounded font-bold uppercase tracking-widest text-[10px]">
                Support Terminal
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}