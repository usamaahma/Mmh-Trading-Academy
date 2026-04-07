"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function PopupForm({ isOpen, onClose, context }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        course: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Reset form when popup opens with new context
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                course: context?.courseName || ""
            }));
            setSubmitStatus("idle");
            setErrorMessage("");
        }
    }, [isOpen, context]);

    // Close logic (Escape key)
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Prevent scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // STRICT VALIDATION: Sirf phone number check hoga
        if (!formData.phoneNumber.trim()) {
            setSubmitStatus("error");
            setErrorMessage("Please enter your Phone Number to continue.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const response = await fetch("/api/leads", { // API matching our CRUD
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                setTimeout(() => {
                    setFormData({ name: "", email: "", phoneNumber: "", course: "", message: "" });
                    onClose();
                }, 2500);
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Submission failed. Please try again.");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("Network error. Check your internet.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
                onClick={onClose}
            />

            {/* Popup Content */}
            <div className="relative bg-[#0D1117] border border-white/10 rounded-3xl max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header with Trading Vibe */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div>
                        <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
                            {context?.type === "course" ? "Apply for Enrollment" : "Request Intelligence"}
                        </h3>
                        <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mt-1">
                            {context?.courseName ? `Program: ${context.courseName}` : "Direct Contact Line"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Phone - HIGHLIGHTED AS REQUIRED */}
                    <div>
                        <label className="block text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-2">
                            WhatsApp/Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+92 300 1234567"
                            className="w-full bg-[#05080f] border border-cyan-500/20 rounded-xl p-4 text-white outline-none focus:border-cyan-500 shadow-inner transition-all text-sm font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full bg-[#05080f] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-white/30 transition-all text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full bg-[#05080f] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-white/30 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Selected Course</label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full bg-[#05080f] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-white/30 transition-all text-sm appearance-none cursor-pointer"
                        >
                            <option value="SMC">Smart Money Concepts</option>
                            <option value="MSNR">MSNR Framework</option>
                            <option value="MMH-VIP">MMH Strategies</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Your Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Tell us about your trading goals..."
                            className="w-full bg-[#05080f] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-white/30 transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-cyan-500 text-black py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(6,182,212,0.3)]"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
                        {isSubmitting ? "Processing..." : "Submit Enrollment Request"}
                    </button>

                    {/* Messages */}
                    {submitStatus === "success" && (
                        <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl animate-bounce">
                            <CheckCircle size={16} className="text-green-500" />
                            <p className="text-[10px] text-green-400 font-bold uppercase">Report Saved to Vault!</p>
                        </div>
                    )}
                    {submitStatus === "error" && (
                        <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <AlertCircle size={16} className="text-red-500" />
                            <p className="text-[10px] text-red-400 font-bold uppercase">{errorMessage}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}