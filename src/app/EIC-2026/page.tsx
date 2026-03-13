"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "~/styles/eic2026.css";

// /* ─── 3D Dice Component ─── */
// function MonopolyDice({ className = "" }: { className?: string }) {
//   return (
//     <div className={`eic2026-dice-container ${className}`}>
//       <div className="eic2026-dice">
//         <div className="eic2026-dice-face">⚀</div>
//         <div className="eic2026-dice-face">⚁</div>
//         <div className="eic2026-dice-face">⚂</div>
//         <div className="eic2026-dice-face">⚃</div>
//         <div className="eic2026-dice-face">⚄</div>
//         <div className="eic2026-dice-face">⚅</div>
//       </div>
//     </div>
//   );
// }

/* ─── Gallery Carousel & Sponsors Data ─── */
const galleryImages = [
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078309/a5_l5p6ep.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078310/a7_jnqfxe.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078310/a3_yvhglc.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078309/a2_jaoiq2.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1772994031/a1_b15ivc.jpg",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078308/a4_tmyctl.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082116/a9_mvw8v9.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a12_bn6gwq.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a8_eqfham.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a13_nggba1.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a10_zvgkyj.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a11_r68o1u.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a15_knkz3t.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a14_yra40r.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a18_wqal82.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082113/a19_qc4jhl.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082113/a20_scmy0r.webp",
];

const sponsors = [
  {
    name: "Stock Edge",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903126/stck_edge_yidnjf.png",
  },
  {
    name: "quickobook",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903165/quicko_y3mdsr.png",
  },
  {
    name: "The product Folks",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903184/the_product_folk_ftmcg7.png",
  },
  {
    name: "Geeks for Geeks",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903204/geeksforgeeks_psxxiy.png",
  },
  {
    name: "idp",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903334/idp_ujvidp.png",
  },
  {
    name: "HDFC",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903358/hdfc_uiealn.png",
  },
  {
    name: "ED Times",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903420/ed_times_hxkqt9.jpg",
  },
  {
    name: "Pyzaql",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903436/pyzaql_nls3om.png",
  },
  {
    name: "cubelelo",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903451/cubelelo_gmfsu0.png",
  },
  {
    name: "black marble",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903494/black_marble_cgp9zk.png",
  },
  {
    name: "TruScholar",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903508/truscholar_ntepdv.png",
  },
  {
    name: "Kwikpic",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903524/kwikpick_vkuuxp.jpg",
  },
  {
    name: "Stock Grow",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903577/stock_gro_fi5cka.jpg",
  },
  {
    name: "Engineer Hub",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903605/engineer_hub_qf0ao2.png",
  },
  {
    name: "anterprerna",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903627/anterprerna_ndrjda.jpg",
  },
  {
    name: "Ivy Camp",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903646/Ivy_Camp_e9oqyk.jpg",
  },
  {
    name: "Janta Group",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903661/janta_group_hoksvj.jpg",
  },
  {
    name: "Learning while Travelling",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903680/Learning_while_travelling_tvceic.png",
  },
  {
    name: "Krayonzz",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903726/krayonzz_dntqxt.png",
  },
  {
    name: "Unstop",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903816/unstop_jejjrz.png",
  },
  {
    name: "Ease my Trip",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903842/Easy_My_trip_ta8cm1.jpg",
  },
  {
    name: "Product Space",
    logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903856/Product_space_yfrgxj.jpg",
  },
];

