"use client";
import React from 'react';
import { 
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo, 
  Code, Image as ImageIcon, Type, AlignLeft, AlignCenter, 
  AlignRight, Heading1, Heading2, Heading3, Strikethrough 
} from "lucide-react";

const Toolbar = ({ editor, onImageClick }) => {
  if (!editor) return null;

  return (
    <div className="border border-white/10 bg-[#161B22] p-2 rounded-t-2xl flex flex-wrap gap-1 items-center sticky top-0 z-10">
      {/* Headings */}
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
        className={`p-2 rounded-lg ${editor.isActive('heading', { level: 1 }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Heading1 size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        className={`p-2 rounded-lg ${editor.isActive('heading', { level: 2 }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Heading2 size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
        className={`p-2 rounded-lg ${editor.isActive('heading', { level: 3 }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Heading3 size={18} />
      </button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* Basic Formatting */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} 
        className={`p-2 rounded-lg ${editor.isActive('bold') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Bold size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} 
        className={`p-2 rounded-lg ${editor.isActive('italic') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Italic size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} 
        className={`p-2 rounded-lg ${editor.isActive('strike') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Strikethrough size={18} />
      </button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* Alignment */}
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} 
        className={`p-2 rounded-lg ${editor.isActive({ textAlign: 'left' }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <AlignLeft size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} 
        className={`p-2 rounded-lg ${editor.isActive({ textAlign: 'center' }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <AlignCenter size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} 
        className={`p-2 rounded-lg ${editor.isActive({ textAlign: 'right' }) ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <AlignRight size={18} />
      </button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* Lists & Others */}
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} 
        className={`p-2 rounded-lg ${editor.isActive('bulletList') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <List size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        className={`p-2 rounded-lg ${editor.isActive('orderedList') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <ListOrdered size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} 
        className={`p-2 rounded-lg ${editor.isActive('blockquote') ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-white/10'}`}>
        <Quote size={18} />
      </button>

      <button type="button" onClick={onImageClick} className="p-2 rounded-lg text-cyan-500 hover:bg-cyan-500/10">
        <ImageIcon size={18} />
      </button>

      <div className="flex gap-1 ml-auto">
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 text-slate-500 hover:text-white"><Undo size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 text-slate-500 hover:text-white"><Redo size={18} /></button>
      </div>
    </div>
  );
};

export default Toolbar;