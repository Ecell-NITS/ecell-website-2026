import blogs from "./data/blogs.json";
import BlogCard from "./components/BlogCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-black py-40">
      {/* PAGE WRAPPER (THIS IS KEY) */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
        {/* Insight pill */}
        <div className="mb-8 inline-flex rounded-full px-4 py-2 ring-2 ring-white/50">
          <h1 className="text-[10px] tracking-widest text-sky-400 uppercase">
            INSIGHTS FROM THE ECOSYSTEM
          </h1>
        </div>

        {/* TITLE SECTION */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-8xl">
            THE STARTUP
          </h1>
          <h1 className="text-3xl leading-tight font-bold text-sky-500 italic md:text-4xl lg:text-8xl">
            CHRONICLES
          </h1>
        </div>

        {/* SEARCH + SORT */}
        <div className="mb-16 flex w-full max-w-xl flex-col gap-4 lg:max-w-7xl lg:flex-row">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by keywords, tags, or"
            className="w-full rounded-full bg-blue-900/40 px-5 py-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-sky-300/50"
          />

          {/* Sort */}
          <div className="group flex cursor-pointer items-center justify-between rounded-2xl bg-blue-900/40 px-5 py-4 ring-1 ring-white/10">
            <span className="text-xs tracking-widest text-blue-300 uppercase group-hover:text-white">
              Sort
            </span>
            <span className="text-blue-300">▼</span>
          </div>
        </div>

        {/* BLOG LIST (mobile first) */}
        <div className="mt-10 grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
