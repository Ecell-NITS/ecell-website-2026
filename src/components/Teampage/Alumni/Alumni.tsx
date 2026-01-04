"use client";

import { useState } from "react";
import Image from "next/image";
// import "./Alumni.css"; // Styles are now global

import { alumniData } from "@/data/alumni";
import ModalCardAlumni from "../Modal/ModalCardAlumni";

export default function Alumni() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="alumni-section">
      {/* 1. Grid Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {alumniData.map((member) => (
          <div
            key={member.id}
            className="profile-card"
            onClick={() => setActiveId(member.id)}
          >
            {/* 2. Image Wrapper */}
            <div className="profile-card-image-wrapper">
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="profile-card-image"
                />
              )}
            </div>

            {/* 3. Text Content (White Card Style) */}
            <div className="profile-card-content">
              <div className="profile-name">{member.name}</div>
              <div className="profile-role">{member.rank}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Logic (Unchanged) */}
      {activeId !== null && (
        <div className="modal-overlay" onClick={() => setActiveId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ModalCardAlumni dataid={activeId} />
          </div>
        </div>
      )}
    </section>
  );
}
