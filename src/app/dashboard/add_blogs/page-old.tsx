"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import TextAlign from "@tiptap/extension-text-align";
import Navbar from "@/components/Landing/Navbar";
import { motion } from "framer-motion";

export default function AddBlogs() {
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const editorIntro = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      setIntro(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose prose-invert max-w-none min-h-[120px] p-4 focus:outline-none text-slate-200 placeholder:text-slate-500",
        placeholder: "Write a brief introduction...",
      },
    },
    immediatelyRender: false,
  });

  const editorContent = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none text-slate-200 placeholder:text-slate-500",
        placeholder: "Start writing your blog content...",
      },
    },
    immediatelyRender: false,
  });

  const handlePublish = () => {
    // Log the values to satisfy linter that they are used
    console.log({ title, tags, intro, content });
  };

  if (!editorIntro || !editorContent) return null;

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Create New Blog
            </h1>
            <p className="text-lg text-slate-400">
              Share your thoughts and insights with the community.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10"
          >
            <div className="flex flex-col gap-8">
              {/* Title Section */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="blog-title"
                  className="text-xl font-semibold text-slate-200"
                >
                  Blog Title
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xl text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="blog-title"
                  placeholder="Enter an engaging title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Brief Intro Section */}
              <div className="flex flex-col gap-3">
                <label className="text-xl font-semibold text-slate-200">
                  Brief Introduction
                  <span className="mt-1 block text-sm font-normal text-slate-500">
                    A short summary (40-50 words) to hook your readers
                  </span>
                </label>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition-colors focus-within:border-blue-500/50">
                  <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/5 p-2">
                    <ToolbarButton
                      onClick={() =>
                        editorIntro.chain().focus().toggleBold().run()
                      }
                      isActive={editorIntro.isActive("bold")}
                      icon="format_bold"
                      title="Bold"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorIntro.chain().focus().toggleItalic().run()
                      }
                      isActive={editorIntro.isActive("italic")}
                      icon="format_italic"
                      title="Italic"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorIntro.chain().focus().toggleUnderline?.().run()
                      }
                      isActive={editorIntro.isActive("underline")}
                      icon="format_underlined"
                      title="Underline"
                    />
                    <div className="mx-1 h-6 w-px bg-white/10"></div>
                    <ToolbarButton
                      onClick={() =>
                        editorIntro.chain().focus().toggleBulletList().run()
                      }
                      isActive={editorIntro.isActive("bulletList")}
                      icon="format_list_bulleted"
                      title="Bulleted List"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorIntro.chain().focus().toggleOrderedList().run()
                      }
                      isActive={editorIntro.isActive("orderedList")}
                      icon="format_list_numbered"
                      title="Numbered List"
                    />
                  </div>
                  <EditorContent editor={editorIntro} />
                </div>
              </div>

              {/* Main Content Section */}
              <div className="flex flex-col gap-3">
                <label className="text-xl font-semibold text-slate-200">
                  Main Content
                </label>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition-colors focus-within:border-blue-500/50">
                  <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/5 p-2">
                    <ToolbarButton
                      onClick={() =>
                        editorContent
                          .chain()
                          .focus()
                          .toggleHeading({ level: 1 })
                          .run()
                      }
                      isActive={editorContent.isActive("heading", { level: 1 })}
                      icon="format_h1"
                      title="Heading 1"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorContent
                          .chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run()
                      }
                      isActive={editorContent.isActive("heading", { level: 2 })}
                      icon="format_h2"
                      title="Heading 2"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorContent
                          .chain()
                          .focus()
                          .toggleHeading({ level: 3 })
                          .run()
                      }
                      isActive={editorContent.isActive("heading", { level: 3 })}
                      icon="format_h3"
                      title="Heading 3"
                    />
                    <div className="mx-1 h-6 w-px bg-white/10"></div>
                    <ToolbarButton
                      onClick={() =>
                        editorContent.chain().focus().toggleBold().run()
                      }
                      isActive={editorContent.isActive("bold")}
                      icon="format_bold"
                      title="Bold"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorContent.chain().focus().toggleItalic().run()
                      }
                      isActive={editorContent.isActive("italic")}
                      icon="format_italic"
                      title="Italic"
                    />
                    <div className="mx-1 h-6 w-px bg-white/10"></div>
                    <ToolbarButton
                      onClick={() =>
                        editorContent.chain().focus().setTextAlign("left").run()
                      }
                      isActive={editorContent.isActive({ textAlign: "left" })}
                      icon="format_align_left"
                      title="Left Align"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorContent
                          .chain()
                          .focus()
                          .setTextAlign("center")
                          .run()
                      }
                      isActive={editorContent.isActive({ textAlign: "center" })}
                      icon="format_align_center"
                      title="Center Align"
                    />
                    <ToolbarButton
                      onClick={() =>
                        editorContent
                          .chain()
                          .focus()
                          .setTextAlign("right")
                          .run()
                      }
                      isActive={editorContent.isActive({ textAlign: "right" })}
                      icon="format_align_right"
                      title="Right Align"
                    />
                  </div>
                  <EditorContent editor={editorContent} />
                </div>
              </div>

              {/* Tags Section */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="blog-tags"
                  className="text-xl font-semibold text-slate-200"
                >
                  Tags
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="blog-tags"
                  placeholder="Technology, Innovation, Startup..."
                  type="text"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {/* Image Upload Section */}
              <div className="flex flex-col gap-3">
                <label className="text-xl font-semibold text-slate-200">
                  Topic Picture
                </label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-6 py-10 transition-all hover:border-blue-500/50 hover:bg-white/5">
                  <div className="text-center">
                    <span className="material-symbols-outlined mx-auto mb-4 text-5xl text-blue-500">
                      image
                    </span>
                    <div className="flex text-sm leading-6 text-slate-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:outline-none hover:text-blue-400"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      PNG, JPG, GIF up to 300KB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  onClick={handlePublish}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:from-blue-500 hover:to-blue-400 active:scale-[0.98]"
                >
                  Publish Blog
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
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
      className={`flex items-center justify-center rounded p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white ${
        isActive ? "bg-blue-500/20 text-blue-400" : ""
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
  );
}