const Marquee = ({
  images,
  direction = "left",
  speed = 100,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] whitespace-nowrap">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-5 py-4 md:gap-7 md:py-6"
      >
        {[...images, ...images, ...images].map((src, index) => (
          <div
            key={index}
            className="eic2026-gallery-frame group relative h-44 w-64 shrink-0 overflow-hidden sm:h-52 sm:w-76 md:h-64 md:w-96"
          >
            <Image
              src={src}
              alt={`Gallery image ${index}`}
              fill
              className="transform object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-lg border-2 border-[#cee7d7]/0 transition-all duration-500 group-hover:border-[#cee7d7]/40 group-hover:shadow-[inset_0_0_20px_rgba(206,231,215,0.15)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function GalleryContinuous() {
  const half = Math.ceil(galleryImages.length / 2);
  const row1 = galleryImages.slice(0, half);
  const row2 = galleryImages.slice(half);

  return (
    <div className="relative w-full space-y-5 md:space-y-8">
      <Marquee images={row1} direction="left" speed={60} />
      <Marquee images={row2} direction="right" speed={60} />
    </div>
  );
}

function SponsorsMarquee() {
  const duplicatedSponsors = [...sponsors, ...sponsors];
  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Fade Edges — match section background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0d1a13] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0d1a13] to-transparent" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-6"
      >
        {duplicatedSponsors.map((sponsor, i) => (
          <div
            key={`${sponsor.name}-${i}`}
            className="eic2026-sponsor-card group relative flex h-28 w-44 flex-shrink-0 items-center justify-center sm:h-36 sm:w-52"
          >
            <div className="absolute inset-0 rounded bg-gradient-to-br from-[#cee7d7]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="relative z-10 max-h-[60%] max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute right-0 bottom-2 left-0 z-10 text-center text-[8px] font-bold tracking-widest text-[#1a6b42]/0 uppercase transition-colors duration-300 group-hover:text-[#1a6b42]/60">
              {sponsor.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// /* ─── Floating Monopoly Pieces ─── */
// function FloatingPieces() {
//   return (
//     <div className="pointer-events-none absolute inset-0 overflow-hidden">
//       {/* Dollar signs */}
//       <div className="eic2026-float eic2026-float-delay-1 absolute top-[15%] left-[5%] hidden text-4xl text-[#cee7d7]/20 md:block">
//         💰
//       </div>
//       <div className="eic2026-float-slow eic2026-float-delay-3 absolute top-[25%] right-[8%] text-3xl text-[#cee7d7]/15">
//         🎩
//       </div>
//       <div className="eic2026-float-reverse eic2026-float-delay-2 absolute bottom-[20%] left-[15%] hidden text-5xl text-[#cee7d7]/10 lg:block">
//         🏠
//       </div>
//       <div className="eic2026-float eic2026-float-delay-4 absolute right-[12%] bottom-[30%] text-3xl text-[#cee7d7]/20">
//         💎
//       </div>
//       <div className="eic2026-float-slow absolute top-[10%] left-[50%] hidden text-2xl text-[#cee7d7]/15 md:block">
//         🎲
//       </div>
//       <div className="eic2026-float-reverse eic2026-float-delay-1 absolute top-[60%] right-[25%] text-4xl text-[#cee7d7]/10">
//         🏦
//       </div>
//     </div>
//   );
// }

// /* ─── Event Card Component ─── */
// function EventCard({
//   href,
//   title,
//   icon,
//   description,
//   rent,
//   borderColor,
//   propertyType,
//   delay = 0,
// }: {
//   href: string;
//   title: string;
//   icon: string;
//   description: string;
//   rent: string;
//   borderColor: string;
//   propertyType: string;
//   delay?: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40, rotateX: 15 }}
//       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay }}
//     >
//       <Link
//         href={href}
//         className="eic2026-card-3d eic2026-property-ribbon group block overflow-hidden rounded-xl border-t-8 bg-white shadow-xl dark:bg-[#0d0d0d]"
//         style={{ borderTopColor: borderColor }}
//       >
//         <div className="border-b border-slate-100 p-6 text-center dark:border-zinc-800">
//           <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
//             {propertyType}
//           </span>
//           <h3 className="mt-2 text-xl font-black text-[#111111] uppercase dark:text-white">
//             {title}
//           </h3>
//         </div>
//         <div className="flex flex-col items-center gap-4 p-6">
//           <motion.div
//             whileHover={{ rotateY: 180, scale: 1.1 }}
//             transition={{ duration: 0.6 }}
//             className="flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800"
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             <span className="material-symbols-outlined text-3xl text-[#cee7d7]">
//               {icon}
//             </span>
//           </motion.div>
//           <p className="text-center text-sm text-slate-500 italic">
//             {description}
//           </p>
//           <div className="flex w-full items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800">
//             <span className="text-xs font-bold text-[#cee7d7]">
//               RENT: {rent}
//             </span>
//             <motion.span
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//               className="material-symbols-outlined text-slate-300"
//             >
//               info
//             </motion.span>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

/* ─── Main Page ─── */
export default function EIC2026Page() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-slate-100 antialiased">
      {/* ═══ NAVIGATION ═══ */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-[#cee7d7]/10 bg-[#111111]/80 px-6 py-4 backdrop-blur-md md:px-20">
        <div className="flex items-center gap-3">
          <Image
            src="/EIC/eic-logo1.png"
            alt="EIC 2026 Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </div>
        <nav className="hidden items-center gap-10 md:flex">
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#about"
          >
            About
          </a>
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#events"
          >
            Events
          </a>
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#gallery"
          >
            Gallery
          </a>
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#sponsors"
          >
            Sponsors
          </a>
        </nav>
        <Link href="/" className="">
          <Image
            src="/ecelllogo.png"
            alt="ECELL Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </Link>
      </header>

      {/* ═══ HERO SECTION ═══ */}
      <section
        ref={heroRef}
        className="eic2026-board-pattern relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <Image
            src="/images/eic2026/hero_bg.webp"
            alt="EIC 2026 Hero"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-[#111111]/80 to-[#111111]" />
        <div className="eic2026-cinematic-overlay absolute inset-0" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto mt-32 w-full max-w-5xl px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block rounded-full border border-[#cee7d7]/30 bg-[#cee7d7]/10 px-4 py-1 text-xs font-bold tracking-widest text-[#cee7d7] uppercase"
          >
            The Ultimate Business Simulation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-4xl leading-tight font-black tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Entrepreneurship & <br className="hidden sm:block" />
            <span className="eic2026-shimmer-text">Innovation</span> Challenge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-lg font-light text-slate-300 md:text-xl"
          >
            Innovate. Compete. Conquer. Step onto the high-stakes board of
            global business and build your empire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(206,231,215,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-xl bg-[#cee7d7] px-8 py-3 text-base font-bold text-[#111111] transition-all sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
              href="#events"
            >
              Explore Events
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-xl border border-white/20 px-8 py-3 text-base font-bold text-white transition-all sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
              href="#about"
            >
              About EIC
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="material-symbols-outlined text-3xl text-[#cee7d7]/50">
            keyboard_double_arrow_down
          </span>
        </motion.div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section
        className="eic2026-about-section relative px-6 py-28 md:px-20"
        id="about"
      >
        {/* Corner bracket decorations */}
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="eic2026-title-deed-bar mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Chance Card ★
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-6xl">
              The Flagship <span className="eic2026-shimmer-text">Vision</span>
            </h2>
            <p className="mx-auto max-w-lg text-sm tracking-wide text-[#cee7d7]/50">
              Where entrepreneurship meets the art of the deal
            </p>
          </motion.div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="eic2026-about-card rounded-2xl p-6 sm:p-8 md:p-10">
                <p className="mb-8 text-base leading-relaxed text-slate-300 sm:text-lg">
                  The board is set and the bank is open as E-Cell NIT Silchar
                  presents EIC 2026. Six branches step onto the board in a
                  Monopoly-style arena where every challenge is a move toward
                  campus dominance. From strategic negotiations to
                  problem-solving under pressure, every round demands sharp
                  decisions and bold moves. Roll the dice, outthink the
                  competition, and build your own entrepreneurial empire.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: "lightbulb",
                      title: "Innovation",
                      desc: "Fresh ideas that light the way",
                      color: "#eab308",
                    },
                    {
                      icon: "extension",
                      title: "Strategy",
                      desc: "Every move is calculated",
                      color: "#2563eb",
                    },
                    {
                      icon: "rocket_launch",
                      title: "Growth",
                      desc: "Scale your empire fast",
                      color: "#dc2626",
                    },
                    {
                      icon: "payments",
                      title: "Capital",
                      desc: "Monopoly money rewards",
                      color: "#16a34a",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="eic2026-about-pillar group"
                    >
                      <div
                        className="mb-3 flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:rotate-12"
                        style={{
                          backgroundColor: `${item.color}20`,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-xl"
                          style={{ color: item.color }}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <h3 className="text-sm font-black tracking-wide text-white uppercase">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="eic2026-glow-pulse absolute inset-0 rounded-full bg-[#cee7d7]/15 blur-3xl" />
              <div className="eic2026-about-image-frame relative h-full w-full overflow-hidden">
                <Image
                  src="/images/eic2026/team_collab.webp"
                  alt="Team collaborating"
                  fill
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Corner label like a Monopoly board space */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-md border-2 border-[#1a1a1a] bg-gradient-to-r from-[#faf9f0] to-[#f4f1e4] px-6 py-2 shadow-lg">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#1a6b42] uppercase">
                  EIC 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ EVENTS SECTION ═══ */}
      <section className="eic2026-events-board px-6 py-28 md:px-20" id="events">
        {/* Corner bracket decorations */}
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="eic2026-title-deed-bar mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Title Deed ★
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-6xl">
              Board <span className="eic2026-shimmer-text">Estates</span>
            </h2>
            <p className="mx-auto max-w-md text-sm tracking-wide text-[#cee7d7]/60">
              Claim your territory in these exclusive challenge properties
            </p>
          </motion.div>

          <div className="eic2026-perspective grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              {
                href: "/EIC-2026/campus-capitalist",
                title: "Campus Capitalist",
                icon: "real_estate_agent",
                description:
                  "Pitch real campus solutions using your branch expertise.",
                rent: "$1500",
                color: "#dc2626",
                propertyType: "Premium Property",
              },
              {
                href: "/EIC-2026/business-quiz",
                title: "Business Quiz",
                icon: "quiz",
                description:
                  "Test your knowledge of markets, brands & startups.",
                rent: "$1200",
                color: "#2563eb",
                propertyType: "Utility Property",
              },
              {
                href: "/EIC-2026/chairmans-conclave",
                title: "Chairman's Conclave",
                icon: "forum",
                description:
                  "High-stakes group discussion as corporate tycoons.",
                rent: "$1400",
                color: "#eab308",
                propertyType: "Boardroom Property",
              },
              {
                href: "/EIC-2026/adoshuffle",
                title: "AdoShuffle",
                icon: "campaign",
                description:
                  "Reimagine famous brands with wild what-if concepts.",
                rent: "$800",
                color: "#16a34a",
                propertyType: "Media Property",
              },
              {
                href: "/EIC-2026/the-deal-room",
                title: "The Deal Room",
                icon: "lock_open",
                description:
                  "Solve puzzles, uncover clues, and build your empire.",
                rent: "$2000",
                color: "#9333ea",
                propertyType: "Luxury Property",
              },
            ].map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={event.href}
                  className="eic2026-deed-card group block"
                >
                  {/* Colored header band */}
                  <div
                    className="eic2026-deed-header"
                    style={{ backgroundColor: event.color }}
                  >
                    <span className="deed-type">{event.propertyType}</span>
                    <h3>{event.title}</h3>
                  </div>

                  {/* Card body */}
                  <div className="eic2026-deed-body">
                    <div
                      className="eic2026-deed-icon"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ color: event.color }}
                      >
                        {event.icon}
                      </span>
                    </div>
                    <p>{event.description}</p>

                    {/* Rent row */}
                    <div className="eic2026-deed-rent">
                      <span className="rent-label">Rent</span>
                      <span className="rent-value">{event.rent}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <section
        className="eic2026-gallery-section relative overflow-hidden px-6 py-28 md:px-20"
        id="gallery"
      >
        {/* Corner bracket decorations */}
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="eic2026-title-deed-bar mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Community Chest ★
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-6xl">
              The Game in <span className="eic2026-shimmer-text">Motion</span>
            </h2>
            <p className="mx-auto max-w-lg text-sm tracking-wide text-[#cee7d7]/50">
              Relive the moments that defined the championship
            </p>
          </motion.div>
          <GalleryContinuous />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-xs tracking-widest text-[#cee7d7]/30 uppercase"
          >
            Every move tells a story · Every frame captures a legacy
          </motion.p>
        </div>
      </section>

      {/* ═══ SPONSORS SECTION ═══ */}
      <section
        className="eic2026-sponsors-section relative px-6 py-28 md:px-20"
        id="sponsors"
      >
        {/* Corner bracket decorations */}
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <div className="eic2026-title-deed-bar mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Bank Assets ★
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Strategic <span className="eic2026-shimmer-text">Partners</span>
            </h2>
            <p className="mx-auto max-w-md text-sm tracking-wide text-[#cee7d7]/50">
              The investors backing the board
            </p>
          </motion.div>
          <SponsorsMarquee />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-xs tracking-widest text-[#cee7d7]/25 uppercase"
          >
            Building empires together · Powering the next generation
          </motion.p>
        </div>
      </section>

      {/* ═══ TEAM SECTION ═══ */}
      <section className="eic2026-team-section relative px-6 py-28 md:px-20">
        {/* Corner bracket decorations */}
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="eic2026-title-deed-bar mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Board of Directors ★
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
              The <span className="eic2026-shimmer-text">Leaders</span>
            </h2>
            <p className="mx-auto max-w-md text-sm tracking-wide text-[#cee7d7]/50">
              The masterminds behind every move on the board
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                role: "Organizing Head",
                name: "Dev Mehrotra",
                email: "dev.m@ecell.in",
                icon: "shield_person",
                color: "#dc2626",
              },
              {
                role: "Events Lead",
                name: "Aalya Jain",
                email: "aalya.j@ecell.in",
                icon: "event_available",
                color: "#2563eb",
              },
              {
                role: "Public Relations",
                name: "Dev Jaiswal",
                email: "dev.j@ecell.in",
                icon: "record_voice_over",
                color: "#eab308",
              },
              {
                role: "Operations",
                name: "Devang Bawri",
                email: "devang.b@ecell.in",
                icon: "engineering",
                color: "#16a34a",
              },
              {
                role: "Technical Head",
                name: "Vishal Singh Patel",
                email: "vishal.p@ecell.in",
                icon: "terminal",
                color: "#9333ea",
              },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="eic2026-team-card group"
              >
                {/* Colored top band */}
                <div
                  className="eic2026-team-card-header"
                  style={{ backgroundColor: person.color }}
                >
                  <span className="text-[8px] font-bold tracking-[0.2em] text-white/80 uppercase">
                    {person.role}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col items-center gap-3 p-5">
                  <div className="flex size-12 items-center justify-center rounded-full border-2 border-[#e5e0d0] bg-[#faf9f0] transition-transform duration-400 group-hover:rotate-12">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: person.color }}
                    >
                      {person.icon}
                    </span>
                  </div>
                  <h4 className="text-center text-sm font-black tracking-wide text-[#1a1a1a] uppercase">
                    {person.name}
                  </h4>
                  <p className="text-[10px] font-semibold tracking-wider text-[#1a6b42]">
                    {person.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="eic2026-footer-section relative px-6 pt-16 pb-8 md:px-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-12 border-b border-[#cee7d7]/10 pb-10 md:flex-row md:items-start md:gap-8">
            {/* Left side: EIC Info */}
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                  className="flex size-14 items-center justify-center rounded-lg p-1 text-[#111111]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src="/EIC/eic-logo1.png"
                    alt="EIC Logo"
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    EIC <span className="text-[#cee7d7]">2026</span>
                  </h3>
                  <p className="max-w-[200px] text-xs leading-relaxed text-slate-400">
                    The ultimate flagship entrepreneurship and innovation
                    platform at NIT Silchar.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: E-Cell Info */}
            <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
              <div className="flex items-center gap-4 md:flex-row-reverse">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex size-14 items-center justify-center rounded-lg p-1"
                >
                  <Image
                    src="/ecelllogo.png"
                    alt="E-Cell Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Organized by <br />
                    <span className="text-[#cee7d7]">E-Cell NIT Silchar</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Empowering creators &amp; innovators.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: Center aligned copyright */}
          <div className="mt-8 text-center">
            <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">
              © 2026 Entrepreneurship &amp; Innovation Challenge · All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
