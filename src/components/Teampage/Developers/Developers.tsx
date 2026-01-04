"use client";

import SeniorDevelopers from "./Sendev/Developers2";
import JuniorDevelopers from "./Jundev/Developers1";

export default function Developers() {
  return (
    <div className="developers-wrapper" style={{ paddingBottom: "2rem" }}>
      <SeniorDevelopers />
      {/* Divider or spacing if needed */}
      <div style={{ height: "4rem" }}></div>
      <JuniorDevelopers />
    </div>
  );
}
