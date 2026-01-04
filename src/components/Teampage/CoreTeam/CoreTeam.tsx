"use client";

import Image from "next/image";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

import { coreTeams, type CoreYear } from "@/data/coreTeam";
interface CoreTeamProps {
  year: CoreYear;
}

export default function CoreTeam({ year }: CoreTeamProps) {
  const members = coreTeams[year];

  return (
    <section className="core-team-section">
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ffffff" }}
        >
          Core Team {year}
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {members.map((member) => (
          <div className="profile-card" key={member.id}>
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

            <div className="profile-card-content">
              <h3 className="profile-name">{member.name}</h3>
              <p className="profile-role">{member.rank}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                  color: "#333",
                }}
              >
                {member.fb && (
                  <a
                    href={member.fb}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-blue-600"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}
                {member.linkedln && (
                  <a
                    href={member.linkedln}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-blue-700"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.insta && (
                  <a
                    href={member.insta}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-pink-600"
                  >
                    <FaInstagram size={24} />
                  </a>
                )}
                {member.git && (
                  <a
                    href={member.git}
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
