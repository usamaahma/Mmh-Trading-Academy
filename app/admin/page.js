"use client";
import React, { useState } from "react";
// 1. SignalManager import karein (Form ko is ke andar handle kiya hai humne)
import SignalManager from "./SignalManager";
import AdminSidebar from "./AdminSidebar";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("signals");

    return (
        <div className="flex min-h-screen bg-[#010409]">
            {/* Fixed Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Area */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="mb-10 flex justify-between items-center">
                    <div className="animate-in slide-in-from-left duration-700">
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            {activeTab} <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">Manager.</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">Terminal Online</p>
                        </div>
                    </div>

                    <div className="bg-[#0D1117] px-6 py-3 rounded-2xl border border-white/5 text-[10px] font-black text-cyan-500 shadow-xl tracking-widest flex items-center gap-3">
                        <span className="opacity-50">STK_PRT:</span>
                        {new Date().toLocaleTimeString()}
                    </div>
                </header>

                {/* 🔹 Tab Switching Logic */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">

                    {/* 🔥 Yahan humne SignalManager laga diya hai */}
                    {activeTab === "signals" && <SignalManager />}

                    {activeTab === "analysis" && (
                        <div className="text-center p-20 border border-dashed border-white/10 rounded-3xl bg-[#0D1117]/50">
                            <div className="text-cyan-500/20 mb-4 flex justify-center italic font-black text-6xl">02</div>
                            <h3 className="text-slate-500 uppercase font-black tracking-widest">Analysis Module Coming Soon</h3>
                        </div>
                    )}

                    {activeTab === "courses" && (
                        <div className="text-center p-20 border border-dashed border-white/10 rounded-3xl bg-[#0D1117]/50">
                            <div className="text-cyan-500/20 mb-4 flex justify-center italic font-black text-6xl">03</div>
                            <h3 className="text-slate-500 uppercase font-black tracking-widest">Courses Module Coming Soon</h3>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}