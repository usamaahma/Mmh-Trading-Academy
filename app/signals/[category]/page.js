"use client";

import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ShieldAlert, X, Maximize2, Target, BarChart3, TrendingUp, Clock, ChevronRight, Eye,
    Activity, ArrowDownRight, ArrowUpRight
} from "lucide-react";

export default function SignalsPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const category = params.category.toLowerCase();
    const { status: sessionStatus } = useSession();
    const searchParams = useSearchParams();
    const urlStrategy = searchParams.get("strategy");
    const urlSignalId = searchParams.get("signal");

    const [signals, setSignals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thcAlerts, setThcAlerts] = useState([]);
    const [thcLoading, setThcLoading] = useState(true);
    const [thcError, setThcError] = useState("");
    const [activeStrategy, setActiveStrategy] = useState(urlStrategy || "ALL");
    const [selectedSignal, setSelectedSignal] = useState(null);

    const strategyConfig = {
        forex: ["ALL", "SCALPING", "LONG_TERM", "RESULTS", "THC_BOT"],
        stocks: ["ALL", "INTRADAY", "SWING", "ANALYSIS"],
        crypto: ["ALL", "SPOT", "FUTURE"],
    };

    const currentTabs = (strategyConfig[category] || ["ALL"]).filter((tab) =>
        tab !== "THC_BOT" || sessionStatus === "authenticated"
    );

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

    useEffect(() => {
        if (category !== "forex" || sessionStatus !== "authenticated") {
            setThcLoading(false);
            return;
        }

        let active = true;
        const fetchThcAlerts = async () => {
            try {
                const response = await fetch("/api/thc-alerts", { cache: "no-store" });
                if (!response.ok) throw new Error(response.status === 401
                    ? "Log in to view THC bot alerts."
                    : "THC bot alerts could not be loaded.");
                const data = await response.json();
                if (active) {
                    setThcAlerts(Array.isArray(data.alerts) ? data.alerts : []);
                    setThcError("");
                }
            } catch (error) {
                if (active) setThcError(error.message || "THC bot alerts could not be loaded.");
            } finally {
                if (active) setThcLoading(false);
            }
        };

        setThcLoading(true);
        fetchThcAlerts();
        const intervalId = setInterval(fetchThcAlerts, 30000);
        return () => {
            active = false;
            clearInterval(intervalId);
        };
    }, [category, sessionStatus]);

    useEffect(() => {
        const requestedStrategy = urlStrategy || "ALL";
        setActiveStrategy(requestedStrategy === "THC_BOT" && sessionStatus !== "authenticated"
            ? "ALL"
            : requestedStrategy);
    }, [urlStrategy, sessionStatus]);

    useEffect(() => {
        if (!urlSignalId || loading) return;
        const linkedSignal = signals.find((signal) => signal._id === urlSignalId);
        if (linkedSignal) setSelectedSignal(linkedSignal);
    }, [urlSignalId, signals, loading]);

    const filteredSignals = activeStrategy === "ALL"
        ? signals : signals.filter(s => s.strategy === activeStrategy);
    const showManualSignals = activeStrategy !== "THC_BOT";
    const showThcAlerts = category === "forex" && sessionStatus === "authenticated" && ["ALL", "THC_BOT"].includes(activeStrategy);

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
                {showManualSignals && <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
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
                </div>}

                {showThcAlerts && (
                    <section className="mt-12">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="mb-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                                    <Activity size={13} /> Automated feed
                                </div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tight text-white md:text-3xl">
                                    THC Bot Alerts<span className="text-cyan-400">.</span>
                                </h2>
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Updates every 30 seconds</p>
                        </div>

                        {thcError && <p role="alert" className="mb-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">{thcError}</p>}
                        {thcLoading ? (
                            <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-10 text-center text-xs font-black uppercase tracking-[0.25em] text-cyan-500">Syncing THC alerts...</div>
                        ) : thcAlerts.length ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {thcAlerts.map((alert) => {
                                    const isLong = alert.direction === "LONG";
                                    const directionClass = isLong ? "text-green-400" : "text-red-400";
                                    const DirectionIcon = isLong ? ArrowUpRight : ArrowDownRight;
                                    const alertLabel = alert.alertType === "FAILED_THC_REVERSED" ? "Failed THC → Reversed" : "New THC";

                                    return (
                                        <article key={alert.eventId} className="rounded-3xl border border-white/10 bg-[#0D1117] p-5 shadow-xl md:p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <span className={`mb-3 inline-block rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${alert.alertType === "FAILED_THC_REVERSED" ? "border-amber-400/20 bg-amber-400/10 text-amber-300" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"}`}>
                                                        {alertLabel}
                                                    </span>
                                                    <h3 className="text-3xl font-black italic uppercase tracking-tight text-white">{alert.symbol}</h3>
                                                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">{alert.timeframe}</p>
                                                </div>
                                                <span className={`inline-flex items-center gap-1 rounded-xl bg-white/[0.04] px-3 py-2 text-xs font-black ${directionClass}`}>
                                                    <DirectionIcon size={15} /> {alert.direction}
                                                </span>
                                            </div>
                                            <dl className="mt-5 grid grid-cols-3 gap-2">
                                                {[
                                                    { label: "Entry", value: alert.entry, color: "text-white" },
                                                    { label: "Stop Loss", value: alert.sl, color: "text-red-400" },
                                                    { label: "Take Profit", value: alert.tp, color: "text-green-400" },
                                                ].map((price) => (
                                                    <div key={price.label} className="rounded-2xl border border-white/5 bg-white/[0.025] p-3">
                                                        <dt className="text-[8px] font-black uppercase tracking-widest text-slate-500">{price.label}</dt>
                                                        <dd className={`mt-2 break-all font-mono text-sm font-bold ${price.color}`}>{price.value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                            <p className="mt-4 text-[10px] text-slate-600">{new Date(alert.createdAt).toLocaleString()}</p>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : !thcError ? (
                            <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-10 text-center text-sm text-slate-500">
                                No new THC bot alerts yet. New alerts will appear here after the bot sends them.
                            </div>
                        ) : null}
                    </section>
                )}
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
