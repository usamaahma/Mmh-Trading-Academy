"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Maximize2, X, BarChart2 } from "lucide-react";

export default function CompactResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch("/api/results");
                const json = await res.json();
                if (json.success) setResults(json.data);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) return <div className="py-20 text-center animate-pulse text-cyan-500 font-bold tracking-widest text-xs">LOADING DATA...</div>;

    return (
        <section className="py-16 bg-[#050505] px-4">
            <div className="max-w-5xl mx-auto">

                {/* Minimal Header */}
                <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6">
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic mt-20">
                            Trading <span className="text-cyan-500 underline decoration-white/10 underline-offset-8">Results</span>
                        </h2>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Results</p>
                </div>

                {/* Compact List */}
                <div className="grid grid-cols-1 gap-6">
                    {results.map((result) => (
                        <div key={result._id} className="group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all">
                            <div className="flex flex-col md:flex-row">

                                {/* Image Container - Fixed Width on Desktop */}
                                <div className="md:w-[400px] flex gap-1 p-2 bg-black/40">
                                    <div className="relative flex-1 overflow-hidden rounded-xl cursor-pointer" onClick={() => setSelectedImg(result.imageOne)}>
                                        <img src={result.imageOne} className="w-full h-32 md:h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Pre" />
                                        <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[7px] font-bold text-cyan-500 uppercase">Analysis</div>
                                    </div>
                                    <div className="relative flex-1 overflow-hidden rounded-xl cursor-pointer" onClick={() => setSelectedImg(result.imageTwo)}>
                                        <img src={result.imageTwo} className="w-full h-32 md:h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Post" />
                                        <div className="absolute top-2 right-2 bg-cyan-500 px-2 py-0.5 rounded text-[7px] font-black text-black uppercase">Result</div>
                                    </div>
                                </div>

                                {/* Content - Takes remaining space */}
                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                            {new Date(result.createdAt).toLocaleDateString('en-GB')}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-500 transition-colors mb-2">
                                        {result.title}
                                    </h3>

                                    {result.description && (
                                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                                            {result.description}
                                        </p>
                                    )}

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => setSelectedImg(result.imageTwo)}
                                            className="flex items-center gap-2 text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            <Maximize2 size={12} /> View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedImg(null)}>
                        <X className="absolute top-6 right-6 text-white cursor-pointer" size={30} />
                        <img src={selectedImg} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10" alt="Fullscreen" />
                    </div>
                )}
            </div>
        </section>
    );
}