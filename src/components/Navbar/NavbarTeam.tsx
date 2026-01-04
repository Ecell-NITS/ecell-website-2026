"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { Poppins } from "next/font/google";

import "./NavbarTeam.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function NavbarTeam() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [expanded]);

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Our Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav
      className={`navbar-fixed fixed top-0 left-0 z-50 ${poppins.className} ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-10">
        {/* --- DESKTOP LOGO --- */}
        <Link
          href="/"
          className="relative z-50 flex-shrink-0 !no-underline"
          aria-label="E-Cell Home"
          onClick={() => setExpanded(false)}
        >
          <img
            className="nav-logo-img object-contain"
            src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
            alt="E-Cell Logo"
          />
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden items-center gap-[48px] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link-item ${isActive ? "active" : ""}`}
              >
                {link.name}
                {isActive && <span className="active-nav-pill" />}
              </Link>
            );
          })}

          <Link
            href="/signup"
            className="join-us-btn group"
            aria-label="Join Us"
          >
            <div className="join-us-fill" />
            <div className="join-us-border-ring" />
            <span className="join-us-text">Join Us</span>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        <button
          className={`relative z-50 p-2 text-white transition-opacity duration-300 focus:outline-none md:hidden ${
            expanded ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onClick={() => setExpanded(true)}
          aria-label="Open Menu"
        >
          <GiHamburgerMenu size={26} />
        </button>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {/* CRITICAL FIX: 
          1. z-[9999] ensures it is on top of everything.
          2. inline style backgroundColor: "#000000 !important" forces solid black.
      */}
      <div
        className={`fixed inset-0 z-[9999] flex h-screen w-screen flex-col transition-all duration-300 md:hidden ${
          expanded
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        style={{ backgroundColor: "#000000" }}
      >
        {/* 1. HEADER ROW (Logo Left + Close Button Right) */}
        <div className="flex h-[93px] w-full flex-shrink-0 items-center justify-between px-6">
          {/* Logo inside Menu */}
          <Link href="/" onClick={() => setExpanded(false)}>
            <img
              className="h-auto w-[70px] object-contain"
              src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
              alt="E-Cell Logo"
            />
          </Link>

          {/* Close 'X' Button */}
          <button
            className="p-2 text-white focus:outline-none"
            onClick={() => setExpanded(false)}
            aria-label="Close Menu"
          >
            <ImCross size={20} />
          </button>
        </div>

        {/* 2. MENU LINKS (Centered Vertically) */}
        <div className="flex flex-grow flex-col items-center justify-center gap-10 pb-20">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setExpanded(false)}
                className={`text-[24px] font-bold tracking-wide !no-underline transition-colors duration-300 ${
                  isActive
                    ? "text-[#3b82f6]"
                    : "text-[#3b82f6] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* 3. JOIN US BUTTON */}
          <Link
            href="/signup"
            onClick={() => setExpanded(false)}
            className="join-us-btn mt-4"
            style={{ width: "160px", height: "56px" }}
          >
            {/* Transparent fill so ring shows */}
            <div
              className="join-us-fill"
              style={{ backgroundColor: "transparent" }}
            />
            <div className="join-us-border-ring" />
            <span className="join-us-text text-lg">Join Us</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
