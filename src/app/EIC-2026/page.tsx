"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "~/styles/eic2026.css";

/* ─── 3D Dice Component ─── */
function MonopolyDice({ className = "" }: { className?: string }) {
  return (
    <div className={`eic2026-dice-container ${className}`}>
      <div className="eic2026-dice">
        <div className="eic2026-dice-face">⚀</div>
        <div className="eic2026-dice-face">⚁</div>
        <div className="eic2026-dice-face">⚂</div>
        <div className="eic2026-dice-face">⚃</div>
        <div className="eic2026-dice-face">⚄</div>
        <div className="eic2026-dice-face">⚅</div>
      </div>
    </div>
  );
}

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
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] whitespace-nowrap">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-4 py-4 md:gap-8 md:py-6"
      >
        {[...images, ...images, ...images].map((src, index) => (
          <div
            key={index}
            className="group relative h-40 w-60 shrink-0 overflow-hidden rounded-xl border border-[#cee7d7]/20 bg-[#111111] transition-colors hover:border-[#cee7d7]/60 sm:h-48 sm:w-72 md:h-64 md:w-96"
          >
            <Image
              src={src}
              alt={`Gallery image ${index}`}
              fill
              className="transform object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
    <div className="relative w-full space-y-4 md:space-y-8">
      <Marquee images={row1} direction="left" speed={60} />
      <Marquee images={row2} direction="right" speed={60} />
    </div>
  );
}

function SponsorsMarquee() {
  const duplicatedSponsors = [...sponsors, ...sponsors];
  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Fade Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-8"
      >
        {duplicatedSponsors.map((sponsor, i) => (
          <div
            key={`${sponsor.name}-${i}`}
            className="group relative flex h-32 w-48 flex-shrink-0 items-center justify-center rounded-xl border border-[#cee7d7]/10 bg-[#111111] shadow-lg transition-colors hover:border-[#cee7d7]/40 sm:h-40 sm:w-56"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#cee7d7]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="z-10 max-h-[70%] max-w-[80%] object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Floating Monopoly Pieces ─── */
function FloatingPieces() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dollar signs */}
      <div className="eic2026-float eic2026-float-delay-1 absolute top-[15%] left-[5%] hidden text-4xl text-[#cee7d7]/20 md:block">
        💰
      </div>
      <div className="eic2026-float-slow eic2026-float-delay-3 absolute top-[25%] right-[8%] text-3xl text-[#cee7d7]/15">
        🎩
      </div>
      <div className="eic2026-float-reverse eic2026-float-delay-2 absolute bottom-[20%] left-[15%] hidden text-5xl text-[#cee7d7]/10 lg:block">
        🏠
      </div>
      <div className="eic2026-float eic2026-float-delay-4 absolute right-[12%] bottom-[30%] text-3xl text-[#cee7d7]/20">
        💎
      </div>
      <div className="eic2026-float-slow absolute top-[10%] left-[50%] hidden text-2xl text-[#cee7d7]/15 md:block">
        🎲
      </div>
      <div className="eic2026-float-reverse eic2026-float-delay-1 absolute top-[60%] right-[25%] text-4xl text-[#cee7d7]/10">
        🏦
      </div>
    </div>
  );
}

/* ─── Event Card Component ─── */
function EventCard({
  href,
  title,
  icon,
  description,
  rent,
  borderColor,
  propertyType,
  delay = 0,
}: {
  href: string;
  title: string;
  icon: string;
  description: string;
  rent: string;
  borderColor: string;
  propertyType: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Link
        href={href}
        className="eic2026-card-3d eic2026-property-ribbon group block overflow-hidden rounded-xl border-t-8 bg-white shadow-xl dark:bg-[#0d0d0d]"
        style={{ borderTopColor: borderColor }}
      >
        <div className="border-b border-slate-100 p-6 text-center dark:border-zinc-800">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {propertyType}
          </span>
          <h3 className="mt-2 text-xl font-black text-[#111111] uppercase dark:text-white">
            {title}
          </h3>
        </div>
        <div className="flex flex-col items-center gap-4 p-6">
          <motion.div
            whileHover={{ rotateY: 180, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="material-symbols-outlined text-3xl text-[#cee7d7]">
              {icon}
            </span>
          </motion.div>
          <p className="text-center text-sm text-slate-500 italic">
            {description}
          </p>
          <div className="flex w-full items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800">
            <span className="text-xs font-bold text-[#cee7d7]">
              RENT: {rent}
            </span>
            <motion.span
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="material-symbols-outlined text-slate-300"
            >
              info
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

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
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
            className="flex size-8 items-center justify-center rounded-lg bg-[#cee7d7] text-[#111111]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="material-symbols-outlined font-bold">
              account_balance
            </span>
          </motion.div>
          <h2 className="text-xl font-black tracking-tighter text-white">
            EIC <span className="text-[#cee7d7]">2026</span>
          </h2>
        </div>
        <nav className="hidden items-center gap-10 md:flex">
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#events"
          >
            Events
          </a>
          <a
            className="text-sm font-semibold transition-colors hover:text-[#cee7d7]"
            href="#about"
          >
            About
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
        <Link
          href="/"
          className="rounded-lg bg-[#cee7d7] px-5 py-2 text-sm font-bold text-[#111111] transition-all hover:bg-[#cee7d7]/90 sm:px-6"
        >
          Home
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

        {/* Floating 3D Elements */}
        <FloatingPieces />

        {/* 3D Dice - Left */}
        <div className="eic2026-float-slow absolute top-[30%] left-[8%] hidden lg:block">
          <MonopolyDice />
        </div>

        {/* 3D Dice - Right */}
        <div className="eic2026-float eic2026-float-delay-2 absolute top-[40%] right-[10%] hidden lg:block">
          <MonopolyDice />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto mt-20 max-w-4xl px-4 text-center"
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
            className="mb-4 text-4xl leading-none font-black tracking-tight text-white sm:mb-6 sm:text-5xl md:text-7xl lg:text-8xl"
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
              Learn More
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
        className="eic2026-board-pattern relative px-6 py-24 md:px-20"
        id="about"
      >
        <FloatingPieces />
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eic2026-perspective"
          >
            <div className="eic2026-monopoly-shadow rounded-3xl border border-[#cee7d7]/20 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-6 sm:p-8 md:p-16">
              <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 text-3xl font-black text-white sm:text-4xl md:mb-8 md:text-5xl"
                  >
                    The Flagship{" "}
                    <span className="eic2026-shimmer-text">Vision</span>
                  </motion.h2>
                  <p className="mb-8 text-base leading-relaxed text-slate-400 sm:text-lg md:mb-10">
                    The board is set and the bank is open as E-Cell NIT Silchar
                    presents EIC 2026. Six branches step onto the board in a
                    Monopoly-style arena where every challenge is a move toward
                    campus dominance. From strategic negotiations to
                    problem-solving under pressure, every round demands sharp
                    decisions and bold moves. Roll the dice, outthink the
                    competition, and build your own entrepreneurial empire.
                  </p>
                  <div className="eic2026-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                    {[
                      {
                        icon: "lightbulb",
                        title: "Innovation",
                        desc: "Fresh ideas and lightbulbs",
                      },
                      {
                        icon: "extension",
                        title: "Strategy",
                        desc: "Strategic game pieces",
                      },
                      {
                        icon: "rocket_launch",
                        title: "Growth",
                        desc: "Rocket-fueled scaling",
                      },
                      {
                        icon: "payments",
                        title: "Capital",
                        desc: "Gold coin rewards",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        className="eic2026-gold-border flex flex-col gap-3 rounded-2xl bg-white/5 p-4"
                      >
                        <span className="material-symbols-outlined text-3xl text-[#cee7d7]">
                          {item.icon}
                        </span>
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  initial={{ rotate: 3 }}
                  className="relative aspect-square"
                >
                  <div className="eic2026-glow-pulse absolute inset-0 rounded-full bg-[#cee7d7]/20 blur-3xl" />
                  <div className="relative h-full w-full rotate-3 transform overflow-hidden rounded-2xl border border-[#cee7d7]/30 transition-transform hover:rotate-0">
                    <Image
                      src="/images/eic2026/team_collab.webp"
                      alt="Team collaborating"
                      fill
                      className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EVENTS SECTION ═══ */}
      <section
        className="px-6 py-24 md:px-20"
        style={{
          background:
            "linear-gradient(180deg, #111111 0%, #cee7d7 30%, #cee7d7 70%, #111111 100%)",
        }}
        id="events"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-black text-[#0d0d0d] md:text-5xl">
              Board Estates
            </h2>
            <p className="text-slate-600">
              Claim your territory in these exclusive challenge events
            </p>
          </motion.div>

          <div className="eic2026-perspective grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <EventCard
              href="/EIC-2026/campus-capitalist"
              title="Campus Capitalist"
              icon="real_estate_agent"
              description="Pitch real campus solutions using your branch expertise."
              rent="$1500"
              borderColor="#dc2626"
              propertyType="Premium Property"
              delay={0}
            />
            <EventCard
              href="/EIC-2026/business-quiz"
              title="Business Quiz"
              icon="quiz"
              description="Test your knowledge of markets, brands & startups."
              rent="$1200"
              borderColor="#2563eb"
              propertyType="Utility Property"
              delay={0.1}
            />
            <EventCard
              href="/EIC-2026/chairmans-conclave"
              title="Chairman's Conclave"
              icon="forum"
              description="High-stakes group discussion as corporate tycoons."
              rent="$1400"
              borderColor="#eab308"
              propertyType="Boardroom Property"
              delay={0.2}
            />
            <EventCard
              href="/EIC-2026/adoshuffle"
              title="AdoShuffle"
              icon="campaign"
              description="Reimagine famous brands with wild what-if concepts."
              rent="$800"
              borderColor="#16a34a"
              propertyType="Media Property"
              delay={0.3}
            />
            <EventCard
              href="/EIC-2026/the-deal-room"
              title="The Deal Room"
              icon="lock_open"
              description="Solve puzzles, uncover clues, and build your empire."
              rent="$2000"
              borderColor="#9333ea"
              propertyType="Luxury Property"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <section
        className="eic2026-board-pattern relative overflow-hidden px-6 py-24 md:px-20"
        id="gallery"
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center text-4xl font-black text-white"
          >
            The Game in <span className="eic2026-shimmer-text">Motion</span>
          </motion.h2>
          <GalleryContinuous />
        </div>
      </section>

      {/* ═══ SPONSORS SECTION ═══ */}
      <section
        className="px-6 py-20"
        id="sponsors"
        style={{ background: "#0d0d0d" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-sm font-bold tracking-[0.3em] text-[#cee7d7] uppercase"
          >
            Our Strategic Partners
          </motion.h3>
          <SponsorsMarquee />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-8 border-[#0d0d0d] bg-[#111111] px-6 pt-20 pb-10 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-5">
            {[
              {
                role: "Organizing Head",
                name: "Dev Mehrotra",
                email: "dev.m@ecell.in",
              },
              {
                role: "Events Lead",
                name: "Aalya Jain",
                email: "aalya.j@ecell.in",
              },
              {
                role: "Public Relations",
                name: "Dev Jaiswal",
                email: "dev.j@ecell.in",
              },
              {
                role: "Operations",
                name: "Devang Bawri",
                email: "devang.b@ecell.in",
              },
              {
                role: "Technical Head",
                name: "Vishal Singh Patel",
                email: "vishal.p@ecell.in",
              },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col gap-4 rounded-xl border-l-4 border-[#cee7d7] bg-[#0d0d0d] p-6"
              >
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  {person.role}
                </p>
                <h4 className="text-lg font-bold text-white">{person.name}</h4>
                <p className="text-xs text-[#cee7d7]">{person.email}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between border-t border-white/5 pt-10 md:flex-row">
            <div className="mb-6 flex items-center gap-4 md:mb-0">
              <div className="flex size-6 items-center justify-center rounded bg-[#cee7d7] text-[10px] font-black text-[#111111]">
                E
              </div>
              <p className="text-sm text-slate-500">
                Organized by{" "}
                <span className="font-bold text-white">E-Cell</span>
              </p>
            </div>
            <div className="flex gap-8">
              <a
                className="text-slate-500 transition-colors hover:text-[#cee7d7]"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
              <a
                className="text-slate-500 transition-colors hover:text-[#cee7d7]"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                className="text-slate-500 transition-colors hover:text-[#cee7d7]"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
            </div>
            <p className="mt-6 text-[10px] tracking-widest text-slate-500 uppercase md:mt-0">
              © 2026 EIC CHALLENGE. ALL ASSETS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
