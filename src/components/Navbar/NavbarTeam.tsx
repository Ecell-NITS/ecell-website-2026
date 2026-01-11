"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavbarTeam() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "INITIATIVES", path: "/initiatives" },
    { name: "EVENTS", path: "/events" },
    { name: "BLOGS", path: "/blogs" },
    { name: "TEAM", path: "/team" },
    { name: "GALLERY", path: "/gallery" },
  ];

  return (
    <nav className="glass fixed top-0 z-50 w-full border-b border-white/10 py-4 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            alt="E-Cell Logo"
            width={120}
            height={40}
            className="h-10 w-auto brightness-0 invert"
            src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path === "/team" && pathname.startsWith("/team"));

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs font-bold tracking-widest transition-colors ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 transition-transform hover:scale-110">
            <Image
              alt="Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </div>
        </div>

        <button
          className="text-white focus:outline-none lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="glass absolute top-full left-0 flex w-full flex-col gap-6 border-b border-white/10 bg-[#020617] p-6 shadow-2xl lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-bold tracking-widest ${
                pathname === link.path ? "text-blue-400" : "text-gray-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
