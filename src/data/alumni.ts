export interface AlumniStartup {
  name: string;
  tag: string; // e.g. "Current · 2024" or "YC S21 · 2020"
  description: string;
}

export interface AlumniMilestone {
  label: string;
  items: string[];
}

export interface AlumniMember {
  id: number;
  name: string;
  rank: string;
  content: string;
  image?: string;
  image2?: string;
  fb?: string;
  linkdln?: string;
  git?: string;
  profileSlug?: string;
  location?: string;
  education?: string;
  startups?: AlumniStartup[];
  journey?: string[];
  journeyQuote?: string;
  milestones?: AlumniMilestone[];
  advice?: string[];
}

export const alumniData: AlumniMember[] = [
  {
    id: 1,
    name: "Aditya Singh",
    rank: "CEO and Founder, Ziostech Solutions Pvt. Ltd.",
    fb: "#",
    linkdln: "https://www.linkedin.com/in/aditya-singh-9966311a0/",
    git: "#",
    image:
      "https://res.cloudinary.com/dgbovmxah/image/upload/v1772720282/1727878994804_y6blyc.jpg",
    image2:
      "https://res.cloudinary.com/dgbovmxah/image/upload/v1772720282/1727878994804_y6blyc.jpg",
    content:
      "Aditya Singh is the CEO and Founder of Ziostech Solutions Pvt. Ltd. His journey began as a Software Development Engineer Intern at Nference Labs, followed by an IT Consultant role at Sunrise Diagnostic Services. Motivated to build meaningful solutions independently, he founded Ziostech Solutions from scratch. His entrepreneurial journey has equipped him with a unique blend of technical depth, business insight, and leadership experience, guiding him as he scales new initiatives.",
    profileSlug: "Aditya-Singh",
    journey: [
      "My journey into entrepreneurship didn't begin with a grand vision of building a company. It began with curiosity—the desire to understand how technology creates real-world impact beyond just lines of code.",
      "I started my career as a Software Development Engineer Intern at Nference Labs, where I spent six months immersed in a fast-paced startup environment. This was my first exposure to how a startup operates beyond engineering. I learned that building a product is not just about writing efficient code, but about understanding ambiguous user needs, navigating uncertainty, and delivering solutions under constraints. The experience taught me ownership, adaptability, and the value of learning from failures instead of fearing them.",
      "As my technical foundation grew, I gained an important insight: technology has meaning only when it solves real business problems. With this understanding, I returned to my hometown, Kanpur, and joined Sunrise Diagnostic Services as an IT Consultant. Working closely with non-technical stakeholders, I encountered operational challenges firsthand and implemented practical IT solutions that improved efficiency and decision-making. Seeing technology drive measurable impact was deeply motivating.",
      "However, working within established structures revealed an important limitation. I often identified opportunities for improvement but lacked the autonomy to execute them fully. That gap between insight and action planted the first real seed of entrepreneurship in me.",
      "Motivated to build meaningful solutions independently, I founded Ziostech Solutions Pvt. Ltd., taking on the responsibility of CEO and Founder. Starting a company from scratch—with limited resources and no existing client base—became the most demanding yet transformative phase of my journey. Every decision, from technology to business strategy, rested on my shoulders. There were moments of uncertainty, but each challenge pushed me to grow. I learned how to acquire clients, lead teams, and navigate ambiguity while making decisions without perfect information.",
      "Running a company taught me lessons no classroom ever could. It taught me to balance innovation with sustainability, negotiate effectively, think strategically, and make data-driven decisions while considering human realities. Above all, it taught me accountability—the awareness that every decision directly affects customers, employees, and the organization's future.",
      "Today, my journey from SDE intern to IT consultant to entrepreneur has shaped me with a unique blend of technical depth, business insight, and leadership experience—qualities that continue to guide me as I build and scale new initiatives.",
    ],
  },
  {
    id: 2,
    name: "Priyam Dutta",
    rank: "Director and Head of Operations, Mandali Games Private Limited",
    fb: "#",
    linkdln: "https://www.linkedin.com/in/priyam",
    git: "#",
    image:
      "https://res.cloudinary.com/dgbovmxah/image/upload/v1772720284/1757933643949_ndus1q.png",
    image2:
      "https://res.cloudinary.com/dgbovmxah/image/upload/v1772720284/1757933643949_ndus1q.png",
    content:
      "Priyam Dutta is the Director and Head of Operations at Mandali Games Private Limited, established in 2019. The startup provides content creation outsourcing services for video games, primarily creating 3D art for PC/Console titles. After 19 years of working in operations, Priyam transitioned to entrepreneurship. Under his leadership, Mandali Games has grown to 50+ members, created local employment opportunities, and contributed to major AAA titles like Halo Infinite, Microsoft Flight Simulator, and Crossfire.",
    profileSlug: "Priyam-Dutta",
    location: "Dehradun",
    startups: [
      {
        name: "Mandali Games Private Limited",
        tag: "Founded · 2019",
        description:
          "Mandali Games provides content creation outsourcing services for video games. We create 3D art (characters, vehicles, weapons, hard-surface/organic props etc.) primarily for PC/Console titles. We deliver high quality assets at affordable budgets with equal emphasis on the overall experience - communication, ease of collaboration and high satisfaction.",
      },
    ],
    journey: [
      "It all started when the organization I was working for got acquired and I was asked to relocate which I was not very comfortable with, plus, after 19 years of working I wasn't in the mood to try and build my reputation again within a new organization and prove myself all over again. Something deep within me urged me to try out on my own.",
      "I had all my life worked in operations, so I had no visibility or experience/exposure of sales and how that works. The potential clientele wouldn't know me as well as I was always in the background. So, the primary challenge was to get the company the visibility it needed while learning and doing a sales job at the same time.",
      "What helped me is my previous experience where I never shied away from any kind of work. Apart from core operations, I had worked on HR, project and product management, IT, vendor management, tech support, tools development and every other thing that I could lay my hands on. This varied exposure and knowledge helped me manage multiple fronts when I started out.",
    ],
    milestones: [
      {
        label: "Company Growth & Recognition",
        items: [
          "We have worked on multiple AAA titles from top tier developers and publishers like Halo Infinite, Crossfire, MLB The Show, Avowed and Microsoft Flight Simulator.",
          "We completed our 5 years of existence on Aug '24.",
          "From an initial team of 9 people, we are now 50+.",
          "We provide internship and professional training to budding game artists and talented freshers creating local employment opportunities.",
          "We are recognized service providers for major group companies like Microsoft (Xbox), Sony (PlayStation), Ubisoft and EA.",
        ],
      },
    ],
    advice: [
      "A key principle would be to remain eager and hungry for knowledge and hardwork in the early days of ones' professional career, working smartly but not always on the lookout to take shortcuts; one needs to learn the traits of the business as deeply as possible.",
    ],
  },
  {
    id: 3,
    name: "Roshan Farhan",
    rank: "YC Founder | 2x Founder/CEO | Angel Investor | Startup Advisor",
    fb: "https://www.facebook.com/roshan.farhan?locale=ms_MY",
    linkdln: "https://www.linkedin.com/in/roshanfarhan/",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298110/E-Cell%20Alumni/RoshanFarhanSir_csgy7g.jpg",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307970/E-Cell%20Alumni/Modal%20Cards/RoshanFarhanSir_qhsqzk.jpg",
    content:
      "Roshan Farhan is a YC Founder and 2x Founder/CEO — currently building MyriadAI, the Palantir for Conversational AI, and previously founded Gobillion (YC S21), one of India's fastest-growing social commerce platforms for Tier 2+ cities. He is a World Economic Forum Global Shaper, Economic Times Young Leader, TEDx Speaker, and has been featured in Bloomberg, Times of India, and more. An alumnus of NIT Silchar (B.Tech, CSE) and IIM Shillong (MBA).",
    profileSlug: "Roshan-Farhan",
    location: "Bangalore, India · San Francisco, CA",
    education: "NIT Silchar · IIM Shillong",
    startups: [
      {
        name: "MyriadAI",
        tag: "Current · 2024",
        description:
          "MyriadAI is the Palantir for Conversational AI — an enterprise-grade Conversational AI platform which helps global companies build & deploy intelligent AI agents across voice, WhatsApp, and more. Partnering with leading enterprises & AI leaders to automate sales and customer support workflows. Mission: make enterprise AI practical, ROI-driven, and scalable.",
      },
      {
        name: "Gobillion",
        tag: "YC S21 · 2020",
        description:
          "India's leading social commerce platform for Tier 2+ cities. Selected for Y Combinator (YC S21), raised funding from YC + top global VCs. Built 'Gobillion Shopping Rooms' and pioneered Group Buying for groceries in India — scaling to become one of the fastest-growing e-commerce companies in its segment.",
      },
    ],
    journey: [
      "I grew up in Guwahati, Assam — far from the startup ecosystems usually associated with tech or venture capital. My early upbringing, along with my education at NIT Silchar (B.Tech, Computer Science & Engineering) and MBA from IIM Shillong, shaped both my character and ambition.",
      "NIT Silchar was deeply transformative for me. I founded and led AIESEC at NITS, served as General Secretary of CSE, and headed campus initiatives like Incandescence and Tecnoesis. At IIM Shillong, leading the Student Council and launching new initiatives strengthened my confidence in driving impact at scale.",
      "I pursued my career in Management Consulting at Deloitte, EY, and Accenture — advising Fortune 500 companies on strategy and transformation. While rewarding, I had an innate urge to build something of my own.",
      "In January 2020, I took a leap of faith and left my rewarding corporate career to pursue entrepreneurship. Early months were very difficult — no ecosystem support, limited connections, no stable income, and a global pandemic. But I kept pushing forward.",
      "In 2021, Gobillion was selected into Y Combinator (YC S21). YC changed my life — I had the privilege of being mentored by top global investors & founders in Silicon Valley and being part of a global ecosystem. Later in 2024, I founded MyriadAI to help global enterprises adopt AI at scale.",
    ],
    journeyQuote:
      "Global tech companies can be built from anywhere — including the classrooms and hostels of NIT Silchar — and ambition should never be limited by geography or background.",
    milestones: [
      {
        label: "Personal Awards",
        items: [
          "RCEP Tech 35 Under 35 (Global)",
          "Economic Times Young Leader",
          "World Economic Forum Global Shaper",
          "Top 50 MBA Graduates in India",
          "TEDx Speaker & Industry Thought Leader on AI, Technology and Startups",
        ],
      },
      {
        label: "Company Awards",
        items: [
          "MyriadAI: Best Emerging AI Startup 2025 — LetsVenture",
          "Gobillion: Best Social Commerce Startup 2023 — Entrepreneur India",
          "Gobillion: Best Consumer Tech Startup 2022 — Entrepreneur India",
        ],
      },
      {
        label: "Media Recognition",
        items: [
          "Bloomberg US",
          "Associated Press",
          "Tech in Asia",
          "Times of India",
          "The Economic Times",
          "Entrepreneur India",
          "Financial Express",
          "Business Standard",
          "YourStory",
          "Inc42",
        ],
      },
    ],
    advice: [
      "Start and launch fast — clarity comes from action, not planning.",
      "Build resilience early. Markets change, funding cycles change — your conviction must not.",
      "Think global from Day 1. Your ambition should not be limited by geography.",
    ],
  },
  {
    id: 4,
    name: "Kulpradip Bharali",
    rank: "Co-Founder/CTO of Gobillion",
    fb: "https://www.facebook.com/koolpradip.bharali?locale=ms_MY",
    linkdln:
      "https://www.linkedin.com/in/kulapradipbharali/?originalSubdomain=in",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298109/E-Cell%20Alumni/kulpradeepBharaliSir_md6fiv.jpg",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307863/E-Cell%20Alumni/Modal%20Cards/kulpradeepBharaliSir_anbviw.jpg",
    content:
      "Kulapradip Bharali is the Co-Founder/CTO of Gobillion. He is an alumnus of NIT Silchar has 8+ years of experience in Full Stack Tech Development and IT Consulting with SAP Labs and other high-growth startups.",
    profileSlug: "Kulpradip-Bharali",
  },
  {
    id: 5,
    name: "Pankaj Kushwaha",
    rank: "Co-founder and CEO Doorhopper",
    fb: "https://www.facebook.com/pankajkushwaha.sci2home/",
    linkdln:
      "https://www.linkedin.com/in/pankajdoorhopper/?originalSubdomain=in",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298110/E-Cell%20Alumni/pankajKushwahaSir1_faftvy.png",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307863/E-Cell%20Alumni/Modal%20Cards/pankajKushwahaSir1_voekvo.png",
    content:
      "Pankaj Kushwaha is the co-founder and CEO of Doorhopper which is an intra-city Delivery Network.",
    profileSlug: "Pankaj-Kushwaha",
  },
  {
    id: 6,
    name: "Prince Joshi",
    rank: "Assistant VP (Sales) Terre Armée India",
    fb: "#",
    linkdln: "#",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298109/E-Cell%20Alumni/princeJoshiSir_k0sjm4.jpg",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307863/E-Cell%20Alumni/Modal%20Cards/princeJoshiSir_aax7h4.jpg",
    content:
      "Prince Joshi is an Alumnus of NIT Silchar and an MBA grad from the Xavier Institute of Management.",
    profileSlug: "Prince-Joshi",
  },
  {
    id: 7,
    name: "Vikalp Sahni",
    rank: "CEO and Founder Eka.Care",
    fb: "#",
    linkdln: "https://www.linkedin.com/in/vikalpsahni/?originalSubdomain=in",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298111/E-Cell%20Alumni/vikalpSahniSir_dgiwug.png",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307865/E-Cell%20Alumni/Modal%20Cards/vikalpSahniSir_q1axyu.png",
    content:
      "Vikalp Sahni is the CEO and Founder of Eka.Care. He pursued B.Tech from the National Institute of Technology Silchar before enrolling in a leadership study at the THNK School of Creative Leadership. His professional journey started with IBM India Pvt Ltd as a Software Engineer. Vikalp Sahni formerly worked as a Volunteer Architect for the Government of India's contact tracing software Aarogya Setu and as Co-Founder and Chief Technology Officer at Goibibo.",
    profileSlug: "Vikalp-Sahni",
  },
  {
    id: 8,
    name: "Mayank Yadav",
    rank: "Senior Director (Products) Turing",
    fb: "#",
    linkdln: "https://www.linkedin.com/in/mayankyadav/",
    git: "#",
    image:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298110/E-Cell%20Alumni/mayankYadavSir_nrtzop.png",
    image2:
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676298110/E-Cell%20Alumni/mayankYadavSir_nrtzop.png",
    content:
      "Mayank Yadav is the Senior Director of Products at Turing, a global talent platform. Previously, he led the Facebook/Instagram shops category. Aside from that, he leads the Facebook Marketplace category for Real Estate and Autos. Over the last decade, he has established several online markets, such as Uber, eBay (since 2012), and Handy (Marketplace for home services) (2014).",
    profileSlug: "Mayank-Yadav",
  },
];
