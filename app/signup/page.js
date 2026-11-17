"use client";
import { useState } from "react";
import Link from "next/link";
import BackToHome from "@/components/BackToHome";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

const inputClass =
    "w-full bg-[#010409] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-cyan-500/50 transition-all font-bold";

export default function SignupPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "", website: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const username = form.username.trim().toLowerCase();
        if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
            setError("Username must be 3-30 characters: letters, numbers, dot, dash or underscore");
            return;
        }
        if (form.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!agreed) {
            setError("Please accept the Terms and Risk Disclosure");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email: form.email.trim().toLowerCase(),
                    password: form.password,
                    website: form.website,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Could not create account");
                setLoading(false);
                return;
            }

            setSuccess("Welcome to MMH Trading Academy! Your account is registered. Logging you in...");

            const login = await signIn("credentials", { username, password: form.password, redirect: false });
            if (login?.error) {
                router.replace("/login");
            } else {
                router.replace("/elite-signals");
                router.refresh();
            }
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#010409] relative flex items-center justify-center px-6 pt-24 pb-16">
            <BackToHome />
            <div className="w-full max-w-md bg-[#0D1117] border border-white/5 p-10 rounded-[2rem] shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2">
                        Create <span className="text-cyan-500 text-not-italic">Account</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                        Join MMH Trading Academy
                    </p>
                </div>

                {success ? (
                    <div className="text-center space-y-4">
                        <CheckCircle2 className="mx-auto text-cyan-500" size={48} />
                        <p className="text-white font-bold">{success}</p>
                        <Loader2 className="mx-auto animate-spin text-cyan-500" size={20} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase p-3 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {/* Honeypot field, hidden from real users */}
                        <input
                            type="text"
                            name="website"
                            value={form.website}
                            onChange={update("website")}
                            tabIndex={-1}
                            autoComplete="off"
                            className="hidden"
                            aria-hidden="true"
                        />

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="text" required autoComplete="username" value={form.username} onChange={update("username")} className={inputClass} placeholder="TRADER_ID" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={inputClass} placeholder="trader@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" value={form.password} onChange={update("password")} className={`${inputClass} pr-12`} placeholder="Min 8 characters" />
                                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-500" aria-label={showPassword ? "Hide password" : "Show password"}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" value={form.confirmPassword} onChange={update("confirmPassword")} className={inputClass} placeholder="••••••••" />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 text-[11px] text-slate-400 cursor-pointer select-none">
                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-cyan-500" />
                            <span>
                                I agree to the{" "}
                                <Link href="/terms" className="text-cyan-500 hover:text-white">Terms</Link>,{" "}
                                <Link href="/privacy-policy" className="text-cyan-500 hover:text-white">Privacy Policy</Link> and{" "}
                                <Link href="/risk" className="text-cyan-500 hover:text-white">Risk Disclosure</Link>.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Account"}
                        </button>
                    </form>
                )}

                <p className="text-center mt-8 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                    Already registered?{" "}
                    <Link href="/login" className="text-cyan-500 hover:text-white transition-all duration-300 border-b border-cyan-500/20 hover:border-white pb-0.5">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
