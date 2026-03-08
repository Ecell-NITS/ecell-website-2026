"use client";

import React from "react";
import { motion } from "framer-motion";

const Partners: React.FC = () => {
  const partners = [
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
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903541/s.s_start_qeqsna.jpg",
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
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903741/asap_mhwpys.jpg",
    },
    {
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903755/Yhills_gf0xyb.jpg",
    },
    {
      name: "yen",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903776/yen_sfbsub.jpg",
    },
    {
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903789/Intrnt_l6rvhn.png",
    },
    {
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903802/crop_sow0ew.jpg",
    },
    {
      name: "Unstop",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903816/unstop_jejjrz.png",
    },
    {
      name: "",
      logo: "https://res.cloudinary.com/df0uaz36o/image/upload/v1770903829/Energy_nu1rba.png",
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

  // Quadruple the list for seamless infinite scroll on wide screens
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden bg-[#020617] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      {/* Edge fades for seamless section blending */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-1 h-24 bg-linear-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-24 bg-linear-to-t from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto mb-8 px-6 text-center sm:mb-10 sm:px-8 md:mb-12 lg:mb-14 lg:px-12 xl:mb-16 xl:px-16">
        <p className="mt-4 text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">
          Trusted Partners & Collaborators
        </p>
      </div>

      <div className="mask-linear-fade relative flex overflow-hidden">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex min-w-max items-center gap-20 px-4"
        >
          {marqueeItems.map((partner, i) => (
            <div
              key={i}
              className="group flex cursor-pointer items-center gap-4 transition-all duration-500 hover:opacity-100 lg:opacity-40"
            >
              <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5 p-2 md:h-16 md:w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="md:text-md text-xs font-bold tracking-widest text-white/50 uppercase transition-colors group-hover:text-white sm:text-sm lg:text-lg xl:text-xl">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* <div className="relative z-10 container mx-auto mt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass group relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/10 p-10"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-blue-500 opacity-30" />
            </div>
            <p className="relative text-center text-lg leading-relaxed font-light text-gray-400 italic">
              &quot;We are incredibly fortunate to have{" "}
              <span className="font-semibold text-white not-italic">
                ED Times
              </span>{" "}
              as our sponsor. Their platform&apos;s unique take on youth culture
              and news is unparalleled. We extend our heartfelt gratitude for
              their unwavering support in making our vision a reality.&quot;
            </p>
          </div>
        </motion.div>
      </div> */}
    </section>
  );
};

export default Partners;
