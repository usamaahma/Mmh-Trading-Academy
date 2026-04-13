"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Lock, EyeOff, Database, ShieldCheck, ChevronRight, Fingerprint } from "lucide-react";

export default function PrivacyPolicyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-32 pb-20 px-6 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 border-b border-white/5 pb-8">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-center">
                        Privacy <span className="text-cyan-500">Policy</span>
                    </h1>
                </div>

                {/* Main Content Container */}
                <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 animate-pulse" />

                    <div className="p-8 md:p-14">

                        {/* PRIVACY CONTENT SECTION */}
                        <section className="space-y-12">

                            {/* Intro Paragraph */}
                            <div className="flex items-start gap-4">
                                <ShieldCheck size={32} className="text-cyan-500 mt-1 flex-shrink-0" />
                                <p className="text-[13px] md:text-[14px] leading-[1.8] text-slate-300 font-medium uppercase tracking-wider text-justify">
                                    At <span className="text-white font-black">MMH Trading Academy</span>, we prioritize the confidentiality and security of our students' digital footprint. This Privacy Policy outlines our rigid protocols regarding the collection, encryption, and management of your personal data within our educational terminal. By utilizing our platform, you acknowledge and consent to the data practices described herein.
                                </p>
                            </div>

                            <div className="space-y-10 text-[12px] md:text-[13px] leading-[1.8] text-slate-400 font-medium uppercase tracking-wider text-justify">

                                {/* Section 1: Data Collection */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Database size={18} className="text-cyan-500" /> 01. Information Acquisition
                                    </h3>
                                    <p>
                                        To facilitate access to our premium Forex courses, mentorship modules, and signal logs, we collect specific personal identifiers. This includes your full name, email address, and authentication credentials. MMH Trading Academy only acquires data that is strictly necessary for account verification and the delivery of educational content. We do not engage in the collection of non-essential metadata or intrusive tracking of your external browsing activities.
                                    </p>
                                </div>

                                {/* Section 2: Encryption Standards */}
                                <div className="space-y-4 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Lock size={18} className="text-cyan-500" /> 02. Advanced Encryption Protocol
                                    </h3>
                                    <p>
                                        Your data integrity is protected by industrial-grade 256-bit SSL encryption. All sensitive information transmitted between your terminal and our decentralized servers is shielded against unauthorized interception. We maintain rigorous internal security audits to ensure that your learning progress, payment history, and personal details remain invisible to external entities.
                                    </p>
                                </div>

                                {/* Section 3: Third-Party Disclosure */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <EyeOff size={18} className="text-cyan-500" /> 03. Zero-Disclosure Policy
                                    </h3>
                                    <p>
                                        MMH Trading Academy enforces a strict "Zero-Disclosure" mandate. We do not sell, trade, or lease your personal information to third-party marketing agencies, external brokerage firms, or data aggregators. Your information is used exclusively for internal academic administration and to provide updates regarding our Forex signals and analysis.
                                    </p>
                                </div>

                                {/* Section 4: Security Identity */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black flex items-center gap-2 text-lg italic tracking-tighter">
                                        <Fingerprint size={18} className="text-cyan-500" /> 04. Student Rights & Control
                                    </h3>
                                    <p>
                                        As a student of this academy, you retain full control over your data. You have the right to request a digital log of the information we hold or to request the complete permanent deletion of your profile from our encrypted database. MMH Trading Academy is committed to transparency and the ethical management of the data provided by our community members.
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