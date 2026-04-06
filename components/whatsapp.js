"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phoneNumber = "966549357534"; // Aapka number
  const message = "Hello! I have a query regarding the trading course."; // Default message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
    >
      {/* Outer Animation Rings */}
      <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping group-hover:bg-cyan-500/20 transition-colors"></span>
      <span className="absolute -inset-1 rounded-full bg-green-500/10 animate-pulse group-hover:bg-cyan-500/10 transition-colors"></span>

      {/* Main Button */}
      <div className="relative bg-[#25D366] group-hover:bg-cyan-500 text-white p-3.5 rounded-2xl shadow-[0_0_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-500 flex items-center justify-center hover:-translate-y-1 active:scale-90">
        <FaWhatsapp size={24} fill="currentColor" className="text-white" />
        
        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-4 bg-[#0D1117] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Chat with Us
        </span>
      </div>
    </a>
  );
}