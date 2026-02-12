import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import BackButton from "../../../components/Blogs/BackButton";
import BlogEngagement from "../../../components/Blogs/BlogEngagement";
import BlogComments from "../../../components/Blogs/BlogComments";
import blogs from "../../../data/blogs.json";

interface Blog {
  id: number;
  title: string;
  author: string;
  role: string;
  date?: string;
  description: string;
  details?: string;
  details2?: string;
  details3?: string;
  highlight?: string;
  tags?: string[];
  image?: string;
  avatar?: string;
  [key: string]: unknown;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: String(blog.id),
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = blogs.find((b) => Number(b.id) === Number(id)) as
    | Blog
    | undefined;

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} — E-Cell NIT Silchar`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = blogs.find((b) => Number(b.id) === Number(id)) as
    | Blog
    | undefined;

  if (!blog) {
    notFound();
  }

  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const readTime = Math.ceil((blog.description?.split(" ").length ?? 0) / 200);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative border-b border-white/5 pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0">
            <BackButton />
          </div>

          <div className="animate-[fadeIn_0.8s_ease-out_0.1s_forwards] opacity-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
                {blog.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="glass animate-[fadeIn_0.4s_ease-out_forwards] rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[8px] font-black tracking-widest text-blue-400 uppercase opacity-0 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[9px] md:text-[10px]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {blog.title}
                </h1>
              </div>

              {/* Author Meta */}
              <div className="flex flex-col items-start gap-4 border-y border-white/5 py-4 sm:gap-6 sm:py-6 md:flex-row md:items-center md:gap-8 md:py-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    className="h-10 w-10 rounded-full border border-white/10 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
                    src={blog.avatar ?? ""}
                    alt="author"
                    width={56}
                    height={56}
                    loading="lazy"
                    placeholder="empty"
                  />
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm md:text-base">
                      {blog.author}
                    </p>
                    <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase sm:text-[9px] md:text-[10px]">
                      {blog.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:gap-4 md:ml-auto md:flex-row md:items-center md:gap-6 lg:gap-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-8 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0 lg:col-span-2">
              <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-400 sm:space-y-6 sm:text-base md:text-lg">
                {/* Featured Image */}
                <div className="glass relative aspect-video overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl md:rounded-[2.5rem]">
                  <Image
                    alt="blog featured image"
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&q=80&w=900"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                    placeholder="empty"
                  />
                </div>

                {/* Description */}
                <p className="text-base font-medium text-white italic sm:text-lg md:text-xl">
                  {blog.description}
                </p>

                {/* Main Content */}
                <div className="space-y-3 sm:space-y-4">
                  <p>{blog.details}</p>
                </div>

                {/* Key Takeaways */}
                <div>
                  <h2 className="mt-6 mb-3 text-lg font-black tracking-tight text-white uppercase sm:mt-8 sm:mb-4 md:text-2xl lg:text-3xl">
                    Key Takeaways
                  </h2>
                  <p>{blog.details2}</p>
                </div>

                {/* Highlight Quote */}
                {blog.highlight && (
                  <div className="glass my-6 rounded-lg border-l-4 border-blue-600 bg-white/5 p-4 text-base text-white italic sm:my-8 sm:rounded-2xl sm:p-6 md:rounded-3xl md:p-10 md:text-lg lg:text-xl">
                    &ldquo;{blog.highlight}&rdquo;
                  </div>
                )}

                {/* More Content */}
                <div className="space-y-3 sm:space-y-4">
                  <p>{blog.details3}</p>
                </div>

                <BlogEngagement />
              </div>
            </div>

            {/* Sidebar */}
            <div className="animate-[fadeIn_0.8s_ease-out_0.3s_forwards] opacity-0 lg:sticky lg:top-32">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Author Card */}
                <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
                  <h4 className="mb-3 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:mb-4 sm:text-[9px] md:mb-8 md:text-[10px]">
                    ✨ About Author
                  </h4>

                  <div className="mb-4 flex items-center gap-3 sm:mb-6 md:mb-8">
                    <Image
                      className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14 sm:rounded-xl md:h-20 md:w-20 md:rounded-2xl"
                      src={blog.avatar ?? ""}
                      alt="author"
                      width={80}
                      height={80}
                      loading="lazy"
                      placeholder="empty"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white sm:text-sm md:text-lg">
                        {blog.author}
                      </h5>
                      <p className="text-[7px] font-black tracking-widest text-blue-400 uppercase sm:text-[8px] md:text-[10px]">
                        {blog.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4">
                    {[
                      { text: "/in/ananyasharma" },
                      { text: "@ananya" },
                      { text: "github.com/ananya" },
                    ].map((link, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white sm:gap-3 md:gap-4"
                      >
                        <div className="glass flex h-8 w-8 items-center justify-center rounded border border-white/10 group-hover:border-blue-500/30 sm:h-9 sm:w-9 sm:rounded-lg md:h-10 md:w-10 md:rounded-xl">
                          <span className="text-[7px] font-bold sm:text-[8px] md:text-[10px]">
                            {idx === 0 && "in"}
                            {idx === 1 && "@"}
                            {idx === 2 && "◉"}
                          </span>
                        </div>
                        <span className="text-[7px] font-bold sm:text-[8px] md:text-xs">
                          {link.text}
                        </span>
                      </a>
                    ))}
                  </div>

                  <button className="glass w-full rounded-lg border border-blue-500/20 py-2 text-[7px] font-black tracking-widest text-blue-400 uppercase transition-all hover:bg-blue-600 hover:text-white sm:rounded-xl sm:py-2.5 sm:text-[8px] md:rounded-2xl md:py-4 md:text-[10px]">
                    View Full Profile
                  </button>
                </div>

                {/* Comments Section */}
                <BlogComments />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
