"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ShieldAlert, X, Target, BarChart3, Clock, Eye, Lock, Crown
} from "lucide-react";
import EliteSignalsFeed from "@/components/EliteSignalsFeed";

const ELITE_TAB = "ELITE_SIGNALS";
const TAB_LABELS = { [ELITE_TAB]: "MMH Elite Signals" };
const ADMIN_WHATSAPP = "https://wa.me/966549357534";

// Old links used ?strategy=THC_BOT; keep them working.
const normalizeStrategy = (strategy) => (strategy === "THC_BOT" ? ELITE_TAB : strategy || "ALL");

export default function SignalsPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const category = params.category.toLowerCase();
    const searchParams = useSearchParams();
    const urlStrategy = searchParams.get("strategy");
    const urlSignalId = searchParams.get("signal");

    const [signals, setSignals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [activeStrategy, setActiveStrategy] = useState(normalizeStrategy(urlStrategy));
    const [selectedSignal, setSelectedSignal] = useState(null);

    const strategyConfig = {
        forex: ["ALL", "SCALPING", "LONG_TERM", "RESULTS", ELITE_TAB],
        stocks: ["ALL", "INTRADAY", "SWING", "ANALYSIS"],
        crypto: ["ALL", "SPOT", "FUTURE"],
    };

    const currentTabs = strategyConfig[category] || ["ALL"];

    useEffect(() => {
        const fetchSignals = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/signals?category=${category}`);
                setAccessDenied(res.status === 403);
                const data = await res.json();
                if (Array.isArray(data)) setSignals(data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchSignals();
    }, [category]);

    useEffect(() => {
        setActiveStrategy(normalizeStrategy(urlStrategy));
    }, [urlStrategy]);

    useEffect(() => {
        if (!urlSignalId || loading) return;
        const linkedSignal = signals.find((signal) => signal._id === urlSignalId);
        if (linkedSignal) setSelectedSignal(linkedSignal);
    }, [urlSignalId, signals, loading]);

    // Lock page scroll behind the detail modal.
    useEffect(() => {
        if (!selectedSignal) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = previous; };
    }, [selectedSignal]);

    const filteredSignals = activeStrategy === "ALL"
        ? signals : signals.filter(s => s.strategy === activeStrategy);
    const showEliteSignals = category === "forex" && activeStrategy === ELITE_TAB;

    return (
        <div className="min-h-screen bg-[#010409] text-slate-400 px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* 1. HEADER */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">
                        {category} Analysis<span className="text-cyan-400"> .</span>
                    </h1>
                </div>

                {/* 2. TABS */}
                <div className="-mx-4 flex gap-2 mb-8 overflow-x-auto no-scrollbar border-b border-white/5 px-4 pb-4 sm:mx-0 sm:px-0">
                    {currentTabs.map((tab) => {
                        const isElite = tab === ELITE_TAB;
                        const isActive = activeStrategy === tab;
                        return (
                            <button key={tab} onClick={() => setActiveStrategy(tab)}
                                className={`inline-flex shrink-0 items-center gap-1.5 text-[10px] font-black tracking-widest uppercase px-5 py-2.5 rounded-full transition-all border whitespace-nowrap md:px-6 ${isActive
                                    ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                    : isElite
                                        ? "border-amber-300/40 text-amber-200 hover:text-white"
                                        : "border-white/10 text-slate-500 hover:text-white"}`}>
                                {isElite && <Crown size={12} />}
                                {TAB_LABELS[tab] || tab.replace("_", " ")}
                            </button>
                        );
                    })}
                </div>

                {showEliteSignals ? (
                    <EliteSignalsFeed />
                ) : accessDenied ? (
                    /* 3a. NO ACCESS */
                    <div className="rounded-[2rem] border border-white/10 bg-[#0D1117] p-8 text-center shadow-2xl md:p-14">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                            <Lock size={26} />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tight text-white md:text-2xl">Signals access required</h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                            Your account does not have access to premium signals yet. Contact the admin to get access.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a href={ADMIN_WHATSAPP} target="_blank" rel="noreferrer" className="w-full rounded-2xl bg-cyan-500 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-white sm:w-auto">
                                Contact Admin
                            </a>
                            <Link href="/elite-signals" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/40 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-amber-200 transition-all hover:bg-amber-300/10 sm:w-auto">
                                <Crown size={13} /> View MMH Elite Signals
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* 3b. SIGNALS (cards on mobile, table on desktop) */
                    <div className="bg-[#0D1117] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                        {loading ? (
                            <p className="px-4 py-20 md:p-32 text-center animate-pulse text-cyan-500 font-black tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm">SYNCING LIVE FEED...</p>
                        ) : filteredSignals.length === 0 ? (
                            <p className="px-4 py-20 md:p-32 text-center uppercase text-xs font-bold tracking-widest text-slate-700">No active signals found.</p>
                        ) : (
                            <>
                                <ul className="divide-y divide-white/[0.05] md:hidden">
                                    {filteredSignals.map((signal) => (
                                        <li key={signal._id} className="p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="break-words text-white font-black text-xl italic uppercase tracking-tighter leading-none">{signal.pair}</div>
                                                    <span className="text-[8px] text-slate-600 font-bold uppercase">{signal.strategy}</span>
                                                </div>
                                                <span className={`shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${signal.type === 'BUY' ? 'bg-green-500/10 text-green-500 border border-green-500/10' : 'bg-red-500/10 text-red-500 border border-red-500/10'}`}>
                                                    {signal.type}
                                                </span>
                                            </div>
                                            <dl className="mt-4 grid grid-cols-3 gap-2">
                                                {[
                                                    { label: "Entry", value: signal.entryPrice, color: "text-white" },
                                                    { label: "Stop Loss", value: signal.stopLoss, color: "text-red-500/80" },
                                                    { label: "TP1", value: signal.takeProfits?.[0] || "---", color: "text-green-500" },
                                                ].map((price) => (
                                                    <div key={price.label} className="min-w-0 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                                                        <dt className="text-[8px] font-black uppercase tracking-wider text-slate-600">{price.label}</dt>
                                                        <dd className={`mt-1 break-all font-mono text-xs font-bold ${price.color}`}>{price.value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                            <button
                                                onClick={() => setSelectedSignal(signal)}
                                                className="mt-3 flex w-full items-center justify-center gap-2 bg-white/5 hover:bg-white hover:text-black px-5 py-3 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest"
                                            >
                                                Details <Eye size={14} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest font-black text-slate-600">
                                                <th className="p-5 lg:p-7">Asset / Pair</th>
                                                <th className="p-5 lg:p-7">Trade Type</th>
                                                <th className="p-5 lg:p-7">Entry</th>
                                                <th className="p-5 lg:p-7 text-red-500/50">Stop Loss</th>
                                                <th className="p-5 lg:p-7 text-green-500/50">TP1 Target</th>
                                                <th className="p-5 lg:p-7 text-right">Analysis</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {filteredSignals.map((signal) => (
                                                <tr key={signal._id} className="hover:bg-white/[0.01] transition-all group">
                                                    <td className="p-5 lg:p-7">
                                                        <div className="text-white font-black text-2xl italic uppercase tracking-tighter group-hover:text-cyan-400 transition-colors leading-none">{signal.pair}</div>
                                                        <span className="text-[8px] text-slate-600 font-bold uppercase">{signal.strategy}</span>
                                                    </td>
                                                    <td className="p-5 lg:p-7">
                                                        <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase ${signal.type === 'BUY' ? 'bg-green-500/10 text-green-500 border border-green-500/10' : 'bg-red-500/10 text-red-500 border border-red-500/10'}`}>
                                                            {signal.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-5 lg:p-7 font-mono text-white text-lg font-bold">{signal.entryPrice}</td>
                                                    <td className="p-5 lg:p-7 font-mono text-red-500/80 font-bold">{signal.stopLoss}</td>
                                                    <td className="p-5 lg:p-7 font-mono text-green-500 font-bold">{signal.takeProfits?.[0] || "---"}</td>
                                                    <td className="p-5 lg:p-7 text-right">
                                                        <button
                                                            onClick={() => setSelectedSignal(signal)}
                                                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white hover:text-black px-5 py-3 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest"
                                                        >
                                                            Details <Eye size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* 4. DETAIL MODAL (Image + Full Analysis + All TPs) */}
            {selectedSignal && (
                <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                    <div className="relative w-full max-w-6xl bg-[#0D1117] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] md:rounded-[3rem] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-[92dvh] md:h-full md:max-h-[85vh] shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                        {/* ❌ CLOSE BUTTON */}
                        <button onClick={() => setSelectedSignal(null)} aria-label="Close" className="absolute top-4 right-4 md:top-8 md:right-8 z-[100] p-2.5 md:p-3 bg-black/60 md:bg-white/5 hover:bg-red-500 text-white rounded-full transition-all group">
                            <X size={22} className="group-hover:rotate-90 transition-all" />
                        </button>

                        {/* LEFT: CHART / IMAGE AREA */}
                        <div className="w-full md:w-[60%] shrink-0 min-h-[240px] md:min-h-0 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 relative flex items-center justify-center overflow-hidden">
                            {selectedSignal.image ? (
                                <img src={selectedSignal.image} className="w-full h-full max-h-[45dvh] md:max-h-none object-contain p-3 md:p-6" alt="Technical Chart" />
                            ) : (
                                <div className="text-slate-800 flex flex-col items-center gap-4 md:gap-6 py-10">
                                    <BarChart3 size={80} strokeWidth={1} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[1em]">Chart Missing</span>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 md:bottom-10 md:left-10 bg-black/60 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10">
                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Pair Identification</p>
                                <p className="text-lg md:text-2xl text-cyan-500 font-black uppercase italic tracking-tighter">{selectedSignal.pair}</p>
                            </div>
                        </div>

                        {/* RIGHT: TEXT DETAILS AREA */}
                        <div className="w-full md:w-[40%] p-5 sm:p-8 md:p-10 md:overflow-y-auto no-scrollbar bg-[#0D1117] flex flex-col">
                            <div className="mb-8 md:mb-10">
                                <h2 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-4 break-words">
                                    {selectedSignal.heading || "Trade Setup"}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[9px] font-black bg-cyan-500 text-black px-3 py-1 rounded-md uppercase tracking-widest">{selectedSignal.status}</span>
                                    <span className="text-[9px] font-black border border-white/10 text-slate-500 px-3 py-1 rounded-md uppercase tracking-widest">{selectedSignal.strategy}</span>
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                {/* Description Box */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={12} /> Analysis Overview
                                    </p>
                                    <div className="bg-white/[0.03] border border-white/5 p-4 md:p-6 rounded-[1.5rem] italic text-slate-300 text-sm leading-relaxed shadow-inner whitespace-pre-line break-words">
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
                                            <div key={i} className="flex justify-between items-center gap-3 bg-green-500/5 border border-green-500/10 p-4 md:p-5 rounded-2xl group hover:bg-green-500/10 transition-all">
                                                <span className="text-[10px] font-black text-green-500/50 uppercase italic tracking-widest">Target 0{i + 1}</span>
                                                <span className="font-mono font-black text-lg md:text-xl text-white break-all">{tp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stop Loss Reminder in Modal */}
                                <div className="bg-red-500/5 border border-red-500/10 p-4 md:p-5 rounded-2xl flex justify-between items-center gap-3">
                                    <span className="text-[10px] font-black text-red-500 uppercase flex items-center gap-2"><ShieldAlert size={14} /> Critical Exit</span>
                                    <span className="font-mono font-black text-lg md:text-xl text-red-500 break-all">{selectedSignal.stopLoss}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
