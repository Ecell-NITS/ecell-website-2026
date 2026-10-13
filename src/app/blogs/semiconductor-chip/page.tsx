import Link from "next/link";

export default function SemiconductorChipPage() {
  const tags = [
    "NIT Silchar",
    "Semiconductor",
    "Chip Design",
    "VLSI",
    "Innovation",
    "Northeast India",
    "Technology",
    "Student Innovation",
  ];

  return (
    <main className="min-h-screen bg-[#020617] px-5 py-12 text-white md:px-10">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400 hover:text-white">
          ← Back to Home
        </Link>

        <p className="mt-10 text-sm font-bold tracking-widest text-blue-400 uppercase">
          Technology · Innovation · NIT Silchar
        </p>

        <h1 className="mt-4 text-4xl leading-tight font-black md:text-5xl">
          NIT Silchar&apos;s Semiconductor Chip: Innovation from the Northeast
        </h1>

        <p className="mb-10 text-lg leading-relaxed text-gray-300">
          Semiconductors are at the heart of almost every modern technology,
          from smartphones to medical devices. NIT Silchar has added its own
          contribution to this growing ecosystem through indigenous chip design
          and semiconductor research, showing how advanced technological
          innovation can emerge from a campus in the Northeast.
        </p>

        <div className="space-y-8 leading-8 text-gray-300">
          <section>
            <p>
              When we think about semiconductors, we often think about large
              technology companies and manufacturing facilities. But innovation
              in this field can also begin inside a college laboratory.
            </p>

            <p className="mt-4">
              At <strong className="text-white">NIT Silchar</strong>, research
              in areas such as VLSI, microelectronics, semiconductor devices,
              and chip design has contributed to indigenous chip development.
              The institute has also developed a biosensor semiconductor chip
              for EEG signal detection.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              From an Idea to a Chip
            </h2>

            <p>
              One notable project was developed under the{" "}
              <strong className="text-white">
                Chip to Startup (C2S) Initiative
              </strong>{" "}
              of the Ministry of Electronics and Information Technology.
            </p>

            <p className="mt-4">
              The project, titled “Design and Development of Low Power Low
              Latency Non-Invasive Seizure Detector System,” was fabricated at
              the Semiconductor Laboratory in Mohali. The chip carries ID{" "}
              <strong className="text-white">C2S0042</strong> and was showcased
              at SEMICON India 2025.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Why Does This Matter?
            </h2>

            <p>
              India is building a semiconductor ecosystem that includes chip
              design, fabrication, packaging, testing, and talent development.
              These developments create opportunities for students across
              electronics, computer science, and other engineering disciplines.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Innovation Can Start Here
            </h2>

            <p>
              NIT Silchar’s semiconductor work highlights how advanced
              innovation can begin in a college laboratory. With research,
              collaboration, and support from faculty, ideas can develop into
              technologies with real-world applications.
            </p>

            <p className="mt-4">
              For the Northeast, such projects demonstrate how education,
              research, and entrepreneurship can work together to build
              technology and inspire future innovators.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
