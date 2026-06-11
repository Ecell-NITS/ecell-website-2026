"use client";

import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <section id="about" className="relative bg-black py-16 sm:py-24">
      {/* Container */}
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Purpose Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-[4.5vw] leading-[1.1] font-black tracking-tight text-[#5c3cff] uppercase min-[450px]:text-[5vw] sm:text-[5.5vw] md:text-[5vw] lg:text-[4.5vw] xl:text-[4vw] 2xl:text-[4.5rem]">
            <span className="whitespace-nowrap">
              OUR PURPOSE IS TO EMPOWER DREAMS
            </span>
            <br />
            <span className="whitespace-nowrap">
              & BUILD A CULTURE OF INNOVATION.
            </span>
          </h2>

          <div className="mt-10 flex w-full justify-center">
            <div className="max-w-[800px] text-left text-sm leading-relaxed font-semibold text-white sm:text-base md:text-lg">
              <p>
                E-Cell NIT Silchar is committed to fostering entrepreneurial
                spirit, nurturing innovative minds, and creating a dynamic
                ecosystem where students transform ideas into impactful
                ventures. For years, we&apos;ve been empowering changemakers and
                redefining what&apos;s possible. Explore our Purpose &amp;
                Vision, Journey, and more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
