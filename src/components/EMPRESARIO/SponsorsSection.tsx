"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="sponsors"
      className="relative overflow-hidden border-y border-[hsl(195_100%_50%/0.1)] bg-[hsl(220_30%_3%)] py-24"
    >
      <div className="container mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="eminence-font-display mb-2 block tracking-[0.2em] text-[hsl(195_100%_50%)] uppercase">
            Our Supporters
          </span>
          <h2 className="eminence-font-display text-4xl text-[hsl(40_20%_95%)] md:text-5xl">
            OFFICIAL{" "}
            <span className="eminence-text-gradient-electric">PARTNERS</span>
          </h2>
        </motion.div>
      </div>

      <div className="eminence-mask-gradient-x relative flex overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-16 pr-16"
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="group relative flex-shrink-0"
            >
              <div className="absolute -inset-4 rounded-full bg-[hsl(195_100%_50%/0.05)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-12 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-16"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(220_30%_3%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(220_30%_3%)] to-transparent" />
    </section>
  );
};

export default SponsorsSection;
