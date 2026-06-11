/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
type Speaker = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  fullImage: string;
};

// --- Data ---
const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Sabyasachi Mukherjee",
    role: "Business Leader ",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120356/sabyasachi-mukherjee_jctz1s.png",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120356/sabyasachi-mukherjee_jctz1s.png",
  },
  {
    id: 2,
    name: "Vivek Poddar ",
    role: "Industry Expert & Entrepreneur",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120354/vivek-podder_jjv9p6.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120354/vivek-podder_jjv9p6.jpg",
  },
  {
    id: 3,
    name: "Utkarsh Bhatt",
    role: " Co-Founder, Roghaari",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120357/utkarsh_bhatt_t2nfz6.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120357/utkarsh_bhatt_t2nfz6.jpg",
  },
  {
    id: 4,
    name: "Pushkar Raj Thakur",
    role: "CEO & Founder at coursedes learning solution pvt ltd.",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120352/pushkar-raj_wbyigi.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120352/pushkar-raj_wbyigi.jpg",
  },
  {
    id: 5,
    name: "Shantanu Jain",
    role: "Co-Founder at Readon.in",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/shantanu_jain_ib5t6g.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/shantanu_jain_ib5t6g.jpg",
  },
  {
    id: 6,
    name: "Sankar Bora",
    role: "Founder & COO at DEALSHARE.IN",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120346/sankar_bora_dxfjgk.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120346/sankar_bora_dxfjgk.jpg",
  },
];

// --- Sub-Component ---
const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="relative flex h-[160px] overflow-hidden rounded-2xl border border-white/10 bg-[#060B19] transition-transform duration-300 hover:-translate-y-1 hover:border-[#5c3cff]/50 hover:shadow-[0_0_30px_-10px_rgba(92,60,255,0.3)] sm:h-[180px] md:h-[200px]">
      
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#5c3cff]/10 via-transparent to-transparent opacity-80" />

      {/* Left Text Content */}
      <div className="z-10 flex w-[60%] flex-col justify-center px-6 sm:px-8">
        <h3 className="text-lg font-medium text-white sm:text-xl lg:text-2xl drop-shadow-md">
          {speaker.name}
        </h3>
        <p className="mt-1 text-sm font-semibold tracking-wide text-[#5c3cff] sm:text-base">
          {speaker.role}
        </p>
      </div>

      {/* Right Image Container */}
      <div className="absolute right-0 bottom-0 z-0 h-full w-[45%] overflow-hidden">
        {/* Subtle gradient to mask hard image edges if they don't have transparent backgrounds */}
        <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#060B19] to-transparent" />
        <img
          src={speaker.fullImage}
          alt={speaker.name}
          className="absolute right-0 bottom-0 h-full w-auto object-contain object-right-bottom mix-blend-lighten"
          draggable={false}
        />
      </div>
    </div>
  );
};

const Speakers: React.FC = () => {
  return (
    <section className="relative w-full bg-[#020617] py-16 md:py-24">
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* --- HEADER --- */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="flex items-center justify-center gap-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
            OUR <span className="rounded-md bg-[#5c3cff] px-4 py-1 text-white">VISIONARIES</span>
          </h2>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {speakersData.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
