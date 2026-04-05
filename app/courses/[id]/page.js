"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, ArrowLeft, Play, MessageCircle, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/course`);
                const json = await res.json();
                if (json.success) {
                    const found = json.data.find(c => c._id === id);
                    setCourse(found);
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#010409] flex items-center justify-center">
            <Loader2 className="animate-spin text-cyan-500" size={32} />
        </div>
    );

    if (!course) return <div className="text-white p-20 text-center font-bold">COURSE NOT FOUND</div>;

    return (
        <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                {/* BACK BUTTON */}
                <Link href="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-6 text-[10px] font-black uppercase tracking-widest">
                    <ArrowLeft size={14} /> Back
                </Link>

                {/* COURSE HEADER */}
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
                    {course.courseName}
                </h1>

                {/* SHORT DESCRIPTION (HTML Handled) */}
                <div
                    className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-12 border-l border-cyan-500 pl-4 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: course.shortDescription }}
                />

                {/* 1. CUTE TABLE OF CONTENTS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
                    {course.sections.map((section, idx) => (
                        <button
                            key={idx}
                            onClick={() => document.getElementById(`section-${idx}`).scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#0D1117] border border-white/5 p-4 rounded-xl hover:border-cyan-500/50 transition-all text-left group shadow-lg"
                        >
                            <span className="text-cyan-500 font-black text-[9px] block mb-1">MODULE 0{idx + 1}</span>
                            <span className="text-[10px] font-bold text-slate-300 group-hover:text-white uppercase truncate block italic tracking-tighter">
                                {section.heading}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 2. SECTIONS FLOW */}
                <div className="space-y-24 mb-32">
                    {course.sections.map((section, idx) => (
                        <div key={idx} id={`section-${idx}`} className="scroll-mt-24 group">
                            <h2 className="text-xl font-black italic uppercase mb-3 text-white flex items-center gap-3">
                                <span className="text-cyan-500 text-xs">/</span> {section.heading}
                            </h2>

                            {/* SECTION DESCRIPTION (HTML Handled to remove <p>123</p> issue) */}
                            <div
                                className="text-slate-500 text-[11px] font-medium leading-relaxed mb-8 uppercase tracking-wider prose-sm prose-invert"
                                dangerouslySetInnerHTML={{ __html: section.description }}
                            />

                            <div className="flex flex-wrap gap-4">
                                {/* COMPACT YOUTUBE CARD */}
                                {section.youtubeLink && (
                                    <a
                                        href={section.youtubeLink}
                                        target="_blank"
                                        className="flex items-center gap-3 bg-[#0D1117] border border-white/10 px-5 py-3 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-all shadow-xl group/btn"
                                    >
                                        <div className="bg-red-500 p-2 rounded-lg text-white group-hover/btn:scale-110 transition-transform">
                                            <Play size={14} fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Watch Module</p>
                                            <p className="text-[8px] font-bold text-slate-600 uppercase">YouTube Player</p>
                                        </div>
                                    </a>
                                )}

                                {/* COMPACT MEGA CARD */}
                                {section.megaLink && (
                                    <a
                                        href={section.megaLink}
                                        target="_blank"
                                        className="flex items-center gap-3 bg-[#0D1117] border border-white/10 px-5 py-3 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all shadow-xl group/btn"
                                    >
                                        <div className="bg-cyan-500 p-2 rounded-lg text-black group-hover/btn:scale-110 transition-transform">
                                            <LinkIcon size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Resources</p>
                                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Mega Cloud</p>
                                        </div>
                                    </a>
                                )}
                            </div>

                            <div className="mt-20 border-b border-white/5 w-full opacity-50" />
                        </div>
                    ))}
                </div>

                {/* 3. CLEAN FAQs SECTION */}
                {course.faqs && course.faqs.length > 0 && (
                    <div className="border-t border-white/10 pt-16">
                        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-cyan-500 mb-10 flex items-center gap-3">
                            <MessageCircle size={16} /> FAQ Protocol
                        </h3>
                        <div className="space-y-8">
                            {course.faqs.map((faq, i) => (
                                <div key={i} className="group bg-[#0D1117]/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all">
                                    <h4 className="font-black text-xs text-white mb-3 uppercase tracking-tight italic flex gap-3">
                                        <span className="text-cyan-500">Q.</span> {faq.question}
                                    </h4>
                                    <div
                                        className="text-slate-500 text-[11px] leading-relaxed font-medium uppercase tracking-wider pl-6 border-l border-white/10 group-hover:border-cyan-500 transition-colors"
                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}