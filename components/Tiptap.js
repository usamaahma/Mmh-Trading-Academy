"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, ImageIcon, Heading1, Heading2, Quote, Code } from "lucide-react";
import { useEffect } from "react";

const Tiptap = ({ value, onChange, onImageUpload }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto border border-slate-200 my-4',
                },
            }),
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        immediatelyRender: false, // <--- YE LINE ERROR KHATAM KAREGI
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none min-h-[250px] p-5 text-slate-900",
            },
        },
    });

    // Sync content if changed from outside
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    // Agar editor ready nahi hai to kuch render mat karo (Hydration fix)
    if (!editor) {
        return <div className="min-h-[250px] bg-white rounded-2xl animate-pulse" />;
    }

    const addImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const url = await onImageUpload(file);
                if (url) editor.chain().focus().setImage({ src: url }).run();
            }
        };
        input.click();
    };

    return (
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white shadow-xl">
            <div className="bg-slate-50 p-2 flex gap-1 border-b border-slate-200 flex-wrap sticky top-0 z-10">
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={16} /></MenuButton>
                <div className="w-[1px] h-6 bg-slate-300 mx-1 self-center" />
                <button type="button" onClick={addImage} className="p-2 rounded hover:bg-cyan-100 text-cyan-600 transition-colors"><ImageIcon size={18} /></button>
            </div>

            <div className="bg-white max-h-[500px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

const MenuButton = ({ onClick, active, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-2 rounded transition-all ${active ? "bg-cyan-500 text-white" : "text-slate-600 hover:bg-slate-200"}`}
    >
        {children}
    </button>
);

export default Tiptap;