"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

const SponsorsSection = () => {
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="relative overflow-hidden py-16">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(141_73%_42%/0.05)] to-transparent" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 px-4 text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          Our Sponsors
        </h2>
        <p className="flex items-center justify-center gap-2 font-medium text-[hsl(141_73%_42%)]">
          <Sparkles className="h-4 w-4" />
          Powered by Innovation
          <Sparkles className="h-4 w-4" />
        </p>
      </motion.div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade Edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(0_0%_7%)] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[hsl(0_0%_7%)] to-transparent" />

        {/* Marquee Track */}
        <div className="eic-marquee-track flex w-max gap-6">
          {duplicatedSponsors.map((sponsor, index) => (
            <motion.div
              key={`${sponsor.name}-${index}`}
              whileHover={{ scale: 1.08, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex-shrink-0"
            >
              <div className="relative h-48 w-48 overflow-hidden rounded-xl md:h-56 md:w-56">
                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 40px hsla(141, 76%, 48%, 0.5), inset 0 0 20px hsla(141, 76%, 48%, 0.1)",
                  }}
                />

                {/* Card Background */}
                <div className="flex h-full w-full items-center justify-center border border-[hsl(0_0%_20%/0.3)] bg-gradient-to-br from-[hsl(0_0%_11%/0.8)] to-[hsl(0_0%_7%/0.6)] transition-all duration-500 group-hover:border-[hsl(141_73%_42%/0.4)]">
                  {/* Sponsor Logo Placeholder */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-[hsl(141_73%_42%/0.2)] bg-gradient-to-br from-[hsl(141_73%_42%/0.2)] to-[hsl(141_73%_42%/0.05)] text-2xl font-bold text-[hsl(141_73%_42%/0.6)] transition-colors duration-300 group-hover:text-[hsl(141_73%_42%)]">
                      {sponsor.name.charAt(0)}
                    </div>
                    <span className="text-sm text-[hsl(0_0%_70%)] transition-colors duration-300 group-hover:text-white">
                      {sponsor.name}
                    </span>
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(141_73%_42%/0.1)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(220_30%_3%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(220_30%_3%)] to-transparent" />
    </section>
  );
};

export default SponsorsSection;
