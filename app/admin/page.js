"use client";
import React, { useState } from "react"; // Removed useEffect
import SignalManager from "./SignalManager";
import AdminSidebar from "./AdminSidebar";
import AnalysisForm from "./analysis";
import ManageCourses from "../../components-admin/managecourses";
import AdminBrokersPage from "./brokers";
import AdminContactPanel from "./contactus";
import ResultsManager from "./results";
import UserManager from "./UserManager";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("signals");

  return (
    <div className="flex h-screen bg-[#010409] overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              {activeTab}{" "}
              <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">
                Manager.
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                Terminal Online
              </p>
            </div>
          </div>

          {/* Static Header Badge instead of Clock */}
          <div className="bg-[#0D1117] px-6 py-3 rounded-2xl border border-white/5 text-[10px] font-black text-cyan-500 shadow-xl tracking-widest flex items-center gap-3">
            <span className="opacity-50">SYSTEM_ID:</span>
            ADMIN_v1.0
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
          {activeTab === "signals" && <SignalManager />}
          {activeTab === "analysis" && <AnalysisForm />}
          {activeTab === "courses" && <ManageCourses />}
          {activeTab === "brokers" && <AdminBrokersPage />}
          {activeTab === "contactus" && <AdminContactPanel />}
          {activeTab === "results" && <ResultsManager />}
          {activeTab === "users" && <UserManager />}

        </div>
      </main>
    </div>
  );
}
