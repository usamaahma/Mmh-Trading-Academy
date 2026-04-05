"use client";
import React from "react";
import { Percent, Gift, Users, Zap, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

const OfferCard = ({ icon: Icon, title, discount, desc, tag }) => (
  <div className="group relative bg-[#0D1117] border border-white/5 p-8 rounded-[2rem] hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
    {/* Background Glow */}
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-all" />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-2xl text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all">
          <Icon size={24} />
        </div>
        <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase border border-white/10 px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
      <div className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
        {discount} <span className="text-cyan-500">OFF</span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-8 font-medium">
        {desc}
      </p>

      <button className="w-full py-4 bg-white/5 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
        Claim Now <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-[#010409] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-cyan-500" />
            <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em]">Exclusive Deals</span>
          </div>
          <h1 className="text-6xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            Student {" "}<span className="text-cyan-500 text-outline-cyan">Privileges</span>
          </h1>
          <p className="max-w-md text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed pt-4">
            High-performance trading tools, specially priced for the next generation of analysts.
          </p>
        </div>

        {/* Main Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OfferCard
            icon={GraduationCap}
            tag="Academic"
            title="Student Verify"
            discount="40%"
            desc="Verify your university ID and unlock our most powerful analytics at nearly half the price."
          />
          <OfferCard
            icon={Zap}
            tag="Starter"
            title="Fast Track Bundle"
            discount="25%"
            desc="Get Forex + Crypto signals combined. Perfect for students starting their multi-market journey."
          />
          <OfferCard
            icon={Users}
            tag="Community"
            title="Referral Loop"
            discount="FREE"
            desc="Bring 2 friends to the terminal and get 1 month of premium analysis completely on us."
          />
        </div>

        {/* Secondary Info Sections (Chote Sections) */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <ShieldCheck className="text-cyan-500" size={32} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter text-white">Secure Access</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
              All student accounts are protected with institutional-grade security. Your data is your own.
            </p>
          </div>

          <div className="space-y-4">
            <Gift className="text-cyan-500" size={32} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter text-white">Daily Giveaways</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
              Join our Discord. We drop free analysis passes every 24 hours for active student members.
            </p>
          </div>

          <div className="space-y-4">
            <Percent className="text-cyan-500" size={32} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter text-white">Zero Hidden Fees</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
              What you see is what you pay. No tax, no processing fees, no bullshit for our students.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 bg-cyan-500 p-12 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">
              Ready to dominate <br /> the markets?
            </h2>
            <p className="text-black/60 font-bold text-[10px] uppercase mt-4 tracking-widest">Limited slots available for the current semester.</p>
          </div>
          <button className="relative z-10 px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all active:scale-95 shadow-2xl">
            Join the Terminal
          </button>

          {/* Decorative Circle */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[20px] border-black/5 rounded-full" />
        </div>

      </div>
    </div>
  );
}