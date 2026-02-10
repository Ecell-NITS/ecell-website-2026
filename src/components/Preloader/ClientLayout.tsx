"use client";

import dynamic from "next/dynamic";

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
    </>
  );
}
