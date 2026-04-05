"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, BookOpen, Clock, ChevronRight, Loader2, Search } from "lucide-react";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("/api/course");
                const json = await res.json();
                if (json.success) setCourses(json.data);
            } catch (err) {
                console.error("Courses loading error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = Array.isArray(courses) ? courses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (loading) return (
        <div className="min-h-screen bg-[#010409] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-cyan-500 mb-4" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Accessing Database...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-cyan-500 uppercase tracking-[0.4em] text-[9px] font-black">
                            <div className="h-px w-6 bg-cyan-500" />
                            Learning Terminal
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                            The MMH <span className="text-cyan-500">Academy</span>
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Search Mentorship..."
                            className="w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-xl outline-none focus:border-cyan-500/50 transition-all font-bold text-[10px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Courses Grid - Changed to 4 columns on large screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <Link
                            href={`/courses/${course._id}`}
                            key={course._id}
                            className="group relative bg-[#0D1117] border border-white/5 rounded-[1.5rem] p-5 hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
                        >
                            {/* Background Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-all" />

                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                                        <BookOpen size={18} />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-600 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                        {course.sections?.length || 0} Lessons
                                    </span>
                                </div>

                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {course.courseName}
                                </h2>

                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider line-clamp-2">
                                    {course.sections && course.sections[0]?.shortDescription
                                        ? course.sections[0].shortDescription
                                        : "Advanced market analysis mentorship for professional traders."}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    <Clock size={12} className="text-cyan-500" />
                                    Self-Paced
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-black text-cyan-500 uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform">
                                    Access <ChevronRight size={12} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[2rem]">
                        <p className="text-slate-700 font-black uppercase tracking-[0.4em] text-xs italic">NO COURSES FOUND IN TERMINAL</p>
                    </div>
                )}
            </div>
        </div>
    );
}