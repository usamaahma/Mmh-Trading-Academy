"use client";
import React, { useState, useEffect } from "react";
import { 
    Plus, 
    Trash2, 
    ExternalLink, 
    Loader2, 
    LayoutGrid, 
    ShieldCheck, 
    Bitcoin, 
    Gift 
} from "lucide-react";

export default function AdminBrokersPage() {
    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Low Spread Brokers");
    
    // Form States
    const [formData, setFormData] = useState({
        name: "",
        link: "",
        category: "Low Spread Brokers"
    });

    const categories = [
        { id: "Low Spread Brokers", icon: <LayoutGrid size={16} /> },
        { id: "Best For News Trading Brokers", icon: <ShieldCheck size={16} /> },
        { id: "Best For Crypto Trading Brokers", icon: <Bitcoin size={16} /> },
        { id: "Deposit Bonus Brokers", icon: <Gift size={16} /> }
    ];

    useEffect(() => {
        fetchBrokers();
    }, []);

    const fetchBrokers = async () => {
        try {
            const res = await fetch("/api/brokers");
            const json = await res.json();
            if (json.success) setBrokers(json.data);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/brokers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ ...formData, name: "", link: "" });
                fetchBrokers();
            }
        } catch (err) {
            alert("Failed to add broker");
        }
    };

    const deleteBroker = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/brokers/${id}`, { method: "DELETE" });
            if (res.ok) fetchBrokers();
        } catch (err) {
            alert("Delete failed");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#010409]">
            <Loader2 className="animate-spin text-cyan-500" size={32} />
        </div>
    );

    return (
        <div className="p-8 bg-[#010409] min-h-screen text-white font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                        Broker <span className="text-cyan-500">Database</span>
                    </h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        Manage institutional affiliate protocols
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT: ADD FORM */}
                    <div className="lg:col-span-4">
                        <form onSubmit={handleSubmit} className="bg-[#0D1117] border border-white/5 p-6 rounded-2xl sticky top-8">
                            <h2 className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-6 flex items-center gap-2">
                                <Plus size={14} /> Add New Entry
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase block mb-2">Broker Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-[#010409] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all font-bold"
                                        placeholder="e.g. EXNESS"
                                    />
                                </div>

                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase block mb-2">Affiliate Link</label>
                                    <input 
                                        type="url"
                                        required
                                        value={formData.link}
                                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                                        className="w-full bg-[#010409] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all text-cyan-500"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase block mb-2">Select Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-[#010409] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all font-bold"
                                    >
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.id}</option>)}
                                    </select>
                                </div>

                                <button className="w-full bg-cyan-500 text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-lg mt-4">
                                    Deploy Broker Data
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: LISTING WITH TABS */}
                    <div className="lg:col-span-8">
                        
                        {/* CATEGORY TABS */}
                        <div className="flex flex-wrap gap-2 mb-8 bg-[#0D1117] p-1.5 rounded-2xl border border-white/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all ${
                                        activeTab === cat.id 
                                        ? "bg-cyan-500 text-black" 
                                        : "hover:bg-white/5 text-slate-500"
                                    }`}
                                >
                                    {cat.icon} {cat.id}
                                </button>
                            ))}
                        </div>

                        {/* BROKER LIST */}
                        <div className="space-y-3">
                            {brokers.filter(b => b.category === activeTab).length > 0 ? (
                                brokers.filter(b => b.category === activeTab).map((broker) => (
                                    <div key={broker._id} className="group flex items-center justify-between bg-[#0D1117] border border-white/5 p-5 rounded-2xl hover:border-cyan-500/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#010409] flex items-center justify-center border border-white/5 font-black text-cyan-500 italic">
                                                {broker.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black uppercase tracking-tight italic text-white group-hover:text-cyan-400 transition-colors">
                                                    {broker.name}
                                                </h3>
                                                <a href={broker.link} target="_blank" className="text-[9px] font-bold text-slate-600 truncate max-w-[200px] block hover:text-cyan-500">
                                                    {broker.link}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a href={broker.link} target="_blank" className="p-2.5 bg-[#010409] rounded-lg border border-white/5 text-slate-500 hover:text-cyan-500 transition-colors">
                                                <ExternalLink size={14} />
                                            </a>
                                            <button 
                                                onClick={() => deleteBroker(broker._id)}
                                                className="p-2.5 bg-[#010409] rounded-lg border border-white/5 text-slate-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl text-slate-700 font-black uppercase text-[10px] tracking-[0.5em]">
                                    No entries found in this protocol
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* BRANDING FOOTER */}
                <div className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-800">
                        MMH TRADING ACADEMY / ADMIN TERMINAL v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}