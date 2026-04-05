"use client";
import React, { useState, useEffect } from "react";
import { UploadCloud, Loader2, Image as ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function AnalysisForm({ initialData, onSuccess }) {
    const [formData, setFormData] = useState({
        heading: "",
        description: "",
        image: "",
        category: "FOREX",
    });
    const [loading, setLoading] = useState(false);

    // Edit mode ke liye data fill karna
    useEffect(() => {
        if (initialData) {
            setFormData({
                heading: initialData.heading || "",
                description: initialData.description || "",
                image: initialData.image || "",
                category: initialData.category || "FOREX",
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) return alert("Bhai image upload karna zaroori hai!");

        setLoading(true);
        const method = initialData ? "PUT" : "POST";
        const url = initialData ? `/api/analysis/${initialData._id}` : "/api/analysis";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                onSuccess(); // Form band karne aur data refresh karne ke liye
            } else {
                alert("Database mein save nahi ho saka.");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-black/20 rounded-3xl border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT SIDE: IMAGE UPLOAD */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chart / Analysis Image</label>
                    <CldUploadWidget
                        uploadPreset="mmhtrading"
                        onSuccess={(result) => {
                            // Functional update taake baaki inputs khali na hon
                            setFormData(prev => ({ ...prev, image: result.info.secure_url }));
                        }}
                    >
                        {({ open }) => (
                            <div
                                onClick={() => open()}
                                className="group relative border-2 border-dashed border-white/10 rounded-2xl p-4 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/5 cursor-pointer flex flex-col items-center justify-center min-h-[220px] overflow-hidden"
                            >
                                {formData.image ? (
                                    <img src={formData.image} className="w-full h-48 object-cover rounded-xl" alt="Preview" />
                                ) : (
                                    <div className="text-center space-y-2">
                                        <div className="p-3 bg-white/5 rounded-full inline-block group-hover:bg-cyan-500/20 group-hover:text-cyan-500 transition-all">
                                            <UploadCloud size={24} />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase">Upload Market Setup</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CldUploadWidget>
                </div>

                {/* RIGHT SIDE: TEXT INPUTS */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <select
                            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl outline-none font-bold text-cyan-500 text-sm"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="FOREX">FOREX MARKET</option>
                            <option value="CRYPTO">CRYPTO CURRENCY</option>
                            <option value="STOCKS">STOCK MARKET</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Headline</label>
                        <input
                            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl outline-none focus:border-cyan-500 font-bold text-sm"
                            value={formData.heading}
                            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                            placeholder="e.g. BTC Support Breakout"
                            required
                        />
                    </div>
                </div>

                {/* FULL WIDTH: DESCRIPTION */}
                <div className="col-span-full space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Detailed Analysis</label>
                    <textarea
                        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none min-h-[150px] text-xs text-slate-300 leading-relaxed font-medium"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Write your technical overview here..."
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-white text-black font-black py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" size={16} /> : (initialData ? "Update Analysis" : "Publish to Dashboard")}
            </button>
        </form>
    );
}