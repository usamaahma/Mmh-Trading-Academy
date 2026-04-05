"use client";
import React from "react";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
    return (
        <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* BACK BUTTON */}
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-10 text-[10px] font-black uppercase tracking-widest">
                    <ArrowLeft size={14} /> Back
                </Link>

                {/* HEADING SECTION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                        Lot Size <span className="text-cyan-500 text-shadow-glow">Calculator</span>
                    </h1>

                    <a
                        href="https://www.tradingview.com/script/utGZcd9r-Lot-Size-Calculator/"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-3 bg-cyan-500 text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg whitespace-nowrap"
                    >
                        Use Tool on TradingView <ExternalLink size={14} />
                    </a>
                </div>

                {/* IMAGE */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl">
                    <Image
                        src="/calculator.jpeg"
                        alt="Calculator Preview"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* MAIN DESCRIPTION */}
                <div className="space-y-8 text-slate-300 mb-20">
                    <p className="text-lg font-bold text-white uppercase tracking-tight leading-snug border-l-4 border-cyan-500 pl-6">
                        The Lot Size Calculator is a powerful and user-friendly tool designed to help traders accurately determine the optimal lot size for every trade. By simply entering your Account Size (in USD) and the Leverage you intend to use, the calculator automatically computes the most suitable lot size, removing guesswork and reducing the risk of overtrading.
                    </p>

                    <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-400 uppercase tracking-wide font-medium">
                        <p>
                            This indicator streamlines your trading process by instantly providing precise position sizing, allowing you to focus more on strategy and less on manual calculations. It is especially useful for both beginners and experienced traders who want to maintain consistent risk management across all trades.
                        </p>

                        <p>
                            Additionally, the calculator incorporates predefined Stop Loss (SL) levels in percentages — 0.1%, 0.2%, and 0.3% — helping you quickly assess risk exposure and adjust your position accordingly. This ensures better capital protection and disciplined trading.
                        </p>

                        <p>
                            Whether you're trading forex, crypto, or indices, this tool enhances decision-making by aligning your trades with proper risk management principles. It saves time, improves accuracy, and supports a more professional trading approach.
                        </p>

                        <p className="text-cyan-500 font-black italic border-t border-white/5 pt-8">
                            We are continuously working to improve this tool, so feel free to share your feedback, suggestions, or request new features to make it even more effective for your trading needs.
                        </p>
                    </div>
                </div>

                {/* FOOTER BRANDING */}
                <div className="pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-600 mb-2">
                        Institutional Protocol by
                    </p>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                        MMH <span className="text-cyan-500">Trading Academy</span>
                    </h2>
                </div>

            </div>
        </div>
    );
}