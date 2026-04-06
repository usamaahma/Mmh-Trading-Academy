"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  ChevronDown,
  Calculator,
  Zap,
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
  const [courses, setCourses] = useState([]);

  // Fetch Courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course");
        const json = await res.json();
        if (json.success) setCourses(json.data);
      } catch (err) {
        console.error("Navbar courses fetch error:", err);
      }
    };
    fetchCourses();
  }, []);

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

  // const brokerCategories = [
  //   { name: "Low Spread", brands: ["Exness", "IC Markets", "FP Markets"] },
  //   { name: "News Trading", brands: ["XM Global", "Pepperstone", "OctaFX"] },
  //   { name: "Crypto Trading", brands: ["Bybit", "Binance", "Exness"] },
  // ];

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      {/* Top Banner */}
      <div className="bg-cyan-500 py-1.5 px-4 shadow-lg relative z-[110]">
        <div className="flex items-center justify-center gap-3 text-black text-center font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px]">
          <Gift size={14} className="animate-bounce" />
          Institutional Protocol: <span className="underline">50% Discount</span> for First 100 Students
          <button className="bg-black text-white px-2 py-0.5 rounded text-[8px] ml-2 uppercase">Claim</button>
        </div>
      </div>

      <nav className={`transition-all duration-300 border-b ${scrolled || isOpen ? "bg-[#010409]/95 backdrop-blur-xl border-cyan-500/20" : "bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 py-4">

          {/* LOGO */}
          <Link href="/" className="flex flex-col items-center group shrink-0 text-white">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
              MMH <span className="text-cyan-400 group-hover:text-white">TRADING</span>
            </span>
            <span className="text-sm uppercase text-slate-500 font-bold">Academy</span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">

            {/* SIGNALS DROPDOWN */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <span className="flex items-center gap-1">Signals <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" /></span>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
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
                            <Link key={s.label} href={`/signals/${cat.slug}?strategy=${s.strategy}`} className="block p-2 text-[9px] text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors">{s.label}</Link>
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
              <Link href="/brokers" className="flex items-center gap-1">
                Brokers
              </Link>
            </li>

            {/* 🔥 UPDATED COURSES (MAIN CLICK + DROPDOWN) */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <div className="flex items-center gap-1">
                <Link href="/courses" className="hover:text-cyan-400 transition-colors">Courses</Link>
                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0D1117] border border-white/10 p-2 rounded-xl min-w-[200px] shadow-2xl">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <Link key={course._id} href={`/courses/${course._id}`} className="block p-2.5 hover:bg-white/5 rounded-lg transition text-[9px] hover:text-cyan-400 whitespace-nowrap">
                        {course.courseName}
                      </Link>
                    ))
                  ) : (
                    <p className="p-2.5 text-[8px] text-slate-600 animate-pulse font-black uppercase">Initialising...</p>
                  )}
                </div>
              </div>
            </li>

            <Link href="/analysis" className="hover:text-cyan-400 transition-colors uppercase">Analysis</Link>
            <Link href="/Lot-size-calculator" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 uppercase"><Calculator size={14} className="text-cyan-500" /> Lot Size Calculator</Link>
            <Link href="/offers" className="text-cyan-400 font-black flex items-center gap-1 uppercase"><Zap size={12} fill="currentColor" /> Offers</Link>
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link href="/join" className="bg-cyan-500 text-black px-6 py-2.5 rounded font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">Join Now</Link>
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white z-[110] outline-none">{isOpen ? <X size={26} /> : <Menu size={26} />}</button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`fixed top-0 right-0 h-screen w-full bg-[#010409] z-[105] transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"} xl:hidden`}>
          <div className="flex flex-col h-full pt-32 px-8 pb-10 overflow-y-auto">

            {/* MOBILE COURSES */}
            <div className="border-b border-white/5 py-4">
              <div className="flex items-center justify-between">
                <Link href="/courses" onClick={() => setIsOpen(false)} className="text-white font-black uppercase text-lg italic">Courses</Link>
                <button onClick={() => toggleDropdown('courses')} className="p-2 text-white"><ChevronDown className={activeDropdown === 'courses' ? "rotate-180" : ""} /></button>
              </div>
              {activeDropdown === 'courses' && (
                <div className="mt-4 flex flex-col gap-4 pl-4 animate-in fade-in slide-in-from-top-1">
                  {courses.map(course => (
                    <Link key={course._id} href={`/courses/${course._id}`} onClick={() => setIsOpen(false)} className="text-slate-400 text-sm font-bold uppercase hover:text-cyan-400">
                      {course.courseName}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE SIGNALS */}
            <div className="border-b border-white/5 py-4">
              <button onClick={() => toggleDropdown('signals')} className="w-full flex items-center justify-between text-white font-black uppercase text-lg italic">
                Signals <ChevronDown className={activeDropdown === 'signals' ? "rotate-180" : ""} />
              </button>
              {activeDropdown === 'signals' && (
                <div className="mt-4 space-y-6 pl-4">
                  {signalCategories.map(cat => (
                    <div key={cat.name}>
                      <p className="text-cyan-500 text-[10px] font-black uppercase mb-3">{cat.name}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {cat.sub.map(s => (
                          <Link key={s.label} href={`/signals/${cat.slug}?strategy=${s.strategy}`} onClick={() => setIsOpen(false)} className="text-slate-400 text-xs font-bold uppercase">{s.label}</Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/analysis" onClick={() => setIsOpen(false)} className="py-6 border-b border-white/5 text-white font-black uppercase text-lg italic">Analysis</Link>
            <Link href="/Lot-size-calculator" onClick={() => setIsOpen(false)} className="py-6 border-b border-white/5 text-white font-black uppercase text-lg italic">Lot Size Calculator</Link>

            <div className="mt-auto flex justify-center gap-10 pt-10">
              <FaWhatsapp size={24} className="text-slate-500" />
              <Phone size={24} className="text-slate-500" />
              <Mail size={24} className="text-slate-500" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}