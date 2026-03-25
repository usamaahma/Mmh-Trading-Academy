import React from "react";
import {
  TrendingUp,
  Play,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Star,
  Lock,
  MousePointer2,
  Percent,
  LineChart,
  ShieldCheck,
  Terminal,
  Activity, // Fixed: Added missing import
  UserCheck,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-slate-900 pt-20 font-sans selection:bg-yellow-200 overflow-x-hidden">
      {/* 🔹 HERO SECTION (God-Tier Terminal Design) */}

      <section className="relative h-[calc(100vh-80px)] min-h-[650px] flex items-center px-6 bg-white overflow-hidden">
        {/* 🔹 Back-Layer: Trading Grid & Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[130px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* 🔹 Left Content: The Hook */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 bg-slate-900 text-yellow-500 px-5 py-2 rounded-full shadow-lg border border-yellow-500/20">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Institutional Data Stream Live
              </span>
            </div>

            {/* Typography Slightly Increased */}
            <h1 className="text-6xl md:text-7xl lg:text-[4rem] font-black leading-[0.82] tracking-tighter uppercase italic text-slate-900">
              Precision <br />
              <span className="text-yellow-500 not-italic drop-shadow-sm">
                Over Luck.
              </span>
            </h1>

            <div className="max-w-lg space-y-6">
              <p className="text-lg text-slate-600 leading-snug font-bold tracking-tight">
                MMH Trading Academy doesn't teach you to gamble. We teach you to{" "}
                <span className="text-slate-900 underline decoration-yellow-500 decoration-[3px] underline-offset-4">
                  read the footprints
                </span>{" "}
                of global banks using SMC protocols.
              </p>

              {/* Stats: Slightly more padding and bigger text */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Win Rate",
                    val: "87.4%",
                    icon: <TrendingUp size={14} />,
                  },
                  { label: "Community", val: "5K+", icon: <Globe size={14} /> },
                  {
                    label: "Funding",
                    val: "$10M+",
                    icon: <ShieldCheck size={14} />,
                  },
                  { label: "Signals", val: "24/7", icon: <Zap size={14} /> },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl"
                  >
                    <div className="text-yellow-600">{stat.icon}</div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">
                        {stat.label}
                      </p>
                      <p className="text-sm font-black text-slate-900 leading-none">
                        {stat.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons: Slightly larger for "Power" feel */}
            <div className="flex flex-wrap gap-5 pt-2">
              <button className="relative group overflow-hidden bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:shadow-xl active:scale-95">
                <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                  Enroll Now <ArrowRight size={16} />
                </span>
                <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button className="flex items-center gap-4 bg-white border-2 border-slate-900 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
                <Play size={16} fill="currentColor" /> Live Session
              </button>
            </div>
          </div>

          {/* 🔹 Right Content: Terminal (Back to 100% scale for impact) */}
          <div className="relative lg:scale-105 origin-right hidden lg:block">
            <div className="relative z-10 bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-slate-800">
              <div className="flex gap-2.5 mb-8 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                <span className="ml-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Terminal: MICHAEL_H
                </span>
              </div>

              <div className="space-y-7">
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter">
                    XAUUSD{" "}
                    <span className="text-yellow-500 not-italic text-xl">
                      H1
                    </span>
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-black text-green-500 tracking-tighter">
                      2154.20
                    </p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                      Market: High_Vol
                    </p>
                  </div>
                </div>

                <div className="relative h-44 bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-around px-8 opacity-30">
                    {[40, 70, 50, 85, 60, 95, 45, 80].map((h, i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-full ${i % 2 === 0 ? "bg-red-500" : "bg-green-500"}`}
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute top-[30%] left-0 w-full h-[25%] bg-yellow-500/10 border-y border-yellow-500/30 flex items-center px-4">
                    <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">
                      Order_Block
                    </span>
                  </div>
                  <div className="absolute top-[25%] right-10 flex items-center gap-2">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce shadow-xl shadow-white/20"></div>
                    <span className="text-[10px] font-black text-white bg-green-600 px-3 py-1 rounded-lg uppercase">
                      Buy
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: "Lot", v: "1.25 Std" },
                    { l: "R/R", v: "1:5.4" },
                    { l: "PNL", v: "+$2,450" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 text-center"
                    >
                      <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">
                        {s.l}
                      </p>
                      <p className="text-[11px] font-black text-white">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-yellow-500 p-5 rounded-3xl shadow-2xl z-20 animate-bounce hidden md:block border-4 border-white">
              <TrendingUp size={28} className="text-slate-900" />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 KNOWLEDGE MATRIX (Detailed Features) */}
      <section className="py-24 px-6 bg-[#FDFDFD] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-20 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-yellow-600 font-black uppercase tracking-[0.4em] text-[10px] block">
                The MMH Advantage
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
                Mastering the{" "}
                <span className="text-yellow-500">Core Protocols.</span>
              </h2>
              <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-2xl">
                Trading is not about guessing; it's about identifying liquidity
                and institutional traps. Our program takes you from market
                structure to advanced flow analysis, identifying exactly where
                retail money is trapped.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border-l-4 border-yellow-500 bg-white shadow-sm rounded-r-xl">
                <p className="text-3xl font-black text-slate-900">5k+</p>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mt-1">
                  Students
                </p>
              </div>
              <div className="p-6 border-l-4 border-yellow-500 bg-white shadow-sm rounded-r-xl">
                <p className="text-3xl font-black text-slate-900">150+</p>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mt-1">
                  Funded
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <LineChart />,
                title: "Market Structure",
                desc: "True nature of Bullish/Bearish trends, BOS (Break of Structure), and CHoCH protocols.",
              },
              {
                icon: <Zap />,
                title: "Liquidity Logic",
                desc: "Identifying Equal Highs/Lows and Trendline Liquidity that retail traders use as Support.",
              },
              {
                icon: <Lock />,
                title: "Supply & Demand",
                desc: "Advanced Order Block identification and FVG analysis to pinpoint entries.",
              },
              {
                icon: <MousePointer2 />,
                title: "Precision Entries",
                desc: "Lower timeframe (Ltf) refinements that allow for high RR setups with tight stops.",
              },
              {
                icon: <ShieldCheck />,
                title: "Risk Management",
                desc: "Professional trading plans, position sizing, and psychological fortitude for consistency.",
              },
              {
                icon: <Terminal />,
                title: "Live Execution",
                desc: "Trade live sessions with mentors during London and NY volatility sessions.",
              },
              {
                icon: <Percent />,
                title: "Prop Firm Prep",
                desc: "Specialized module focused on passing FTMO, MFF, and other funded challenges.",
              },
              {
                icon: <UserCheck />,
                title: "1-on-1 Audits",
                desc: "Get your journal audited monthly to identify execution leaks in your strategy.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-yellow-500 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-10 h-10 bg-slate-900 text-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  {React.cloneElement(f.icon, { size: 18 })}
                </div>
                <h3 className="text-[11px] font-black uppercase italic mb-3 tracking-widest tracking-tighter">
                  {f.title}
                </h3>
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 THE CURRICULUM */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
              Institutional <span className="text-yellow-500">Curriculum.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">
              Roadmap To Mastery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alpha Foundation",
                price: "$297",
                desc: "Build a rock-solid base in technical analysis without the retail noise.",
                features: [
                  "Structure 101",
                  "Candlestick Secrets",
                  "SR Reality",
                  "Risk Basics",
                ],
              },
              {
                name: "Smart Money Pro",
                price: "$597",
                popular: true,
                desc: "Our flagship program. Learn the complete institutional framework.",
                features: [
                  "Order Flow",
                  "Inducements",
                  "OB/FVG Masterclass",
                  "Funded Blueprint",
                ],
              },
              {
                name: "Elite Mentorship",
                price: "$1297",
                desc: "Hands-on, high-intensity program with direct access to Michael Harris.",
                features: [
                  "1-on-1 Coaching",
                  "Custom Indicators",
                  "Lifetime Hub",
                  "Psychology Kit",
                ],
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-10 rounded-[3rem] border transition-all duration-500 ${p.popular ? "bg-slate-900 text-white border-slate-900 shadow-2xl scale-105" : "bg-white border-slate-200"}`}
              >
                {p.popular && (
                  <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 inline-block">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  {p.name}
                </h3>
                <p
                  className={`text-[10px] my-6 font-bold uppercase ${p.popular ? "text-slate-400" : "text-slate-500"}`}
                >
                  {p.desc}
                </p>
                <div className="mb-8 border-t border-slate-100/10 pt-6 flex items-baseline gap-2">
                  <span
                    className={`text-5xl font-black ${p.popular ? "text-yellow-500" : "text-slate-900"}`}
                  >
                    {p.price}
                  </span>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    Lifetime
                  </span>
                </div>
                <ul className="space-y-4 mb-10">
                  {p.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"
                    >
                      <CheckCircle2 size={14} className="text-yellow-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-lg ${p.popular ? "bg-yellow-500 text-black hover:bg-white" : "bg-slate-900 text-white hover:bg-yellow-500 hover:text-black"}`}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 NEWSLETTER */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 p-12 md:p-24 rounded-[4rem] shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900">
            <Star size={150} />
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Join the <span className="text-yellow-500">Waitlist.</span>
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest max-w-sm mx-auto mb-12 leading-relaxed">
            Limited cohorts only. Get notified when the next trading cycle
            opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR@ALGO.EMAIL"
              className="flex-1 bg-slate-50 border border-slate-200 px-8 py-5 rounded-2xl focus:outline-none focus:border-yellow-500 transition-all font-mono text-[10px] text-yellow-600 font-black uppercase"
            />
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all shadow-xl">
              Submit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
