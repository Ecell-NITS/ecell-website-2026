import type { AlumniMember } from "@/data/alumni";
import TeamCard from "@/components/Teampage/TeamCard";

interface AlumniGridProps {
  alumni: AlumniMember[];
}

export default function AlumniGrid({ alumni }: AlumniGridProps) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {alumni.map((member, index) => (
        <div
          key={member.id}
          className="translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TeamCard
            name={member.name}
            role={member.rank}
            image={member.image ?? ""}
            socials={{
              facebook: member.fb,
              linkedin: member.linkdln,
              github: member.git,
            }}
            priority={index < 3}
            profileHref={`/alumni/${member.profileSlug}`}
          />
        </div>
      ))}
    </div>
  );
}
