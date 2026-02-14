"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();


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
            {user ? (
              <Link
                href="/dashboard"
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 transition-transform hover:scale-110"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-xs font-bold tracking-widest text-gray-300 hover:text-blue-400"
                >
                  LOGIN
                </Link>
              </div>
            )}

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
          {user ? (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold tracking-widest text-gray-300 hover:text-blue-400"
            >
              DASHBOARD
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold tracking-widest text-gray-300 hover:text-blue-400"
              >
                LOGIN
              </Link>
              
            </>
          )}

        </div>
      )}
    </>
  );
};

export default Navbar;
