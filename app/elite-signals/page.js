import { Crown, Radio } from "lucide-react";
import EliteSignalsFeed from "@/components/EliteSignalsFeed";

export const metadata = {
    title: "MMH Elite Signals | MMH Trading Academy",
    description: "Live MMH Elite Signals with entry, stop loss and take profit levels.",
};

// Public page: not listed in the middleware matcher, so no login is required.
export default function EliteSignalsPage() {
    return (
        <div className="min-h-screen bg-[#010409] px-4 pb-16 pt-32 text-slate-400 sm:px-6 md:pt-40 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-[#0D1117] to-amber-400/10 p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)] sm:p-8 md:mb-12 md:p-12">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-amber-200">
                        <Crown size={12} /> Premium feed
                    </div>
                    <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl md:text-7xl">
                        MMH Elite <span className="text-cyan-400">Signals</span>
                    </h1>
                    <p className="mt-4 max-w-auto text-sm leading-relaxed text-slate-300 md:text-base">
Real-time trade setups with precise entries, stop-losses, and take-profit targets — delivered instantly.</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>
                        <Radio size={12} /> Live
                    </div>
                </header>

                <EliteSignalsFeed showHeading={false} />

                <p className="mt-10 text-center text-[10px] leading-relaxed text-slate-600">
                    Trading involves risk. Signals are for educational purposes and are not financial advice.
                </p>
            </div>
        </div>
    );
}
