"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Globe, TrendingUp, Bitcoin, Loader2, X } from "lucide-react";
import AnalysisForm from "./AnalysisForm"; // Ensure this file exists in the same folder

export default function AnalysisManager() {
    // 1. Initial state hamesha empty array [] rakho
    const [analyses, setAnalyses] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const categories = ["FOREX", "STOCKS", "CRYPTO"];

    const fetchAnalyses = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/analysis");
            const result = await res.json();
            
            // 2. SAFE DATA SETTING: 
            // Agar API { data: [...] } bhej rahi hai ya sirf [...]
            if (Array.isArray(result)) {
                setAnalyses(result);
            } else if (result.data && Array.isArray(result.data)) {
                setAnalyses(result.data);
            } else {
                setAnalyses([]); // Fallback to empty array
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setAnalyses([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchAnalyses(); 
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Bhai delete kar doon?")) return;
        try {
            const res = await fetch(`/api/analysis/${id}`, { method: "DELETE" });
            if (res.ok) fetchAnalyses();
        } catch (err) { 
            console.error(err); 
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading Terminal...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* TOP BAR */}
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-black italic uppercase text-cyan-500 tracking-tighter">
                        Market <span className="text-white">Analysis</span>
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                        Manage insights by category
                    </p>
                </div>
                {!showForm && (
                    <button 
                        onClick={() => { setEditingData(null); setShowForm(true); }}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-white text-black px-5 py-2.5 rounded-xl font-black uppercase text-[10px] transition-all shadow-lg shadow-cyan-500/10 active:scale-95"
                    >
                        <Plus size={14} strokeWidth={4} /> Add New Post
                    </button>
                )}
            </div>

            {showForm ? (
                <div className="relative bg-black/20 rounded-3xl border border-white/5 p-2 overflow-hidden shadow-2xl">
                    <button 
                        onClick={() => setShowForm(false)}
                        className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-full transition-all border border-white/5"
                    >
                        <X size={18} />
                    </button>
                    <AnalysisForm 
                        initialData={editingData} 
                        onSuccess={() => {
                            setShowForm(false);
                            fetchAnalyses();
                        }} 
                    />
                </div>
            ) : (
                <div className="space-y-12">
                    {categories.map((cat) => {
                        // 3. Filter karne se pehle ensure karo ke analyses array hai
                        const filteredData = Array.isArray(analyses) ? analyses.filter(a => a.category === cat) : [];
                        
                        return (
                            <div key={cat} className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-8 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                    <h2 className="text-lg font-black italic uppercase tracking-widest text-slate-200 flex items-center gap-2">
                                        {cat === "FOREX" && <Globe size={16} className="text-cyan-500" />}
                                        {cat === "STOCKS" && <TrendingUp size={16} className="text-cyan-500" />}
                                        {cat === "CRYPTO" && <Bitcoin size={16} className="text-cyan-500" />}
                                        {cat}
                                    </h2>
                                    <span className="text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-500 font-mono">
                                        {filteredData.length} POSTS
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item) => (
                                            <div key={item._id} className="group relative bg-[#0D1117] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
                                                <div className="aspect-video relative overflow-hidden bg-black/40">
                                                    <img 
                                                        src={item.image} 
                                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                                        alt={item.heading}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />
                                                    
                                                    {/* ACTIONS ON HOVER */}
                                                    <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                        <button 
                                                            onClick={() => { setEditingData(item); setShowForm(true); }} 
                                                            className="p-2 bg-black/80 hover:bg-cyan-500 text-white hover:text-black rounded-lg backdrop-blur-md transition-all border border-white/10"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item._id)} 
                                                            className="p-2 bg-black/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-all border border-white/10"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-sm text-slate-100 line-clamp-1 group-hover:text-cyan-500 transition-colors">
                                                        {item.heading}
                                                    </h3>
                                                    <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 border border-dashed border-white/5 rounded-3xl text-center bg-white/[0.01]">
                                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">No {cat} analysis found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}