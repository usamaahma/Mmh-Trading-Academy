"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            username: username.toLowerCase(),
            password: password,
            redirect: false,
        });

        if (res.error) {
            setError("Invalid Username or Password");
            setLoading(false);
        } else {
            router.push("/"); // Login ke baad home par bhej do
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#010409] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-[#0D1117] border border-white/5 p-10 rounded-[2rem] shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2">
                        Protocol <span className="text-cyan-500 text-not-italic">Access</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                        Enter Student Credentials
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase p-3 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#010409] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-cyan-500/50 transition-all font-bold"
                                placeholder="TRADER_ID"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Secret Key</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#010409] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-cyan-500/50 transition-all font-bold"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Authenticate"}
                    </button>
                </form>

                <p className="text-center mt-8 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                    No Access?{" "}
                    <a
                        href="https://wa.me/966549357534?text=Assalam%20o%20Alaikum%20Admin,%20I%20need%20access%20to%20the%20MMH%20Trading%20Academy%20Terminal."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 cursor-pointer hover:text-white transition-all duration-300 border-b border-cyan-500/20 hover:border-white pb-0.5"
                    >
                        Contact Academy Admin
                    </a>
                </p>
            </div>
        </div>
    );
}