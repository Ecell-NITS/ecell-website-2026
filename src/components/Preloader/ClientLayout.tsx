"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Preloader from "@/components/Preloader/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);

  // Called by the Preloader when the animation is fully done
  const handlePreloaderDone = () => {
    setShowContent(true);
  };

  return (
    <>
      <Preloader onDone={handlePreloaderDone} />
      {/* Hide content until preloader finishes to prevent the flash */}
      <div style={{ visibility: showContent ? "visible" : "hidden" }}>
        {children}
      </div>
      {/* Toaster must be outside the visibility wrapper so toasts always render */}
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </>
  );
}
