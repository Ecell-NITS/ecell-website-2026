"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Globe } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/ecellnits",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/ecellnits",
    icon: Linkedin,
  },
  {
    name: "Website",
    href: "https://ecellnits.org",
    icon: Globe,
  },
  {
    name: "Email",
    href: "mailto:ecell@nits.ac.in",
    icon: Mail,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[hsl(38_95%_55%/0.1)] bg-[hsl(220_20%_5%)] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="empresario-font-display text-2xl font-bold text-[hsl(38_95%_55%)]">
              EMPRESARIO
            </h3>
            <p className="empresario-font-body mt-1 text-sm text-[hsl(210_20%_95%/0.6)]">
              The Entrepreneurship Module of Tecnoesis 2026
            </p>
            <p className="empresario-font-body mt-2 text-xs text-[hsl(210_20%_95%/0.4)]">
              Organized by E-Cell NIT Silchar
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(38_95%_55%/0.2)] text-[hsl(210_20%_95%/0.6)] transition-all hover:border-[hsl(38_95%_55%/0.5)] hover:text-[hsl(38_95%_55%)]"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 border-t border-[hsl(38_95%_55%/0.1)] pt-8 text-center"
        >
          <p className="empresario-font-body text-xs text-[hsl(210_20%_95%/0.4)]">
            © 2026 E-Cell NIT Silchar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
