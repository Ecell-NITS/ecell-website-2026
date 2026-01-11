"use client";

import SeniorDevelopers from "./Sendev/Developers2";
import JuniorDevelopers from "./Jundev/Developers1";

export default function Developers() {
  return (
    <div className="flex w-full flex-col gap-32">
      <SeniorDevelopers />
      <JuniorDevelopers />
    </div>
  );
}
