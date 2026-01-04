"use client";

import Image from "next/image";
// import "./SrDevelopers.css"; // Styles are now global
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

import { seniorDevelopers } from "@/data/developers";
import type { Developer } from "@/data/developers";

export default function SeniorDevelopers() {
  return (
    <section
      className="senior-developers-section"
      style={{ marginBottom: "4rem" }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ffffff" }}
        >
          Senior Developers
        </h1>
      </div>

      {/* Grid Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {seniorDevelopers.map((dev: Developer) => (
          <div className="profile-card" key={dev.id}>
            {/* Image Wrapper */}
            <div className="profile-card-image-wrapper">
              {dev.image && (
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={400}
                  height={400}
                  className="profile-card-image"
                />
              )}
            </div>

            {/* Text Content */}
            <div className="profile-card-content">
              <h3 className="profile-name">{dev.name}</h3>
              <p className="profile-role">{dev.rank}</p>

              {/* Social Icons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                  color: "#333",
                }}
              >
                {dev.fb && (
                  <a
                    href={dev.fb}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-blue-600"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}

                {dev.linkedln && (
                  <a
                    href={dev.linkedln}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-blue-700"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}

                {dev.git && (
                  <a
                    href={dev.git}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-black"
                  >
                    <BsGithub size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
