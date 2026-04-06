"use client";

import React, { useRef, useState, useEffect } from "react";
// 🔹 FIX 1: Added a fallback to prevent error if these fonts aren't exported exactly this way
import { playfair, poppins } from "@/lib/fonts";
import {
  ArrowRight,
  TrendingUp,
  Activity,
  ChevronRight,
  Coins,
  Flame,
  Search,
  MousePointer2,
} from "lucide-react";

export default function ProfessionalForexLanding() {
  // 🔹 FIX 2: Added 'null' as initial value and proper HTMLDivElement type
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔹 FIX 3: Added a simple 'mounted' state to prevent hydration flickering
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const slide = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // If fonts are missing in your lib, we use standard fallbacks to stop red lines
  const playfairClass = playfair?.className || "serif";
  const poppinsClass = poppins?.className || "sans-serif";

  return (
    <main
      className={`${poppinsClass} min-h-screen bg-[#010409] text-slate-400 selection:bg-cyan-500/30 overflow-x-hidden`}
    >
      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-44 pb-16 px-4 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(34,211,238,0.08)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
              <Activity size={12} className="text-cyan-400 animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-cyan-400">
                Institutional_Protocol_v4.2
              </span>
            </div>
            <h1
              className={`${playfairClass} text-5xl md:text-8xl font-bold leading-[0.85] tracking-tight text-white uppercase`}
            >
              TRADE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                FOOTPRINT.
              </span>
            </h1>
            <p className="max-w-lg text-xs md:text-sm text-slate-500 uppercase tracking-wide leading-relaxed">
              Stop trading patterns. Start trading liquidity. We decode the
              algorithm used by Tier-1 banks to hunt retail stops.
            </p>
            <div className="flex gap-3 pt-4">
              <button className="bg-cyan-500 text-black px-6 py-4 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                Enter Terminal
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                System Audit
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0D1117] border border-white/10 rounded-xl p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">
                Live_PNL_Pulse
              </span>
              <span className="text-[10px] text-slate-600">
                {isMounted ? "UTC-4 (NY)" : "--:--"}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold text-white tracking-tighter">
                  +$14,280.44
                </p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
                  Running Profit
                </p>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[78%] animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["XAU", "NAS", "BTC"].map((p) => (
                  <div
                    key={p}
                    className="p-2 bg-black/40 border border-white/5 rounded text-center"
                  >
                    <p className="text-[8px] text-slate-500 uppercase">{p}</p>
                    <p className="text-[10px] font-bold text-white">+2.1%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`${playfairClass} text-3xl text-white uppercase italic`}
            >
              The <span className="text-cyan-400">Methodology.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Identify POI",
                desc: "Locate Point of Interest using HTF Orderflow and Liquidity voids.",
                icon: <Search size={24} />,
              },
              {
                step: "02",
                title: "Refine Entry",
                desc: "Wait for LTF Displacement and Market Structure Shift (mSS).",
                icon: <MousePointer2 size={24} />,
              },
              {
                step: "03",
                title: "Scale Position",
                desc: "Secure partials at external liquidity and ride the institutional trend.",
                icon: <TrendingUp size={24} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 bg-[#0D1117] border border-white/5 rounded-2xl group"
              >
                <div className="text-5xl font-black text-white/5 absolute top-4 right-4">
                  {item.step}
                </div>
                <div className="text-cyan-400 mb-4">{item.icon}</div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed uppercase">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSET SPECIALIZATION */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`${playfairClass} text-3xl text-white uppercase italic mb-10`}
          >
            Asset <span className="text-cyan-400">Specialization.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                pair: "XAUUSD (GOLD)",
                icon: <Flame size={32} />,
                focus: "London Liquidity Sweeps",
                desc: "Master the 8:00 AM NY Open volatility. We target gold's high-probability manipulation legs.",
              },
              {
                pair: "NAS100 (TECH)",
                icon: <TrendingUp size={32} />,
                focus: "Opening Range Breakouts",
                desc: "Algorithmically hunting the liquidity above/below the previous day's high/low on tech indices.",
              },
              {
                pair: "BTCUSD (CRYPTO)",
                icon: <Coins size={32} />,
                focus: "Weekend Liquidity Loops",
                desc: "Understand how BTC rebalances FVG gaps during low-volume sessions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-tighter">
                  {item.pair}
                </h3>
                <p className="text-[10px] text-cyan-500 font-bold uppercase mb-4 tracking-[0.2em]">
                  {item.focus}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE CAROUSEL */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2
              className={`${playfairClass} text-3xl text-white uppercase italic`}
            >
              Elite <span className="text-cyan-400">Curriculum.</span>
            </h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar scrollbar-hide"
          >
            {[
              {
                t: "SMC Fundamentals",
                l: "Entry",
                p: "$199",
                d: "The core logic of market structure, FVG, and retail liquidity pools.",
              },
              {
                t: "Advanced Liquidity",
                l: "Master",
                p: "$499",
                d: "Bank manipulations and HTF/LTF alignment.",
              },
              {
                t: "The Funding Blueprint",
                l: "Pro",
                p: "$299",
                d: "Passing FTMO/MFF challenges with rigid risk protocols.",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[350px] bg-[#0D1117] border border-white/5 rounded-3xl p-8 group hover:bg-cyan-900/10 transition-all cursor-pointer"
              >
                <span className="text-[10px] px-3 py-1 border border-cyan-500/30 text-cyan-400 rounded-full uppercase font-bold">
                  {course.l}
                </span>
                <h3 className="text-xl font-bold text-white uppercase mt-6 mb-3 tracking-tighter">
                  {course.t}
                </h3>
                <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                  {course.d}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-white font-bold">{course.p}</span>
                  <button className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase group-hover:gap-4 transition-all">
                    View Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => slide("left")}
              className="p-4 bg-[#0D1117] border border-white/10 rounded-xl hover:text-cyan-400 transition-all active:scale-95"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <button
              onClick={() => slide("right")}
              className="p-4 bg-[#0D1117] border border-white/10 rounded-xl hover:text-cyan-400 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`${playfairClass} text-5xl md:text-7xl text-white uppercase italic mb-8`}
          >
            Stop Guessing. <br /> Start Winning.
          </h2>
          <button className="bg-cyan-500 text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)]">
            Join The 5% Now
          </button>
        </div>
      </section>
    </main>
  );
}
