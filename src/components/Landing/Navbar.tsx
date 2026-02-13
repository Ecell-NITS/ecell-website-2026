"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events for better performance
      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
        scrollTimeout.current = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "INITIATIVES", href: "/initiatives" },
    { name: "BLOGS", href: "/blogs" },
    { name: "TEAM", href: "/team" },
    { name: "ALUMNI", href: "/alumni" },
    { name: "GALLERY", href: "/gallery" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-[150] w-full transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-[6vw] flex items-center justify-between lg:mx-[2vw]">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/ecelllogo.png"
                alt="E-Cell Logo"
                fill
                sizes="40px"
                className="object-contain brightness-0 invert"
                priority
                placeholder="empty"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest text-gray-300 transition-colors hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 transition-transform hover:scale-110"
            >
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile"
                fill
                sizes="40px"
                className="object-cover"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white lg:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - outside nav to avoid parent backdrop-filter stacking context */}
      {isOpen && (
        <div className="glass animate-in fade-in slide-in-from-top-4 fixed top-[72px] left-0 z-[149] flex w-full flex-col gap-6 border-b border-white/10 px-6 py-8 duration-300 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-bold tracking-widest text-gray-300 transition-colors hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold tracking-widest text-white transition-all hover:bg-blue-700"
          >
            DASHBOARD
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
