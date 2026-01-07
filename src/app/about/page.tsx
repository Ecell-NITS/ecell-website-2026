import { Poppins } from "next/font/google"
const poppins=Poppins({
  subsets:["latin"],
  weight:["400","600"]})
import Image from "next/image";
 
export default function AboutPage() {
  return (
    <div className="relative min-w-screen text-white min-h-screen overflow-x-hidden bg-[#020617]">
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center justify-center min-h-screen">
        {/* Header Section */}
        <header className="w-full py-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4.5xl md:text-5.5xl sm:text-3.7xl xl:text-6xl 2xl:text-7xl text-center font-black opacity-1.0">
              WHO ARE <span className="text-blue-500"> WE?</span>
            </h2>
          </div>
          <br />
          <h3 className="px-8 sm:px-7 lg:px-10 xl:px-12 2xl:px-15 text-sm sm:text-lg md:text-xl lg:text-1.0xl xl:text-1.7xl 2xl:text-2xl text-center text-gray-400 leading-relaxed">
            Entrepreneurship Cell, NIT Silchar is a non-profit organization that aims to foster the spirit of
            entrepreneurship among the student community. We provide a platform for budding entrepreneurs to hone
            their skills, network with like-minded individuals, and gain exposure to the startup world. Our mission
            is to create a culture of innovation and problem-solving, and to empower the visionaries of tomorrow,
            today. Through our various initiatives, events, and workshops, we strive to build a solid entrepreneurial
            ecosystem on campus and beyond.
          </h3>
        </header>

        {/* Motto Section (RESPONSIVE FIXED) */}
        <section className="relative overflow-hidden bg-[#020617] py-40">
          {/* Background Blobs */}
          <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6">
            {/* Heading */}
            <div className="mb-24 text-center">
              <div className="inline-block">
                <h2 className="mb-3 text-6xl font-black uppercase tracking-tighter italic text-white">
                  Our <span className="text-blue-500">Motto</span>
                </h2>
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-blue-600 to-transparent" />
              </div>
              <p className="mx-auto mt-8 max-w-xl text-lg font-light text-gray-500">
                The five core values that drive our mission to cultivate the next wave of disruptive entrepreneurs.
              </p>
            </div>

            {/* Motto Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                {
                  title: "Inspire",
                  text: "Inspiring Ideas, Igniting Innovation. We encourage students to brainstorm innovative ideas and nurture their creativity.",
                  img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-1_uoycz4.webp",
                  gradient: "from-blue-500/20",
                },
                {
                  title: "Guide",
                  text: "Guiding You Towards Success. We provide guidance in form of mentorship programs, workshops, and networking events.",
                  img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-2_hvs2rq.webp",
                  gradient: "from-purple-500/20",
                },
                {
                  title: "Transform",
                  text: "Transforming Ideas into Reality. We provide incubation facilities and funding support to promising startups.",
                  img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524128/Ecell%20website/moto/moto-3_thwnrc.webp",
                  gradient: "from-emerald-500/20",
                },
                {
                  title: "Connect",
                  text: "Connecting Ideas, Building Networks. We organize events to showcase ideas and connect with investors.",
                  img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-4_krbq3h.webp",
                  gradient: "from-amber-500/20",
                },
                {
                  title: "Community",
                  text: "Creating a Community of Entrepreneurs. We aim to celebrate success stories and inspire students.",
                  img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524130/Ecell%20website/moto/moto-5_jzewcc.webp",
                  gradient: "from-rose-500/20",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative h-[420px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center transition-transform duration-500"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative z-10 mb-8 flex justify-center">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-24 w-auto transition-transform duration-700 ease-in-out group-hover:-translate-y-3 group-hover:animate-[float_3s_ease-in-out_infinite]"
                      />
                    </div>

                    <h3 className="relative z-10 mb-5 text-3xl font-black text-white transition-colors duration-300 group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    <p className="relative z-10 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars Section (UNCHANGED) */}
        <section className="relative overflow-hidden bg-gray-950/20 py-40">
          {/* Background text */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10 select-none">
            <span className="absolute -top-10 -left-20 text-[20rem] font-black text-white/5">GUIDANCE</span>
            <span className="absolute -bottom-20 -right-20 rotate-12 text-[20rem] font-black text-white/5">VISION</span>
          </div>

          <div className="container relative z-10 mx-auto px-6">
            {/* Heading */}
            <div className="mb-24 flex flex-col items-center text-center">
              <h2 className="mb-6 text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
                The <span className="text-blue-500">Pillars</span>
              </h2>
              <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-blue-600" />
              <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-gray-500">
                Meet the visionaries and faculty mentors who provide the strategic backbone and unwavering support
                for E-Cell&apos;s exponential growth.
              </p>
            </div>

            {/* Pillars Cards */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
                 {/* CARD */}
      <div
        className="group relative w-full"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className="flex h-full flex-col items-center rounded-[3rem] border border-white/10 p-8 text-center transition-all duration-500 hover:border-blue-500/30 group-hover:bg-white/[0.04] md:p-12">
          {/* Image */}
          <div
            className="relative mb-10 h-44 w-44"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="absolute inset-0 scale-110 rounded-full border-2 border-blue-500/20 transition-transform duration-700 group-hover:scale-125" />
            <div className="absolute inset-0 scale-125 rounded-full border border-blue-500/10 opacity-50 transition-transform duration-1000 group-hover:scale-150" />

            <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
              <img
                src="https://res.cloudinary.com/ecell/image/upload/v1756627441/IMG_174134284467cac87c778b1_kzqtmj.jpg"
                alt="Prof. Rahul Dev Misra"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
              Prof. Rahul Dev Misra
            </h3>

            <p className="mb-6 inline-block rounded-full bg-blue-500/5 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-500">
              IIC President, NIT Silchar
            </p>

            <p className="px-4 text-sm font-light italic leading-relaxed text-gray-400">
              &quot;Professor in the mechanical engineering department and the
              president of IIC, NIT Silchar. He is the backbone of the innovation
              ecosystem.&quot;
            </p>
          </div>

          {/* Footer */}
          <div
            className="mt-8 flex w-full justify-center border-t border-white/5 pt-8"
            style={{ transform: "translateZ(20px)" }}
          >
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-colors group-hover:text-white">
              View Portfolio
            </button>
          </div>
        </div>
      </div>

     

    <div
  className="group relative w-full"
  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
>
  <div className="flex h-full flex-col items-center rounded-[3rem] border border-white/10 p-8 text-center transition-all duration-500 hover:border-blue-500/30 group-hover:bg-white/[0.04] md:p-12">
    <div
      className="relative mb-10 h-44 w-44"
      style={{ transform: "translateZ(50px)" }}
    >
      <div className="absolute inset-0 scale-110 rounded-full border-2 border-blue-500/20 transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 scale-125 rounded-full border border-blue-500/10 opacity-50 transition-transform duration-1000 group-hover:scale-150" />

      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
        <img
          src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767025863/WasimArifSir-d33400e4_qmpii4.jpg"
          alt="Dr. Wasim Arif"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />
      </div>
    </div>

    <div style={{ transform: "translateZ(30px)" }}>
      <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
        Dr. Wasim Arif
      </h3>

      <p className="mb-6 inline-block rounded-full bg-blue-500/5 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-500">
        Convener IIC, NIT Silchar
      </p>

      <p className="px-4 text-sm font-light italic leading-relaxed text-gray-400">
        &quot;Associate professor in the department of ECE and faculty advisor at
        E-Cell. A guiding support and visionary for the organization.&quot;
      </p>
    </div>

    <div
      className="mt-8 flex w-full justify-center border-t border-white/5 pt-8"
      style={{ transform: "translateZ(20px)" }}
    >
      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-colors group-hover:text-white">
        View Portfolio
      </button>
    </div>
  </div>
</div>


<div
  className="group relative w-full"
  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
>
  <div className="flex h-full flex-col items-center rounded-[3rem] border border-white/10 p-8 text-center transition-all duration-500 hover:border-blue-500/30 group-hover:bg-white/[0.04] md:p-12">
    <div
      className="relative mb-10 h-44 w-44"
      style={{ transform: "translateZ(50px)" }}
    >
      <div className="absolute inset-0 scale-110 rounded-full border-2 border-blue-500/20 transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 scale-125 rounded-full border border-blue-500/10 opacity-50 transition-transform duration-1000 group-hover:scale-150" />

      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
        <img
          src="https://res.cloudinary.com/dfriijrmr/image/upload/v1677474386/GalleryPage/Orientation%202022-2023/IMG_1558_vjql6g.jpg"
          alt="Dr. A.B. Deoghare"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />
      </div>
    </div>

    <div style={{ transform: "translateZ(30px)" }}>
      <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
        Dr. A.B. Deoghare
      </h3>

      <p className="mb-6 inline-block rounded-full bg-blue-500/5 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-500">
        Asso Prof, Mechanical Engg
      </p>

      <p className="px-4 text-sm font-light italic leading-relaxed text-gray-400">
        &quot;Associate professor in the department of mechanical engineering and
        supports E-Cell organization as a primary faculty advisor.&quot;
      </p>
    </div>

    <div
      className="mt-8 flex w-full justify-center border-t border-white/5 pt-8"
      style={{ transform: "translateZ(20px)" }}
    >
      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-colors group-hover:text-white">
        View Portfolio
      </button>
    </div>
  </div>
</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
