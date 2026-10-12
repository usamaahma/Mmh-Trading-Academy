"use client";

import React, { useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight } from "lucide-react";

// Trim floating-point noise such as 4195.505000000001 -> 4195.505.
const formatPrice = (value) => (Number.isFinite(value) ? String(Number(value.toFixed(5))) : value);

// Live MMH Elite Signals feed (bot alerts). Public: works without login.
export default function EliteSignalsFeed({ showHeading = true }) {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        const fetchAlerts = async () => {
            try {
                const response = await fetch("/api/thc-alerts", { cache: "no-store" });
                if (!response.ok) throw new Error("MMH Elite Signals could not be loaded.");
                const data = await response.json();
                if (active) {
                    setAlerts(Array.isArray(data.alerts) ? data.alerts : []);
                    setError("");
                }
            } catch (fetchError) {
                if (active) setError(fetchError.message || "MMH Elite Signals could not be loaded.");
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchAlerts();
        const intervalId = setInterval(fetchAlerts, 30000);
        return () => {
            active = false;
            clearInterval(intervalId);
        };
    }, []);

    return (
        <section>
            {showHeading && (
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                            <Activity size={13} /> Live automated feed
                        </div>
                        <h2 className="text-2xl font-black italic uppercase tracking-tight text-white md:text-3xl">
                            MMH Elite Signals<span className="text-cyan-400">.</span>
                        </h2>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Updates every 30 seconds</p>
                </div>
            )}

            {error && <p role="alert" className="mb-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">{error}</p>}
            {loading ? (
                <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-8 text-center text-xs font-black uppercase tracking-[0.25em] text-cyan-500 md:p-10">Syncing elite signals...</div>
            ) : alerts.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {alerts.map((alert) => {
                        const isLong = alert.direction === "LONG";
                        const directionClass = isLong ? "text-green-400" : "text-red-400";
                        const DirectionIcon = isLong ? ArrowUpRight : ArrowDownRight;
                        const isReversed = alert.alertType === "FAILED_THC_REVERSED";

                        return (
                            <article key={alert.eventId} className="rounded-3xl border border-white/10 bg-[#0D1117] p-4 shadow-xl sm:p-5 md:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className={`mb-3 inline-block rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${isReversed ? "border-amber-400/20 bg-amber-400/10 text-amber-300" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"}`}>
                                            {isReversed ? "Breaker" : "New Elite Signal"}
                                        </span>
                                        <h3 className="break-words text-2xl font-black italic uppercase tracking-tight text-white sm:text-3xl">{alert.symbol}</h3>
                                        <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">{alert.timeframe}</p>
                                    </div>
                                    <span className={`inline-flex shrink-0 items-center gap-1 rounded-xl bg-white/[0.04] px-3 py-2 text-xs font-black ${directionClass}`}>
                                        <DirectionIcon size={15} /> {alert.direction}
                                    </span>
                                </div>
                                <dl className="mt-5 grid grid-cols-3 gap-2">
                                    {[
                                        { label: "Entry", value: formatPrice(alert.entry), color: "text-white" },
                                        { label: "Stop Loss", value: formatPrice(alert.sl), color: "text-red-400" },
                                        { label: "Take Profit", value: formatPrice(alert.tp), color: "text-green-400" },
                                    ].map((price) => (
                                        <div key={price.label} className="min-w-0 rounded-2xl border border-white/5 bg-white/[0.025] p-2.5 sm:p-3">
                                            <dt className="text-[8px] font-black uppercase tracking-wider text-slate-500 sm:tracking-widest">{price.label}</dt>
                                            <dd className={`mt-2 break-all font-mono text-xs font-bold sm:text-sm ${price.color}`}>{price.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <p className="mt-4 text-[10px] text-slate-600">{new Date(alert.createdAt).toLocaleString()}</p>
                            </article>
                        );
                    })}
                </div>
            ) : !error ? (
                <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-8 text-center text-sm text-slate-500 md:p-10">
                    No MMH Elite Signals yet. New signals will appear here as soon as they are published.
                </div>
            ) : null}
        </section>
    );
}
