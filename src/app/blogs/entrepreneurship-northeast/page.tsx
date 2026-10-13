import Link from "next/link";

const pictures = [
  {
    src: "/images/blogs/entrepreneurship-1.jpg",
    alt: "Northeast India",
  },
  {
    src: "/images/blogs/entrepreneurship-2.jpg",
    alt: "Team collaboration",
  },
  {
    src: "/images/blogs/entrepreneurship-3.jpg",
    alt: "Planning a business idea",
  },
  {
    src: "/images/blogs/entrepreneurship-4.jpg",
    alt: "Workspace",
  },
];

export default function EntrepreneurshipNortheastPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-5 py-12 text-white md:px-10">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400 hover:text-white">
          ← Back to Home
        </Link>

        <p className="mt-10 text-sm font-bold tracking-widest text-blue-400 uppercase">
          Entrepreneurship · Northeast India
        </p>

        <h1 className="mt-4 text-4xl leading-tight font-black md:text-5xl">
          Entrepreneurship Beyond the Metro: Opportunities in the Northeast
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          India’s entrepreneurial ecosystem is expanding beyond traditional
          startup hubs. The Northeast has an opportunity to build ventures
          around its unique strengths, challenges, and communities.
        </p>

        <div className="mt-8 space-y-10">
          {pictures.map((picture, index) => (
            <figure
              key={picture.src}
              className="overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={picture.src}
                alt={picture.alt}
                className="h-64 w-full object-cover md:h-96"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>

        <div className="mt-10 space-y-8 text-base leading-8 text-gray-300">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Local Problems Need Local Understanding
            </h2>
            <p>
              The Northeast has its own geographical, cultural, and economic
              realities. Transportation, tourism, agriculture, handicrafts,
              local supply chains, and regional-language accessibility offer
              areas entrepreneurs can explore.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Don’t Copy. Adapt.
            </h2>
            <p>
              A model that works in Bengaluru may not work in Silchar.
              Understanding local customers, infrastructure, and culture helps
              entrepreneurs build solutions that are relevant to their
              communities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Students Have a Role to Play
            </h2>
            <p>
              College students can participate in competitions, attend
              workshops, connect with founders, build prototypes, and
              collaborate across disciplines. Even a small project can teach
              them how to turn an idea into something useful.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Start with What You Know
            </h2>
            <p>
              Start with one problem. Observe it, understand it, talk to the
              people experiencing it, try a solution, learn from the response,
              and improve it.
            </p>
            <p className="mt-4 font-semibold text-white">
              Entrepreneurship doesn’t have to begin somewhere else. It can
              begin here.
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-400">
          Tags: Entrepreneurship, Northeast India, Startups, Innovation, Student
          Innovation, Business Growth
        </footer>
      </article>
    </main>
  );
}
