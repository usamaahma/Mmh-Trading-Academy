"use client";
import React from "react";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Trophy,
  Briefcase,
  Inbox,
} from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "signals", label: "Active Signals", icon: <Zap size={18} /> },
    { id: "analysis", label: "Market Analysis", icon: <BarChart3 size={18} /> },
    { id: "results", label: "Trade Results", icon: <Trophy size={18} /> },
    { id: "courses", label: "Manage Courses", icon: <BookOpen size={18} /> },
    { id: "brokers", label: "Add Brokers", icon: <Briefcase size={18} /> },
    { id: "contactus", label: "Contact Us Forms", icon: <Inbox size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#0D1117] border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-cyan-500 font-black tracking-tighter text-xl italic">
          ADMIN TERMINAL
        </h2>
        <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
          Control Center v3.0
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === item.id
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-xs font-bold uppercase hover:bg-red-500/10 rounded-lg">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
