"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

interface TipTapEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function TipTapIntroEditor({
  content,
  onUpdate,
  placeholder = "Write a brief introduction...",
  minHeight = "120px",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: `prose prose-invert max-w-none min-h-[${minHeight}] p-4 focus:outline-none text-slate-200 placeholder:text-slate-500`,
        placeholder,
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition-colors focus-within:border-blue-500/50">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/5 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon="format_bold"
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon="format_italic"
          title="Italic"
        />
        <div className="mx-1 h-6 w-px bg-white/10"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon="format_list_bulleted"
          title="Bulleted List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon="format_list_numbered"
          title="Numbered List"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export function TipTapContentEditor({
  content,
  onUpdate,
  placeholder = "Start writing your blog content...",
  minHeight = "300px",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: `prose prose-invert max-w-none min-h-[${minHeight}] p-4 focus:outline-none text-slate-200 placeholder:text-slate-500`,
        placeholder,
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition-colors focus-within:border-blue-500/50">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/5 p-2">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          icon="format_h1"
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          icon="format_h2"
          title="Heading 2"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          icon="format_h3"
          title="Heading 3"
        />
        <div className="mx-1 h-6 w-px bg-white/10"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon="format_bold"
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon="format_italic"
          title="Italic"
        />
        <div className="mx-1 h-6 w-px bg-white/10"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          icon="format_align_left"
          title="Left Align"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          icon="format_align_center"
          title="Center Align"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          icon="format_align_right"
          title="Right Align"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive = false,
  icon,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  icon: string;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      type="button"
      className={`flex items-center justify-center rounded p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white ${
        isActive ? "bg-blue-500/20 text-blue-400" : ""
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
  );
}
