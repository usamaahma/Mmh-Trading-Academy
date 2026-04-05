"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Zap, Loader2 } from "lucide-react";
import SignalForm from "./SignalForm";

export default function SignalManager() {
    const [signals, setSignals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSignal, setEditingSignal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState("");

    // Hydration Fix: Time ko client-side par set karna
    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchSignals = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/signals");
            const data = await res.json();
            setSignals(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSignals();
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this signal?")) {
            await fetch(`/api/signals/${id}`, { method: "DELETE" });
            fetchSignals();
        }
    };

    const openAddModal = () => {
        setEditingSignal(null);
        setIsModalOpen(true);
    };

    const openEditModal = (signal) => {
        setEditingSignal(signal);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* HEADER BAR */}
            <div className="flex justify-between items-center bg-[#0D1117] p-6 rounded-2xl border border-white/5 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Signal <span className="text-cyan-500">Terminal</span></h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Entries: {signals.length} | {time}</p>
                    </div>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-xl font-black uppercase text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Create New
                </button>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-[#0D1117] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/[0.03] text-slate-500 uppercase text-[10px] font-black tracking-widest">
                        <tr>
                            <th className="p-5 border-b border-white/5 text-cyan-500/50">Asset / Pair</th>
                            <th className="p-5 border-b border-white/5">Entry / Type</th>
                            <th className="p-5 border-b border-white/5">Strategy</th>
                            <th className="p-5 border-b border-white/5">Status</th>
                            <th className="p-5 border-b border-white/5 text-right">Control</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            <tr><td colSpan={5} className="p-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2 text-cyan-500" /> ACCESSING DATABASE...</td></tr>
                        ) : signals.map((s) => (
                            <tr key={s._id} className="hover:bg-white/[0.02] transition-colors group border-b border-white/[0.02]">
                                <td className="p-5">
                                    <div className="font-black text-white text-base tracking-tighter uppercase">{s.pair}</div>
                                    <div className="text-[9px] text-slate-500 font-bold uppercase">{s.category}</div>
                                </td>
                                <td className="p-5">
                                    <div className={`font-black ${s.type === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                                        {s.type} @ {s.entryPrice}
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="text-slate-400 font-bold text-[11px] bg-white/5 px-2 py-1 rounded">
                                        {s.strategy?.replace("_", " ")}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-tighter shadow-sm ${s.status === 'ACTIVE' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEditModal(s)} className="p-2 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-lg transition-all text-slate-400"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDelete(s._id)} className="p-2 bg-white/5 hover:bg-red-500 hover:text-white rounded-lg transition-all text-slate-400"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL POPUP */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto no-scrollbar bg-[#0D1117] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 z-[100] p-2 bg-white/5 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-all group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                        </button>
                        <SignalForm
                            initialData={editingSignal}
                            onSuccess={() => {
                                setIsModalOpen(false);
                                fetchSignals();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}