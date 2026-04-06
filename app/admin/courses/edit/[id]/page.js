"use client";
import React, { useState, useEffect, useRef } from "react";
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { CldUploadWidget } from "next-cloudinary";

// Tiptap SSR Fix
const Tiptap = dynamic(() => import("@/components/Tiptap"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
  ),
});

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Editor Refs to handle direct image injection
  const editorRefs = useRef([]);

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

          // Ensure subheadings exist for each section even if old data doesn't have them
          const sanitizedSections = (json.data.sections || []).map((sec) => ({
            ...sec,
            subheadings: sec.subheadings || [],
          }));

          setSections(sanitizedSections);
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
        router.push("/admin");
      }
    } catch (err) {
      alert("Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  // --- Handlers for Sections ---
  const handleSectionChange = (i, f, v) => {
    const n = [...sections];
    n[i] = { ...n[i], [f]: v };
    setSections(n);
  };

  const addSection = () =>
    setSections([
      ...sections,
      {
        heading: "",
        subheadings: [], // New
        description: "",
        youtubeThumbnail: "",
        youtubeLink: "",
        megaLink: "",
      },
    ]);

  const removeSection = (i) => {
    setSections(sections.filter((_, idx) => idx !== i));
    editorRefs.current.splice(i, 1);
  };

  // --- Handlers for Subheadings (NEW) ---
  const addSubheading = (sectionIndex) => {
    const newSections = [...sections];
    if (!newSections[sectionIndex].subheadings) {
      newSections[sectionIndex].subheadings = [];
    }
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
  const handleFaqChange = (i, f, v) => {
    const n = [...faqs];
    n[i] = { ...n[i], [f]: v };
    setFaqs(n);
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (i) => setFaqs(faqs.filter((_, idx) => idx !== i));

  if (loading)
    return (
      <div className="min-h-screen bg-[#010409] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={50} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#010409] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-slate-500 mb-8 text-xs font-black uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} /> Cancel Edit
        </Link>

        <form onSubmit={handleUpdate} className="space-y-12">
          {/* Core Config */}
          <section className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-2xl">
            <h2 className="text-xl font-black uppercase italic text-cyan-500 tracking-tighter">
              Core Configuration
            </h2>
            <input
              required
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 font-bold transition-all"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="COURSE NAME"
            />
            <textarea
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm h-24 outline-none focus:border-cyan-500 transition-all"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="SHORT DESCRIPTION"
            />
          </section>

          {/* Sections */}
          <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase italic text-cyan-500 tracking-tighter">
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

            {sections.map((s, i) => (
              <div
                key={i}
                className="bg-[#0D1117] p-8 rounded-[2rem] border border-white/5 relative space-y-6 shadow-xl"
              >
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="absolute top-8 right-8 text-slate-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>

                <input
                  placeholder="SECTION HEADING"
                  className="bg-black/20 border border-white/5 p-4 rounded-xl w-full font-bold outline-none focus:border-cyan-500/50"
                  value={s.heading}
                  onChange={(e) =>
                    handleSectionChange(i, "heading", e.target.value)
                  }
                />

                {/* SUBHEADINGS SECTION (SAME AS ADD PAGE) */}
                <div className="pl-4 border-l-2 border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-500 uppercase italic">
                      Module Sub-topics
                    </label>
                    <button
                      type="button"
                      onClick={() => addSubheading(i)}
                      className="flex items-center gap-1 text-cyan-500 text-[10px] font-bold hover:text-cyan-400 transition-colors"
                    >
                      <Plus size={12} /> Add Subheading
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {s.subheadings?.map((sub, subIdx) => (
                      <div key={subIdx} className="flex gap-2">
                        <input
                          className="flex-1 bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-cyan-500/30"
                          placeholder="Subheading Title"
                          value={sub.title}
                          onChange={(e) =>
                            handleSubheadingChange(i, subIdx, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeSubheading(i, subIdx)}
                          className="p-2 text-slate-700 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">
                    Syllabus Content
                  </label>
                  <CldUploadWidget
                    uploadPreset="mmhtrading"
                    onSuccess={(result) => {
                      const url = result.info.secure_url;
                      if (editorRefs.current[i]) {
                        editorRefs.current[i].insertImage(url);
                      }
                    }}
                  >
                    {({ open }) => (
                      <Tiptap
                        ref={(el) => (editorRefs.current[i] = el)}
                        value={s.description}
                        onChange={(c) =>
                          handleSectionChange(i, "description", c)
                        }
                        onImageUploadClick={() => open()}
                      />
                    )}
                  </CldUploadWidget>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    placeholder="THUMBNAIL URL"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-white/20"
                    value={s.youtubeThumbnail}
                    onChange={(e) =>
                      handleSectionChange(i, "youtubeThumbnail", e.target.value)
                    }
                  />
                  <input
                    placeholder="YOUTUBE LINK"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-white/20"
                    value={s.youtubeLink}
                    onChange={(e) =>
                      handleSectionChange(i, "youtubeLink", e.target.value)
                    }
                  />
                  <input
                    placeholder="MEGA LINK"
                    className="bg-black/20 border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-white/20"
                    value={s.megaLink}
                    onChange={(e) =>
                      handleSectionChange(i, "megaLink", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase italic text-cyan-500 tracking-tighter">
                Support FAQs
              </h2>
              <button
                type="button"
                onClick={addFaq}
                className="bg-white/5 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black border border-white/10 hover:border-white transition-all"
              >
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-[#0D1117] p-6 rounded-2xl border border-white/5 flex gap-4 shadow-lg"
              >
                <div className="flex-1 space-y-3">
                  <input
                    placeholder="QUESTION"
                    className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs font-bold outline-none focus:border-cyan-500/50"
                    value={f.question}
                    onChange={(e) =>
                      handleFaqChange(i, "question", e.target.value)
                    }
                  />
                  <textarea
                    placeholder="ANSWER"
                    className="w-full bg-black/20 border border-white/5 p-3 rounded-lg text-xs text-slate-400 outline-none h-20 focus:border-cyan-500/50"
                    value={f.answer}
                    onChange={(e) =>
                      handleFaqChange(i, "answer", e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="p-2 text-slate-700 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Update Button */}
          <button
            disabled={updating}
            className="w-full bg-cyan-500 text-black font-black py-6 rounded-2xl uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
          >
            {updating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Save size={18} /> Push Updates to Live System
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
