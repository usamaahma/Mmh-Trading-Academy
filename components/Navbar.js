"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
  Lock,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courses, setCourses] = useState([]);

  const ADMIN_WHATSAPP = "https://wa.me/966549357534";

  // 1. Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course");
        const json = await res.json();
        if (json.success) {
          setCourses(json.data);
        }
      } catch (err) {
        console.error("Navbar courses fetch error:", err);
      }
    };
    fetchCourses();
  }, [status]);

  // 2. Course Access Logic (Alert + WhatsApp)
  const handleCourseClick = (e, courseId, courseName) => {
    if (status === "unauthenticated") {
      e.preventDefault();
      alert("Please login first to view course details.");
      window.location.href = "/login";
      return;
    }

    if (session?.user?.role === "ADMIN") return;

    const isEnrolled = session?.user?.enrolledCourses?.includes(courseId);
    if (!isEnrolled) {
      e.preventDefault();
      alert(`You haven't paid for "${courseName}".\n\nContacting Admin for access...`);
      window.open(ADMIN_WHATSAPP, "_blank");
    }
  };

  // 3. Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. Prevent Scroll when Mobile Menu Open
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
      {/* --- TOP PROMO BANNER --- */}
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
              width={120}
              height={80}
              className="object-contain w-[90px] md:w-[120px]"
              priority
            />
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <ul className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            
            {/* Signals Dropdown (Accessible to all logged in users) */}
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

            {/* Courses Dropdown (Restricted Access) */}
            <li className="relative group py-2 cursor-pointer hover:text-cyan-400 transition-all">
              <div className="flex items-center gap-1">
                <Link href="/courses" className="hover:text-cyan-400 transition-colors">Courses</Link>
                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0D1117] border border-white/10 p-2 rounded-xl min-w-[220px] shadow-2xl overflow-hidden">
                  {courses.length > 0 ? (
                    courses.map((course) => {
                      const hasAccess = session?.user?.role === "ADMIN" || session?.user?.enrolledCourses?.includes(course._id);
                      return (
                        <Link 
                          key={course._id} 
                          href={`/courses/${course._id}`} 
                          onClick={(e) => handleCourseClick(e, course._id, course.courseName)}
                          className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition group/item"
                        >
                          <span className="text-[9px] text-slate-400 group-hover/item:text-cyan-400 uppercase font-black tracking-widest">
                            {course.courseName}
                          </span>
                          {!hasAccess && (
                            <Lock size={10} className="text-slate-700 group-hover/item:text-cyan-500/40" />
                          )}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="p-4 text-[8px] text-slate-600 animate-pulse font-black uppercase tracking-widest text-center">Initialising Data...</p>
                  )}
                </div>
              </div>
            </li>

            <Link href="/analysis" className="hover:text-cyan-400 transition-colors uppercase">Analysis</Link>
            <Link href="/Lot-size-calculator" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 uppercase">
              <Calculator size={14} className="text-cyan-500" /> Calculator
            </Link>
            <Link href="/offers" className="text-cyan-400 font-black flex items-center gap-1 uppercase italic">
              <Zap size={12} fill="currentColor" /> Offers
            </Link>

            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="text-orange-500 font-black border border-orange-500/20 px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition-all uppercase text-[9px]">
                Admin Panel
              </Link>
            )}
          </ul>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group shadow-2xl"
              >
                <LogOut size={14} className="text-red-500 group-hover:text-white transition-colors" />
                Logout
              </button>
            ) : (
              <Link href="/login" className="hidden sm:block bg-cyan-500 text-black px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-cyan-500/20">
                Join Academy
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white z-[120] p-2 outline-none">
              {isOpen ? <X size={28} className="text-cyan-500" /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`fixed inset-0 h-screen w-full bg-[#010409] z-[105] transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"} xl:hidden`}>
          <div className="flex flex-col h-full pt-32 px-6 pb-10 overflow-y-auto scrollbar-hide">
            
            {session && (
              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl mb-8 border border-white/10 shadow-2xl">
                <div className="bg-cyan-500 p-3 rounded-2xl text-black shadow-lg"><UserIcon size={24} /></div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{session.user.role || 'Member'}</p>
                  <p className="text-lg text-white font-black uppercase italic tracking-tight">{session.user.username || session.user.name}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <div className="border-b border-white/5">
                <button onClick={() => toggleDropdown('courses')} className="w-full flex items-center justify-between text-white font-black uppercase text-xl italic py-5">
                  Academy Courses <ChevronDown size={20} className={`text-cyan-500 transition-transform duration-300 ${activeDropdown === 'courses' ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === 'courses' && (
                  <div className="grid grid-cols-1 gap-1 py-4 pl-4 border-l-2 border-cyan-500/20 mb-4 animate-in slide-in-from-top-2">
                    {courses.map(course => {
                      const hasAccess = session?.user?.role === "ADMIN" || session?.user?.enrolledCourses?.includes(course._id);
                      return (
                        <Link 
                          key={course._id} 
                          href={`/courses/${course._id}`} 
                          onClick={(e) => { setIsOpen(false); handleCourseClick(e, course._id, course.courseName); }} 
                          className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase py-3 hover:text-cyan-400 transition-colors"
                        >
                          {course.courseName}
                          {!hasAccess && <Lock size={12} className="text-slate-800" />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link href="/signals/forex" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-xl italic">Signals Protocol</Link>
              <Link href="/results" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-xl italic">Performance</Link>
              <Link href="/brokers" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-xl italic">Trusted Brokers</Link>
              <Link href="/Lot-size-calculator" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-white font-black uppercase text-xl italic flex items-center justify-between">Risk Calculator <Calculator size={22} className="text-cyan-500" /></Link>
              <Link href="/offers" onClick={() => setIsOpen(false)} className="py-5 border-b border-white/5 text-cyan-400 font-black uppercase text-xl italic flex items-center justify-between">Special Offers <Zap size={22} fill="currentColor" /></Link>
            </div>

            <div className="mt-auto pt-10">
              {status === "authenticated" ? (
                <button onClick={() => { signOut(); setIsOpen(false); }} className="bg-red-500/10 border border-red-500/20 text-red-500 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3">
                  <LogOut size={16} /> Sign Out System
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="bg-cyan-500 text-black w-full py-5 rounded-2xl font-black text-center uppercase tracking-widest text-xs shadow-2xl block shadow-cyan-500/20">
                  Initialise Member Access
                </Link>
              )}
            </div>

            <div className="mt-10 flex justify-center gap-10 pb-10 border-t border-white/5 pt-10">
              <a href={ADMIN_WHATSAPP} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-green-500 transition-colors"><FaWhatsapp size={24} /></a>
              <a href="tel:+966549357534" className="text-slate-500 hover:text-cyan-500 transition-colors"><Phone size={24} /></a>
              <a href="mailto:info@mmh.com" className="text-slate-500 hover:text-cyan-500 transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}