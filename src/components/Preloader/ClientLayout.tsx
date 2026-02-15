"use client";

import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
const Preloader = dynamic(() => import("@/components/Preloader/Preloader"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
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
    </>
  );
}
