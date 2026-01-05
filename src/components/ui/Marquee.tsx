"use client";

import React from "react";
import Image from "next/image";

// INSTRUCTIONS FOR USER:
// 1. Add your logo images to the 'public/partners' folder.
// 2. Update the 'src' paths below to match your filenames.
// 3. Adjust 'width' and 'height' as needed to fit your logos (aspect ratio).

const PARTNERS = [
  { name: "Partner 1", src: "/partners/placeholder.svg" },
  { name: "Partner 2", src: "/partners/placeholder.svg" },
  { name: "Partner 3", src: "/partners/placeholder.svg" },
  { name: "Partner 4", src: "/partners/placeholder.svg" },
  { name: "Partner 5", src: "/partners/placeholder.svg" },
  { name: "Partner 6", src: "/partners/placeholder.svg" },
];

export default function Marquee() {
  return (
    <div className="relative flex w-full overflow-hidden">
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-24 px-12">
        {PARTNERS.map((partner, idx) => (
          <div key={idx} className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center justify-center">
             {/* Using standard img tag or Next Image. Next Image requires defined width/height. */}
             <Image 
                src={partner.src} 
                alt={partner.name} 
                width={120} 
                height={40} 
                className="object-contain"
             />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-24 px-12">
        {PARTNERS.map((partner, idx) => (
          <div key={idx} className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center justify-center">
             <Image 
                src={partner.src} 
                alt={partner.name} 
                width={120} 
                height={40} 
                className="object-contain"
             />
          </div>
        ))}
      </div>
    </div>
  );
}
