"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, ExternalLink } from "lucide-react";
import SoundWave from "./SoundWave";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[hsl(0_0%_20%)] py-16">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[hsl(141_73%_42%/0.05)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-12 grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(141_73%_42%)]">
                <span className="text-lg font-bold text-black">E</span>
              </div>
              <div>
                <p className="font-bold text-white">E-Cell NIT Silchar</p>
                <p className="text-xs text-[hsl(0_0%_70%)]">
                  Entrepreneurship Cell
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[hsl(0_0%_70%)]">
              Fostering the spirit of entrepreneurship and innovation at NIT
              Silchar. Building tomorrow&apos;s leaders, today.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Register Now",
                "Event Schedule",
                "Past Events",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-1 text-sm text-[hsl(0_0%_70%)] transition-colors hover:text-[hsl(141_73%_42%)]"
                  >
                    {link}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4 font-bold text-white">Connect With Us</h3>
            <div className="mb-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_11%)] text-[hsl(0_0%_70%)] transition-colors hover:border-[hsl(141_73%_42%)] hover:text-[hsl(141_73%_42%)]"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <SoundWave />
              <span className="text-sm text-[hsl(0_0%_70%)]">
                Live @ NIT Silchar
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[hsl(0_0%_20%)] pt-8 md:flex-row">
          <p className="text-sm text-[hsl(0_0%_70%)]">
            © 2025 E-Cell NIT Silchar. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[hsl(0_0%_70%)]">Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[hsl(141_73%_42%)]"
            >
              ♪
            </motion.span>
            <span className="text-sm text-[hsl(0_0%_70%)]">by E-Cell Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
