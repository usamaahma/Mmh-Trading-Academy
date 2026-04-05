"use client";

import React from "react";
import {
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe,
  Send,
} from "lucide-react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: "Risk Disclosure", slug: "/risk-disclosure" },
    { name: "Privacy Policy", slug: "/privacy-policy" },
    { name: "Terms of Service", slug: "/terms" },
    { name: "Contact Us", slug: "/contact-us" },
  ];

  return (
    <footer className="bg-[#010409] text-slate-400 border-t border-cyan-500/10 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* 🔹 TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 border-b border-white/5 pb-16">

          {/* LOGO & DESCRIPTION (Centered) */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <div className="flex flex-col leading-tight cursor-pointer group">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase">
                MMH <span className="text-cyan-400 group-hover:text-white transition-colors">TRADING</span>
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-slate-500 font-bold text-center lg:text-left">
                Academy of Excellence
              </span>
            </div>
            <p className="text-[12px] leading-relaxed max-w-sm text-slate-500">
              Pakistan's premier trading protocol. Empowering the next generation of institutional traders through SMC, ICT, and algorithmic analysis.
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
                {["Signals", "Brokers", "Courses", "Analysis"].map((item) => (
                  <li key={item} className="hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-2 group">
                    <ArrowRight size={10} className="text-cyan-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
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

          {/* NEWSLETTER */}
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
            <div className="space-y-2">
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                Institutional Updates
              </h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Join our private distribution list.</p>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="TRADER@EMAIL.COM"
                className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder:text-slate-700"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-cyan-500 hover:bg-white text-black px-4 rounded-md flex items-center justify-center transition-all duration-300">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 MIDDLE SECTION: CONTACT DEETS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 transition-all duration-500">
              <Phone className="text-cyan-500 group-hover:text-black" size={16} />
            </div>
            <div>
              <p className="text-[8px] uppercase font-black text-slate-600 tracking-tighter">Support Line</p>
              <p className="text-white text-xs font-black tracking-[0.1em]">+92 300 0000000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer md:justify-center">
            <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 transition-all duration-500">
              <Mail className="text-cyan-500 group-hover:text-black" size={16} />
            </div>
            <div>
              <p className="text-[8px] uppercase font-black text-slate-600 tracking-tighter">Direct Inquiry</p>
              <p className="text-white text-xs font-black tracking-[0.1em]">support@mmhtrading.com</p>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-2 md:justify-end">
            {[
              { icon: <FaTelegramPlane size={16} />, link: "#" },
              { icon: <FaWhatsapp size={16} />, link: "#" },
              { icon: <FaInstagram size={16} />, link: "#" },
              { icon: <FaYoutube size={16} />, link: "#" },
              { icon: <FaFacebookF size={14} />, link: "#" },
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
          <p>© {currentYear} MMH Protocol. All Systems Operational.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-500/40 hover:text-cyan-500 transition-colors">
              <TrendingUp size={12} /> Elite Performance
            </span>
            <span className="hidden md:inline text-white/5">|</span>
            <p className="max-w-[400px] text-center md:text-right leading-loose opacity-50 italic">
              Risk Warning: Trading involves significant financial exposure. Execution requires precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}