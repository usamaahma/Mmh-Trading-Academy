"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, CalendarClock, Check, ChevronDown } from "lucide-react";

// Trim floating-point noise such as 4195.505000000001 -> 4195.505.
const formatPrice = (value) => (Number.isFinite(value) ? String(Number(value.toFixed(5))) : value);

const DAY_MS = 24 * 60 * 60 * 1000;

// Time filters, evaluated in the viewer's local time.
const TIME_FILTERS = [
    { key: "today", label: "Today", range: (todayStart) => [todayStart, Infinity] },
    { key: "yesterday", label: "Yesterday", range: (todayStart) => [todayStart - DAY_MS, todayStart] },
    { key: "3days", label: "Last 3 Days", range: (todayStart) => [todayStart - 2 * DAY_MS, Infinity] },
    { key: "week", label: "Last Week", range: (todayStart) => [todayStart - 6 * DAY_MS, Infinity] },
    { key: "month", label: "Last Month", range: (todayStart) => [todayStart - 29 * DAY_MS, Infinity] },
];

// Live MMH Elite Signals feed (bot alerts). Public: works without login.
export default function EliteSignalsFeed({ showHeading = true }) {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeFilter, setTimeFilter] = useState("month");
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // Close the mobile filter menu on outside tap or Escape.
    useEffect(() => {
        if (!filterOpen) return;
        const onPointerDown = (e) => {
            if (!filterRef.current?.contains(e.target)) setFilterOpen(false);
        };
        const onKeyDown = (e) => {
            if (e.key === "Escape") setFilterOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [filterOpen]);

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

    const { counts, visibleAlerts } = useMemo(() => {
        const todayStart = new Date().setHours(0, 0, 0, 0);
        const inRange = (alert, key) => {
            const [from, to] = TIME_FILTERS.find((filter) => filter.key === key).range(todayStart);
            const time = new Date(alert.createdAt).getTime();
            return time >= from && time < to;
        };
        return {
            counts: Object.fromEntries(TIME_FILTERS.map(({ key }) => [key, alerts.filter((alert) => inRange(alert, key)).length])),
            visibleAlerts: alerts.filter((alert) => inRange(alert, timeFilter)),
        };
    }, [alerts, timeFilter]);
    const activeLabel = TIME_FILTERS.find((filter) => filter.key === timeFilter).label;

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

            {/* Mobile: dropdown */}
            <div ref={filterRef} className="relative z-20 mb-6 sm:hidden">
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={filterOpen}
                    aria-label="Filter signals by time"
                    onClick={() => setFilterOpen((open) => !open)}
                    className={`flex w-full items-center gap-3 rounded-2xl border bg-[#0D1117] px-4 py-3.5 text-left text-xs font-black uppercase tracking-widest text-white transition-colors ${filterOpen ? "border-cyan-500/60" : "border-white/10"}`}
                >
                    <CalendarClock size={16} className="shrink-0 text-cyan-400" />
                    <span className="flex-1">{activeLabel} ({counts[timeFilter]})</span>
                    <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                </button>
                {filterOpen && (
                    <ul role="listbox" aria-label="Time range" className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1117] p-1.5 shadow-2xl">
                        {TIME_FILTERS.map(({ key, label }) => (
                            <li key={key} role="option" aria-selected={timeFilter === key}>
                                <button
                                    type="button"
                                    onClick={() => { setTimeFilter(key); setFilterOpen(false); }}
                                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-[11px] font-black uppercase tracking-widest transition-colors ${timeFilter === key ? "bg-cyan-500/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"}`}
                                >
                                    <span>{label}</span>
                                    <span className="flex items-center gap-2">
                                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-slate-400">{counts[key]}</span>
                                        {timeFilter === key && <Check size={14} />}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Tablet/desktop: chips */}
            <div className="mb-6 hidden flex-wrap gap-2 sm:flex" role="group" aria-label="Filter signals by time">
                {TIME_FILTERS.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={timeFilter === key}
                        onClick={() => setTimeFilter(key)}
                        className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${timeFilter === key
                            ? "border-cyan-500 bg-cyan-500 text-black"
                            : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"}`}
                    >
                        {label}
                        <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${timeFilter === key ? "bg-black/20" : "bg-white/5 text-slate-500"}`}>{counts[key]}</span>
                    </button>
                ))}
            </div>

            {error && <p role="alert" className="mb-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">{error}</p>}
            {loading ? (
                <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-8 text-center text-xs font-black uppercase tracking-[0.25em] text-cyan-500 md:p-10">Syncing elite signals...</div>
            ) : visibleAlerts.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {visibleAlerts.map((alert) => {
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
                                        {/* <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">{alert.timeframe}</p> */}
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
                    {alerts.length
                        ? `No MMH Elite Signals for "${activeLabel}". Try a wider time range.`
                        : "No MMH Elite Signals yet. New signals will appear here as soon as they are published."}
                </div>
            ) : null}
        </section>
    );
}
