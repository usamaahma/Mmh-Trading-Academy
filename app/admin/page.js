"use client";
import React, { useState, useEffect } from "react"; // 1. useEffect add kiya
import SignalManager from "./SignalManager";
import AdminSidebar from "./AdminSidebar";
import AnalysisForm from "./analysis";
import ManageCourses from "../../components-admin/managecourses";
import AdminBrokersPage from "./brokers";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("signals");
    const [currentTime, setCurrentTime] = useState(""); // 2. State for time

    // 3. Client-side par time set karne ka logic
    useEffect(() => {
        // Initial time set karein
        setCurrentTime(new Date().toLocaleTimeString());

        // Har second update karein
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

                    {/* 4. Time Display Logic */}
                    <div className="bg-[#0D1117] px-6 py-3 rounded-2xl border border-white/5 text-[10px] font-black text-cyan-500 shadow-xl tracking-widest flex items-center gap-3 min-w-[150px]">
                        <span className="opacity-50">STK_PRT:</span>
                        {/* Agar time abhi set nahi hua (server side) to placeholder dikhayein */}
                        {currentTime || "--:--:--"}
                    </div>
                </header>

                {/* Tab Switching Logic */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                    {activeTab === "signals" && <SignalManager />}

                    {activeTab === "analysis" && <AnalysisForm />
                    }

                    {activeTab === "courses" && <ManageCourses/>}
                    {activeTab === "brokers" && <AdminBrokersPage/>}

                    
                </div>
            </main>
        </div>
    );
}