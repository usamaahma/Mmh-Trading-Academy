"use client";

import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    ShieldAlert, X, Maximize2, Target, BarChart3, TrendingUp, Clock, ChevronRight, Eye
} from "lucide-react";

export default function SignalsPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const category = params.category.toLowerCase();
    const searchParams = useSearchParams();
    const urlStrategy = searchParams.get("strategy");

    const [signals, setSignals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeStrategy, setActiveStrategy] = useState(urlStrategy || "ALL");
    const [selectedSignal, setSelectedSignal] = useState(null);

    const strategyConfig = {
        forex: ["ALL", "SCALPING", "LONG_TERM", "RESULTS"],
        stocks: ["ALL", "INTRADAY", "SWING", "ANALYSIS"],
        crypto: ["ALL", "SPOT", "FUTURE"],
    };

    const currentTabs = strategyConfig[category] || ["ALL"];

    useEffect(() => {
        const fetchSignals = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/signals?category=${category}`);
                const data = await res.json();
                if (Array.isArray(data)) setSignals(data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchSignals();
    }, [category]);

    const filteredSignals = activeStrategy === "ALL"
        ? signals : signals.filter(s => s.strategy === activeStrategy);

    return (
        <main className="min-h-screen bg-[#010409] text-slate-400 p-4 md:p-12 pt-32">
            <div className="max-w-7xl mx-auto">

                {/* 1. HEADER */}
                <div className="mb-10 mt-15">

                    <h1 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">
                        {category} Analysis<span className="text-cyan-400"> .</span>
                    </h1>
                </div>

                {/* 2. TABS */}
                <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar border-b border-white/5 pb-4">
                    {currentTabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveStrategy(tab)}
                            className={`text-[10px] font-black tracking-widest px-6 py-2.5 rounded-full transition-all border whitespace-nowrap ${activeStrategy === tab ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]" : "border-white/10 text-slate-500 hover:text-white"}`}>
                            {tab.replace("_", " ")}
                        </button>
                    ))}
                </div>

                {/* 3. MAIN TABLE (Everything At a Glance) */}
                <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest font-black text-slate-600">
                                    <th className="p-7">Asset / Pair</th>
                                    <th className="p-7">Trade Type</th>
                                    <th className="p-7">Entry</th>
                                    <th className="p-7 text-red-500/50">Stop Loss</th>
                                    <th className="p-7 text-green-500/50">TP1 Target</th>
                                    <th className="p-7 text-right">Analysis</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-32 text-center animate-pulse text-cyan-500 font-black tracking-[0.5em]">SYNCING LIVE FEED...</td></tr>
                                ) : filteredSignals.length === 0 ? (
                                    <tr><td colSpan="6" className="p-32 text-center uppercase text-xs font-bold tracking-widest text-slate-700">No active signals found.</td></tr>
                                ) : (
                                    filteredSignals.map((signal) => (
                                        <tr key={signal._id} className="hover:bg-white/[0.01] transition-all group">
                                            <td className="p-7">
                                                <div className="text-white font-black text-2xl italic uppercase tracking-tighter group-hover:text-cyan-400 transition-colors leading-none">{signal.pair}</div>
                                                <span className="text-[8px] text-slate-600 font-bold uppercase">{signal.strategy}</span>
                                            </td>
                                            <td className="p-7">
                                                <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase ${signal.type === 'BUY' ? 'bg-green-500/10 text-green-500 border border-green-500/10' : 'bg-red-500/10 text-red-500 border border-red-500/10'}`}>
                                                    {signal.type}
                                                </span>
                                            </td>
                                            <td className="p-7 font-mono text-white text-lg font-bold">{signal.entryPrice}</td>
                                            <td className="p-7 font-mono text-red-500/80 font-bold">{signal.stopLoss}</td>
                                            <td className="p-7 font-mono text-green-500 font-bold">{signal.takeProfits?.[0] || "---"}</td>
                                            <td className="p-7 text-right">
                                                <button
                                                    onClick={() => setSelectedSignal(signal)}
                                                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white hover:text-black px-5 py-3 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest"
                                                >
                                                    Details <Eye size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4. DETAIL MODAL (Image + Full Analysis + All TPs) */}
            {selectedSignal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                    <div className="relative w-full max-w-6xl bg-[#0D1117] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                        {/* ❌ CLOSE BUTTON */}
                        <button onClick={() => setSelectedSignal(null)} className="absolute top-8 right-8 z-[100] p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all group">
                            <X size={24} className="group-hover:rotate-90 transition-all" />
                        </button>

                        {/* LEFT: CHART / IMAGE AREA */}
                        <div className="w-full md:w-[60%] bg-black/40 border-r border-white/5 relative flex items-center justify-center overflow-hidden">
                            {selectedSignal.image ? (
                                <img src={selectedSignal.image} className="w-full h-full object-contain p-6" alt="Technical Chart" />
                            ) : (
                                <div className="text-slate-800 flex flex-col items-center gap-6">
                                    <BarChart3 size={120} strokeWidth={1} />
                                    <span className="text-[10px] font-black uppercase tracking-[1em]">Chart Missing</span>
                                </div>
                            )}
                            <div className="absolute bottom-10 left-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Pair Identification</p>
                                <p className="text-2xl text-cyan-500 font-black uppercase italic tracking-tighter">{selectedSignal.pair}</p>
                            </div>
                        </div>

                        {/* RIGHT: TEXT DETAILS AREA */}
                        <div className="w-full md:w-[40%] p-10 overflow-y-auto no-scrollbar bg-[#0D1117] flex flex-col">
                            <div className="mb-10">
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                                    {selectedSignal.heading || "Trade Setup"}
                                </h2>
                                <div className="flex gap-2">
                                    <span className="text-[9px] font-black bg-cyan-500 text-black px-3 py-1 rounded-md uppercase tracking-widest">{selectedSignal.status}</span>
                                    <span className="text-[9px] font-black border border-white/10 text-slate-500 px-3 py-1 rounded-md uppercase tracking-widest">{selectedSignal.strategy}</span>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Description Box */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={12} /> Analysis Overview
                                    </p>
                                    <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[1.5rem] italic text-slate-300 text-sm leading-relaxed shadow-inner">
                                        {selectedSignal.description || "No detailed analysis provided for this setup."}
                                    </div>
                                </div>

                                {/* TP targets (List all) */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                                        <Target size={14} /> Profit Objectives
                                    </p>
                                    <div className="grid gap-2">
                                        {selectedSignal.takeProfits?.map((tp, i) => tp && (
                                            <div key={i} className="flex justify-between items-center bg-green-500/5 border border-green-500/10 p-5 rounded-2xl group hover:bg-green-500/10 transition-all">
                                                <span className="text-[10px] font-black text-green-500/50 uppercase italic tracking-widest">Target 0{i + 1}</span>
                                                <span className="font-mono font-black text-xl text-white">{tp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stop Loss Reminder in Modal */}
                                <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl flex justify-between items-center">
                                    <span className="text-[10px] font-black text-red-500 uppercase flex items-center gap-2"><ShieldAlert size={14} /> Critical Exit</span>
                                    <span className="font-mono font-black text-xl text-red-500">{selectedSignal.stopLoss}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}