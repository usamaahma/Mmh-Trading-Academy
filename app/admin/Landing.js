"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, UploadCloud, Globe, TrendingUp, Newspaper } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function LandingManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        pnl: "",
        analysisSection: [],
        watchlist: [],
        highImpactNews: [],
    });

    // 1. Load Existing Data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/landing");
                const json = await res.json();
                if (json.success && json.data) {
                    setFormData(json.data);
                }
            } catch (err) {
                console.error("Data load error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Generic Add/Remove/Update Logic
    const addItem = (section, emptyObj) => {
        setFormData({ ...formData, [section]: [...formData[section], emptyObj] });
    };

    const removeItem = (section, index) => {
        const updated = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: updated });
    };

    const updateField = (section, index, field, value) => {
        const updated = [...formData[section]];
        updated[index][field] = value;
        setFormData({ ...formData, [section]: updated });
    };

    // 3. Save to MongoDB
    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/landing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Shabaash! Landing page update ho gaya.");
            } else {
                alert("Error: Database mein save nahi hua.");
            }
        } catch (err) {
            console.error(err);
            alert("System Error!");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Loading Terminal...</p>
        </div>
    );

    return (
        <div className="p-6 bg-[#010409] min-h-screen text-white space-y-10 pb-20">

            {/* HEADER SECTION */}
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">Landing Page <span className="text-cyan-500">Control</span></h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">MMH Trading Academy Admin v2.0</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-cyan-500 hover:bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.2)] disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Update Live Site
                </button>
            </div>

            {/* 1. PNL STATUS */}
            <section className="bg-[#0D1117] p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingUp size={80} /></div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/50 mb-3 underline decoration-cyan-500/20 underline-offset-8">Total Profit/Loss Status</label>
                <input
                    type="text"
                    value={formData.pnl}
                    onChange={(e) => setFormData({ ...formData, pnl: e.target.value })}
                    placeholder="e.g. +$12,450.00"
                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-cyan-500 outline-none font-black text-2xl text-cyan-500 tracking-tight"
                />
            </section>

            {/* 2. ANALYSIS & PROFITS (With Cloudinary) */}
            <section className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500"><Globe size={20} /></div>
                        <h3 className="text-sm font-black uppercase tracking-widest italic">Performance & Analysis</h3>
                    </div>
                    <button onClick={() => addItem('analysisSection', { landingChart: '', pair: '', profit: '', reason: '' })} className="group p-2 bg-white/5 hover:bg-cyan-500 rounded-xl transition-all border border-white/5">
                        <Plus className="group-hover:text-black transition-colors" size={20} />
                    </button>
                </div>

                <div className="grid gap-6">
                    {formData.analysisSection.map((item, idx) => (
                        <div key={idx} className="bg-[#0D1117] p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-8 items-center relative group">

                            {/* Image Uploader */}
                            <div className="w-full md:w-48 shrink-0">
                                <CldUploadWidget
                                    uploadPreset="mmhtrading"
                                    onSuccess={(result) => updateField('analysisSection', idx, 'landingChart', result.info.secure_url)}
                                >
                                    {({ open }) => (
                                        <div
                                            onClick={() => open()}
                                            className="aspect-video md:aspect-square w-full bg-black/40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all overflow-hidden relative"
                                        >
                                            {item.landingChart ? (
                                                <img src={item.landingChart} className="w-full h-full object-cover" alt="Chart" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <UploadCloud size={24} className="text-slate-600 group-hover:text-cyan-500" />
                                                    <span className="text-[9px] font-black uppercase text-slate-600 group-hover:text-cyan-500">Add Chart</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CldUploadWidget>
                            </div>

                            {/* Data Fields */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trading Pair</label>
                                    <input placeholder="XAUUSD" value={item.pair} onChange={(e) => updateField('analysisSection', idx, 'pair', e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm font-bold focus:border-cyan-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Net Profit</label>
                                    <input placeholder="+$500" value={item.profit} onChange={(e) => updateField('analysisSection', idx, 'profit', e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm font-bold text-green-400 focus:border-cyan-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Reason / Logic</label>
                                    <input placeholder="Breakout" value={item.reason} onChange={(e) => updateField('analysisSection', idx, 'reason', e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm font-bold focus:border-cyan-500 outline-none transition-all" />
                                </div>
                            </div>

                            <button
                                onClick={() => removeItem('analysisSection', idx)}
                                className="md:static absolute top-4 right-4 text-slate-700 hover:text-red-500 p-2 transition-all hover:bg-red-500/10 rounded-lg"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. MARKET WATCHLIST */}
            <section className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><TrendingUp size={20} /></div>
                        <h3 className="text-sm font-black uppercase tracking-widest italic text-yellow-500">Current Watchlist</h3>
                    </div>
                    <button onClick={() => addItem('watchlist', { pairName: '', entryPrice: '', shortDesc: '' })} className="p-2 bg-white/5 hover:bg-yellow-500/20 rounded-xl border border-white/5 transition-all"><Plus size={20} /></button>
                </div>
                <div className="grid gap-4">
                    {formData.watchlist.map((item, idx) => (
                        <div key={idx} className="bg-[#0D1117] p-5 rounded-2xl border border-white/5 flex flex-wrap md:flex-nowrap gap-4 items-end">
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-[8px] font-black text-slate-600 uppercase mb-1 block">Pair</label>
                                <input placeholder="EURUSD" value={item.pairName} onChange={(e) => updateField('watchlist', idx, 'pairName', e.target.value)} className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-[8px] font-black text-slate-600 uppercase mb-1 block">Entry Zone</label>
                                <input placeholder="1.08500" value={item.entryPrice} onChange={(e) => updateField('watchlist', idx, 'entryPrice', e.target.value)} className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="flex-[2] min-w-[250px]">
                                <label className="text-[8px] font-black text-slate-600 uppercase mb-1 block">Short Description</label>
                                <input placeholder="Wait for H4 rejection..." value={item.shortDesc} onChange={(e) => updateField('watchlist', idx, 'shortDesc', e.target.value)} className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-bold text-slate-400" />
                            </div>
                            <button onClick={() => removeItem('watchlist', idx)} className="text-red-500/40 hover:text-red-500 p-3"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. HIGH IMPACT NEWS */}
            <section className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Newspaper size={20} /></div>
                        <h3 className="text-sm font-black uppercase tracking-widest italic text-red-500">Economic News</h3>
                    </div>
                    <button onClick={() => addItem('highImpactNews', { newsTitle: '', newsTime: '' })} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-xl border border-white/5 transition-all"><Plus size={20} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.highImpactNews.map((item, idx) => (
                        <div key={idx} className="bg-[#0D1117] p-5 rounded-2xl border border-white/5 flex gap-4 items-center group">
                            <div className="flex-1">
                                <input placeholder="e.g. FOMC Meeting" value={item.newsTitle} onChange={(e) => updateField('highImpactNews', idx, 'newsTitle', e.target.value)} className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-bold text-red-400 uppercase" />
                            </div>
                            <div className="w-32">
                                <input placeholder="18:30" value={item.newsTime} onChange={(e) => updateField('highImpactNews', idx, 'newsTime', e.target.value)} className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-bold text-center" />
                            </div>
                            <button onClick={() => removeItem('highImpactNews', idx)} className="opacity-0 group-hover:opacity-100 text-red-500 p-2 transition-opacity"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}