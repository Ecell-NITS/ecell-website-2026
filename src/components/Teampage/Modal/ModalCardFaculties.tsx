"use client";

import Image from "next/image";
import "./Modal.css";
import { facultiesData } from "@/data/faculties";

interface ModalCardFacultiesProps {
  dataid: number;
}

export default function ModalCardFaculties({
  dataid,
}: ModalCardFacultiesProps) {
  const member = facultiesData.find((item) => item.id === dataid);

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
