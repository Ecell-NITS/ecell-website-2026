import { Compass, Sparkles, Layers, Globe, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type EventData = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  reverse?: boolean;
};

export const events: EventData[] = [
  {
    title: "EnGenius",
    description:
      "EnGenius is the official orientation program of E-CELL NIT Silchar, introducing freshers to entrepreneurship, innovation, and leadership. Through interactive sessions, ice-breakers, and startup exposure—along with the Mr. & Ms. EnGenius contest—it helps students showcase creativity, confidence, and leadership while inspiring their journey from ideas to impact. More than just an orientation, Engenius fosters teamwork, curiosity, and problem-solving, inspiring students to take their first step into the entrepreneurial ecosystem and begin their journey from ideas to impact",
    image: "/images/events/orientation.jpeg",
    icon: Compass,
    reverse: false,
  },
  {
    title: "Empresario",
    description:
      "Empresario is a structured entrepreneurship module by E-CELL NIT Silchar, held during Tecnoesis, the annual technical fest of NIT Silchar. It offers aspiring entrepreneurs hands-on exposure to key business skills such as strategic thinking, innovation, market analysis, and investor interaction. Through events like the Business Hackathon, participants tackle real-world challenges, collaborate under pressure, and showcase ideas and prototypes, gaining valuable feedback and industry insights. Empresario bridges theory with practice, equipping students to confidently face real-world entrepreneurial challenges.",
    image: "/images/events/empresario.jpeg",
    icon: Globe,
    reverse: true,
  },
  {
    title: "EIC",
    description:
      "The Entrepreneurship and Innovation Challenge (EIC) by E-CELL NIT Silchar is a inter-branch competition that brings together students from across the institute to showcase their entrepreneurial thinking, creativity, and innovation. Designed as a platform for healthy competition, EIC creates a dynamic environment for idea exchange and strategic problem-solving. With structured and engaging modules involving all six branches, the challenge fosters collaboration, leadership, and innovation, celebrating interdisciplinary talent while reinforcing E-Cell’s mission to build a strong entrepreneurial culture on campus.",
    image: "/images/events/eic.jpeg",
    icon: Sparkles,
    reverse: false,
  },
  {
    title: "Eminence",
    description:
      "Eminence, known as the Bermuda Triangle of Entrepreneurship, is E-CELL NIT Silchar’s most intellectually challenging event. Designed to push participants beyond conventional thinking, it immerses them in real-world entrepreneurial uncertainties through case studies, brainstorming sessions, and unconventional business challenges. Participants enter with raw ideas and leave with sharper strategies, clearer perspectives, and stronger decision-making skills. Rather than offering ready solutions, Eminence reshapes mindsets, builds resilience, and inspires bold, innovative thinking—making it a truly transformative experience.",
    image: "/images/events/eminence.jpeg",
    icon: Rocket,
    reverse: true,
  },
  {
    title: "Srijan",
    description:
      "The National Innovation and Entrepreneurship Summit of NIT Silchar, Srijan, is the flagship event of E-CELL. Held annually and organised solely by the Entrepreneurship Cell of the college, it tries to inculcate the spirit of entrepreneurship in the young minds. Numerous events and webinars are held whose main motive is to give shape to the innovative ideas that take birth in the creative minds of the participants.",
    image: "/images/events/srijan.png",
    icon: Layers,
    reverse: false,
  },
] satisfies EventData[];
