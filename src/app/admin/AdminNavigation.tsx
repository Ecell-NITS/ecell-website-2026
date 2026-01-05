"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Settings, LogOut, Menu, X } from "lucide-react";

interface AdminNavigationProps {
  mobileMenu: boolean;
  active: string;
}

export default function AdminNavigation({
  mobileMenu: _initialMobileMenu,
  active,
}: AdminNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: BarChart3, id: "dashboard" },
    {
      label: "Webinars",
      href: "/admin/webinars",
      icon: BarChart3,
      id: "webinars",
    },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: BarChart3,
      id: "messages",
    },
    {
      label: "Modules",
      href: "/admin/modules",
      icon: BarChart3,
      id: "modules",
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      id: "settings",
    },
  ];

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="4xl:w-80 4xl:p-10 fixed top-0 left-0 hidden h-screen w-64 flex-col border-r border-white/10 bg-gradient-to-b from-[#0f152a] to-[#0a0f1a] p-6 lg:flex 2xl:w-72 2xl:p-8">
        {/* Logo */}
        <h1 className="4xl:text-3xl 4xl:mb-12 mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-bold text-transparent 2xl:mb-10 2xl:text-2xl">
          Admin
        </h1>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 2xl:space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`4xl:px-6 4xl:py-5 4xl:text-lg flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200 2xl:px-5 2xl:py-4 2xl:text-base ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  className="4xl:w-6 4xl:h-6 flex-shrink-0 2xl:h-5 2xl:w-5"
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button className="4xl:px-6 4xl:py-5 4xl:text-lg flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white 2xl:px-5 2xl:py-4 2xl:text-base">
          <LogOut
            size={18}
            className="4xl:w-6 4xl:h-6 flex-shrink-0 2xl:h-5 2xl:w-5"
          />
          Logout
        </button>
      </aside>

      {/* ========== MOBILE/TABLET HEADER WITH HAMBURGER MENU ========== */}
      <div className="fixed top-0 right-0 left-0 z-40 border-b border-white/10 bg-[#0f152a] lg:hidden">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 2xl:px-8 2xl:py-5">
          <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-lg font-bold text-transparent sm:text-xl 2xl:text-2xl">
            Admin
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* ========== MOBILE/TABLET DROPDOWN MENU ========== */}
      {isOpen && (
        <div className="fixed top-[60px] right-0 left-0 z-30 max-h-[calc(100vh-60px)] overflow-y-auto border-b border-white/10 bg-[#0f152a] shadow-lg sm:top-[68px] sm:max-h-[calc(100vh-68px)] lg:hidden">
          <nav className="flex flex-col space-y-2 p-4 sm:p-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200 sm:py-4 sm:text-base 2xl:text-lg ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="2xl:h-5 2xl:w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-2 border-t border-white/10" />

            {/* Logout Button */}
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white sm:py-4 sm:text-base 2xl:text-lg">
              <LogOut size={20} className="2xl:h-5 2xl:w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* ========== CONTENT OFFSET FOR MOBILE HEADER ========== */}
      <div className="h-[60px] sm:h-[68px] lg:hidden" />
    </>
  );
}
