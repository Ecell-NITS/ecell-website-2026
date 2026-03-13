"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Preloader from "@/components/Preloader/Preloader";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEicRoute = pathname?.startsWith("/EIC-2026");

  // For EIC routes, start with showContent=false so we can show our custom loader.
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isEicRoute) {
      // Simulate a network/asset loading delay specifically for the EIC route
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2000); // 2 second mock load for animation to play
      return () => clearTimeout(timer);
    }
  }, [isEicRoute]);

  // Called by the global Preloader when its animation is fully done
  const handlePreloaderDone = () => {
    setShowContent(true);
  };

  return (
    <>
      {/* 1. Global Preloader for non-EIC routes */}
      {!isEicRoute && <Preloader onDone={handlePreloaderDone} />}

      {/* 2. Custom Preloader for EIC routes */}
      {isEicRoute && !showContent && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#111111] font-sans text-[#cee7d7] antialiased">
          {/* Subtle radial background matching the Monopoly board feel */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,107,66,0.15)_0%,transparent_60%)]" />

          {/* Main Container */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10">
            {/* Animated Logo Display */}
            <div className="relative mt-[-40px] flex h-52 w-52 items-center justify-center">
              {/* Animated Rings */}
              <div
                className="absolute inset-0 m-auto h-36 w-36 animate-ping rounded-full border-2 border-[#cee7d7]/20"
                style={{ animationDuration: "2s" }}
              />

              <div
                className="absolute inset-0 m-auto h-44 w-44 animate-spin rounded-full border-y-[3px] border-r-[1px] border-l-[1px] border-[#cee7d7]/40 border-y-transparent"
                style={{ animationDuration: "3s" }}
              />

              <div
                className="absolute inset-0 m-auto h-52 w-52 animate-spin rounded-full border-x-[4px] border-y-[1px] border-[#1a6b42]/60 border-x-transparent"
                style={{
                  animationDuration: "4s",
                  animationDirection: "reverse",
                }}
              />

              {/* Central Logo Box */}
              <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center">
                <Image
                  src="/EIC/eic-logo1.png"
                  alt="EIC Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="eic2026-shimmer-text flex items-baseline text-3xl font-black tracking-widest text-white uppercase">
                Loading
                <span className="inline-flex w-6 overflow-hidden text-left">
                  <span className="animate-pulse">...</span>
                </span>
              </h2>
              <p className="mt-2 text-xs font-bold tracking-[0.4em] text-[#cee7d7]/70 uppercase">
                Preparing the Board
              </p>
            </div>
          </div>

          {/* Footer Branding for E-Cell */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <p className="text-[9px] font-black tracking-[0.3em] text-slate-500 uppercase">
              Organized By
            </p>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm">
                <Image
                  src="/ecelllogo.png"
                  alt="E-Cell Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-bold tracking-wider text-white">
                E-Cell <span className="text-[#cee7d7]">NIT Silchar</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Page Content */}
      <div style={{ visibility: showContent ? "visible" : "hidden" }}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111827",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </div>
    </>
  );
}
