"use client";

import Image from "next/image";
import "./Modal.css";
import { alumniData, type AlumniMember } from "../../../data/alumni";

interface ModalCardAlumniProps {
  dataid: number;
}

export default function ModalCardAlumni({ dataid }: ModalCardAlumniProps) {
  const member = alumniData.find((item: AlumniMember) => item.id === dataid);

  if (!member) {
    return <p className="modal-error">Data not found.</p>;
  }

  return (
    <div className="modalCard">
      <div className="profileCard">
        <div className="profile2">
          <div className="img2">
            {member.image2 && (
              <Image
                src={member.image2}
                alt={member.name}
                width={300}
                height={300}
                className="modal-image"
              />
            )}
          </div>

          <div className="name_modal one">{member.name}</div>
          <div className="desg_modal two">{member.rank}</div>
        </div>

        <div className="content">{member.content}</div>
      </div>
    </div>
  );
}
