"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-[hsl(0_72%_51%/0.2)] bg-[hsl(0_0%_7%)] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(0_72%_51%)] bg-[hsl(0_72%_51%/0.2)]">
              <span className="engenius-font-heading text-lg font-bold text-[hsl(0_72%_51%)]">
                E
              </span>
            </div>
            <span className="engenius-font-heading text-lg tracking-wider text-[hsl(40_20%_95%)]">
              E-CELL <span className="text-[hsl(0_72%_51%)]">NIT SILCHAR</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-[hsl(40_20%_95%/0.5)]"
          >
            Made with{" "}
            <Heart className="h-4 w-4 fill-[hsl(0_72%_51%)] text-[hsl(0_72%_51%)]" />{" "}
            by E-Cell NIT Silchar
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-[hsl(40_20%_95%/0.5)]"
          >
            © 2025 ENGENIUS. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
