"use client";

import { motion } from "framer-motion";

export default function EICPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="eic-page min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
