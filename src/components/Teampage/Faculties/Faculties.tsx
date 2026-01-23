"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { facultiesData } from "@/data/faculties";
import TeamCard from "@/components/Teampage/TeamCard";
import ModalCardFaculties from "../Modal/ModalCardFaculties";

interface FacultiesModalState {
  open: boolean;
  id: number | null;
}

export default function Faculties() {
  const [modal, setModal] = useState<FacultiesModalState>({
    open: false,
    id: null,
  });

  const openModal = (id: number) => {
    setModal({ open: true, id });
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3 text-blue-500">
            <Sparkles className="animate-pulse" size={20} />
            <span className="text-xs font-black tracking-[0.4em] uppercase">
              Guiding Lights
            </span>
          </div>
          <h2 className="text-center text-5xl leading-none font-black tracking-tighter text-white uppercase italic md:text-7xl">
            Our Mentors
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {facultiesData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => openModal(member.id)}
              className="cursor-pointer"
            >
              {/* Fixed: || -> ?? */}
              <TeamCard
                name={member.name}
                role={member.rank}
                image={member.image ?? ""}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {modal.open && modal.id !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1324] shadow-2xl"
              >
                <button
                  className="absolute top-4 right-4 z-50 rounded-full bg-white/5 p-2 transition-colors hover:bg-red-500/20 hover:text-red-500"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>

                <div className="p-6">
                  <ModalCardFaculties dataid={modal.id} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
