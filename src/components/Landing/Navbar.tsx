"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/", isRoute: true },
    { name: "ABOUT US", href: "/#about", isRoute: true },
    { name: "INITIATIVES", href: "/#initiatives", isRoute: true },
    { name: "EVENTS", href: "#events", isRoute: false },
    { name: "TEAM", href: "#", isRoute: false },
    { name: "GALLERY", href: "/#gallery", isRoute: true },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-[6vw] flex items-center justify-between lg:mx-[2vw]">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ecelllogo.png"
            alt="E-Cell Logo"
            className="h-10 w-auto brightness-0 invert"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <span className="hidden text-xl font-bold text-white">E-CELL</span>
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
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 transition-transform hover:scale-110">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="glass animate-in fade-in slide-in-from-top-4 absolute top-full left-0 flex w-full flex-col gap-6 border-b border-white/10 px-6 py-8 duration-300 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold tracking-widest text-gray-300 transition-colors hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
