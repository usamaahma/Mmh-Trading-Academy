"use client";

import React from "react";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe,
  Quote,
} from "lucide-react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: "Risk Disclosure", slug: "/risk" },
    { name: "Privacy Policy", slug: "/privacy-policy" },
    { name: "Terms of Service", slug: "/terms" },
    { name: "Contact Us", slug: "/contact-us" },
  ];

  return (
    <footer className="bg-[#010409] text-slate-400 border-t border-cyan-500/10 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* 🔹 TOP SECTION: BRAND, LINKS & CEO MESSAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 border-b border-white/5 pb-16">

          {/* LOGO & DESCRIPTION */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/mmhlogo.png"
                alt="MMH Trading Academy"
                width={120}
                height={100}
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-[12px] leading-relaxed max-w-sm text-slate-500">
              Pakistan's premier trading protocol. Empowering the next generation of institutional traders through SMC, MSNR, and algorithmic analysis.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <div className="flex items-center gap-2 text-cyan-500 font-black text-[9px] uppercase tracking-widest bg-cyan-500/5 px-3 py-1.5 rounded-full border border-cyan-500/10">
                <ShieldCheck size={14} /> Verified Protocol
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-black text-[9px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Globe size={14} /> Global Presence
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                Navigation
              </h4>
              <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
                {["Brokers", "Courses", "Analysis"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={10}
                        className="text-cyan-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                Legal
              </h4>
              <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.slug}
                      className="hover:text-cyan-400 cursor-pointer transition-all duration-300 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 🔹 CEO MESSAGE SECTION (EXTRA LARGE IMAGE & HOVER GRAY) */}
          <div className="relative group bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 overflow-visible flex flex-col items-center shadow-inner mt-20 lg:mt-0">
            {/* LARGE Background Quote Icon */}
            <div className="absolute top-6 right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity z-0">
              <Quote size={100} className="text-cyan-500" />
            </div>

            <div className="flex flex-col items-center space-y-8 z-10">

              {/* EXTRA LARGE Direct Image Container */}
              <div className="relative w-56 h-56 -mt-36 group-hover:-mt-40 transition-all duration-500 flex items-center justify-center">
                {/* Neon Glow Blur */}
                <div className="absolute inset-0 bg-cyan-500/20 blur-[40px] opacity-50 group-hover:opacity-100 transition-all" />

                {/* PNG Image: Default Colorful -> Hover Grayish */}
                <div className="relative w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] transition-all duration-500">
                  <Image
                    src="/author.png"
                    alt="CEO MMH"
                    fill
                    className="object-contain grayscale-0 group-hover:grayscale transition-all duration-700 ease-in-out scale-110 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* CEO Text Details */}
              <div className="text-center">
                {/* <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.5em] mb-1">
                  Founding Protocol
                </p> */}
                <h4 className="text-white font-black uppercase italic tracking-tighter text-[28px] md:text-[28px] leading-none mb-3">
                  CEO <span className="text-cyan-400">MESSAGE</span>
                </h4>
                <p className="text-[11px] md:text-[11px] leading-[1.8] text-slate-200 italic max-w-sm text-center font-bold uppercase tracking-widest">
                  "Trading is not about being right, it's about being disciplined. Our mission is to transform retail mindsets into institutional powerhouses."
                </p>
              </div>

              {/* The Quote */}


              <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:w-full transition-all duration-1000" />
            </div>
          </div>
        </div>

        {/* 🔹 MIDDLE SECTION: CONTACT DEETS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
          <a
            href="https://wa.me/966549357534"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 transition-all duration-500">
              <FaWhatsapp className="text-cyan-500 group-hover:text-black" size={16} />
            </div>
            <div>
              <p className="text-[8px] uppercase font-black text-slate-600 tracking-tighter">
                Click To Contact On Whatsapp
              </p>
              <p className="text-white text-xs font-black tracking-[0.1em]">
                +966 54 935 7534
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 group cursor-pointer md:justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mmhacademy0@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer md:justify-center"
            >
              <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 transition-all duration-500">
                <Mail className="text-cyan-500 group-hover:text-black" size={16} />
              </div>
              <div>
                <p className="text-[8px] uppercase font-black text-slate-600 tracking-tighter">
                  Direct Inquiry
                </p>
                <p className="text-white text-xs font-black tracking-[0.1em]">
                  mmhacademy0@gmail.com
                </p>
              </div>
            </a>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-2 md:justify-end">
            {[
              { icon: <FaTelegramPlane size={16} />, link: "#" },
              { icon: <FaWhatsapp size={16} />, link: "https://wa.me/966549357534" },
              { icon: <FaInstagram size={16} />, link: "https://www.instagram.com/mmh_academy00?igsh=MTlldmRvZnRmam5vbA%3D%3D&utm_source=qr" },
              { icon: <FaYoutube size={16} />, link: "https://youtube.com/@master-mind-hunters?si=Chrkxz1plY2hExbN" },
              { icon: <FaFacebookF size={14} />, link: "https://www.facebook.com/share/1FjpMKbrpV/?mibextid=wwXIfr" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-500 text-slate-400 hover:text-black transition-all border border-white/5 hover:border-cyan-500 shadow-lg hover:shadow-cyan-500/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 🔹 BOTTOM SECTION: FOOTNOTE */}
        <div className="pt-8 border-t border-white/5 text-[9px] text-slate-600 uppercase font-bold tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {currentYear} MMH Protocol. All Rights Reserved.</p>
          <p className="max-w-[400px] text-center md:text-center leading-loose">
            Risk Warning: Trading involves significant financial exposure. Execution requires precision.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-500/40 hover:text-cyan-500 transition-colors">
              <TrendingUp size={12} /> Elite Performance
            </span>
            <span className="hidden md:inline text-white/5">|</span>
          </div>
        </div>
      </div>
    </footer>
  );
}