import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import Link from "next/link";

interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function ErrorPopup({ isOpen, onClose, message }: ErrorPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#060B19] p-6 shadow-2xl sm:p-8"
          >
            <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <X className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-center text-2xl font-bold text-white mb-2">Submission Failed</h3>
            <p className="text-center text-gray-400 mb-8 leading-relaxed">
              {message?.toLowerCase().includes("validation") 
                ? "There was an issue validating your application fields with the server." 
                : (message || "Failed to submit application. Please try again.")}
            </p>
            
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 mb-8">
              <p className="text-sm font-medium text-gray-400 mb-4 text-center">Please reach out to us directly for assistance:</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+917002431874" className="flex items-center justify-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-white transition-colors hover:bg-white/10">
                  <Phone className="h-4 w-4 text-[#5c3cff]" />
                  <span className="font-semibold">+91 7002431874</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contactus" onClick={onClose} className="flex-1 rounded-xl bg-[#5c3cff] py-3 text-center font-semibold text-white transition-colors hover:bg-[#4a30cc]">
                Go to Contact Us
              </Link>
              <button onClick={onClose} className="flex-1 rounded-xl bg-white/10 py-3 text-center font-semibold text-white transition-colors hover:bg-white/20">
                Try Again
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
