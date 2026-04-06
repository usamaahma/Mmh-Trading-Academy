"use client";
import React, { useState, useEffect } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function ResultsForm({ initialData, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageOne: "",
        imageTwo: "",
    });
    const [loading, setLoading] = useState(false);

    // Sync form with initialData for Edits
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                imageOne: initialData.imageOne || "",
                imageTwo: initialData.imageTwo || "",
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Client-side Validation
        if (!formData.title.trim()) return alert("Title is required!");

        setLoading(true);
        const method = initialData ? "PUT" : "POST";
        const url = initialData ? `/api/results/${initialData._id}` : "/api/results";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const responseData = await res.json();

            if (res.ok) {
                onSuccess(); // Refresh list and close modal
            } else {
                // 2. Server-side Error details dikhayega
                console.error("Backend Error Details:", responseData);
                alert(`Error: ${responseData.error || "Failed to save result"}`);
            }
        } catch (err) {
            console.error("Network/Client Error:", err);
            alert("Network error! Check your internet or server console.");
        } finally {
            setLoading(false);
        }
    };

    // Helper for Image Upload Boxes
    const ImageBox = ({ label, field, currentImage }) => (
        <div className="space-y-2 flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
            <CldUploadWidget
                uploadPreset="mmhtrading"
                onSuccess={(result) => {
                    // console.log("Cloudinary Upload Success:", result.info.secure_url);
                    setFormData(prev => ({ ...prev, [field]: result.info.secure_url }));
                }}
                onError={(error) => console.error("Cloudinary Error:", error)}
            >
                {({ open }) => (
                    <div
                        onClick={() => open()}
                        className="group relative border-2 border-dashed border-white/10 rounded-2xl p-4 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/5 cursor-pointer flex flex-col items-center justify-center min-h-[160px] overflow-hidden bg-black/20"
                    >
                        {currentImage ? (
                            <div className="relative w-full h-full">
                                <img src={currentImage} className="w-full h-32 object-cover rounded-xl" alt="Preview" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                    <p className="text-[8px] font-bold text-white uppercase">Change Image</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <UploadCloud size={20} className="mx-auto text-slate-500 group-hover:text-cyan-500 mb-2" />
                                <p className="text-[9px] font-black text-slate-500 uppercase">Upload Image</p>
                            </div>
                        )}
                    </div>
                )}
            </CldUploadWidget>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-[#0A0A0A]">
            <div className="space-y-4">
                {/* Title Input */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Result Title</label>
                    <input
                        className="w-full bg-black/60 border border-white/10 p-3.5 rounded-xl outline-none focus:border-cyan-500 font-bold text-sm text-white transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Weekly Profit PnL"
                        required
                    />
                </div>

                {/* Images Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    <ImageBox label="Image 1 (Entry)" field="imageOne" currentImage={formData.imageOne} />
                    <ImageBox label="Image 2 (Exit)" field="imageTwo" currentImage={formData.imageTwo} />
                </div>

                {/* Description Textarea */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description (Optional)</label>
                    <textarea
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-xl outline-none min-h-[100px] text-xs text-slate-300 leading-relaxed focus:border-cyan-500 transition-all"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Extra details about the trade setup..."
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-white text-black font-black py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/10"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Processing...</span>
                    </>
                ) : (
                    initialData ? "Update Result" : "Publish Result"
                )}
            </button>
        </form>
    );
}