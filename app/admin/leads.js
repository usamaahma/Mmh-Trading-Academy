"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Phone,
  User,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
  Mail,
  Search
} from "lucide-react";

export default function AdminLeadPanel() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads"); // Tera naya API route
      const json = await res.json();
      if (json.success) {
        // Sorting Logic: Unread leads (false) first, then Read (true)
        // Phir unke andar latest date ke hisab se sort
        const sortedData = json.data.sort((a, b) => {
          if (a.isRead === b.isRead) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return a.isRead ? 1 : -1;
        });
        setLeads(sortedData);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Toggle Read/Unread
  const toggleReadStatus = async (id, currentIsRead) => {
    try {
      const newStatus = !currentIsRead;
      
      // Optimistic Update
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, isRead: newStatus } : l))
      );

      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");
      
      // Refresh to apply sorting again
      fetchLeads();
    } catch (err) {
      console.error("Status Update Failed:", err);
      fetchLeads();
    }
  };

  // Delete Lead
  const handleDelete = async (id) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#010409]">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyan-500 mx-auto mb-4" size={40} />
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Decrypting Vault...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#010409] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Search className="text-cyan-500" /> Lead Intelligence
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Institutional Student Tracker
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-6">
              <div className="text-center">
                <p className="text-[8px] text-slate-500 uppercase font-bold">Total</p>
                <p className="text-sm font-black text-white">{leads.length}</p>
              </div>
              <div className="text-center border-l border-white/10 pl-6">
                <p className="text-[8px] text-cyan-500 uppercase font-bold">New</p>
                <p className="text-sm font-black text-cyan-400">
                  {leads.filter(l => !l.isRead).length}
                </p>
              </div>
            </div>
            <button
              onClick={fetchLeads}
              className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-slate-400 border border-white/5"
            >
              <RefreshCcw size={18} />
            </button>
          </div>
        </header>

        {/* Table Container */}
        <div className="bg-[#0D1117] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Student Info</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Contact Detail</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Course/Program</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className={`group transition-all ${!lead.isRead ? "bg-cyan-500/[0.04]" : "hover:bg-white/[0.01]"}`}
                  >
                    {/* Name & Email */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${!lead.isRead ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
                          {lead.name ? lead.name[0].toUpperCase() : <User size={14}/>}
                        </div>
                        <div>
                          <div className={`font-bold text-sm uppercase italic ${!lead.isRead ? 'text-white' : 'text-slate-400'}`}>
                            {lead.name || "Anonymous"}
                          </div>
                          <div className="text-[10px] text-slate-600 lowercase">{lead.email || "No email provided"}</div>
                        </div>
                      </div>
                    </td>

                    {/* Phone Number (Required Field) */}
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                        <Phone size={12} className="opacity-50" />
                        {lead.phoneNumber}
                      </div>
                    </td>

                    {/* Course Interested */}
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-slate-600" />
                        <span className="text-[10px] font-black px-2 py-1 rounded bg-black/40 border border-white/10 text-slate-300 uppercase tracking-tighter">
                          {lead.course || "General Inquiry"}
                        </span>
                      </div>
                    </td>

                    {/* Status Toggle (Read/Unread) */}
                    <td className="p-6">
                      <button
                        onClick={() => toggleReadStatus(lead._id, lead.isRead)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all active:scale-95 ${
                          !lead.isRead 
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                            : "bg-slate-800 text-slate-500 border-white/5"
                        }`}
                      >
                        {!lead.isRead ? (
                          <>
                            <AlertCircle size={10} className="animate-pulse" />
                            New Intelligence
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={10} />
                            Reviewed
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-xl text-slate-600 hover:text-red-500 hover:border-red-500/30 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {leads.length === 0 && (
              <div className="p-20 text-center text-slate-600 uppercase font-black text-xs tracking-widest">
                No intelligence reports found in the vault.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}