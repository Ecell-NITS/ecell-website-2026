"use client";

import { useState, useEffect } from "react";
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
    </>
  );
}
