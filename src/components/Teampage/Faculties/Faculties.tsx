"use client";

import { useState } from "react";
import Image from "next/image";
// import "./Faculties.css"; // You can comment this out as styles are now in globals.css

import { facultiesData } from "@/data/faculties";
import ModalCardFaculties from "../Modal/ModalCardFaculties";

interface FacultiesModalState {
  open: boolean;
  id: number | null;
}

export default function Faculties() {
  const [modal, setModal] = useState<FacultiesModalState>({
    open: false,
    id: null,
  });

  const openModal = (id: number) => {
    setModal({ open: true, id });
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
  };

  return (
    <section className="faculties-section">
      {/* Grid Layout for Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {facultiesData.map((member) => (
          <div
            key={member.id}
            className="profile-card"
            onClick={() => openModal(member.id)}
          >
            {/* Image Area */}
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

            {/* Content Area (White bg, Black text) */}
            <div className="profile-card-content">
              <div className="profile-name">{member.name}</div>
              <div className="profile-role">{member.rank}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Logic (Unchanged) */}
      {modal.open && modal.id !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <ModalCardFaculties dataid={modal.id} />
          </div>
        </div>
      )}
    </section>
  );
}
