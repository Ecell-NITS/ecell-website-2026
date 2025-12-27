"use client";

import React from "react";
import { Button } from "~/components/Events/button";

const initiatives = [
  {
    title: "Orientation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra. Nulla amet nulla sit commodo risus. Ut dictum mattis sodales suspendisse. Commodo fames sit tellus ut nunc pellentesque at mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit sit sed mi fusce etiam pulvinar quis sit risus. Sed vitae egestas ridiculus dignissim. Massa massa nunc porttitor mattis.",
    imagePosition: "left" as const,
  },
  {
    title: "EIC",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra. Nulla amet nulla sit commodo risus. Ut dictum mattis sodales suspendisse. Commodo fames sit tellus ut nunc pellentesque at mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit sit sed mi fusce etiam pulvinar quis sit risus. Sed vitae egestas ridiculus dignissim. Massa massa nunc porttitor mattis.",
    imagePosition: "right" as const,
  },
  {
    title: "Srijan",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra. Nulla amet nulla sit commodo risus. Ut dictum mattis sodales suspendisse. Commodo fames sit tellus ut nunc pellentesque at mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit sit sed mi fusce etiam pulvinar quis sit risus. Sed vitae egestas ridiculus dignissim. Massa massa nunc porttitor mattis.",
    imagePosition: "left" as const,
  },
  {
    title: "Empressario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra. Nulla amet nulla sit commodo risus. Ut dictum mattis sodales suspendisse. Commodo fames sit tellus ut nunc pellentesque at mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit sit sed mi fusce etiam pulvinar quis sit risus. Sed vitae egestas ridiculus dignissim. Massa massa nunc porttitor mattis.",
    imagePosition: "right" as const,
  },
  {
    title: "Pre Incubation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra. Nulla amet nulla sit commodo risus. Ut dictum mattis sodales suspendisse. Commodo fames sit tellus ut nunc pellentesque at mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit sit sed mi fusce etiam pulvinar quis sit risus. Sed vitae egestas ridiculus dignissim. Massa massa nunc porttitor mattis.",
    imagePosition: "left" as const,
  },
];

export default function EventsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#000002]">
      <main className="relative pt-32 pb-20 lg:pt-40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h1 className="font-poppins mb-12 text-center text-3xl font-normal text-white sm:text-4xl md:text-5xl lg:mb-20 lg:text-6xl xl:text-[68px]">
            Our Initiatives
          </h1>

          <section className="flex flex-col gap-12 lg:gap-20">
            {initiatives.map((initiative, index) => (
              <article key={index} className="relative z-10">
                <div
                  className={`flex flex-col ${
                    initiative.imagePosition === "right" &&
                    "lg:flex-row-reverse"
                  } ${
                    initiative.imagePosition === "left" && "lg:flex-row"
                  } items-center gap-6 lg:gap-10`}
                >
                  <div className="aspect-[344/468] w-full flex-shrink-0 rounded-lg bg-gradient-to-br from-[#757575] to-[#505050] shadow-2xl transition-all duration-500 hover:scale-105 sm:w-4/5 md:w-3/5 lg:w-[344px] xl:w-[400px]" />

                  <div className="flex flex-1 flex-col gap-4 lg:gap-6">
                    <h2 className="font-poppins text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                      {initiative.title}
                    </h2>
                    <p className="font-poppins text-sm leading-relaxed font-medium text-white/90 sm:text-base lg:text-lg xl:text-xl">
                      {initiative.description}
                    </p>
                    <div className="group relative inline-flex w-fit overflow-hidden rounded-full p-[4px] transition-all duration-300 hover:scale-105 lg:p-[5px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000002_0%,#0000FF_50%,#000002_100%)]" />
                      <Button
                        variant="outline"
                        className="font-jakarta relative h-full w-full rounded-full border-0 bg-[#000002] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#000002] hover:text-white active:bg-[#000002] active:text-[#0000FF] lg:px-8 lg:py-4 lg:text-xl"
                      >
                        View Modules
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <div className="pointer-events-none fixed top-[-10%] left-[-20%] h-[40%] w-[60%] rotate-[-39.86deg] rounded-[712.29px/467.45px] bg-[linear-gradient(180deg,rgba(143,0,255,0.19)_0%,rgba(0,0,2,0.19)_100%)] opacity-70 blur-[56.65px] sm:h-[50%] sm:w-[50%] lg:h-[935px] lg:w-[1425px] lg:opacity-100" />

      <div className="pointer-events-none fixed bottom-0 left-[-30%] h-[50%] w-[80%] rotate-[40.23deg] rounded-[1261.07px/796.81px] bg-[linear-gradient(180deg,rgba(0,221,115,0.09)_0%,rgba(0,0,2,0.09)_100%)] opacity-50 blur-[56.65px] lg:h-[1594px] lg:w-[2522px] lg:opacity-100" />

      <div className="pointer-events-none fixed top-[30%] right-[-20%] h-[40%] w-[70%] rotate-[-39.86deg] rounded-[770.26px/530.56px] bg-[linear-gradient(180deg,rgba(0,0,255,0.19)_0%,rgba(0,0,2,0.19)_100%)] opacity-60 blur-[56.65px] lg:h-[1061px] lg:w-[1541px] lg:opacity-100" />
    </div>
  );
}
