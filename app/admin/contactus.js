"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
} from "lucide-react";

export default function AdminContactPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contactus");
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Logical Toggle: UNREAD <-> READ
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";

    try {
      // Optimistic UI Update: Change UI first for speed
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
      );

      const res = await fetch(`/api/contactus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Server update failed");
    } catch (err) {
      console.error("Status Update Failed:", err);
      // Revert UI if server fails
      fetchMessages();
    }
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (!confirm("Confirm permanent deletion?")) return;
    try {
      const res = await fetch(`/api/contactus/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "UNREAD":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-pulse";
      case "READ":
        return "bg-slate-800 text-slate-500 border-white/5 opacity-60";
      default:
        return "bg-white/5 text-white";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#010409]">
        <Loader2 className="animate-spin text-cyan-500" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#010409] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Mail className="text-cyan-500" /> Communications Vault
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Management Interface
            </p>
          </div>
          <button
            onClick={fetchMessages}
            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-slate-400"
          >
            <RefreshCcw size={16} />
          </button>
        </header>

        <div className="bg-[#0D1117] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Sender
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Type
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Message
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">
                    Status
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className={`group transition-colors ${msg.status === "UNREAD" ? "bg-cyan-500/[0.03]" : "hover:bg-white/[0.01]"}`}
                  >
                    <td className="p-6">
                      <div className="font-bold text-sm text-white uppercase italic">
                        {msg.name}
                      </div>
                      <div className="text-[10px] text-slate-600 lowercase">
                        {msg.email}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[8px] font-black px-2 py-1 rounded bg-black/40 border border-white/10 text-slate-500 tracking-tighter">
                        {msg.subject}
                      </span>
                    </td>
                    <td className="p-6 max-w-xs">
                      <p
                        className={`text-xs leading-relaxed uppercase font-medium ${msg.status === "READ" ? "text-slate-600" : "text-slate-400"}`}
                      >
                        {msg.message}
                      </p>
                    </td>
                    <td className="p-6 text-center">
                      <button
                        onClick={() => toggleStatus(msg._id, msg.status)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all active:scale-95 ${getStatusStyle(msg.status)}`}
                      >
                        {msg.status === "UNREAD" ? (
                          <AlertCircle size={10} />
                        ) : (
                          <CheckCircle2 size={10} />
                        )}
                        {msg.status}
                      </button>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-xl text-slate-600 hover:text-red-500 hover:border-red-500/30 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
