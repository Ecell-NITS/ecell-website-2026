"use client";

import { useCallback, useEffect } from "react";
import { X } from "lucide-react";
import ModalCardAlumni from "../Modal/ModalCardAlumni";

interface AlumniModalProps {
  activeId: number | null;
  onClose: () => void;
}

export default function AlumniModal({ activeId, onClose }: AlumniModalProps) {
  const stopPropagation = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    [],
  );

  // Close on Escape key
  useEffect(() => {
    if (activeId === null) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeId, onClose]);

  if (activeId === null) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex animate-[fadeIn_0.2s_ease-out_forwards] items-center justify-center bg-black/80 p-4 opacity-0 backdrop-blur-sm"
    >
      <div
        onClick={stopPropagation}
        className="relative max-h-[90vh] w-full max-w-4xl scale-95 animate-[zoom_0.3s_ease-out_forwards] overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1324] opacity-0 shadow-2xl"
      >
        <button
          className="absolute top-4 right-4 z-50 rounded-full bg-white/5 p-2 transition-colors hover:bg-red-500/20 hover:text-red-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <ModalCardAlumni dataid={activeId} />
        </div>
      </div>
    </div>
  );
}
