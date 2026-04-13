"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Scale, Zap, Ban, UserCheck, ChevronRight, Terminal } from "lucide-react";

export default function TermsOfServicePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-32 pb-20 px-6 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 border-b border-white/5 pb-8">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-center">
                        Terms of <span className="text-cyan-500">Service</span>
                    </h1>
                </div>

                {/* Main Content Container */}
                <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 animate-pulse" />

                    <div className="p-8 md:p-14">

                        {/* TERMS CONTENT SECTION */}
                        <section className="space-y-12">

                            {/* Intro / Agreement */}
                            <div className="flex items-start gap-4">
                                <Terminal size={32} className="text-cyan-500 mt-1 flex-shrink-0" />
                                <p className="text-[13px] md:text-[14px] leading-[1.8] text-slate-300 font-medium uppercase tracking-wider text-justify">
                                    By accessing the <span className="text-white font-black">MMH Trading Academy</span> terminal, signals, and educational modules, you agree to be bound by the following institutional protocols. These terms govern your mentorship, access to proprietary analysis, and professional conduct within our community. If you do not agree with any part of these protocols, you are prohibited from using our services.
                                </p>
                            </div>

                            <div className="space-y-10 text-[12px] md:text-[13px] leading-[1.8] text-slate-400 font-medium uppercase tracking-wider text-justify">

                                {/* Section 1: Educational Scope */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Scale size={18} className="text-cyan-500" /> 01. Professional Education Mandate
                                    </h3>
                                    <p>
                                        MMH Trading Academy provides purely educational resources focusing on technical analysis, Smart Money Concepts (SMC), and market psychology. We do not operate as registered financial advisors or licensed brokers. Any signal or analysis shared within the academy terminal is for instructional and simulation purposes only. The academy is not responsible for the execution of trades in your personal accounts. You acknowledge that all financial decisions are made solely at your own discretion.
                                    </p>
                                </div>

                                {/* Section 2: Membership & Access */}
                                <div className="space-y-4 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <UserCheck size={18} className="text-cyan-500" /> 02. Proprietary Access & Non-Sharing
                                    </h3>
                                    <p>
                                        Upon registration, you are granted a non-exclusive, non-transferable license to access our curriculum. Sharing login credentials, leaking proprietary signal logs, or redistributing academy course material to third parties is strictly prohibited. Any violation of this intellectual property protocol will result in an immediate and permanent ban from the terminal without a refund.
                                    </p>
                                </div>

                                {/* Section 3: Signal Execution & Volatility */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Zap size={18} className="text-cyan-500" /> 03. Market Dynamics & Signal Policy
                                    </h3>
                                    <p>
                                        Forex markets are subject to high volatility, spread expansion, and liquidity gaps. While MMH Academy strives for high-accuracy analysis, we do not guarantee future profits or specific win rates. Past performance demonstrated in our case studies does not guarantee future results. Users are advised to utilize proper risk management (lot-sizing and stop-losses) at all times.
                                    </p>
                                </div>

                                {/* Section 4: Termination of Service */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Ban size={18} className="text-red-500" /> 04. Conduct & Termination Protocol
                                    </h3>
                                    <p>
                                        MMH Trading Academy reserves the right to terminate your access at any time for behavior deemed unprofessional, toxic, or disruptive to the learning environment. This includes harassment of other students or the dissemination of false information. All payments made for academy memberships are final and non-refundable, given the digital and intellectual nature of the content provided.
                                    </p>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}