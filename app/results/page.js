"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Maximize2, X, BarChart2 } from "lucide-react";

export default function CompactResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedResult, setSelectedResult] = useState(null);
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

    // Lock page scroll while a modal is open; Escape closes the top-most one.
    useEffect(() => {
        if (!selectedResult && !selectedImg) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => {
            if (e.key !== "Escape") return;
            if (selectedImg) setSelectedImg(null);
            else setSelectedResult(null);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [selectedResult, selectedImg]);

    if (loading) return <div className="py-20 text-center animate-pulse text-cyan-500 font-bold tracking-widest text-xs">LOADING DATA...</div>;

    const images = (result) => [
        { label: "Analysis", src: result.imageOne },
        { label: "Result", src: result.imageTwo },
    ].filter((image) => image.src);

    return (
        <section className="py-16 bg-[#050505] px-4">
            <div className="max-w-5xl mx-auto">

                {/* Minimal Header */}
                <div className="flex items-end justify-between gap-4 mb-10 border-b border-white/5 pb-6">
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic mt-20">
                            Trading <span className="text-cyan-500 underline decoration-white/10 underline-offset-8">Results</span>
                        </h2>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Verified Results</p>
                </div>

                {/* Compact List */}
                <div className="grid grid-cols-1 gap-6">
                    {results.map((result) => (
                        <div key={result._id} className="group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all">
                            <div className="flex flex-col md:flex-row">

                                {/* Image Container - Fixed Width on Desktop */}
                                <div className="md:w-[400px] flex gap-1 p-2 bg-black/40">
                                    {images(result).map((image) => (
                                        <div key={image.label} className="relative flex-1 overflow-hidden rounded-xl cursor-pointer" onClick={() => setSelectedImg(image.src)}>
                                            <img src={image.src} className="w-full h-32 md:h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" alt={image.label} />
                                            <div className={`absolute top-2 px-2 py-0.5 rounded text-[7px] font-black uppercase ${image.label === "Result" ? "right-2 bg-cyan-500 text-black" : "left-2 bg-black/60 text-cyan-500"}`}>{image.label}</div>
                                        </div>
                                    ))}
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
                                            onClick={() => setSelectedResult(result)}
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

                {/* Details Modal */}
                {selectedResult && (
                    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedResult(null)}>
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-label={selectedResult.title}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedResult(null)}
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {images(selectedResult).length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-black/40">
                                    {images(selectedResult).map((image) => (
                                        <button key={image.label} onClick={() => setSelectedImg(image.src)} className="relative overflow-hidden rounded-2xl text-left group/img">
                                            <img src={image.src} className="w-full h-56 sm:h-72 object-cover group-hover/img:scale-[1.02] transition-transform" alt={image.label} />
                                            <span className={`absolute top-3 left-3 px-2 py-1 rounded text-[8px] font-black uppercase ${image.label === "Result" ? "bg-cyan-500 text-black" : "bg-black/70 text-cyan-500"}`}>{image.label}</span>
                                            <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/70 text-[8px] font-black uppercase text-white">
                                                <Maximize2 size={10} /> Full size
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3 py-12 text-slate-700">
                                    <BarChart2 size={56} strokeWidth={1} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">No Charts</span>
                                </div>
                            )}

                            <div className="p-5 sm:p-8">
                                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <Calendar size={12} className="text-cyan-500" />
                                    {new Date(selectedResult.createdAt).toLocaleDateString('en-GB')}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 break-words">{selectedResult.title}</h3>
                                {selectedResult.description ? (
                                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line break-words">{selectedResult.description}</p>
                                ) : (
                                    <p className="text-slate-600 text-sm italic">No additional details provided.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Lightbox */}
                {selectedImg && (
                    <div className="fixed inset-0 z-[10010] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedImg(null)}>
                        <X className="absolute top-6 right-6 text-white cursor-pointer" size={30} />
                        <img src={selectedImg} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10" alt="Fullscreen" />
                    </div>
                )}
            </div>
        </section>
    );
}
