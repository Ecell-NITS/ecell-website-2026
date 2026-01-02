"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .spin-border-button {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          border-radius: 9999px;
          padding: 1.5px;
          text-decoration: none;
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .spin-border-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          z-index: -1;
          background: conic-gradient(
            from 0deg,
            transparent 280deg,
            #3b82f6 320deg,
            #60a5fa 360deg
          );
          animation: rotate 4s linear infinite;
          transform: translate(-50%, -50%);
        }

        .button-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background-color: #020617;
          box-shadow: inset 0 0 10px rgba(6, 182, 212, 0.2);
          background-image: radial-gradient(
            circle at center,
            rgba(30, 58, 138, 0.3) 0%,
            rgba(2, 6, 23, 1) 80%
          );
        }

        .spin-border-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-blue-500/10 bg-[#020617]/70 px-6 py-5 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-[#020617]/40 md:px-10">
        {/* LOGO */}
        <div className="relative z-50 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden md:h-12 md:w-12 2xl:h-16 2xl:w-16">
              <Image
                src="/logo.png"
                alt="E-Cell Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-wide text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] md:text-2xl 2xl:text-3xl">
              E-Cell NITS
            </span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-8 text-sm font-semibold text-gray-300 md:flex lg:gap-10 2xl:gap-16 2xl:text-lg">
          <Link
            href="#about"
            className="transition-all hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
          >
            About Us
          </Link>
          <Link
            href="#events"
            className="transition-all hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
          >
            Events
          </Link>
          <Link
            href="./team"
            className="transition-all hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
          >
            Our Team
          </Link>
          <Link
            href="./gallery"
            className="transition-all hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
          >
            Gallery
          </Link>

          <Link href="/join" className="spin-border-button">
            <span className="button-inner px-8 py-2.5 text-xs font-bold tracking-wider text-white lg:px-10 lg:py-3 lg:text-sm 2xl:px-12 2xl:py-4 2xl:text-base">
              JOIN US
            </span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON - High Z-Index to stay above overlay if needed, or overlay covers it and we put a close button inside */}
        <div className="z-[70] md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8 text-cyan-400" />
            ) : (
              <Menu className="h-8 w-8 text-cyan-400" />
            )}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {/* Fixed z-index to 60 to cover the navbar (z-50) */}
        <div
          className={`fixed inset-0 z-[60] flex h-screen w-screen flex-col items-center justify-center gap-8 bg-[#020617] transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute inset-0 bg-blue-900/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]"></div>

          <Link
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="z-10 text-3xl font-bold text-gray-300 transition-colors hover:text-cyan-400"
          >
            About Us
          </Link>
          <Link
            href="#events"
            onClick={() => setIsMobileMenuOpen(false)}
            className="z-10 text-3xl font-bold text-gray-300 transition-colors hover:text-cyan-400"
          >
            Events
          </Link>
          <Link
            href="./team"
            onClick={() => setIsMobileMenuOpen(false)}
            className="z-10 text-3xl font-bold text-gray-300 transition-colors hover:text-cyan-400"
          >
            Our Team
          </Link>
          <Link
            href="./gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="z-10 text-3xl font-bold text-gray-300 transition-colors hover:text-cyan-400"
          >
            Gallery
          </Link>

          <div className="z-10 mt-8" onClick={() => setIsMobileMenuOpen(false)}>
            <Link
              href="/join"
              className="spin-border-button scale-125 transform"
            >
              <span className="button-inner px-12 py-4 text-lg font-bold tracking-wider text-white">
                JOIN US
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
