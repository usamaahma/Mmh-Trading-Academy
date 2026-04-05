"use client";
import React, { useState } from "react";
import { Plus, Trash2, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Tiptap SSR Fix
const Tiptap = dynamic(() => import("@/components/Tiptap"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
});

export default function AddCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // --- State Management (Mongoose Schema ke mutabiq) ---
    const [courseName, setCourseName] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    // Sections State
    const [sections, setSections] = useState([
        { heading: "", description: "", youtubeThumbnail: "", youtubeLink: "", megaLink: "" }
    ]);

    // FAQs State (Schema ke mutabiq add kiya gaya)
    const [faqs, setFaqs] = useState([
        { question: "", answer: "" }
    ]);

    // --- Image Upload Logic ---
    const handleCloudinaryUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "YOUR_PRESET"); // Replace with your preset

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            return data.secure_url;
        } catch (err) {
            console.error("Cloudinary Error:", err);
            return null;
        }
    };

    // --- Handlers for Sections ---
    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const addSection = () => setSections([...sections, { heading: "", description: "", youtubeThumbnail: "", youtubeLink: "", megaLink: "" }]);
    const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

    // --- Handlers for FAQs ---
    const handleFaqChange = (index, field, value) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

    // --- Submit Final Data ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const courseData = {
            courseName,
            shortDescription,
            sections,
            faqs
        };

        try {
            const res = await fetch("/api/course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            if (res.ok) {
                alert("Course Deployed Successfully!");
                router.push("/admin");
            } else {
                const errData = await res.json();
                alert(`Error: ${errData.message || 'Failed to save'}`);
            }
        } catch (err) {
            alert("Network Error: Check your connection");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin" className="flex items-center gap-2 text-slate-500 hover:text-cyan-500 mb-8 text-xs font-black uppercase tracking-widest transition-colors">
                    <ArrowLeft size={14} /> Back to Terminal
                </Link>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* --- CORE CONFIG --- */}
                    <section className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 space-y-6">
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">Core Configuration</h2>
                        <div className="grid gap-4">
                            <input
                                required
                                className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 font-bold"
                                placeholder="COURSE NAME"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <textarea
                                className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 text-sm h-24"
                                placeholder="SHORT DESCRIPTION (MAX 200 CHARS)"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* --- CONTENT SECTIONS --- */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">Course Modules / Sections</h2>
                            <button type="button" onClick={addSection} className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg text-[10px] font-black border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all">
                                <Plus size={14} /> Add Module
                            </button>
                        </div>

                        {sections.map((section, index) => (
                            <div key={index} className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 relative">
                                <button type="button" onClick={() => removeSection(index)} className="absolute top-6 right-6 text-slate-600 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>

                                <div className="grid gap-6">
                                    <input
                                        placeholder="SECTION HEADING (e.g. Introduction to React)"
                                        className="bg-black/20 border border-white/5 p-4 rounded-xl text-sm font-bold outline-none focus:border-cyan-500/50"
                                        value={section.heading}
                                        onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                                    />

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Syllabus / Detail Description</label>
                                        <Tiptap
                                            value={section.description}
                                            onChange={(content) => handleSectionChange(index, "description", content)}
                                            onImageUpload={handleCloudinaryUpload}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input placeholder="YOUTUBE THUMBNAIL URL" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={section.youtubeThumbnail} onChange={(e) => handleSectionChange(index, "youtubeThumbnail", e.target.value)} />
                                        <input placeholder="YOUTUBE VIDEO LINK" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={section.youtubeLink} onChange={(e) => handleSectionChange(index, "youtubeLink", e.target.value)} />
                                        <input placeholder="MEGA DOWNLOAD LINK" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={section.megaLink} onChange={(e) => handleSectionChange(index, "megaLink", e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- FAQ SECTION --- */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">Support FAQs</h2>
                            <button type="button" onClick={addFaq} className="flex items-center gap-2 bg-white/5 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black border border-white/10 hover:border-white transition-all">
                                <Plus size={14} /> Add FAQ
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-[#0D1117] p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            placeholder="QUESTION"
                                            className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs font-bold focus:border-cyan-500/50 outline-none"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                        />
                                        <textarea
                                            placeholder="ANSWER"
                                            className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs text-slate-400 focus:border-cyan-500/50 outline-none h-20"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={() => removeFaq(index)} className="p-2 text-slate-700 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- SUBMIT --- */}
                    <button
                        disabled={loading}
                        className="w-full bg-cyan-500 text-black font-black py-6 rounded-2xl uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Deploy Course to System</>}
                    </button>
                </form>
            </div>
        </div>
    );
}