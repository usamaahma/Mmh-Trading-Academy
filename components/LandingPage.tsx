"use client";

import React, { useRef, useState, useEffect } from "react";
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
  Clock,
  Globe,
  Zap,
  TrendingDown,
  BarChart3,
  Calendar,
  AlertCircle,
  ImageIcon,
  User,
  Star,
  CheckCircle2,
  Plus,
  Minus,
  Calculator,
  LayoutDashboard,
  Wallet,
  Camera,
  ChevronLeft,
  Quote,
  MessageCircle,
  ThumbsUp,
  Award,
} from "lucide-react";
import PopupForm from "@/components/leads";
import Link from "next/link";

// Types for API data
interface AnalysisItem {
  landingChart?: string;
  pair: string;
  profit: string;
  reason: string;
  _id?: string;
}

interface WatchlistItem {
  pairName: string;
  entryPrice: string;
  shortDesc: string;
  _id?: string;
}

interface NewsItem {
  newsTitle: string;
  newsTime: string;
  _id?: string;
}

interface LandingData {
  _id?: string;
  pnl: string;
  analysisSection: AnalysisItem[];
  watchlist: WatchlistItem[];
  highImpactNews: NewsItem[];
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfessionalForexLanding() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [landingData, setLandingData] = useState<LandingData | null>(null);

