"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function SignalForm({ initialData, onSuccess }) {
    const strategyOptions = {
        FOREX: ["SCALPING", "LONG_TERM", "RESULTS"],
        STOCKS: ["INTRADAY", "SWING", "ANALYSIS"],
        CRYPTO: ["SPOT", "FUTURE"],
    };

    const [formData, setFormData] = useState({
        pair: "",
        heading: "",
        slug: "",
        description: "",
        image: "",
        category: "FOREX",
        strategy: "SCALPING", // Default match with strategyOptions
        type: "BUY",
        entryPrice: "",
        stopLoss: "",
        takeProfits: [""],
        status: "ACTIVE",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                takeProfits: initialData.takeProfits?.length ? initialData.takeProfits : [""]
            });
        }
    }, [initialData]);

    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        setFormData({
            ...formData,
            category: newCat,
            strategy: strategyOptions[newCat][0]
        });
    };

    const handleHeadingChange = (e) => {
        const val = e.target.value;
        const generatedSlug = val.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        setFormData({ ...formData, heading: val, slug: generatedSlug });
    };

    const handleTPChange = (index, value) => {
        const newTPs = [...formData.takeProfits];
        newTPs[index] = value;
        setFormData({ ...formData, takeProfits: newTPs });
    };

    const addTP = () => setFormData({ ...formData, takeProfits: [...formData.takeProfits, ""] });
    const removeTP = (index) => {
        const newTPs = formData.takeProfits.filter((_, i) => i !== index);
        setFormData({ ...formData, takeProfits: newTPs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = initialData ? "PUT" : "POST";
        const url = initialData ? `/api/signals/${initialData._id}` : "/api/signals";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) onSuccess();
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-[#0D1117] text-white max-h-[90vh] overflow-y-auto no-scrollbar border-t border-white/5">
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase text-cyan-500 italic tracking-tighter">Signal <span className="text-white">Terminal</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CHART UPLOADER - FIXED LOGIC */}
                <div className="col-span-full">
                    <CldUploadWidget
                        uploadPreset="mmhtrading"
                        onSuccess={(result) => {
                            // FIXED: Functional update use kiya taake baaki inputs safe rahein
                            setFormData(prev => ({ ...prev, image: result.info.secure_url }));
                        }}
                    >
                        {({ open }) => (
                            <div onClick={() => open()} className="group relative border-2 border-dashed border-white/10 rounded-3xl p-6 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
                                {formData.image ? <img src={formData.image} className="w-full h-48 object-cover rounded-2xl" alt="Preview" /> : <p className="text-[10px] font-black text-slate-500 uppercase">Upload Chart</p>}
                            </div>
                        )}
                    </CldUploadWidget>
                </div>

                {/* HEADING */}
                <div className="col-span-full space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Heading</label>
                    <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 font-bold" value={formData.heading} onChange={handleHeadingChange} />
                </div>

                {/* PAIR */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pair</label>
                    <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none font-black text-cyan-500 uppercase" value={formData.pair} onChange={(e) => setFormData({ ...formData, pair: e.target.value.toUpperCase() })} />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                    <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold" value={formData.category} onChange={handleCategoryChange}>
                        <option value="FOREX">FOREX</option>
                        <option value="CRYPTO">CRYPTO</option>
                        <option value="STOCKS">STOCKS</option>
                    </select>
                </div>

                {/* DYNAMIC STRATEGY */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Strategy ({formData.category})</label>
                    <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold uppercase text-cyan-500" value={formData.strategy} onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}>
                        {strategyOptions[formData.category].map((opt) => (
                            <option key={opt} value={opt}>{opt.replace("_", " ")}</option>
                        ))}
                    </select>
                </div>

                {/* TRADE TYPE */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Trade Type</label>
                    <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold uppercase" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                </div>

                {/* DESCRIPTION */}
                <div className="col-span-full space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Market Analysis (Description)</label>
                    <textarea
                        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none min-h-[120px] text-sm text-slate-300"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Explain the setup..."
                    />
                </div>

                {/* ENTRY & SL */}
                <div className="space-y-2 font-mono">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Entry Price</label>
                    <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold text-cyan-500" value={formData.entryPrice} onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })} />
                </div>
                <div className="space-y-2 font-mono">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Stop Loss</label>
                    <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold text-red-500" value={formData.stopLoss} onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })} />
                </div>

                {/* TP TARGETS */}
                <div className="col-span-full space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Take Profit Targets</label>
                    {formData.takeProfits.map((tp, index) => (
                        <div key={index} className="flex gap-2 font-mono">
                            <input className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl outline-none text-green-500 font-bold" value={tp} onChange={(e) => handleTPChange(index, e.target.value)} placeholder={`TP ${index + 1}`} />
                            {formData.takeProfits.length > 1 && <button type="button" onClick={() => removeTP(index)} className="p-3 text-red-500"><Trash2 size={18} /></button>}
                        </div>
                    ))}
                    <button type="button" onClick={addTP} className="text-[9px] font-black text-cyan-500 bg-cyan-500/5 px-4 py-2 rounded-lg border border-cyan-500/10 uppercase">+ Add TP</button>
                </div>

                {/* SIGNAL STATUS */}
                <div className="col-span-full space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Signal Status</label>
                    <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none font-bold uppercase text-cyan-500" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="HIT_TP">HIT TP</option>
                        <option value="HIT_SL">HIT SL</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="PENDING">PENDING</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="w-full bg-cyan-500 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-white transition-all">
                {initialData ? "Update Signal" : "Broadcast Signal"}
            </button>
        </form>
    );
}