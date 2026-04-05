"use client";
import React, { useState, useEffect } from "react";
import { ExternalLink, Loader2, Zap, ShieldCheck, Bitcoin, Gift, ArrowUpRight } from "lucide-react";

export default function FourColumnBrokers() {
    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: "Low Spread Brokers", icon: <Zap size={16} className="text-yellow-400" /> },
        { id: "Best For News Trading Brokers", icon: <ShieldCheck size={16} className="text-blue-400" /> },
        { id: "Best For Crypto Trading Brokers", icon: <Bitcoin size={16} className="text-orange-400" /> },
        { id: "Deposit Bonus Brokers", icon: <Gift size={16} className="text-purple-400" /> }
    ];

    useEffect(() => {
        const fetchBrokers = async () => {
            try {
                const res = await fetch("/api/brokers");
                const json = await res.json();
                if (json.success) setBrokers(json.data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchBrokers();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#010409]">
            <Loader2 className="animate-spin text-cyan-500" size={32} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-20 pb-20 px-4 md:px-6 font-sans">
            <div className="max-w-[1440px] mx-auto ">

                {/* HEADER */}
                <div className="mb-10 flex flex-col items-center text-center mt-10">
                    <h1 className="text-3xl md:text-4xl font-[1000] italic uppercase tracking-tighter leading-none">
                        BROKERS <span className="text-cyan-500 text-xl md:text-xl">/</span>{" "}<span className="text-cyan-500 text-xl md:text-xl">PARTNERS</span>
                    </h1>

                    {/* CENTERED DIVIDER LINE */}
                    <div className="h-1 w-20 bg-cyan-500 mt-4 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                    {/* 
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-3">
                        Institutional Partners
                    </p> */}
                </div>

                {/* 4 COLUMN GRID WITH FIXED SPACING */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/5">
                    {categories.map((cat, index) => {
                        const filtered = brokers.filter(b => b.category === cat.id);

                        return (
                            <div
                                key={cat.id}
                                className={`flex flex-col py-8 px-2 md:p-6 lg:p-8 
                                    /* Desktop Vertical Dividers */
                                    ${index !== 3 ? 'lg:border-r border-white/10' : ''} 
                                    /* Tablet Dividers */
                                    ${index % 2 === 0 ? 'sm:border-r' : ''}
                                    /* Mobile Bottom Dividers */
                                    border-b border-white/10 lg:border-b-0`}
                            >
                                {/* COLUMN HEADER */}
                                <div className="flex items-center gap-3 mb-6 md:mb-10">
                                    <div className="p-2 bg-white/5 rounded-lg shadow-inner">
                                        {cat.icon}
                                    </div>
                                    <h2 className="text-[11px] font-[900] uppercase tracking-widest text-white italic leading-tight">
                                        {cat.id}
                                    </h2>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    {filtered.length > 0 ? (
                                        filtered.map((broker) => (
                                            <a
                                                key={broker._id}
                                                href={broker.link}
                                                target="_blank"
                                                className="group flex flex-col bg-[#0D1117]/50 border border-white/5 p-4 md:p-5 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] transition-all duration-300"
                                            >
                                                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                                                    <span className="text-[12px] md:text-[13px] font-black uppercase italic text-slate-200 group-hover:text-cyan-400 transition-colors tracking-tight">
                                                        {broker.name}
                                                    </span>
                                                    <ArrowUpRight size={12} className="text-slate-600 group-hover:text-cyan-500 transition-all" />
                                                </div>

                                                <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-400">
                                                    Institutional Access <ExternalLink size={8} />
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="py-6 text-center border border-dashed border-white/5 rounded-2xl text-[8px] font-black text-slate-800 uppercase tracking-[0.3em]">
                                            Inactive
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FOOTER */}
                <div className="mt-20 text-center">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-8" />
                    <h2 className="text-lg font-black italic uppercase tracking-[1em] text-white opacity-20">
                        MMH TRADING ACADEMY
                    </h2>
                </div>

            </div>
        </div>
    );
}