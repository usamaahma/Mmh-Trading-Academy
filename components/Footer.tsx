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
// Stable Icons from FontAwesome (React-Icons)
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-yellow-500/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* 🔹 TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 border-b border-white/5 pb-16">
          <div className="space-y-6">
            <div className="flex flex-col leading-tight cursor-pointer group">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-yellow-500 transition-colors">
                MMH{" "}
                <span className="text-yellow-500 group-hover:text-white">
                  TRADING
                </span>
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-bold -mt-1">
                Academy of Excellence
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Pakistan leading trading academy empowering thousands of students
              with SMC, ICT, and advanced market analysis.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-500 font-bold text-[10px] uppercase">
                <ShieldCheck size={16} /> Verified Academy
              </div>
              <div className="flex items-center gap-2 text-yellow-500 font-bold text-[10px] uppercase border-l border-white/10 pl-4">
                <Globe size={16} /> Global Presence
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">
                Navigation
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                <li className="hover:text-yellow-500 cursor-pointer transition flex items-center gap-2 group">
                  <ArrowRight
                    size={10}
                    className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Signals
                </li>
                <li className="hover:text-yellow-500 cursor-pointer transition flex items-center gap-2 group">
                  <ArrowRight
                    size={10}
                    className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Brokers
                </li>
                <li className="hover:text-yellow-500 cursor-pointer transition flex items-center gap-2 group">
                  <ArrowRight
                    size={10}
                    className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Courses
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">
                Legal
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                <li className="hover:text-yellow-500 cursor-pointer transition">
                  Risk Disclosure
                </li>
                <li className="hover:text-yellow-500 cursor-pointer transition">
                  Privacy Policy
                </li>
                <li className="hover:text-yellow-500 cursor-pointer transition">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">
              Join our Gold List
            </h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-xs focus:outline-none focus:border-yellow-500 transition-colors text-white"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 rounded-lg flex items-center justify-center transition shadow-lg shadow-yellow-500/10">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 MIDDLE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500 transition-all duration-300">
              <Phone
                className="text-yellow-500 group-hover:text-black"
                size={18}
              />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500">
                Call Support
              </p>
              <p className="text-white text-sm font-bold tracking-wider">
                +92 300 0000000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer md:justify-center">
            <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500 transition-all duration-300">
              <Mail
                className="text-yellow-500 group-hover:text-black"
                size={18}
              />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500">
                Email Us
              </p>
              <p className="text-white text-sm font-bold tracking-wider">
                support@mmh.com
              </p>
            </div>
          </div>

          {/* SOCIAL ICONS (USING REACT-ICONS FOR STABILITY) */}
          <div className="flex items-center gap-3 md:justify-end">
            {[
              { icon: <FaTelegramPlane size={18} />, link: "#" },
              { icon: <FaWhatsapp size={18} />, link: "#" },
              { icon: <FaInstagram size={18} />, link: "#" },
              { icon: <FaYoutube size={18} />, link: "#" },
              { icon: <FaFacebookF size={16} />, link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-yellow-500 hover:text-black transition-all border border-white/5 hover:border-yellow-500"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 🔹 BOTTOM SECTION */}
        <div className="pt-8 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} MMH Trading. Built for Success.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-yellow-500/50 hover:text-yellow-500 transition">
              <TrendingUp size={12} /> High Accuracy
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="max-w-[300px] text-center md:text-right leading-loose">
              Trading involves risk. Invest wisely.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
