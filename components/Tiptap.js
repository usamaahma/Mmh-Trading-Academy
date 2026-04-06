"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "./toolbar"; // Check karein aapka file name 'toolbar' hai ya 'TiptapToolbar'
import { useEffect, forwardRef, useImperativeHandle } from "react";

const Tiptap = forwardRef(({ value, onChange, onImageUploadClick }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      // FIX 1: Image extension ko thoda base64 support aur relaxed banaya
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class:
            "rounded-2xl border border-white/10 my-6 max-w-full shadow-2xl block mx-auto",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none bg-black/40 border-x border-b border-white/10 p-8 rounded-b-2xl min-h-[400px] outline-none focus:border-cyan-500/20 transition-all text-sm leading-relaxed custom-editor",
      },
    },
  });

  // FIX 2: insertImage ko chain process ke saath robust banaya
  useImperativeHandle(ref, () => ({
    insertImage: (url) => {
      if (editor) {
        // Focus kar ke image insert karna zaroori hai
        editor.chain().focus().setImage({ src: url }).run();

        // Forcefully update state taake save ho jaye
        const newHtml = editor.getHTML();
        onChange(newHtml);
      }
    },
  }));

  useEffect(() => {
    // FIX 3: Strict check taake typing ke waqt content reset na ho
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      // Small timeout taake hydration ke baad update ho
      setTimeout(() => {
        editor.commands.setContent(value, false);
      }, 10);
    }
  }, [value, editor]);

  return (
    <div className="w-full shadow-2xl overflow-hidden rounded-2xl border border-white/5">
      {/* Ensure editor exist karta ho toolbar dikhane se pehle */}
      {editor && <Toolbar editor={editor} onImageClick={onImageUploadClick} />}
      <EditorContent editor={editor} />
    </div>
  );
});

Tiptap.displayName = "Tiptap";
export default Tiptap;
