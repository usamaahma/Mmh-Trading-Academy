"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // 👈 Auth hooks
import {
  Phone,
  Mail,
  ChevronDown,
  Calculator,
  Zap,
  ChevronRight,
  Gift,
  Menu,
  X,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession(); // 👈 Session data
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      {/* Top Banner */}
      <div className="bg-cyan-500 py-1.5 px-4 shadow-lg relative z-[110]">
        <div className="flex items-center justify-center gap-3 text-black text-center font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px]">
          <Gift size={14} className="animate-bounce" />
          Institutional Protocol: <span className="underline">50% Discount</span>
          <button className="bg-black text-white px-2 py-0.5 rounded text-[8px] ml-2 uppercase">Claim</button>
        </div>
      </div>

      <nav className={`transition-all duration-300 border-b ${scrolled || isOpen ? "bg-[#010409]/95 backdrop-blur-xl border-cyan-500/20" : "bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 py-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0 z-[110]">
            <Image
              src="/mmhlogo.png"
              alt="MMH Trading Academy"
              width={100}
              height={80}
              className="object-contain w-[90px] md:w-[120px]"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
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
            <Link href="/results" className="hover:text-cyan-400 transition-colors uppercase">Results</Link>
            <Link href="/brokers" className="hover:text-cyan-400 transition-colors uppercase">Brokers</Link>
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

            {/* Admin Link (Only visible if Admin is logged in) */}
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="text-orange-500 font-black border border-orange-500/20 px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition-all uppercase">Admin</Link>
            )}
          </ul>

          {/* ACTIONS (JOIN NOW OR LOGOUT) */}
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl group"
              >
                <LogOut size={14} className="text-red-500 group-hover:text-white transition-colors" />
                Sign Out
              </button>
            ) : (
              <Link href="/login" className="hidden sm:block bg-cyan-500 text-black px-6 py-2.5 rounded font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                Join Now
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white z-[120] outline-none p-2">
              {isOpen ? <X size={28} className="text-cyan-500" /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 h-screen w-full bg-[#010409] z-[105] transition-all duration-500 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"} xl:hidden`}>
          <div className="flex flex-col h-full pt-28 px-6 pb-10 overflow-y-auto scrollbar-hide">

            {/* Logged In User Info Mobile */}
            {session && (
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl mb-6 border border-white/10">
                <div className="bg-cyan-500 p-2 rounded-lg text-black">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Active Trader</p>
                  <p className="text-sm text-white font-black uppercase tracking-tighter">{session.user.name}</p>
                </div>
              </div>
            )}

            {/* 1. COURSES MOBILE */}
            <div className="border-b border-white/5 py-3">
              <div className="flex items-center justify-between">
                <Link href="/courses" onClick={() => setIsOpen(false)} className="text-white font-black uppercase text-base italic flex items-center gap-2">
                  Courses
                </Link>
                <button onClick={() => toggleDropdown('courses')} className="p-3 text-cyan-500"><ChevronDown size={20} className={activeDropdown === 'courses' ? "rotate-180 transition-transform" : "transition-transform"} /></button>
              </div>
              {activeDropdown === 'courses' && (
                <div className="mt-2 grid grid-cols-1 gap-2 pl-4 animate-in slide-in-from-top-2">
                  {courses.map(course => (
                    <Link key={course._id} href={`/courses/${course._id}`} onClick={() => setIsOpen(false)} className="text-slate-400 text-[11px] font-bold uppercase py-2 border-l border-cyan-500/30 pl-4 hover:text-cyan-400">
                      {course.courseName}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 2. SIGNALS MOBILE */}
            <div className="border-b border-white/5 py-3">
              <button onClick={() => toggleDropdown('signals')} className="w-full flex items-center justify-between text-white font-black uppercase text-base italic">
                Signals <ChevronDown size={20} className={`text-cyan-500 ${activeDropdown === 'signals' ? "rotate-180 transition-transform" : "transition-transform"}`} />
              </button>
              {activeDropdown === 'signals' && (
                <div className="mt-4 space-y-5 pl-4 animate-in slide-in-from-top-2">
                  {signalCategories.map(cat => (
                    <div key={cat.name}>
                      <p className="text-cyan-500 text-[9px] font-black uppercase mb-2 tracking-widest">{cat.name}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {cat.sub.map(s => (
                          <Link key={s.label} href={`/signals/${cat.slug}?strategy=${s.strategy}`} onClick={() => setIsOpen(false)} className="text-slate-400 text-[10px] font-bold uppercase py-1 hover:text-white transition-colors">{s.label}</Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. STATIC LINKS */}
            <div className="flex flex-col">
              <Link href="/results" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-base italic">Results</Link>
              <Link href="/brokers" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-base italic">Brokers</Link>
              <Link href="/analysis" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-base italic">Analysis</Link>
              <Link href="/Lot-size-calculator" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-base italic flex items-center justify-between">
                Lot Size Calculator <Calculator size={18} className="text-cyan-500" />
              </Link>
              <Link href="/offers" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-cyan-400 font-black uppercase text-base italic flex items-center justify-between">
                Special Offers <Zap size={18} fill="currentColor" />
              </Link>
            </div>

            {/* AUTH BUTTON MOBILE */}
            {status === "authenticated" ? (
              <button
                onClick={() => { signOut(); setIsOpen(false); }}
                className="mt-8 bg-white/5 border border-red-500/20 text-red-500 w-full py-4 rounded font-black text-center uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign Out Protocol
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="mt-8 bg-cyan-500 text-black w-full py-4 rounded font-black text-center uppercase tracking-widest text-xs">Join Academy Now</Link>
            )}

            {/* FOOTER CONTACTS */}
            <div className="mt-10 flex justify-center gap-8 pb-10 border-t border-white/5 pt-10">
              <a href="https://wa.me/966549357534" className="text-slate-500 hover:text-green-500 transition-colors"><FaWhatsapp size={22} /></a>
              <a href="tel:+966549357534" className="text-slate-500 hover:text-cyan-500 transition-colors"><Phone size={22} /></a>
              <a href="mailto:info@mmh.com" className="text-slate-500 hover:text-cyan-500 transition-colors"><Mail size={22} /></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}