  // SECTION 7: Risk Calculator State
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [positionSize, setPositionSize] = useState<number>(0);
  const [riskAmount, setRiskAmount] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Popup State
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContext, setPopupContext] = useState<{
    type: "button" | "cta" | "course";
    label?: string;
    courseName?: string;
  }>({ type: "button" });

  // Function to open popup
  const openPopup = (type: "button" | "cta" | "course", courseName?: string) => {
    setPopupContext({ type, label: type, courseName });
    setIsPopupOpen(true);
  };

  // FETCH LANDING PAGE DATA
  const fetchLandingData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/landing');
      if (response.ok) {
        const data = await response.json();

        setLandingData(data.data);
        console.log(data,"landingdata")
      } else {
        console.error('Failed to fetch landing data');
      }
    } catch (error) {
      console.error('Error fetching landing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // SAVE LANDING PAGE DATA
  const saveLandingData = async (data: Partial<LandingData>) => {
    try {
      const response = await fetch('/api/landing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setLandingData(updatedData);
        return updatedData;
      } else {
        console.error('Failed to save landing data');
        return null;
      }
    } catch (error) {
      console.error('Error saving landing data:', error);
      return null;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    calculateRisk();
    fetchLandingData();
  }, [balance, riskPercent, stopLoss]);

  const calculateRisk = () => {
    const amount = (balance * riskPercent) / 100;
    const size = amount / (stopLoss * 10);
    setRiskAmount(amount);
    setPositionSize(Number(size.toFixed(2)));
  };

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

  // Carousel navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % studentFeedback.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + studentFeedback.length) % studentFeedback.length);
  };

  // Auto carousel movement
  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isMounted, activeSlide]);

  const playfairClass = playfair?.className || "serif";
  const poppinsClass = poppins?.className || "sans-serif";

  const getSessionStatus = (start: number, end: number) => {
    if (!isMounted) return "Checking...";
    const currentHour = new Date().getUTCHours();
    const isOpen = start < end
      ? currentHour >= start && currentHour < end
      : currentHour >= start || currentHour < end;
    return isOpen ? "ACTIVE" : "CLOSED";
  };

  const sessions = [
    { n: "Sydney", i: <Globe size={24} />, p: "NZDUSD,AUDJPY", v: "50-80 Pips", start: 22, end: 7, h: "22:00 - 07:00" },
    { n: "Tokyo", i: <Clock size={24} />, p: "USDJPY,GBPJPY", v: "70-120 Pips", start: 0, end: 9, h: "00:00 - 09:00" },
    { n: "London", i: <Activity size={24} />, p: "EURUSD,GBPUSD", v: "90-170 Pips", start: 8, end: 17, h: "08:00 - 17:00" },
    { n: "New York", i: <Zap size={24} />, p: "XAUUSD, NAS100", v: "100-750 Pips", start: 13, end: 22, h: "13:00 - 22:00" },
  ];

  // STUDENT FEEDBACK DATA (static)
  const studentFeedback = [
    { n: "Abdullah R.", l: "Karachi, PK", p: "+$3,400", c: "MMH SMC Mastery", pr: 92, fb: "Finally someone who teaches real SMC! The MMH course completely changed my approach. No more guessing, just pure liquidity concepts.", stars: 5, type: "success" },
    { n: "Hira K.", l: "Lahore, PK", p: "+$5,200", c: "MSNR Framework", pr: 78, fb: "MSNR is a game changer. Entry clarity has improved 10x. Still learning but already profitable after 2 months.", stars: 5, type: "success" },
    { n: "Bilal A.", l: "Islamabad, PK", p: "+$7,200", c: "MMH Strategies", pr: 100, fb: "Passed my 50k FTMO challenge using MMH strategies. The institutional concepts are pure gold!", stars: 5, type: "success" },
    { n: "Fatima Z.", l: "Rawalpindi, PK", p: "+$500", c: "Smart Money Concepts", pr: 65, fb: "Great foundation course. The way they explain FVG and liquidity is unmatched. Highly recommend!", stars: 5, type: "success" },
    { n: "Hamza M.", l: "Multan, PK", p: "+$1,500", c: "MMH Trading Academy", pr: 88, fb: "From blowing accounts to consistent profits. The risk management section saved my trading career.", stars: 5, type: "success" },
    { n: "Sana I.", l: "Faisalabad, PK", p: "+$535", c: "MSNR Framework", pr: 55, fb: "Still in learning phase but the concepts are solid. Support team is very responsive!", stars: 4, type: "success" },
    { n: "Usman G.", l: "Peshawar, PK", p: "+$4,100", c: "MMH Strategies", pr: 95, fb: "The signal accuracy is impressive. Following their daily analysis has been consistently profitable.", stars: 5, type: "success" },
    { n: "Zainab T.", l: "Quetta, PK", p: "+$700", c: "SMC Fundamentals", pr: 45, fb: "Beginner friendly but still advanced. Loving the community and weekly live sessions.", stars: 4, type: "success" },
    { n: "Shahzad A.", l: "Sialkot, PK", p: "+$9,700", c: "MMH Trading Academy", pr: 72, fb: "The displacement entry technique alone was worth the course fee. Real edge in the markets.", stars: 5, type: "success" },
    { n: "Mehwish N.", l: "Gujranwala, PK", p: "+$2,300", c: "MSNR Framework", pr: 60, fb: "Finally understand market structure shifts. My winrate went from 40% to 65% in 3 months.", stars: 5, type: "success" },
    { n: "Ali H.", l: "Karachi, PK", p: "+$2,100", c: "MMH Signals", pr: 40, fb: "Signals are good but sometimes late. Would love faster delivery during London session. Overall still profitable though!", stars: 4, type: "constructive" },
    { n: "Sara K.", l: "Lahore, PK", p: "+$600", c: "MMH Trading Academy", pr: 58, fb: "Course content is 10/10 but I wish there were more live trading examples. The theory is solid but application needs more demos. Still recommend it!", stars: 4, type: "constructive" },
  ];

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeSlide + i) % studentFeedback.length;
      cards.push(studentFeedback[index]);
    }
    return cards;
  };

  // Course data for mapping
  const courses = [
    {
      t: "SMART MONEY CONCEPTS (SMC)",
      l: "Entry",
      p: "$99",
      d: "The core logic of market structure, FVG, inducement, and retail liquidity pools.",
    },
    {
      t: "MSNR",
      l: "Master",
      p: "$248",
      d: "Entry Clarity Through Structure, Trade Where Market Reacts",
    },
    {
      t: "MMH Trading Strategies",
      l: "Pro",
      p: "$500",
      d: "Master MMH trading strategies for consistent profits.",
    },
  ];

  if (isLoading) {
    return (
      <main className={`${poppinsClass} min-h-screen bg-[#010409] text-slate-400 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-sm uppercase tracking-wider">Loading Market Data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`${poppinsClass} min-h-screen bg-[#010409] text-slate-400 selection:bg-cyan-500/30 overflow-x-hidden`}>

      {/* MARKET NEWS TICKER */}
      <div className="w-full bg-[#05080f] border-b border-white/5 py-2 overflow-hidden whitespace-nowrap relative z-[100]">
        <div className="flex animate-marquee items-center gap-10">
          {[
            { m: "EURUSD hits key liquidity level at 1.0850", c: "🔵" },
            { m: "BTC Funding Rates turning negative on Binance", c: "🟠" },
            { m: "NVDA Earnings expected move +/- 8.4%", c: "🟢" },
            { m: "Gold (XAU) sweeps London session highs", c: "🔵" },
            { m: "ETH Whales moving 50k ETH to cold storage", c: "🟠" },
            { m: "S&P 500 futures showing bullish displacement", c: "🟢" },
          ].map((news, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
              <span>{news.c}</span> {news.m}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
            <span>🔵</span> MMH Signal: GBPJPY BUY @ 198.20
          </div>
        </div>
      </div>

      {/* HERO SECTION - Using dynamic PNL from API */}
      <section className="relative pt-32 md:pt-44 pb-16 px-4 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(34,211,238,0.08)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
              <Activity size={12} className="text-cyan-400 animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-cyan-400">
                MMH Trading Academy_v4.2
              </span>
            </div>
            <h1 className={`${playfairClass} text-5xl md:text-6xl font-bold leading-[0.85] tracking-tight text-white `}>
              Your Path To <br />
              <span className="text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                Successful Trading
              </span>
            </h1>
            <p className="max-w-lg text-xs md:text-sm text-white uppercase tracking-wide leading-relaxed">
              Stop Guessing the Market.
              Start Understanding Liquidity.
              We teach how smart money really moves.
            </p>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => openPopup("cta")}
                className="bg-cyan-500 text-black px-6 py-4 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all"
              >
                Get Premium Access
              </button>
              <Link href="/contact-us">
                <button
                  className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-cyan-500/30 transition-all shadow-sm"
                >
                  Contact Us
                </button>
              </Link>
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
                  ${landingData?.pnl || "0"}
                </p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
                  Running Profit
                </p>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[78%] animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* Dynamic analysis section pairs */}
                {landingData?.analysisSection?.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-black/40 border border-white/5 rounded text-center"
                  >
                    <p className="text-[8px] text-slate-500 uppercase">{item.pair}</p>
                    <p className="text-[10px] font-bold text-white">+${item.profit}</p>
                  </div>
                ))}
                {(!landingData?.analysisSection || landingData.analysisSection.length === 0) && (
                  <>
                    <div className="p-2 bg-black/40 border border-white/5 rounded text-center">
                      <p className="text-[8px] text-slate-500 uppercase">XAU</p>
                      <p className="text-[10px] font-bold text-white">+2.1%</p>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5 rounded text-center">
                      <p className="text-[8px] text-slate-500 uppercase">NAS</p>
                      <p className="text-[10px] font-bold text-white">+2.1%</p>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5 rounded text-center">
                      <p className="text-[8px] text-slate-500 uppercase">BTC</p>
                      <p className="text-[10px] font-bold text-white">+2.1%</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
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
                onClick={() => openPopup("button", item.title)}
                className="relative p-8 bg-[#0D1117] border border-white/5 rounded-2xl group cursor-pointer hover:border-cyan-500/50 transition-all"
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

      {/* RISK MANAGEMENT CALCULATOR */}
      <section className="py-12 md:py-20 px-4 bg-[#010409]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h2 className={`${playfairClass} text-3xl md:text-4xl text-white uppercase italic leading-tight`}>
              Accurate <span className="text-cyan-400">Risk Control.</span>
            </h2>
            <p className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-widest max-w-md mx-auto lg:mx-0">
              Smart trading starts with risk management. Use our calculator to find the right position size for your account.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="p-5 bg-[#0D1117] border border-white/5 rounded-2xl shadow-xl">
                <p className="text-[9px] text-slate-600 uppercase font-black mb-2 tracking-widest">Risk Amount</p>
                <p className="text-xl md:text-2xl font-black text-white">${riskAmount}</p>
              </div>
              <div className="p-5 bg-[#0D1117] border border-cyan-500/20 rounded-2xl shadow-xl shadow-cyan-500/5">
                <p className="text-[9px] text-cyan-500 uppercase font-black mb-2 tracking-widest">Recommended Lots</p>
                <p className="text-xl md:text-2xl font-black text-cyan-400">{positionSize}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0D1117] border border-white/5 p-6 md:p-10 lg:p-12 rounded-3xl md:rounded-[2.5rem] shadow-2xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Balance ($)</label>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="w-full bg-[#05080f] border border-white/10 rounded-xl md:rounded-2xl p-4 text-white font-bold outline-none focus:border-cyan-500/50 transition-colors text-sm"
                    placeholder="e.g. 10000"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Risk Percentage</label>
                    <span className="text-[10px] font-black text-cyan-400 uppercase bg-cyan-400/10 px-2 py-0.5 rounded">{riskPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="5"
                    step="0.25"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Stop Loss (Pips)</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStopLoss(s => Math.max(1, s - 5))}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(Number(e.target.value))}
                      className="flex-grow min-w-[60px] bg-[#05080f] border border-white/10 rounded-xl md:rounded-2xl p-3 text-white font-bold text-center outline-none focus:border-cyan-500/50 transition-colors text-sm"
                    />
                    <button
                      onClick={() => setStopLoss(s => s + 5)}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div
                  onClick={() => openPopup("cta")}
                  className="p-4 md:p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-start sm:items-center gap-4 cursor-pointer hover:bg-cyan-500/10 transition-all"
                >
                  <Calculator size={24} className="text-cyan-500 opacity-40 flex-shrink-0" />
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase leading-tight italic">
                    Position size calculated for 1:100 leverage standard forex accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASSET SPECIALIZATION */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfairClass} text-3xl text-white uppercase italic mb-10`}>
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
                onClick={() => openPopup("button", item.pair)}
                className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all group cursor-pointer"
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
            <h2 className={`${playfairClass} text-3xl text-white uppercase italic`}>
              High-Quality <span className="text-cyan-400">Trading Education</span>
            </h2>
            <p className="text-white"> From Basics to Mastery</p>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar scrollbar-hide"
          >
            {courses.map((course, i) => (
              <div
                key={i}
                onClick={() => openPopup("course", course.t)}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopup("course", course.t);
                    }}
                    className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase group-hover:gap-4 transition-all"
                  >
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

      {/* FOREX MARKET HOURS & SESSION MATRIX */}
      <section className="py-20 px-4 bg-[#05080f]">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfairClass} text-3xl text-white uppercase italic mb-10`}>
            Market <span className="text-cyan-400">Hours Matrix.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {sessions.map((s, i) => {
              const status = getSessionStatus(s.start, s.end);
              const isActive = status === "ACTIVE";

              return (
                <div
                  key={i}
                  className={`bg-[#0D1117] border ${isActive ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-white/5'} p-6 rounded-2xl transition-all relative overflow-hidden cursor-pointer hover:border-cyan-500/30`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 p-2">
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    </div>
                  )}
                  <div className={isActive ? "text-cyan-400 mb-4" : "text-slate-600 mb-4"}>{s.i}</div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{s.n}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] text-slate-500 uppercase">{s.h} GMT</p>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                      {status}
                    </span>
                  </div>
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center text-[9px] uppercase font-bold">
                      <span className="text-slate-600">Top Pairs</span>
                      <span className={isActive ? "text-cyan-400" : "text-slate-500"}>{s.p}</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] uppercase font-bold">
                      <span className="text-slate-600">Avg Vol</span>
                      <span className="text-white">{s.v}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WEEKLY MARKET RECAP & WATCHLIST - Using API data */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfairClass} text-3xl text-white uppercase italic mb-10`}>
            Trader's <span className="text-cyan-400">Journal & Watch.</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-[0.2em]">Last Week's Top Setups</h3>
             <Link href="/results"><div className="grid md:grid-cols-2 gap-6">
                {/* Dynamic analysis section setups */}
                {landingData?.analysisSection?.map((setup, i) => (
                  <div
                    key={i}
                    className="bg-[#0D1117] border border-white/5 p-4 rounded-2xl group cursor-pointer hover:border-cyan-500/50 transition-all"
                  >
                    {setup.landingChart ? (
                      <img
                        src={setup.landingChart}
                        alt={setup.pair}
                        className="w-full h-32 object-cover rounded-xl mb-4 bg-gradient-to-br from-gray-800 to-gray-900"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl aspect-video flex flex-col items-center justify-center border border-white/10 mb-4 overflow-hidden relative">
                        <Camera className="text-slate-600 mb-2 group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-[10px] text-slate-500 uppercase font-black">Chart Preview</span>
                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-black text-white uppercase">{setup.pair}</span>
                      <span className="text-[10px] font-black text-green-500">+${setup.profit}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase leading-relaxed font-bold">{setup.reason}</p>
                  </div>
                ))}
                {(!landingData?.analysisSection || landingData.analysisSection.length === 0) && (
                  <>
                    <div className="bg-[#0D1117] border border-white/5 p-4 rounded-2xl">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl aspect-video flex items-center justify-center mb-4">
                        <Camera className="text-slate-600" size={32} />
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-white uppercase">XAUUSD Sell-off</span>
                        <span className="text-[10px] font-black text-green-500">+140 Pips</span>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase">Liquidity grab at NY Open.</p>
                    </div>
                    <div className="bg-[#0D1117] border border-white/5 p-4 rounded-2xl">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl aspect-video flex items-center justify-center mb-4">
                        <Camera className="text-slate-600" size={32} />
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-white uppercase">NAS100 Displacement</span>
                        <span className="text-[10px] font-black text-green-500">+220 Pips</span>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase">Internal range expansion.</p>
                    </div>
                  </>
                )}
              </div></Link>
              
            </div>

            <div className="lg:col-span-4 bg-[#0D1117] border border-white/5 p-8 rounded-2xl flex flex-col">
              <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-[0.2em] mb-8">This Week's Watchlist</h3>
              <div className="space-y-6 flex-grow">
                {/* Dynamic watchlist items */}
                {landingData?.watchlist?.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => openPopup("button", item.pairName)}
                    className="group border-l-2 border-cyan-500/20 pl-4 hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-black text-white uppercase mb-1">{item.pairName}</p>
                    <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">{item.entryPrice}</p>
                    <p className="text-[9px] text-slate-600 uppercase font-bold italic mt-1">{item.shortDesc}</p>
                  </div>
                ))}
                {(!landingData?.watchlist || landingData.watchlist.length === 0) && (
                  <>
                    <div className="group border-l-2 border-cyan-500/20 pl-4">
                      <p className="text-xs font-black text-white uppercase mb-1">EURUSD</p>
                      <p className="text-[9px] text-cyan-400 font-bold uppercase">1.0820 Support</p>
                      <p className="text-[9px] text-slate-600 uppercase italic">Wait for mSS</p>
                    </div>
                    <div className="group border-l-2 border-cyan-500/20 pl-4">
                      <p className="text-xs font-black text-white uppercase mb-1">BTCUSD</p>
                      <p className="text-[9px] text-cyan-400 font-bold uppercase">68,500 FVG</p>
                      <p className="text-[9px] text-slate-600 uppercase italic">Looking for bounce</p>
                    </div>
                    <div className="group border-l-2 border-cyan-500/20 pl-4">
                      <p className="text-xs font-black text-white uppercase mb-1">AAPL</p>
                      <p className="text-[9px] text-cyan-400 font-bold uppercase">172.50 Gap</p>
                      <p className="text-[9px] text-slate-600 uppercase italic">Institutional Rebalance</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                <h4
                  onClick={() => openPopup("cta")}
                  className="text-[10px] font-black uppercase text-red-500 tracking-widest flex items-center gap-2 cursor-pointer hover:text-red-400 transition-colors"
                >
                  <AlertCircle size={14} /> High Impact News
                </h4>
                {/* Dynamic news items */}
                {landingData?.highImpactNews?.map((news, i) => (
                  <div key={i} className="flex justify-between items-center text-[12px] font-black text-slate-500 uppercase">
                    <span>{news.newsTitle}</span>
                    <span className="text-white">{news.newsTime}</span>
                  </div>
                ))}
                {(!landingData?.highImpactNews || landingData.highImpactNews.length === 0) && (
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase">
                    <span>FOMC Meeting</span>
                    <span className="text-white">Wed 14:00</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT SUCCESS TRACKER */}
      <section className="py-20 px-4 bg-[#05080f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${playfairClass} text-3xl text-white uppercase italic`}>
              Student <span className="text-cyan-400">Success Tracker.</span>
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-3">
              {studentFeedback.length}+ Real Traders • Real Results • Real Feedback
            </p>
          </div>

          <div className="relative px-4 md:px-12">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#0D1117] border border-white/10 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all hidden md:block"
            >
              <ChevronLeft size={20} className="text-cyan-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#0D1117] border border-white/10 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all hidden md:block"
            >
              <ChevronRight size={20} className="text-cyan-400" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {getVisibleCards().map((student, idx) => (
                <div
                  key={idx}
                  className={`bg-[#0D1117] border rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 group cursor-pointer ${student.type === "constructive"
                    ? "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                    : "border-white/5"
                    }`}
                >
                  <Quote className="text-cyan-500/20 mb-4" size={32} />
                  <p className="text-[13px] text-slate-300 leading-relaxed mb-6 italic">
                    "{student.fb}"
                  </p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${i < student.stars ? 'fill-cyan-500 text-cyan-500' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10">
                      <User size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">{student.n}</h4>
                      <p className="text-[9px] text-slate-500 uppercase">{student.l}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[8px] text-slate-600 uppercase tracking-wider">Course Taken</p>
                      <p className="text-[10px] font-bold text-cyan-400 uppercase">{student.c}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-slate-600 uppercase tracking-wider">Profit Generated</p>
                      <p className="text-[11px] font-bold text-green-500">{student.p}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-[8px] uppercase mb-1">
                      <span className="text-slate-600">Journey Progress</span>
                      <span className="text-cyan-400">{student.pr}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${student.pr}%` }}></div>
                    </div>
                  </div>
                  {student.type === "constructive" && (
                    <div className="mt-4 flex items-center gap-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <MessageCircle size={12} className="text-amber-400" />
                      <p className="text-[8px] text-amber-400 uppercase font-bold tracking-wider">
                        Honest Feedback • We're Improving
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: Math.ceil(studentFeedback.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx * 3)}
                  className={`h-1.5 rounded-full transition-all ${Math.floor(activeSlide / 3) === idx
                    ? "w-8 bg-cyan-500"
                    : "w-4 bg-white/20 hover:bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/5">
            <div
              onClick={() => openPopup("cta")}
              className="text-center cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all"
            >
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Success Rate</p>
            </div>
            <div
              onClick={() => openPopup("cta")}
              className="text-center cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all"
            >
              <p className="text-2xl font-bold text-white">$187K+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Total Student PNL</p>
            </div>
            <div
              onClick={() => openPopup("cta")}
              className="text-center cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all"
            >
              <p className="text-2xl font-bold text-white">2300+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Total Students</p>
            </div>
            <div
              onClick={() => openPopup("cta")}
              className="text-center cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all"
            >
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* BROKER & TOOL INTEGRATION */}
      <section className="py-20 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfairClass} text-3xl text-white uppercase italic mb-10 text-center md:text-center`}>
            Supported <span className="text-slate-500">Infrastructure.</span>
          </h2>
          <div className="flex flex-wrap justify-center md:justify-center gap-4">
            {[
              { n: "Binance", c: "border-amber-500/30 text-amber-400" },
              { n: "Bybit", c: "border-amber-400/30 text-amber-300" },
              { n: "Oanda", c: "border-slate-500/30 text-white" },
              { n: "TradingView", c: "border-blue-400/30 text-blue-300" },
              { n: "MT5", c: "border-blue-600/30 text-blue-500" },
              { n: "cTrader", c: "border-emerald-500/30 text-emerald-400" }
            ].map((tool, i) => (
              <Link
                key={i}
                href={`/brokers`}
                className="no-underline"
              >
                <div
                  className={`flex items-center gap-3 px-6 py-3 bg-[#0D1117] border rounded-full transition-all hover:scale-105 hover:bg-white/[0.02] cursor-pointer ${tool.c}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {tool.n}
                  </span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${playfairClass} text-5xl md:text-7xl text-white uppercase italic mb-8`}>
            Stop <span className="text-slate-500">Guessing.</span> <br /> Start <span className="text-cyan-400">Winning.</span>
          </h2>
          <button
            onClick={() => openPopup("cta")}
            className="bg-cyan-500 text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            Join The MMH Now
          </button>
        </div>
      </section>

      {/* POPUP FORM COMPONENT */}
      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        context={popupContext}
      />

      {/* CSS for Ticker Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
