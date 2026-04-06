"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Maximize2, X } from "lucide-react";

function AnalysisContent() {
  const searchParams = useSearchParams();
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null); // Lightbox ke liye

  const activeCategory = searchParams.get("category") || "ALL";

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/analysis?category=${activeCategory}`);
        const json = await res.json();
        if (json.success) setAnalysisData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#010409] text-white p-6 md:p-20">
      {/* Simple Header */}
      <div className="mb-10 md:mb-16 mt-28 md:mt-20">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          Market <span className="text-cyan-500">Insights</span>
        </h1>
        <div className="flex gap-4 mt-8 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          {["ALL", "FOREX", "STOCKS", "CRYPTO"].map((cat) => (
            <button
              key={cat}
              onClick={() =>
                window.history.pushState(null, "", `?category=${cat}`)
              }
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                activeCategory === cat
                  ? "text-cyan-500"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis List */}
      <div className="max-w-4xl space-y-12">
        {loading ? (
          <p className="text-cyan-500 font-mono text-xs animate-pulse">
            SYSTEM_LOADING...
          </p>
        ) : (
          analysisData.map((item) => (
            <div
              key={item._id}
              className="group border-b border-white/5 pb-12 flex flex-col md:flex-row gap-8"
            >
              {/* Image Thumbnail (Choti Image) */}
              <div
                className="relative w-full md:w-48 h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 group-hover:border-cyan-500/50 transition-all"
                onClick={() => setSelectedImg(item.image)}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="Chart"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-all">
                  <Maximize2 size={16} className="text-cyan-500" />
                </div>
              </div>

              {/* Text Content (Full Description) */}
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-cyan-500 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                    {item.category}
                  </span>
                  <span className="text-[9px] text-slate-600 font-mono">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase text-slate-100 group-hover:text-cyan-500 transition-colors">
                  {item.heading}
                </h2>
                <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {item.description}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* LIGHTBOX (Click karne py image badi hogi) */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-cyan-500 transition-colors">
            <X size={32} />
          </button>
          <img
            src={selectedImg}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            alt="Expanded Chart"
          />
        </div>
      )}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-white font-mono text-xs">INITIALIZING...</div>
      }
    >
      <AnalysisContent />
    </Suspense>
  );
}
