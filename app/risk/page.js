"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Navigation ke liye import
import { AlertTriangle, ShieldAlert, Scale, Info, ChevronRight } from "lucide-react";

export default function RiskDisclosurePage() {
    const router = useRouter();

    const handleAccept = () => {
        // Yahan aap logic laga sakte hain, jaise localStorage mein save karna
        // localStorage.setItem("risk-accepted", "true");

        // Click karne par Courses page par bhej dega
        router.push("/courses");
    };

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-32 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="mb-16 border-b border-white/5 pb-10">
                    <div className="flex items-center gap-3 text-red-500 uppercase tracking-[0.4em] text-[9px] font-black mb-4">
                        <div className="h-px w-6 bg-red-500" />
                        Legal Compliance Terminal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">
                        Risk <span className="text-cyan-500">Disclosure</span>
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed uppercase tracking-widest max-w-2xl">
                        Forex trading contains substantial risk and is not for every investor.
                        Read this document carefully before engaging with MMH Academy materials.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="space-y-8">

                    {/* High Risk Warning Card */}
                    <div className="group bg-[#0D1117] border border-red-500/20 rounded-[1.5rem] p-8 hover:border-red-500/40 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/5 blur-[50px]" />

                        <div className="flex items-start gap-5">
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
                                    High Risk Investment Warning
                                </h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-wider mb-4">
                                    Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Educational Purpose Card */}
                    <div className="group bg-[#0D1117] border border-white/5 rounded-[1.5rem] p-8 hover:border-cyan-500/30 transition-all duration-500">
                        <div className="flex items-start gap-5">
                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                                <Scale size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    Educational Purpose Only
                                </h2>
                                <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider">
                                    All content provided by <span className="text-white">MMH Academy</span> is for educational purposes only. No information shared should be interpreted as financial advice.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Disclosure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0D1117] border border-white/5 rounded-[1.5rem] p-6">
                            <div className="flex items-center gap-3 mb-4 text-cyan-500 font-black text-[10px] uppercase tracking-widest">
                                <ShieldAlert size={16} /> Performance Note
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                                Past performance is not necessarily indicative of future results.
                            </p>
                        </div>
                        <div className="bg-[#0D1117] border border-white/5 rounded-[1.5rem] p-6">
                            <div className="flex items-center gap-3 mb-4 text-cyan-500 font-black text-[10px] uppercase tracking-widest">
                                <Info size={16} /> Market Volatility
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                                Market events can cause rapid and significant financial losses.
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        {/* Background Danger Glow */}
                        <div className="absolute -inset-1 bg-red-500/10 rounded-[1.6rem] blur-md group-hover:bg-red-500/20 transition-all duration-500" />

                        <div className="relative bg-[#0D1117] border-2 border-red-500/40 rounded-[1.5rem] p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-red-500 flex items-center justify-center rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                                        <ShieldAlert size={32} className="text-black" />
                                    </div>
                                </div>

                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-red-500 mb-2">
                                        Zero Liability <span className="text-white">Protocol</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-sm md:text-lg font-black uppercase italic leading-tight tracking-tight text-white bg-red-500/10 p-4 rounded-lg border-l-4 border-red-500">
                                            "MMH TRADING ACADEMY WILL NOT BE HELD RESPONSIBLE FOR ANY KIND OF FINANCIAL LOSS, DAMAGES, OR TRADING DEFICITS INCURRED BY USERS."
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                            By accessing our signals, analysis, or courses, you acknowledge that you are
                                            <span className="text-white"> 100% responsible </span>
                                            for your own capital. Trading is a personal risk, and we do not manage
                                            your funds or guarantee profits.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Scanner Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20" />
                        </div>
                    </div>
                    {/* Bottom CTA / Affirmation */}
                    <div className="mt-12 p-8 border-2 border-dashed border-white/5 rounded-[2rem] text-center">
                        <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px] italic mb-6">
                            By continuing to use this terminal, you acknowledge these risks.
                        </p>

                        {/* Yahan 'onClick' handleAccept function laga diya hai */}
                        <button
                            onClick={handleAccept}
                            className="group relative bg-white text-black font-black uppercase italic tracking-tighter px-8 py-3 rounded-full hover:bg-cyan-500 transition-all duration-300 flex items-center gap-2 mx-auto text-sm active:scale-95"
                        >
                            I Understand the Risks
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}