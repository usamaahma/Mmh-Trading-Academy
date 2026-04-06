"use client";
import React, { useState } from "react";
import { Send, Loader2, CheckCircle, Mail, Shield, Globe } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "SUPPORT",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/contactus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", subject: "SUPPORT", message: "" });
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-[#010409] pt-32 pb-20 px-6 md:px-12">
            {/* 1 Row, 2 Column Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* COLUMN 1: Heading + Details */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-cyan-500" />
                            <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em]">Establish Connection</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.8] text-white">
                            Get In  <span className="text-cyan-500 text-outline-cyan">Touch</span>
                        </h1>
                        <p className="max-w-sm text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                            Direct line to the terminal. Our technical analysts are standing by for your transmission.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 pt-10 border-t border-white/5">
                        <div className="flex items-start gap-4">
                            <Shield className="text-cyan-500 mt-1" size={20} />
                            <div>
                                <h4 className="text-white font-black uppercase text-[10px] tracking-widest">End-to-End Encryption</h4>
                                <p className="text-slate-600 text-[9px] font-bold uppercase mt-1">Secure terminal protocols active</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Globe className="text-cyan-500 mt-1" size={20} />
                            <div>
                                <h4 className="text-white font-black uppercase text-[10px] tracking-widest">Global Support</h4>
                                <p className="text-slate-600 text-[9px] font-bold uppercase mt-1">24/7 Monitoring enabled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: The Form */}
                <div className="relative">
                    {submitted ? (
                        <div className="bg-[#0D1117] border border-cyan-500/30 p-20 rounded-[3rem] text-center space-y-6 animate-in zoom-in duration-500">
                            <CheckCircle className="mx-auto text-cyan-500" size={80} strokeWidth={1} />
                            <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">Transmission Successful</h2>
                            <button onClick={() => setSubmitted(false)} className="bg-white/5 hover:bg-white hover:text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Send New Signal</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0D1117] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/20 transition-colors">
                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                                <input
                                    required
                                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold text-sm text-white"
                                    placeholder="FULL NAME"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Digital Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold text-sm text-white"
                                    placeholder="user@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Transmission Priority</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold text-sm text-cyan-500 appearance-none cursor-pointer"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="SUPPORT">TECH SUPPORT</option>
                                    <option value="BUSINESS">BUSINESS</option>
                                    <option value="FEEDBACK">FEEDBACK</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Briefing</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 transition-all font-medium text-sm text-slate-300"
                                    placeholder="INPUT MESSAGE..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-cyan-500 hover:bg-white text-black font-black py-6 rounded-2xl uppercase tracking-[0.5em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/20"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Deploy Message</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}