"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import TextAlign from "@tiptap/extension-text-align";

interface User {
  first_name: string;
  image: string;
}

export default function AddBlogs() {
  const [users, setUsers] = useState<User[]>([]);
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [Tags, setTags] = useState("");

  useEffect(() => {
    fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const editor1 = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose max-w-none min-h-[170px] p-4 focus:outline-none text-slate-900 placeholder:text-slate-400 dark:prose-invert dark:text-white",
        placeholder: "Start writing...",
      },
    },
    immediatelyRender: false,
  });
  const editor2 = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"], // headings + paragraph align
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      setIntro(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose max-w-none min-h-[300px] p-4 focus:outline-none " +
          "text-slate-900 placeholder:text-slate-400 " +
          "dark:prose-invert dark:text-white",
        placeholder: "Start writing...",
      },
    },
    immediatelyRender: false,
  });

  if (!editor1) return null;
  if (!editor2) return null;

  return (
    <div className="dark:bg-background-dark font-display flex min-h-screen flex-col bg-black text-slate-900 antialiased dark:text-white">
      <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur dark:border-[#232f48] dark:bg-[#111722]/95">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <header className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded">
                <span className="material-symbols-outlined">edit_document</span>
              </div>
              <h1 className="hidden text-lg font-bold tracking-tight text-slate-900 sm:block dark:text-white">
                Content Manager
              </h1>
            </div>
            <div className="mx-4 flex max-w-md flex-1">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                </div>
                <input
                  className="focus:ring-primary block w-full rounded-lg border-0 bg-slate-100 py-2 pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset sm:leading-6 dark:bg-[#232f48] dark:text-white"
                  placeholder="Search blogs..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#232f48]">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#111722]"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 dark:bg-[#232f48]"></div>
              <div className="flex items-center gap-2">
                <div
                  className="size-8 rounded-full bg-slate-200 bg-cover bg-center dark:bg-[#232f48]"
                  data-alt="Admin user profile picture"
                  style={{
                    backgroundImage: `url(${users[0]?.image})`,
                  }}
                ></div>
                <span className="hidden text-sm font-medium text-slate-700 md:block dark:text-slate-200">
                  {users[0]?.first_name}
                </span>
              </div>
            </div>
          </header>
        </div>
      </div>

      <main className="mx-auto min-h-100 w-full max-w-250 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Add New Blog
          </h2>
        </div>
        <div className="flex flex-col gap-9">
        
          <div className="form-section">
            <label className="form-label text-2xl" htmlFor="blog-title">
              Title
              <input
                className="focus:ring-primary block w-full rounded-lg border-0 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-300 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-[#232f48] dark:text-white dark:ring-[#374151]"
                id="blog-title"
                placeholder="Enter your title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
        

        <div className="form-section py-5">
          <label className="form-label text-2xl">Brief Introduction</label>
          <p className="form-helper text-slate-400">
            Write a brief introduction to your blog in about 40-50 words
          </p>
          <div className="focus-within:ring-primary overflow rounded-lg border border-slate-300 bg-white focus-within:ring-2 dark:border-[#374151] dark:bg-[#1e2736]">
            <div className="relative flex flex-wrap items-center gap-1 border border-slate-300 bg-slate-50 p-2 dark:border-[#374151] dark:bg-[#232f48]">
              <button
                className="rte-button px-1"
                title="Bold"
                onClick={() => editor1.chain().focus().toggleBold().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_bold
                </span>
              </button>
              <button
                className="rte-button px-1"
                title="Italic"
                onClick={() => editor1.chain().focus().toggleItalic().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_italic
                </span>
              </button>
              <button
                className="rte-button p-1"
                title="Underline"
                onClick={() => editor1.chain().focus().toggleUnderline().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_underlined
                </span>
              </button>
              <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600"></div>
              <button
                className="rte-button p-1"
                title="Bulleted List"
                onClick={() => editor1.chain().focus().toggleBulletList().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_list_bulleted
                </span>
              </button>
              <button
                className="rte-button p-1"
                title="Numbered List"
                onClick={() =>
                  editor1.chain().focus().toggleOrderedList().run()
                }
              >
                <span className="material-symbols-outlined rte-icon">
                  format_list_numbered
                </span>
              </button>

              <div className="absolute right-3 flex flex-row">
                <button
                  className="rte-button"
                  title="Undo"
                  onClick={() => editor1.chain().focus().undo().run()}
                >
                  <span className="material-symbols-outlined rte-icon">
                    undo
                  </span>
                </button>

                <button
                  className="rte-button"
                  title="Redo"
                  onClick={() => editor1.chain().focus().redo().run()}
                >
                  <span className="material-symbols-outlined rte-icon">
                    redo
                  </span>
                </button>
              </div>
            </div>           
              <EditorContent editor={editor1} />
            <div className="flex justify-end border-t border-slate-300 bg-slate-50 px-3 py-1.5 dark:border-[#374151] dark:bg-[#232f48]">
              <span className="font-mono text-xs text-slate-400">
                CHARS: 0 WORDS: 0
              </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label text-2xl">Content</label>
          <p className="form-helper text-slate-400">Write about your topic</p>
          <div className="focus-within:ring-primary overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:ring-2 dark:border-[#374151] dark:bg-[#1e2736]">
            <div className="flex flex-wrap items-center gap-1 border-b border-slate-300 bg-slate-50 p-2 dark:border-[#374151] dark:bg-[#232f48]">
              <button
                onClick={() =>
                  editor2.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`rte-button ${editor2.isActive("heading", { level: 1 }) ? "active" : ""}`}
                title="Heading 1"
              >
                <span className="material-symbols-outlined">format_h1</span>
              </button>

              <button
                onClick={() =>
                  editor2.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`rte-button ${editor2.isActive("heading", { level: 2 }) ? "active" : ""}`}
                title="Heading 2"
              >
                <span className="material-symbols-outlined">format_h2</span>
              </button>

              <button
                onClick={() =>
                  editor2.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`rte-button ${editor2.isActive("heading", { level: 3 }) ? "active" : ""}`}
                title="Heading 3"
              >
                <span className="material-symbols-outlined">format_h3</span>
              </button>

              <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600"></div>
              <button
                className="rte-button px-1.5"
                title="Bold"
                onClick={() => editor2.chain().focus().toggleBold().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_bold
                </span>
              </button>
              <button
                className="rte-button px-1.5"
                title="Italic"
                onClick={() => editor2.chain().focus().toggleItalic().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  format_italic
                </span>
              </button>
              <button
                className="rte-button px-1.5"
                title="Strikethrough"
                onClick={() => editor2.chain().focus().toggleUnderline().run()}
              >
                <span className="material-symbols-outlined rte-icon">
                  strikethrough_s
                </span>
              </button>
              <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600"></div>
              <button
                className="rte-button px-1.5"
                title="Align Left"
                onClick={() =>
                  editor2.chain().focus().setTextAlign("left").run()
                }
              >
                <span className="material-symbols-outlined rte-icon">
                  format_align_left
                </span>
              </button>
              <button
                className="rte-button px-1.5"
                title="Align Center"
                onClick={() =>
                  editor2.chain().focus().setTextAlign("center").run()
                }
              >
                <span className="material-symbols-outlined rte-icon">
                  format_align_center
                </span>
              </button>
              <button
                className="rte-button px-1.5"
                title="Align Right"
                onClick={() =>
                  editor2.chain().focus().setTextAlign("right").run()
                }
              >
                <span className="material-symbols-outlined rte-icon">
                  format_align_right
                </span>
              </button>
            </div>

            <div className="min-h-50">
              <EditorContent editor={editor2} />
            </div>

            <div className="flex justify-end border-t border-slate-300 bg-slate-50 px-3 py-1.5 dark:border-[#374151] dark:bg-[#232f48]">
              <span className="font-mono text-xs text-slate-400">
                CHARS: 0 WORDS: 0
              </span>
            </div>
          </div>
        </div>

        <div className="form-section py-5">
          <label className="form-label text-2xl" htmlFor="blog-tags">
            Tags
          </label>
          <p className="form-helper ">Add tags to describe your blog</p>
          <input
            className="focus:ring-primary block w-full rounded-lg border-0 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-300 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-[#232f48] dark:text-white dark:ring-[#374151]"
            id="blog-tags"
            placeholder="Enter tags"
            type="text"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label text-2xl">Topic picture</label>
          <p className="form-helper text-slate-400">
            Add a picture to your blog
            <br />
            Only jpg, jpeg, png, webp, or avif file types of size less than
            300KB are accepted
          </p>
          <div className="mt-4 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 transition-colors hover:bg-slate-50 dark:border-[#374151] dark:hover:bg-[#232f48]/50">
            <div className="text-center">
              <span className="material-symbols-outlined mx-auto mb-4 text-4xl text-slate-300 dark:text-slate-500">
                image
              </span>
              <div className="mt-4 flex justify-center text-sm leading-6 text-slate-600 dark:text-slate-400">
                <label
                  className="text-primary focus-within:ring-primary hover:text-primary/80 relative cursor-pointer rounded-md font-semibold focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none"
                  htmlFor="file-upload"
                >
                  <span className="text-blue-600">Upload a file</span>
                  <input
                    className="sr-only "
                    id="file-upload"
                    name="file-upload"
                    type="file"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
                PNG, JPG, GIF up to 300KB
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-600 shadow-primary/25 hover:bg-blue-500 hover:shadow-primary/40 inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-bold text-white border transition-all active:scale-[0.98]">
            Post Blog
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
