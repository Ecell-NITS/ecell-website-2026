"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Experiences", href: "#experiences" },
    { name: "Sponsors", href: "#sponsors" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[hsl(0_72%_51%/0.2)] bg-[hsl(0_0%_4%/0.95)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(0_72%_51%)] bg-[hsl(0_72%_51%/0.2)]">
              <span className="engenius-font-heading text-lg font-bold text-[hsl(0_72%_51%)]">
                E
              </span>
            </div>
            <span className="engenius-font-heading text-xl tracking-wider text-[hsl(40_20%_95%)]">
              E-CELL <span className="text-[hsl(0_72%_51%)]">NIT SILCHAR</span>
            </span>
          </motion.a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="engenius-font-heading group relative text-sm tracking-widest text-[hsl(40_20%_95%/0.8)] transition-colors hover:text-[hsl(0_72%_51%)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[hsl(0_72%_51%)] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
