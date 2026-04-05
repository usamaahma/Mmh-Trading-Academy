"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, BookOpen, ExternalLink, RefreshCw, Pencil } from "lucide-react";
import Link from "next/link";

export default function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/course");
            const json = await res.json();
            if (json.success) setCourses(json.data);
        } catch (err) {
            console.error("DB Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const deleteCourse = async (id) => {
        if (!confirm("Are you sure? Yeh course database se hamesha ke liye delete ho jayega!")) return;
        try {
            const res = await fetch(`/api/course/${id}`, { method: "DELETE" });
            if (res.ok) setCourses(courses.filter(c => c._id !== id));
        } catch (err) {
            alert("Delete failed!");
        }
    };

    return (
        <div className="space-y-8 bg-[#010409] p-8 min-h-screen text-white font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                        Course <span className="text-cyan-500">Inventory</span>
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-3 font-bold flex items-center gap-2">
                        <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
                        Mainframe Status: {courses.length} Active Modules
                    </p>
                </div>

                <Link href="/admin/courses/new" className="bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center gap-3">
                    <Plus size={16} strokeWidth={3} /> Initialize New Module
                </Link>
            </div>

            {loading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-cyan-500" size={40} />
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest text-black">Accessing Secure Database...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-[#0D1117] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-cyan-500/40 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform text-black">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-black uppercase text-base tracking-tight group-hover:text-cyan-400 transition-colors">
                                        {course.courseName}
                                    </h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                                            {course.sections?.length || 0} Sections
                                        </span>
                                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                                            {course.faqs?.length || 0} FAQs
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/courses/edit/${course._id}`} className="p-4 text-slate-400 hover:text-cyan-400 bg-white/5 rounded-xl hover:bg-cyan-500/10 transition-colors">
                                    <Pencil size={18} />
                                </Link>
                                <Link href={`/courses/${course._id}`} className="p-4 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-colors">
                                    <ExternalLink size={18} />
                                </Link>
                                <button onClick={() => deleteCourse(course._id)} className="p-4 text-slate-500 hover:text-red-500 bg-red-500/5 rounded-xl transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}