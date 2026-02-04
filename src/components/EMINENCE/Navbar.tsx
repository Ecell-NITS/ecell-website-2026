"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 15, 26, 0)", "rgba(10, 15, 26, 0.95)"],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Events", "Gallery", "Sponsors"];

  return (
    <motion.nav
      className="fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-300"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/EMINENCE" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[hsl(195_100%_50%)]">
              <span className="eminence-font-display text-sm font-bold text-[hsl(195_100%_50%)]">
                E
              </span>
            </div>
            <span className="eminence-font-display hidden text-xl font-bold text-[hsl(40_20%_95%)] sm:block">
              EMINENCE
            </span>
          </Link>
        </motion.div>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative font-medium text-[hsl(40_20%_95%/0.7)] transition-colors hover:text-[hsl(195_100%_50%)]"
              whileHover={{ y: -2 }}
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[hsl(195_100%_50%)] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Home button instead of Register */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className={`eminence-font-display rounded-lg px-6 py-2 text-sm tracking-wider uppercase transition-all ${
              isScrolled
                ? "bg-[hsl(195_100%_50%)] text-[hsl(220_30%_6%)]"
                : "border border-[hsl(195_100%_50%/0.5)] text-[hsl(195_100%_50%)] hover:bg-[hsl(195_100%_50%/0.1)]"
            }`}
          >
            Home
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
