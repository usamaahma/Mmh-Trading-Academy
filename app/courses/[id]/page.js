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
        if (json.success) {
          setCourse(json.data);
        } else {
          console.error("Course not found");
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
      <div className="text-white p-10 md:p-20 text-center font-bold uppercase tracking-widest bg-[#010409] min-h-screen flex items-center justify-center">
        COURSE NOT FOUND
      </div>
    );

  return (
    <div className="min-h-screen bg-[#010409] text-white pt-16 md:pt-24 pb-10 md:pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-8 md:mt-10 mt-15"
        >
          <ArrowLeft size={14} /> Back to Courses
        </Link>

        {/* COURSE HEADER */}
        <header className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 md:mb-6 text-white leading-[0.9] break-words">
            {course.courseName}
          </h1>
          <div
            className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] border-l-2 border-cyan-500 pl-4 md:pl-6 py-1 max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: course.shortDescription }}
          />
        </header>

        {/* 1. SYLLABUS OVERVIEW (Responsive Grid) */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-6 flex items-center gap-2">
            <span className="w-6 md:w-8 h-[1px] bg-slate-800"></span> Syllabus Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {course.sections?.map((section, idx) => (
              <button
                key={idx}
                onClick={() =>
                  document
                    .getElementById(`section-${idx}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#0D1117] border border-white/5 p-5 md:p-6 rounded-xl md:rounded-2xl hover:border-cyan-500/40 transition-all text-left group shadow-xl flex flex-col h-full active:scale-[0.98]"
              >
                <span className="text-cyan-500 font-black text-[8px] md:text-[9px] block mb-2 tracking-widest">
                  MOD-0{idx + 1}
                </span>
                <span className="text-[11px] md:text-xs font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {section.heading}
                </span>

                {section.subheadings && section.subheadings.length > 0 && (
                  <div className="space-y-2 border-t border-white/5 pt-4 mt-auto">
                    {section.subheadings.slice(0, 3).map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-2 text-[8px] text-slate-500 font-bold uppercase tracking-tighter"
                      >
                        <ChevronRight size={10} className="text-cyan-500/50 mt-0.5 shrink-0" />
                        <span className="truncate group-hover:text-slate-300 transition-colors">
                          {sub.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. DETAILED SECTIONS FLOW */}
        <div className="space-y-20 md:space-y-32 mb-20 md:mb-40">
          {course.sections?.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx}`}
              className="scroll-mt-24 group relative"
            >
              {/* Decorative side line for mobile vs desktop */}
              <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-cyan-500/50 to-transparent opacity-30 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />

              <div className="mb-6 md:mb-8">
                <span className="text-cyan-500 font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase block mb-2">
                  Module 0{idx + 1}
                </span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase text-white tracking-tighter leading-tight">
                  {section.heading}
                </h2>
              </div>

              {/* DYNAMIC SUBHEADING BADGES */}
              {section.subheadings && section.subheadings.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {section.subheadings.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[8px] md:text-[9px] font-black text-slate-400 border border-white/10 px-2.5 py-1 rounded-lg uppercase tracking-wider bg-white/[0.02]"
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>
              )}

              {/* CONTENT AREA (Responsive Text & Elements) */}
              <div
                className="text-white text-[14px] md:text-[15px] leading-relaxed mb-8 md:mb-10 break-words
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:marker:text-cyan-500
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_ol]:marker:text-cyan-500
                  [&_li]:mb-2 [&_li]:text-white
                  [&_p]:text-white [&_p]:mb-4
                  [&_strong]:text-cyan-500 [&_strong]:font-black
                  [&_h1]:text-xl md:[&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-cyan-500 [&_h1]:mb-4 [&_h1]:uppercase
                  [&_img]:rounded-xl md:[&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:max-w-full [&_img]:h-auto"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />

              {/* Action Buttons (Flex-Col on Mobile) */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {section.youtubeLink && (
                  <a
                    href={section.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0D1117] border border-white/10 px-5 py-3.5 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-all group/btn w-full sm:w-auto"
                  >
                    <div className="bg-red-500 p-2 rounded-lg text-white group-hover/btn:scale-110 transition-all">
                      <Play size={14} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.1em] text-white leading-none mb-1">
                        Watch Video
                      </p>
                      <p className="text-[7px] font-bold text-slate-600 uppercase">
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
                    className="flex items-center gap-4 bg-[#0D1117] border border-white/10 px-5 py-3.5 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all group/btn w-full sm:w-auto"
                  >
                    <div className="bg-cyan-500 p-2 rounded-lg text-black group-hover/btn:scale-110 transition-all">
                      <LinkIcon size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.1em] text-white leading-none mb-1">
                        Get Resources
                      </p>
                      <p className="text-[7px] font-bold text-slate-600 uppercase">
                        Mega Storage
                      </p>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-16 md:mt-24 border-b border-white/5 w-full" />
            </section>
          ))}
        </div>

        {/* 3. FAQs SECTION */}
        {course.faqs && course.faqs.length > 0 && (
          <div className="border-t border-white/10 pt-16 md:pt-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-cyan-500/10 p-2.5 md:p-3 rounded-xl md:rounded-2xl text-cyan-500">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white leading-none mb-1">
                  Support Protocol
                </h3>
                <p className="text-[8px] md:text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  Frequently Asked Questions
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:gap-6">
              {course.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group bg-[#0D1117]/40 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 hover:border-cyan-500/20 transition-all shadow-lg"
                >
                  <h4 className="font-black text-[10px] md:text-xs text-white mb-3 uppercase tracking-tight italic flex gap-2">
                    <span className="text-cyan-500 not-italic">Q.</span>{" "}
                    {faq.question}
                  </h4>
                  <div
                    className="text-white text-[9px] md:text-[11px] leading-relaxed font-medium pl-4 border-l border-white/10 group-hover:border-cyan-500 transition-colors
                    [&_p]:mb-2 [&_strong]:text-cyan-500 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:marker:text-cyan-500"
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