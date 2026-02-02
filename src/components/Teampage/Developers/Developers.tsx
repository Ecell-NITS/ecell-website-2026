"use client";

import SeniorDevelopers from "./Sendev/Developers2";
import JuniorDevelopers from "./Jundev/Developers1";

export default function Developers() {
  return (
    <div className="flex w-full flex-col gap-16 py-12 sm:gap-20 md:gap-24 md:py-16 lg:gap-28 lg:py-24 xl:gap-32">
      <SeniorDevelopers />
      <JuniorDevelopers />
    </div>
  );
}
