"use client";
import { useState } from "react";

export default function SortDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Latest Articles", value: "Latest" },
    { label: "Past Classics", value: "Past" },
    { label: "Most Popular", value: "Most Popular" },
  ];

  return (
    <div className="relative w-full shrink-0 lg:w-72">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 px-8 py-6 text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase transition-all hover:border-blue-500/30 hover:text-white"
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M2 5h20" />
            <path d="M6 12h12" />
            <path d="M9 19h6" />
          </svg>

          <span>{sortBy}</span>
        </div>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-blue-500 transition-transform duration-500 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="glass absolute top-full right-0 left-0 z-50 mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setSortBy(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-8 py-5 text-left text-[10px] font-black tracking-widest uppercase transition-all ${
                sortBy === opt.value
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt.label}

              {sortBy === opt.value && (
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
