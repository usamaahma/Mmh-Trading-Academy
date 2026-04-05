"use client";

import React, { useRef } from "react";
import { playfair, poppins } from "@/lib/fonts";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
  BarChart3,
  ChevronRight,
  Cpu,
  Layers,
  History,
  Target,
  Globe,
  Coins,
  Flame,
  Search,
  MousePointer2,
  Lock,
  Radio,
} from "lucide-react";

export default function ProfessionalForexLanding() {
  // 🔹 FIX 1: Ref ko HTMLDivElement ki type di taake TS ko pata chale ye scrollable div hai
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔹 FIX 2: direction ko strict type ('left' | 'right') di taake 'any' wala error khatam ho
  const slide = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <main
      className={`${poppins.className} min-h-screen bg-[#010409] text-slate-400 selection:bg-cyan-500/30 overflow-x-hidden`}
    >
      {/* 🔹 HERO SECTION */}
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
            <h1 className={`${playfair.className} text-5xl md:text-8xl font-bold leading-[0.85] tracking-tight text-white uppercase`}>
              TRADE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                FOOTPRINT.
              </span>
            </h1>
            <p className="max-w-lg text-xs md:text-sm text-slate-500 uppercase tracking-wide leading-relaxed">
              Stop trading patterns. Start trading liquidity. We decode the algorithm
              used by Tier-1 banks to hunt retail stops.
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
              <span className="text-[10px] font-bold text-cyan-400 uppercase">Live_PNL_Pulse</span>
              <span className="text-[10px] text-slate-600">UTC-4 (NY)</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold text-white tracking-tighter">+$14,280.44</p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Running Profit</p>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[78%] animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["XAU", "NAS", "BTC"].map((p) => (
                  <div key={p} className="p-2 bg-black/40 border border-white/5 rounded text-center">
                    <p className="text-[8px] text-slate-500 uppercase">{p}</p>
                    <p className="text-[10px] font-bold text-white">+2.1%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 THE 3-STEP PROCESS */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`${playfair.className} text-3xl text-white uppercase italic`}>
              The <span className="text-cyan-400">Methodology.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Identify POI", desc: "Locate Point of Interest using HTF Orderflow and Liquidity voids.", icon: <Search size={24} /> },
              { step: "02", title: "Refine Entry", desc: "Wait for LTF Displacement and Market Structure Shift (mSS).", icon: <MousePointer2 size={24} /> },
              { step: "03", title: "Scale Position", desc: "Secure partials at external liquidity and ride the institutional trend.", icon: <TrendingUp size={24} /> },
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-[#0D1117] border border-white/5 rounded-2xl group">
                <div className="text-5xl font-black text-white/5 absolute top-4 right-4">{item.step}</div>
                <div className="text-cyan-400 mb-4">{item.icon}</div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">{item.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed uppercase">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 ASSET SPECIALIZATION */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfair.className} text-3xl text-white uppercase italic mb-10`}>
            Asset <span className="text-cyan-400">Specialization.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { pair: "XAUUSD (GOLD)", icon: <Flame size={32} />, focus: "London Liquidity Sweeps", desc: "Master the 8:00 AM NY Open volatility. We target gold's high-probability manipulation legs and hunt the 5m Order Blocks." },
              { pair: "NAS100 (TECH)", icon: <TrendingUp size={32} />, focus: "Opening Range Breakouts", desc: "Algorithmically hunting the liquidity above/below the previous day's high/low on tech indices with precision timing." },
              { pair: "BTCUSD (CRYPTO)", icon: <Coins size={32} />, focus: "Weekend Liquidity Loops", desc: "Understand how BTC rebalances FVG gaps during low-volume sessions. Trade the institutional footprint in a 24/7 market." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-tighter">{item.pair}</h3>
                <p className="text-[10px] text-cyan-500 font-bold uppercase mb-4 tracking-[0.2em]">{item.focus}</p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 LIVE MARKET STREAM */}
      <section className="py-16 bg-gradient-to-r from-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-red-500 mb-4">
              <Radio size={16} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Live Mentorship Sessions</span>
            </div>
            <h2 className={`${playfair.className} text-4xl text-white uppercase mb-6`}>
              We don't just teach. <br /> We <span className="text-cyan-400">Execute Live.</span>
            </h2>
            <p className="text-xs text-slate-500 uppercase leading-loose tracking-widest mb-8">
              Every New York Open, join our lead analysts as they break down the market footprint in real-time.
              See exactly how we identify institutional traps before they happen.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-4 rounded-lg bg-black/40">
                <p className="text-white font-bold text-xl">Daily</p>
                <p className="text-[9px] text-cyan-400 uppercase tracking-tighter">Live NY Stream</p>
              </div>
              <div className="border border-white/10 p-4 rounded-lg bg-black/40">
                <p className="text-white font-bold text-xl">24/7</p>
                <p className="text-[9px] text-cyan-400 uppercase tracking-tighter">Discord Support</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0D1117] border border-white/10 rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-58a2524e9ec5?q=80&w=2070')] bg-cover opacity-20 grayscale"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center animate-bounce cursor-pointer">
                <ChevronRight className="text-black ml-1" />
              </div>
              <p className="text-[10px] font-bold text-white uppercase mt-4 tracking-widest">Watch Sample Audit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 COURSE CAROUSEL */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className={`${playfair.className} text-3xl text-white uppercase italic`}>
              Elite <span className="text-cyan-400">Curriculum.</span>
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Scale from Zero to $100k Funded.</p>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { t: "SMC Fundamentals", l: "Entry", p: "$199", d: "The core logic of market structure, FVG, and retail liquidity pools." },
              { t: "Advanced Liquidity", l: "Master", p: "$499", d: "Bank manipulations and HTF/LTF alignment for high R:R entries." },
              { t: "The Funding Blueprint", l: "Pro", p: "$299", d: "Passing FTMO/MFF challenges with rigid risk management protocols." },
              { t: "Crypto Algo Trading", l: "Expert", p: "$399", d: "Deploying institutional logic into the 24/7 Bitcoin and ETH markets." },
              { t: "Psychology & Tape", l: "Mindset", p: "$149", d: "Master the mental game of holding runners for 1:10+ RR trades." },
            ].map((course, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[350px] bg-[#0D1117] border border-white/5 rounded-3xl p-8 group hover:bg-cyan-900/10 transition-all cursor-pointer">
                <span className="text-[10px] px-3 py-1 border border-cyan-500/30 text-cyan-400 rounded-full uppercase font-bold">{course.l}</span>
                <h3 className="text-xl font-bold text-white uppercase mt-6 mb-3 tracking-tighter">{course.t}</h3>
                <p className="text-xs text-slate-500 mb-8 leading-relaxed">{course.d}</p>
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
            <button onClick={() => slide("left")} className="group relative p-4 bg-[#0D1117] border border-white/10 rounded-xl transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <ChevronRight className="rotate-180 text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" size={20} />
            </button>
            <button onClick={() => slide("right")} className="group relative p-4 bg-[#0D1117] border border-white/10 rounded-xl transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <ChevronRight className="text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 🔹 INFRASTRUCTURE GRID */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className={`${playfair.className} text-3xl text-white uppercase italic tracking-tighter`}>
              The <span className="text-cyan-400">Infrastructure.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {[
              { icon: <Cpu size={20} />, title: "Execution Hub", desc: "Proprietary bridge for 5ms latency." },
              { icon: <Layers size={20} />, title: "SMC Overlays", desc: "Automated FVG & Liquidity mapping." },
              { icon: <Target size={20} />, title: "Risk Protocol", desc: "Hard-coded drawdown protection." },
              { icon: <Globe size={20} />, title: "News Filter", desc: "Live High-Impact event shielding." },
              { icon: <History size={20} />, title: "Tape Reading", desc: "Historical price action deconstruction." },
              { icon: <ShieldCheck size={20} />, title: "Audit Ready", desc: "Built for $100k+ Prop Firm Rules." },
              { icon: <BarChart3 size={20} />, title: "Volume Delta", desc: "Real-time buying vs selling power." },
              { icon: <Terminal size={20} />, title: "API Bridge", desc: "Seamless MT4/MT5 synchronization." },
            ].map((f, i) => (
              <div key={i} className="bg-[#010409] p-10 hover:bg-cyan-500/5 transition-all group flex flex-col items-center text-center">
                <div className="text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-[11px] font-bold text-white uppercase mb-3 tracking-[0.2em]">{f.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase leading-relaxed max-w-[180px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 INSTITUTIONAL EDGE */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="hidden md:block w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent rounded-full mt-2"></div>
              <div className="space-y-4">
                <h2 className={`${playfair.className} text-2xl md:text-3xl text-white uppercase italic tracking-tight`}>
                  The Institutional <span className="text-cyan-400">Edge.</span>
                </h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                  Trading is not about predicting the future; it's about following the money.
                  Retail traders often get trapped in "smart money" manipulations because they
                  rely on lagging indicators and static patterns. Our approach strips away the
                  noise, focusing purely on <span className="text-white font-medium italic">Liquidity Pools, Order Blocks, and Time & Price alignment.</span> {" "}
                  By understanding the footprint of central banks, you stop being the exit liquidity
                  and start trading alongside the dominant market force.
                </p>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] pt-2 border-b border-cyan-500/30 pb-1">
                  Precision Execution Protocol
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 RISK PROTECTION */}
      <section className="py-16 border-y border-white/5 bg-[#0D1117]/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className={`${playfair.className} text-3xl text-white uppercase italic mb-12`}>
            Institutional <span className="text-red-500">Guardrails.</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Max Daily DD", val: "3%", icon: <Lock size={18} /> },
              { label: "Max Total DD", val: "8%", icon: <ShieldCheck size={18} /> },
              { label: "Profit Target", val: "10%", icon: <Target size={18} /> },
              { label: "Leverage", val: "1:100", icon: <Zap size={18} /> },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-white/5 rounded-xl bg-black/40">
                <div className="text-slate-600 mb-3 flex justify-center">{item.icon}</div>
                <p className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-1">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 WHY STUDENTS FAIL */}
      <section className="py-16 bg-[#0D1117]/30">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-4xl text-white uppercase`}>
              Why 95% <br /> Of Traders <span className="text-red-500">Fail.</span>
            </h2>
            <div className="space-y-4 text-xs uppercase leading-relaxed">
              <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5">
                <Zap size={16} className="text-red-500 shrink-0" />
                <p>Retail patterns like Trendlines are used as bait for institutional exit liquidity.</p>
              </div>
              <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5">
                <ShieldCheck size={16} className="text-red-500 shrink-0" />
                <p>Lack of HTF (High Time Frame) bias results in trading against the bank trend.</p>
              </div>
            </div>
          </div>
          <div className="p-8 border-l-4 border-cyan-500 bg-cyan-500/5">
            <p className={`${playfair.className} text-xl text-white italic mb-4`}>
              "The market is a device for transferring money from the impatient to the patient."
            </p>
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">— MMH TRADING ACADEMY</p>
          </div>
        </div>
      </section>

      {/* 🔹 FAQ */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-center text-xs font-bold text-slate-500 uppercase tracking-[0.5em] mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Do I need a large account?", a: "No. We specialize in teaching students how to pass 5 and 6-figure funding challenges using low-risk SMC entries." },
            { q: "Is there a community?", a: "Yes. Joining gives you instant access to our Discord where we discuss XAUUSD, NAS100, and BTCUSD setups live." },
            { q: "What is the mentorship duration?", a: "Our core curriculum is lifetime access, including weekly live audit sessions until you reach consistency." },
          ].map((faq, i) => (
            <details key={i} className="group border border-white/5 bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all">
              <summary className="flex justify-between items-center text-[10px] font-bold uppercase text-white list-none">
                {faq.q} <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-[10px] text-slate-500 leading-relaxed uppercase">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 🔹 FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${playfair.className} text-5xl md:text-7xl text-white uppercase italic mb-8`}>
            Stop Guessing. <br /> Start Winning.
          </h2>
          <button className="bg-cyan-500 text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)]">
            Join The 5% No
          </button>
          <p className="mt-8 text-[9px] text-slate-600 uppercase tracking-widest">Next Batch Starts In: 02d : 14h : 45m</p>
        </div>
      </section>
    </main>
  );
}