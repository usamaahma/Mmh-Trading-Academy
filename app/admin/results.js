"use client";
import React, { useState, useEffect } from "react";
import ResultsForm from "./resultsform";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function ResultsManager() {
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchResults = async () => {
        const res = await fetch("/api/results");
        const json = await res.json();
        if (json.success) setResults(json.data);
    };

    useEffect(() => { fetchResults(); }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch(`/api/results/${id}`, { method: "DELETE" });
        if (res.ok) fetchResults();
    };

    const handleSuccess = () => {
        setShowModal(false);
        setEditData(null);
        fetchResults();
    };

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black uppercase tracking-tighter italic">Manage Results</h1>
                <button 
                    onClick={() => { setEditData(null); setShowModal(true); }}
                    className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase hover:bg-white transition-all"
                >
                    <Plus size={16} /> Add New Result
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-[2rem] w-full max-w-2xl overflow-hidden relative">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 text-slate-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <ResultsForm initialData={editData} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-400">
                        <tr>
                            <th className="p-5">Title</th>
                            <th className="p-5">Images</th>
                            <th className="p-5">Date</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {results.map((item) => (
                            <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-5 font-bold text-sm">{item.title}</td>
                                <td className="p-5">
                                    <div className="flex -space-x-3">
                                        <img src={item.imageOne} className="w-10 h-10 rounded-lg border-2 border-[#111] object-cover" />
                                        <img src={item.imageTwo} className="w-10 h-10 rounded-lg border-2 border-[#111] object-cover" />
                                    </div>
                                </td>
                                <td className="p-5 text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setEditData(item); setShowModal(true); }} className="p-2 hover:bg-cyan-500/20 text-cyan-500 rounded-lg">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}