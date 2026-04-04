"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SignalsContent({ params }) {
    const searchParams = useSearchParams();
    const [signals, setSignals] = useState([]);
    const [loading, setLoading] = useState(true);

    // URL se Category aur Strategy nikalna
    const category = params.category; // e.g. forex
    const activeStrategy = searchParams.get("strategy") || "ALL";

    useEffect(() => {
        const fetchSignals = async () => {
            setLoading(true);
            try {
                // API se data mangwana
                const res = await fetch(`/api/signals?category=${category.toUpperCase()}`);
                const data = await res.json();

                // 🔥 FILTER LOGIC: Jo Navbar se Strategy aayi hai sirf wahi dikhao
                if (activeStrategy !== "ALL") {
                    const filtered = data.filter(sig => 
                        sig.strategy.toUpperCase() === activeStrategy.toUpperCase()
                    );
                    setSignals(filtered);
                } else {
                    setSignals(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSignals();
        
        // 🚀 YE LINE SAB SE ZAROORI HAI: 
        // Jab bhi activeStrategy (URL) badlay ga, ye function dobara chalay ga.
    }, [category, activeStrategy]); 

    return (
        <div className="min-h-screen bg-[#06090F] text-white p-8">
            <div className="mb-10">
                <h1 className="text-6xl font-black italic uppercase tracking-tighter">
                    {category} <span className="text-cyan-500">{activeStrategy}</span>
                </h1>
            </div>

            {/* Strategy Filter Tabs (Jo aapki screen par buttons hain) */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                {["ALL", "INTRADAY", "SWING", "SCALPING", "LONG_TERM", "SPOT", "FUTURE"].map((strat) => (
                    <button
                        key={strat}
                        onClick={() => window.history.pushState(null, "", `?strategy=${strat}`)}
                        className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest transition-all border ${
                            activeStrategy === strat 
                            ? "bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-500/20" 
                            : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"
                        }`}
                    >
                        {strat.replace("_", " ")}
                    </button>
                ))}
            </div>

            {/* Signals Grid Display */}
            {loading ? (
                <div className="flex items-center gap-3 text-cyan-500 font-bold animate-pulse">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> LOADING TERMINAL...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {signals.length > 0 ? (
                        signals.map((sig) => (
                            <div key={sig._id} className="bg-[#0D1117] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/40 transition-all group">
                                <div className="relative h-56">
                                    <img src={sig.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Chart" />
                                    <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-xl text-[10px] font-black ${sig.type === 'BUY' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                                        {sig.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black">{sig.pair}</h3>
                                        <span className="text-[9px] bg-white/5 px-2 py-1 rounded text-slate-400 font-mono">{sig.strategy}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Entry</p>
                                            <p className="font-mono font-bold text-cyan-500">{sig.entryPrice}</p>
                                        </div>
                                        <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/10 text-center">
                                            <p className="text-[8px] text-red-500/50 uppercase font-bold mb-1">Stop Loss</p>
                                            <p className="font-mono font-bold text-red-500">{sig.stopLoss}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                            <p className="text-slate-600 font-bold uppercase tracking-[0.2em]">No Active {activeStrategy} Signals Found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Next.js SearchParams requirement
export default function FinalSignalsPage({ params }) {
    return (
        <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
            <SignalsContent params={params} />
        </Suspense>
    );
}