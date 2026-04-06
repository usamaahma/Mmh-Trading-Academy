"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Play,
  MessageCircle,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/course/${id}`);
      const json = await res.json();
      
      // YE LINE ADD KAREIN CONSOLE CHECK KE LIYE
      console.log("FULL API RESPONSE:", json);

      if (json.success) {
        setCourse(json.data);
        
        // SPECIFICALLY SUBHEADINGS CHECK KARNE KE LIYE
        json.data.sections.forEach((sec, i) => {
          console.log(`Module ${i+1} Subheadings:`, sec.subheadings);
        });

      } else {
        console.error("Course not found in database");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchCourse();
}, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#010409] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={32} />
      </div>
    );

  if (!course)
    return (
      <div className="text-white p-20 text-center font-bold uppercase tracking-widest">
        COURSE NOT FOUND
      </div>
    );

  return (
    <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-6 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Courses
        </Link>

        {/* COURSE HEADER */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
            {course.courseName}
          </h1>
          <div
            className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border-l-2 border-cyan-500 pl-6 py-1 prose prose-invert max-w-2xl"
            dangerouslySetInnerHTML={{ __html: course.shortDescription }}
          />
        </header>

        {/* 1. TABLE OF CONTENTS (TOC) CARDS */}
        <div className="mb-24">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-800"></span> Syllabus Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.sections?.map((section, idx) => (
              <button
                key={idx}
                onClick={() =>
                  document
                    .getElementById(`section-${idx}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#0D1117] border border-white/5 p-6 rounded-2xl hover:border-cyan-500/40 transition-all text-left group shadow-xl flex flex-col h-full active:scale-[0.98]"
              >
                <span className="text-cyan-500 font-black text-[9px] block mb-2 tracking-widest">
                  MOD-0{idx + 1}
                </span>
                <span className="text-xs font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                  {section.heading}
                </span>

                {/* SUBHEADINGS MINI LIST - FIXED LOGIC */}
                {section.subheadings && section.subheadings.length > 0 ? (
                  <div className="space-y-2 border-t border-white/5 pt-4 mt-auto">
                    {section.subheadings.slice(0, 4).map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-[8px] text-slate-500 font-bold uppercase tracking-tighter"
                      >
                        <ChevronRight size={10} className="text-cyan-500/50" />
                        <span className="truncate group-hover:text-slate-300 transition-colors">
                          {sub.title}
                        </span>
                      </div>
                    ))}
                    {section.subheadings.length > 4 && (
                      <span className="text-[8px] text-cyan-500/50 font-black italic mt-1 block">
                        + MORE TOPICS
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <span className="text-[8px] text-slate-700 font-bold uppercase italic">
                      No sub-topics listed
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. DETAILED SECTIONS FLOW */}
        <div className="space-y-32 mb-40">
          {course.sections?.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx}`}
              className="scroll-mt-24 group relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="mb-8">
                <span className="text-cyan-500 font-black text-[10px] tracking-[0.3em] uppercase block mb-2">
                  Module 0{idx + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white tracking-tighter">
                  {section.heading}
                </h2>
              </div>

              {/* DYNAMIC SUBHEADING BADGES */}
              {section.subheadings && section.subheadings.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {section.subheadings.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-black text-slate-400 border border-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider bg-white/[0.02]"
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="text-slate-400 text-[11px] md:text-sm leading-relaxed mb-10 uppercase font-medium tracking-wide prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />

              <div className="flex flex-wrap gap-4">
                {section.youtubeLink && (
                  <a
                    href={section.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0D1117] border border-white/10 px-6 py-4 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-all shadow-2xl group/btn"
                  >
                    <div className="bg-red-500 p-2.5 rounded-xl text-white group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all">
                      <Play size={16} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-none mb-1">
                        Watch Video
                      </p>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
                        HD Stream Server
                      </p>
                    </div>
                  </a>
                )}

                {section.megaLink && (
                  <a
                    href={section.megaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0D1117] border border-white/10 px-6 py-4 rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all shadow-2xl group/btn"
                  >
                    <div className="bg-cyan-500 p-2.5 rounded-xl text-black group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-all">
                      <LinkIcon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-none mb-1">
                        Get Resources
                      </p>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
                        Mega Cloud Storage
                      </p>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-24 border-b border-white/5 w-full" />
            </section>
          ))}
        </div>

        {/* 3. FAQs */}
        {course.faqs && course.faqs.length > 0 && (
          <div className="border-t border-white/10 pt-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-cyan-500/10 p-3 rounded-2xl text-cyan-500">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white leading-none mb-1">
                  Support Protocol
                </h3>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
                  Frequently Asked Questions
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {course.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group bg-[#0D1117]/40 p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500/20 transition-all shadow-lg"
                >
                  <h4 className="font-black text-[11px] md:text-xs text-white mb-4 uppercase tracking-tight italic flex gap-3">
                    <span className="text-cyan-500 not-italic">Q.</span>{" "}
                    {faq.question}
                  </h4>
                  <div
                    className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed font-medium uppercase tracking-wider pl-6 border-l border-white/10 group-hover:border-cyan-500 transition-colors"
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
