"use client";
import React, { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Tiptap = dynamic(() => import("@/components/Tiptap"), { 
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
});

export default function EditCoursePage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [courseName, setCourseName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [sections, setSections] = useState([]);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/course/${id}`);
                const json = await res.json();
                if (json.success) {
                    setCourseName(json.data.courseName);
                    setShortDescription(json.data.shortDescription);
                    setSections(json.data.sections || []);
                    setFaqs(json.data.faqs || []);
                }
            } catch (err) {
                alert("Could not load course data");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleCloudinaryUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "YOUR_PRESET");
        const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload", { method: "POST", body: formData });
        const data = await res.json();
        return data.secure_url;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch(`/api/course/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseName, shortDescription, sections, faqs }),
            });
            if (res.ok) {
                alert("Update Successful!");
                router.push("/admin/course");
            }
        } catch (err) {
            alert("Update failed!");
        } finally {
            setUpdating(false);
        }
    };

    // Helper functions for dynamic fields
    const handleSectionChange = (i, f, v) => { const n = [...sections]; n[i][f] = v; setSections(n); };
    const addSection = () => setSections([...sections, { heading: "", description: "", youtubeThumbnail: "", youtubeLink: "", megaLink: "" }]);
    const removeSection = (i) => setSections(sections.filter((_, idx) => idx !== i));

    const handleFaqChange = (i, f, v) => { const n = [...faqs]; n[i][f] = v; setFaqs(n); };
    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (i) => setFaqs(faqs.filter((_, idx) => idx !== i));

    if (loading) return <div className="min-h-screen bg-[#010409] flex items-center justify-center"><Loader2 className="animate-spin text-cyan-500" size={50} /></div>;

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/course" className="flex items-center gap-2 text-slate-500 mb-8 text-xs font-black uppercase tracking-widest"><ArrowLeft size={14} /> Cancel Edit</Link>

                <form onSubmit={handleUpdate} className="space-y-12">
                    {/* Core Config */}
                    <section className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 space-y-6">
                        <h2 className="text-xl font-black uppercase italic text-cyan-500">Core Configuration</h2>
                        <input required className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 font-bold" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="COURSE NAME" />
                        <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm h-24" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="SHORT DESCRIPTION" />
                    </section>

                    {/* Sections */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center"><h2 className="text-xl font-black uppercase italic text-cyan-500">Sections</h2><button type="button" onClick={addSection} className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg text-[10px] font-black border border-cyan-500/20 hover:bg-cyan-500 transition-all"><Plus size={14} /></button></div>
                        {sections.map((s, i) => (
                            <div key={i} className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 relative space-y-6">
                                <button type="button" onClick={() => removeSection(i)} className="absolute top-6 right-6 text-slate-600 hover:text-red-500"><Trash2 size={18} /></button>
                                <input placeholder="SECTION HEADING" className="bg-black/20 border border-white/5 p-4 rounded-xl w-full font-bold outline-none" value={s.heading} onChange={(e) => handleSectionChange(i, "heading", e.target.value)} />
                                <Tiptap value={s.description} onChange={(c) => handleSectionChange(i, "description", c)} onImageUpload={handleCloudinaryUpload} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input placeholder="THUMBNAIL URL" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={s.youtubeThumbnail} onChange={(e) => handleSectionChange(i, "youtubeThumbnail", e.target.value)} />
                                    <input placeholder="YOUTUBE LINK" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={s.youtubeLink} onChange={(e) => handleSectionChange(i, "youtubeLink", e.target.value)} />
                                    <input placeholder="MEGA LINK" className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs" value={s.megaLink} onChange={(e) => handleSectionChange(i, "megaLink", e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQs */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center"><h2 className="text-xl font-black uppercase italic text-cyan-500">FAQs</h2><button type="button" onClick={addFaq} className="bg-white/5 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black border border-white/10 hover:border-white transition-all"><Plus size={14} /></button></div>
                        {faqs.map((f, i) => (
                            <div key={i} className="bg-[#0D1117] p-6 rounded-2xl border border-white/5 flex gap-4">
                                <div className="flex-1 space-y-3">
                                    <input placeholder="QUESTION" className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs font-bold outline-none" value={f.question} onChange={(e) => handleFaqChange(i, "question", e.target.value)} />
                                    <textarea placeholder="ANSWER" className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs text-slate-400 outline-none h-20" value={f.answer} onChange={(e) => handleFaqChange(i, "answer", e.target.value)} />
                                </div>
                                <button type="button" onClick={() => removeFaq(i)} className="p-2 text-slate-700 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>

                    <button disabled={updating} className="w-full bg-cyan-500 text-black font-black py-6 rounded-2xl uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-3">
                        {updating ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Data</>}
                    </button>
                </form>
            </div>
        </div>
    );
}