export interface StaticBlog {
  id: string;
  title: string;
  intro: string;
  tag: string;
  content: string;
  writerName: string;
  writerRole?: string;
  writerPic?: string;
  writerIntro?: string;
  topicPic: string;
  coverImage?: string;
  createdAt: string;
  timeStamp?: string;
  likes: string[];
  status?: string;
  isAccepted?: boolean;
}

export const staticBlogs: StaticBlog[] = [
  {
    id: "semiconductor-chip-nit-silchar",
    title: "NIT Silchar’s Semiconductor Chip: Innovation from the Northeast",
    intro:
      "Semiconductors are at the heart of almost every modern technology, from smartphones to medical devices. NIT Silchar has added its own contribution to this growing ecosystem through indigenous chip design and semiconductor research, showing how advanced technological innovation can emerge from a campus in the Northeast.",
    tag: "Semiconductor, Chip Design, VLSI, Innovation, NIT Silchar, Technology",
    content: `<p>When we think about semiconductors, we often think about massive technology companies and manufacturing facilities. But innovation in this field can also begin inside a college laboratory.</p>

<p>At NIT Silchar, semiconductor research has moved beyond classroom concepts into actual chip development. The institute’s Electronics and Communication Engineering department has been working in areas such as VLSI, microelectronics, semiconductor devices and chip design. The department has also developed an indigenously designed bio-sensor semiconductor chip for EEG signal detection.</p>

<h3>From an Idea to a Chip</h3>
<p>One of the notable projects from NIT Silchar was developed under the <strong>Chip to Startup (C2S) Initiative</strong> of the Ministry of Electronics and Information Technology.</p>

<p>The project, titled <em>“Design and Development of Low Power Low Latency Non-Invasive Seizure Detector System,”</em> was fabricated at the Semiconductor Laboratory in Mohali and carried the chip ID <strong>C2S0042</strong>. The chip was showcased at <strong>SEMICON India 2025</strong>.</p>

<p>The idea is important because semiconductor innovation is not only about making faster processors. It can also be about solving specific problems. In this case, chip technology is being explored for healthcare applications, where detecting neurological signals can potentially support better monitoring and diagnosis.</p>

<h3>Why Does This Matter?</h3>
<p>India is currently building a larger semiconductor ecosystem covering chip design, fabrication, packaging, testing, materials and talent development. The government’s semiconductor programme has approved major projects across different parts of India, while newer initiatives are focusing on strengthening domestic design and manufacturing capabilities.</p>

<p>For students, this creates a much larger opportunity. Semiconductor development requires engineers from multiple disciplines like electronics, computer science, mechanical engineering, materials science and more.</p>

<h3>Innovation Can Start Here</h3>
<p>NIT Silchar’s semiconductor work sends a simple message: High-end innovation does not have to begin in a metro city. It can begin in a college laboratory, with a research problem, a team of students and faculty, and the willingness to build something from scratch.</p>

<p>For the Northeast, such projects can become important examples of how education, research and entrepreneurship can come together to create technology with real-world applications.</p>`,
    writerName: "E-Cell NIT Silchar",
    writerRole: "Editorial Team",
    writerPic: "/ecelllogo.png",
    writerIntro:
      "Fostering entrepreneurship, innovation, and research culture across NIT Silchar and the Northeast.",
    topicPic:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    createdAt: "2026-10-12T10:00:00.000Z",
    timeStamp: "2026-10-12T10:00:00.000Z",
    likes: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    isAccepted: true,
    status: "approved",
  },
  {
    id: "assam-industrial-growth-investment",
    title: "Assam’s Industrial Growth: A New Wave of Investment",
    intro:
      "Assam is increasingly attracting attention as an emerging investment and industrial destination. From technology and digital infrastructure to manufacturing, energy and connectivity, large companies are showing growing interest in the state. Reliance Industries’ ₹50,000-crore investment commitment is one example of this changing industrial landscape.",
    tag: "Assam, Industry, Investment, Business Growth, Northeast India, Infrastructure",
    content: `<p>For a long time, Assam was primarily associated with tea, oil, tourism and its natural resources. Today, the conversation is becoming broader. The state is increasingly being discussed as a potential destination for technology, infrastructure, manufacturing, energy and digital businesses.</p>

<p>A major example came during <strong>Advantage Assam 2.0</strong> in February 2025. Reliance Industries Chairman and Managing Director Mukesh Ambani announced that Reliance planned to invest over ₹50,000 crore in Assam over the following five years. The company highlighted areas including technology and digital development.</p>

<h3>Why Are Companies Looking at Assam?</h3>
<p>Location matters. Assam can act as an important connection between mainland India and the wider Northeast, while also offering access to a large regional market. Improving infrastructure, connectivity and digital networks can further influence where companies choose to expand.</p>

<p>The investment commitments announced at Advantage Assam 2.0 were not limited to Reliance. The Adani Group, Tata Group, Vedanta and other companies also announced major investment plans for the state, covering areas such as infrastructure, energy, manufacturing and technology.</p>

<h3>What Could This Mean for Young People?</h3>
<p>Industrial investment is not only about buildings and factories. It can create demand for people with new skills. Engineers, designers, software developers, managers, researchers, entrepreneurs and skilled technicians can all become part of a growing ecosystem.</p>

<p>For students in Assam, this can create opportunities that may not require moving immediately to Bengaluru, Mumbai or Delhi. The development of new industries can also create opportunities for local startups. A large company entering a region creates new supply chains, new services and new problems that need to be solved. And problems create opportunities for entrepreneurs.</p>

<h3>From Investment to Ecosystem</h3>
<p>The real impact of industrial growth is not measured only by the amount of money invested. It is also about what develops around that investment: more businesses, more skilled professionals, more suppliers, more infrastructure, more research, more startups, and more opportunities for students.</p>

<p>Assam’s industrial story is therefore becoming bigger than individual companies or individual investment announcements. The larger question is whether the state can build an ecosystem where investment, talent, entrepreneurship and innovation reinforce one another.</p>

<p>For the next generation, that could mean one important shift: Opportunities may increasingly come to the Northeast instead of young talent always having to leave the Northeast to find them.</p>`,
    writerName: "E-Cell NIT Silchar",
    writerRole: "Regional Insights",
    writerPic: "/ecelllogo.png",
    writerIntro:
      "Tracking regional business developments and entrepreneurial opportunities in Assam.",
    topicPic:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    createdAt: "2026-10-11T12:00:00.000Z",
    timeStamp: "2026-10-11T12:00:00.000Z",
    likes: ["user-1", "user-2", "user-3"],
    isAccepted: true,
    status: "approved",
  },
  {
    id: "india-growth-story-next-gen-industry",
    title: "India’s Growth Story: Building the Next Generation of Industry",
    intro:
      "India’s development story is increasingly moving beyond traditional sectors. Startups, digital infrastructure, electronics, semiconductor manufacturing, advanced technology and new industries are becoming important parts of the country’s economic landscape, creating new opportunities for businesses, engineers, researchers and young entrepreneurs.",
    tag: "India, Technology, Semiconductors, Manufacturing, Startups, Innovation, Young India",
    content: `<p>India has changed significantly over the past decade. The country that once depended heavily on importing many advanced technologies is increasingly focusing on building capabilities within its own ecosystem. From digital payments to electronics manufacturing, from startups to semiconductors, several sectors are undergoing rapid transformation.</p>

<h3>From Startups to Semiconductors</h3>
<p>India’s startup ecosystem has created a generation of entrepreneurs working on everything from fintech and logistics to healthcare, climate technology and artificial intelligence. At the same time, the country is investing heavily in physical technology infrastructure.</p>

<p>One major example is the semiconductor industry. Under the Semicon India Programme, India has approved semiconductor projects involving investments of more than ₹1.6 lakh crore, covering fabrication, packaging and other parts of the semiconductor ecosystem. In July 2026, the government also approved Semicon 2.0, with an outlay of ₹1,27,500 crore, focusing on areas including chip design, research, materials and machines, additional fabs, packaging and talent.</p>

<h3>Why Manufacturing Matters</h3>
<p>Technology is not only about software. A modern technology ecosystem needs hardware too. Phones, electric vehicles, medical equipment, satellites, data centres and communication systems all depend on advanced electronics and semiconductor components.</p>

<p>Building these capabilities in India can therefore connect different industries with one another: a semiconductor engineer may work with an automobile company; a mechanical engineer may work on manufacturing equipment; a software developer may build systems that operate on new hardware; a researcher may develop new materials. This is where multidisciplinary innovation becomes important.</p>

<h3>The Role of Young India</h3>
<p>India’s growth is not something that happens only inside large companies. Students and young professionals can become part of it through research, startups, competitions, internships and projects. A college project can become a prototype. A prototype can become a startup. A research paper can lead to a technology. A local problem can become a business opportunity.</p>

<p>The next phase of India’s development will depend not only on how much the country produces, but also on what it learns to design, build and improve. For students, this creates an important opportunity: Don’t just prepare for the industries of today. Build the skills for the industries that are emerging tomorrow.</p>`,
    writerName: "E-Cell NIT Silchar",
    writerRole: "National Perspectives",
    writerPic: "/ecelllogo.png",
    writerIntro:
      "Exploring national economic shifts, deep-tech advancements, and student-driven ventures.",
    topicPic:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    coverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    createdAt: "2026-10-10T14:00:00.000Z",
    timeStamp: "2026-10-10T14:00:00.000Z",
    likes: ["user-1", "user-2", "user-3", "user-4"],
    isAccepted: true,
    status: "approved",
  },
  {
    id: "global-development-tech-changing-world",
    title: "Global Development: Technology Is Changing the Way the World Grows",
    intro:
      "Global development is entering a new phase shaped by artificial intelligence, digital infrastructure, clean technology, advanced manufacturing and access to information. At the same time, development remains uneven across countries. The challenge is not simply creating new technology, but making sure it reaches people and solves real problems.",
    tag: "Global Development, Technology, Artificial Intelligence, Innovation, Sustainability",
    content: `<p>Development has always been connected to technology. The steam engine transformed transportation. Electricity transformed industries. The internet transformed communication. Today, artificial intelligence and digital technologies are becoming part of the next major wave of change. But global development is not simply about creating more advanced technology. It is about how that technology can improve people’s lives.</p>

<h3>AI and Development</h3>
<p>The World Bank’s World Development Report 2026 focuses on the role of artificial intelligence in developing economies. The report notes that AI is spreading faster than earlier general-purpose technologies and can potentially expand access to expertise in areas such as healthcare, agriculture, education and public services.</p>

<p>But access alone is not enough. Countries need reliable electricity, internet connectivity, skilled people, strong institutions and access to data. Without these foundations, the benefits of new technologies may remain concentrated in a small number of places.</p>

<h3>Development Is More Than Technology</h3>
<p>The World Bank’s 2026 Atlas of Global Development looks at development across five broad areas: People, Prosperity, Planet, Infrastructure, and Digital transformation. Its data shows that global development has slowed significantly, with progress currently taking place at its weakest pace in around 75 years.</p>

<p>This creates a complicated picture: technology is advancing rapidly, but not every community is benefiting at the same pace.</p>

<h3>The Next Challenge</h3>
<p>The important question for the coming years may not be: <em>“How advanced can technology become?”</em> It may be: <em>“How effectively can technology solve real problems?”</em></p>

<p>Can AI help a farmer make better decisions? Can digital tools make education more accessible? Can clean energy reach communities that lack reliable electricity? Can new manufacturing technologies create meaningful employment? Can innovation reduce the gap between developed and developing regions? These questions connect technology with development.</p>

<h3>Innovation With Purpose</h3>
<p>For young entrepreneurs and innovators, this creates a wider field of opportunity. The biggest problems are not always found in technology companies. They can be found in classrooms, hospitals, farms, transportation systems, cities and communities.</p>

<p>The next generation of innovation may therefore come from people who understand both technology and the problems it is meant to solve. Global development is not just about moving faster. It is about making progress more useful, more accessible and more connected to real human needs.</p>`,
    writerName: "E-Cell NIT Silchar",
    writerRole: "Global Tech Trends",
    writerPic: "/ecelllogo.png",
    writerIntro:
      "Analyzing the impact of global artificial intelligence and digital infrastructure trends.",
    topicPic:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    createdAt: "2026-10-09T09:00:00.000Z",
    timeStamp: "2026-10-09T09:00:00.000Z",
    likes: ["user-1", "user-2"],
    isAccepted: true,
    status: "approved",
  },
  {
    id: "entrepreneurship-beyond-the-metro-northeast",
    title: "Entrepreneurship Beyond the Metro: Opportunities in the Northeast",
    intro:
      "India’s entrepreneurial ecosystem is expanding beyond traditional startup hubs. For the Northeast, this creates an opportunity to build ventures around the region’s unique strengths, challenges and communities. With technology, education and entrepreneurial networks becoming more accessible, students can play an important role in shaping the region’s next generation of businesses.",
    tag: "Northeast India, Entrepreneurship, Startups, Youth Innovation, Ecosystem, NIT Silchar",
    content: `<p>When we think about Indian startups, certain cities immediately come to mind: Bengaluru, Mumbai, Delhi-NCR, Hyderabad. These cities have played an important role in building India’s startup ecosystem. But entrepreneurship doesn’t have a geographical limit. A startup can emerge anywhere there is a problem worth solving. And the Northeast has plenty of unique problems and opportunities.</p>

<h3>Local Problems Need Local Understanding</h3>
<p>The Northeast has its own geographical, cultural and economic realities. Transportation across difficult terrain, access to certain services, tourism, agriculture, handicrafts, local supply chains and regional-language accessibility are just a few areas where entrepreneurs can explore opportunities. A founder who lives in the region already has something valuable: first-hand understanding. They know the problems because they experience them.</p>

<h3>Don’t Copy. Adapt.</h3>
<p>Entrepreneurship isn’t necessarily about taking an idea from another city and copying it exactly. A model that works in Bengaluru may not work in Silchar. A product designed for a metropolitan customer may not address the needs of a smaller city. The better question is: <em>What can be adapted to our context?</em> Understanding local customers, infrastructure and culture can help entrepreneurs create solutions that are actually relevant.</p>

<h3>Students Have a Role to Play</h3>
<p>For students in the Northeast, entrepreneurship can become a way of looking at the region differently. Instead of seeing geographical or infrastructural challenges only as limitations, entrepreneurs can ask whether they also create opportunities for innovation.</p>

<p>College campuses can become starting points for this process. Students can participate in competitions, attend workshops, connect with founders, work on prototypes and collaborate across disciplines. Even a small project can provide an understanding of what it takes to turn an idea into something useful.</p>

<h3>The Opportunity Is Getting Bigger</h3>
<p>India’s startup ecosystem has been expanding its focus beyond traditional metropolitan hubs, with initiatives aimed at supporting entrepreneurship across districts and encouraging more young and first-time founders to participate. For students in the Northeast, this means the entrepreneurial ecosystem is no longer something happening somewhere far away. It can be built here too.</p>

<h3>Start With What You Know</h3>
<p>You don’t need to solve every problem in the Northeast. Start with one. Observe it. Understand it. Talk to people experiencing it. Try a solution. Learn from the response. Then improve.</p>

<p>The next successful venture from the Northeast may not begin in a large corporate office. It could begin with a student noticing a problem on a college campus and deciding to do something about it. Entrepreneurship doesn’t have to begin somewhere else. It can begin right here.</p>`,
    writerName: "E-Cell NIT Silchar",
    writerRole: "Startup Culture",
    writerPic: "/ecelllogo.png",
    writerIntro:
      "Encouraging grassroots entrepreneurship and student founders across the Northeast.",
    topicPic:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    createdAt: "2026-10-08T11:00:00.000Z",
    timeStamp: "2026-10-08T11:00:00.000Z",
    likes: ["user-1", "user-2", "user-3", "user-4", "user-5", "user-6"],
    isAccepted: true,
    status: "approved",
  },
];

/**
 * Helper to match a slug to static blogs
 */
export function getStaticBlogBySlug(slug: string): StaticBlog | null {
  if (!slug) return null;
  try {
    const clean = decodeURIComponent(slug)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return (
      staticBlogs.find((b) => {
        const bSlug = b.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return bSlug === clean || b.id === slug || b.id === clean;
      }) ?? null
    );
  } catch {
    return null;
  }
}
