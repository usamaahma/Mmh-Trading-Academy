"use client";
import React, { useState, useRef } from "react";
import { Plus, Trash2, Save, Loader2, ArrowLeft, ListPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CldUploadWidget } from "next-cloudinary";

// Tiptap SSR Fix with better loading state
const Tiptap = dynamic(() => import("@/components/Tiptap"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
  ),
});

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Editor Refs to handle direct image injection
  const editorRefs = useRef([]);

  const [courseName, setCourseName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [sections, setSections] = useState([
    {
      heading: "",
      subheadings: [], // New Field Added
      description: "",
      youtubeThumbnail: "",
      youtubeLink: "",
      megaLink: "",
    },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // --- Handlers for Sections ---
  const handleSectionChange = (index, field, value) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[index] = { ...newSections[index], [field]: value };
      return newSections;
    });
  };

  const addSection = () =>
    setSections([
      ...sections,
      {
        heading: "",
        subheadings: [],
        description: "",
        youtubeThumbnail: "",
        youtubeLink: "",
        megaLink: "",
      },
    ]);

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
    editorRefs.current.splice(index, 1);
  };

  // --- Handlers for Subheadings (NEW) ---
  const addSubheading = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].subheadings.push({ title: "" });
    setSections(newSections);
  };

  const handleSubheadingChange = (sectionIndex, subIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].subheadings[subIndex].title = value;
    setSections(newSections);
  };

  const removeSubheading = (sectionIndex, subIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].subheadings = newSections[
      sectionIndex
    ].subheadings.filter((_, i) => i !== subIndex);
    setSections(newSections);
  };

  // --- Handlers for FAQs ---
  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) => {
      const newFaqs = [...prev];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return newFaqs;
    });
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const courseData = { courseName, shortDescription, sections, faqs };

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
        alert(`Error: ${errData.message || "Failed to save"}`);
      }
    } catch (err) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010409] text-white pt-28 pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-slate-500 hover:text-cyan-500 mb-8 text-xs font-black uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} /> Back to Terminal
        </Link>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* CORE CONFIG */}
          <section className="bg-[#0D1117] p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">
              Core Configuration
            </h2>
            <div className="grid gap-4">
              <input
                required
                className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 font-bold text-sm"
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

          {/* CONTENT SECTIONS */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">
                Course Modules
              </h2>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg text-[10px] font-black border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all"
              >
                <Plus size={14} /> Add Module
              </button>
            </div>

            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-[#0D1117] p-6 md:p-8 rounded-[2rem] border border-white/5 relative space-y-6"
              >
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="absolute top-6 right-6 text-slate-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                {/* Section Heading */}
                <input
                  placeholder="SECTION HEADING (e.g. Phase 1: Psychology)"
                  className="bg-black/20 border border-white/5 p-4 rounded-xl w-full text-sm font-bold outline-none focus:border-cyan-500/50"
                  value={section.heading}
                  onChange={(e) =>
                    handleSectionChange(index, "heading", e.target.value)
                  }
                />

                {/* SUBHEADINGS SECTION (NEW UI) */}
                <div className="pl-4 border-l-2 border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-500 uppercase italic">
                      Module Sub-topics
                    </label>
                    <button
                      type="button"
                      onClick={() => addSubheading(index)}
                      className="flex items-center gap-1 text-cyan-500 text-[10px] font-bold hover:text-cyan-400 transition-colors"
                    >
                      <Plus size={12} /> Add Subheading
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {section.subheadings.map((sub, subIdx) => (
                      <div key={subIdx} className="flex gap-2">
                        <input
                          className="flex-1 bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-cyan-500/30"
                          placeholder="Subheading Title"
                          value={sub.title}
                          onChange={(e) =>
                            handleSubheadingChange(
                              index,
                              subIdx,
                              e.target.value,
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeSubheading(index, subIdx)}
                          className="p-2 text-slate-700 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIPTAP EDITOR */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">
                    Syllabus Details (Rich Text)
                  </label>
                  <CldUploadWidget
                    uploadPreset="mmhtrading"
                    onSuccess={(result) => {
                      const url = result.info.secure_url;
                      if (editorRefs.current[index]) {
                        editorRefs.current[index].insertImage(url);
                      }
                    }}
                  >
                    {({ open }) => (
                      <Tiptap
                        ref={(el) => (editorRefs.current[index] = el)}
                        value={section.description}
                        onChange={(content) =>
                          handleSectionChange(index, "description", content)
                        }
                        onImageUploadClick={() => open()}
                      />
                    )}
                  </CldUploadWidget>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    placeholder="THUMBNAIL URL"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs"
                    value={section.youtubeThumbnail}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        "youtubeThumbnail",
                        e.target.value,
                      )
                    }
                  />
                  <input
                    placeholder="VIDEO LINK"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs"
                    value={section.youtubeLink}
                    onChange={(e) =>
                      handleSectionChange(index, "youtubeLink", e.target.value)
                    }
                  />
                  <input
                    placeholder="DOWNLOAD LINK"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs"
                    value={section.megaLink}
                    onChange={(e) =>
                      handleSectionChange(index, "megaLink", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* FAQ SECTION */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase italic tracking-tighter text-cyan-500">
                Support FAQs
              </h2>
              <button
                type="button"
                onClick={addFaq}
                className="flex items-center gap-2 bg-white/5 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black border border-white/10 hover:border-white transition-all"
              >
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#0D1117] p-6 rounded-2xl border border-white/5 flex gap-4 items-start shadow-lg"
                >
                  <div className="flex-1 space-y-3">
                    <input
                      placeholder="QUESTION"
                      className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs font-bold focus:border-cyan-500/50 outline-none"
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="ANSWER"
                      className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs text-slate-400 focus:border-cyan-500/50 outline-none h-20"
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="p-2 text-slate-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-cyan-500 text-black font-black py-6 rounded-2xl uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Save size={18} /> Deploy Course to System
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
