export interface FeaturedComment {
  id: string;
  text: string;
  commentAuthor: string;
  commentPic: string;
  userId: string;
  createdAt: string;
}

export interface FeaturedBlog {
  id: string;
  title: string;
  intro: string;
  tag: string;
  content: string;
  writerName: string;
  writerPic: string;
  topicPic: string;
  likes: string[];
  comments: FeaturedComment[];
  createdAt: string;
}

const h = (text: string) =>
  `<h3 class="mt-8 mb-3 text-xl font-bold text-white">${text}</h3>`;
const p = (text: string) => `<p class="mb-4">${text}</p>`;

const AUTHOR = "E-Cell NIT Silchar";
const WRITER_PIC = "/ecelllogo.png";

// These featured blogs are temporary and are not stored in the database, so
// likes and comments below are dummy values.
const dummyLikes = (count: number): string[] =>
  Array.from({ length: count }, (_, i) => `dummy-like-${i}`);

const dummyComments = (
  blogNo: number,
  texts: [string, string],
): FeaturedComment[] =>
  [
    { name: "Aarav Sharma", text: texts[0], day: 18 },
    { name: "Priya Das", text: texts[1], day: 19 },
  ].map((c, i) => ({
    id: `featured-${blogNo}-comment-${i + 1}`,
    text: c.text,
    commentAuthor: c.name,
    commentPic: "/profile_picture_holder.webp",
    userId: `dummy-user-${i + 1}`,
    createdAt: `2026-09-${c.day}T10:00:00.000Z`,
  }));

export const featuredBlogs: FeaturedBlog[] = [
  {
    id: "featured-1",
    title: "NIT Silchar’s Semiconductor Chip: Innovation from the Northeast",
    intro:
      "Semiconductors are at the heart of almost every modern technology, from smartphones to medical devices. NIT Silchar has added its own contribution to this growing ecosystem through indigenous chip design and semiconductor research, showing how advanced technological innovation can emerge from a campus in the Northeast.",
    tag: "NIT Silchar, Semiconductor, VLSI, Innovation",
    writerName: AUTHOR,
    writerPic: WRITER_PIC,
    topicPic: "/blogs/blog-1.jpg",
    createdAt: "2026-09-16T10:00:00.000Z",
    likes: dummyLikes(24),
    comments: dummyComments(1, [
      "Great read! It is inspiring to see chip design happening in our own campus.",
      "Proud of the ECE department. More such stories please!",
    ]),
    content: [
      p(
        "When we think about semiconductors, we often think about massive technology companies and manufacturing facilities.",
      ),
      p(
        "But innovation in this field can also begin inside a college laboratory.",
      ),
      p(
        "At NIT Silchar, semiconductor research has moved beyond classroom concepts into actual chip development.",
      ),
      p(
        "The institute’s Electronics and Communication Engineering department has been working in areas such as VLSI, microelectronics, semiconductor devices and chip design. The department has also developed an indigenously designed bio-sensor semiconductor chip for EEG signal detection.",
      ),
      h("From an Idea to a Chip"),
      p(
        "One of the notable projects from NIT Silchar was developed under the Chip to Startup (C2S) Initiative of the Ministry of Electronics and Information Technology.",
      ),
      p(
        "The project, titled “Design and Development of Low Power Low Latency Non-Invasive Seizure Detector System,” was fabricated at the Semiconductor Laboratory in Mohali and carried the chip ID C2S0042. The chip was showcased at SEMICON India 2025.",
      ),
      p(
        "The idea is important because semiconductor innovation is not only about making faster processors. It can also be about solving specific problems.",
      ),
      p(
        "In this case, chip technology is being explored for healthcare applications, where detecting neurological signals can potentially support better monitoring and diagnosis.",
      ),
      h("Why Does This Matter?"),
      p(
        "India is currently building a larger semiconductor ecosystem covering chip design, fabrication, packaging, testing, materials and talent development.",
      ),
      p(
        "The government’s semiconductor programme has approved major projects across different parts of India, while newer initiatives are focusing on strengthening domestic design and manufacturing capabilities.",
      ),
      p("For students, this creates a much larger opportunity."),
      p(
        "Semiconductor development requires engineers from multiple disciplines like electronics, computer science, mechanical engineering, materials science and more.",
      ),
      h("Innovation Can Start Here"),
      p("NIT Silchar’s semiconductor work sends a simple message:"),
      p("High-end innovation does not have to begin in a metro city."),
      p(
        "It can begin in a college laboratory, with a research problem, a team of students and faculty, and the willingness to build something from scratch.",
      ),
      p(
        "For the Northeast, such projects can become important examples of how education, research and entrepreneurship can come together to create technology with real-world applications.",
      ),
    ].join(""),
  },
  {
    id: "featured-2",
    title: "Assam’s Industrial Growth: A New Wave of Investment",
    intro:
      "Assam is increasingly attracting attention as an emerging investment and industrial destination. From technology and digital infrastructure to manufacturing, energy and connectivity, large companies are showing growing interest in the state. Reliance Industries’ ₹50,000-crore investment commitment is one example of this changing industrial landscape.",
    tag: "Assam, Industry, Investment, Northeast India",
    writerName: AUTHOR,
    writerPic: WRITER_PIC,
    topicPic: "/blogs/blog-2.jpg",
    createdAt: "2026-09-23T10:00:00.000Z",
    likes: dummyLikes(18),
    comments: dummyComments(2, [
      "Very informative. Assam really is becoming an investment hub.",
      "Good to see opportunities coming to the Northeast itself.",
    ]),
    content: [
      p(
        "For a long time, Assam was primarily associated with tea, oil, tourism and its natural resources.",
      ),
      p("Today, the conversation is becoming broader."),
      p(
        "The state is increasingly being discussed as a potential destination for technology, infrastructure, manufacturing, energy and digital businesses.",
      ),
      p(
        "A major example came during Advantage Assam 2.0 in February 2025. Reliance Industries Chairman and Managing Director Mukesh Ambani announced that Reliance planned to invest over ₹50,000 crore in Assam over the following five years. The company highlighted areas including technology and digital development.",
      ),
      h("Why Are Companies Looking at Assam?"),
      p("Location matters."),
      p(
        "Assam can act as an important connection between mainland India and the wider Northeast, while also offering access to a large regional market.",
      ),
      p(
        "Improving infrastructure, connectivity and digital networks can further influence where companies choose to expand.",
      ),
      p(
        "The investment commitments announced at Advantage Assam 2.0 were not limited to Reliance. The Adani Group, Tata Group, Vedanta and other companies also announced major investment plans for the state, covering areas such as infrastructure, energy, manufacturing and technology.",
      ),
      h("What Could This Mean for Young People?"),
      p("Industrial investment is not only about buildings and factories."),
      p("It can create demand for people with new skills."),
      p(
        "Engineers, designers, software developers, managers, researchers, entrepreneurs and skilled technicians can all become part of a growing ecosystem.",
      ),
      p(
        "For students in Assam, this can create opportunities that may not require moving immediately to Bengaluru, Mumbai or Delhi.",
      ),
      p(
        "The development of new industries can also create opportunities for local startups.",
      ),
      p(
        "A large company entering a region creates new supply chains, new services and new problems that need to be solved.",
      ),
      p("And problems create opportunities for entrepreneurs."),
      h("From Investment to Ecosystem"),
      p(
        "The real impact of industrial growth is not measured only by the amount of money invested.",
      ),
      p("It is also about what develops around that investment."),
      p(
        "More businesses. More skilled professionals. More suppliers. More infrastructure. More research. More startups. More opportunities for students.",
      ),
      p(
        "Assam’s industrial story is therefore becoming bigger than individual companies or individual investment announcements.",
      ),
      p(
        "The larger question is whether the state can build an ecosystem where investment, talent, entrepreneurship and innovation reinforce one another.",
      ),
      p("For the next generation, that could mean one important shift:"),
      p(
        "Opportunities may increasingly come to the Northeast instead of young talent always having to leave the Northeast to find them.",
      ),
    ].join(""),
  },
  {
    id: "featured-3",
    title: "India’s Growth Story: Building the Next Generation of Industry",
    intro:
      "India’s development story is increasingly moving beyond traditional sectors. Startups, digital infrastructure, electronics, semiconductor manufacturing, advanced technology and new industries are becoming important parts of the country’s economic landscape, creating new opportunities for businesses, engineers, researchers and young entrepreneurs.",
    tag: "India, Development, Semiconductors, Startups",
    writerName: AUTHOR,
    writerPic: WRITER_PIC,
    topicPic: "/blogs/blog-3.jpg",
    createdAt: "2026-09-30T10:00:00.000Z",
    likes: dummyLikes(31),
    comments: dummyComments(3, [
      "Nice summary of where Indian industry is heading.",
      "The point about building skills for tomorrow is spot on.",
    ]),
    content: [
      p("India has changed significantly over the past decade."),
      p(
        "The country that once depended heavily on importing many advanced technologies is increasingly focusing on building capabilities within its own ecosystem.",
      ),
      p(
        "From digital payments to electronics manufacturing, from startups to semiconductors, several sectors are undergoing rapid transformation.",
      ),
      h("From Startups to Semiconductors"),
      p(
        "India’s startup ecosystem has created a generation of entrepreneurs working on everything from fintech and logistics to healthcare, climate technology and artificial intelligence.",
      ),
      p(
        "At the same time, the country is investing heavily in physical technology infrastructure.",
      ),
      p("One major example is the semiconductor industry."),
      p(
        "Under the Semicon India Programme, India has approved semiconductor projects involving investments of more than ₹1.6 lakh crore, covering fabrication, packaging and other parts of the semiconductor ecosystem.",
      ),
      p(
        "In July 2026, the government also approved Semicon 2.0, with an outlay of ₹1,27,500 crore, focusing on areas including chip design, research, materials and machines, additional fabs, packaging and talent.",
      ),
      h("Why Manufacturing Matters"),
      p("Technology is not only about software."),
      p("A modern technology ecosystem needs hardware too."),
      p(
        "Phones, electric vehicles, medical equipment, satellites, data centres and communication systems all depend on advanced electronics and semiconductor components.",
      ),
      p(
        "Building these capabilities in India can therefore connect different industries with one another.",
      ),
      p(
        "A semiconductor engineer may work with an automobile company. A mechanical engineer may work on manufacturing equipment. A software developer may build systems that operate on new hardware. A researcher may develop new materials.",
      ),
      p("This is where multidisciplinary innovation becomes important."),
      h("The Role of Young India"),
      p(
        "India’s growth is not something that happens only inside large companies.",
      ),
      p(
        "Students and young professionals can become part of it through research, startups, competitions, internships and projects.",
      ),
      p(
        "A college project can become a prototype. A prototype can become a startup. A research paper can lead to a technology. A local problem can become a business opportunity.",
      ),
      p(
        "The next phase of India’s development will depend not only on how much the country produces, but also on what it learns to design, build and improve.",
      ),
      p("For students, this creates an important opportunity:"),
      p(
        "Don’t just prepare for the industries of today. Build the skills for the industries that are emerging tomorrow.",
      ),
    ].join(""),
  },
  {
    id: "featured-4",
    title: "Global Development: Technology Is Changing the Way the World Grows",
    intro:
      "Global development is entering a new phase shaped by artificial intelligence, digital infrastructure, clean technology, advanced manufacturing and access to information. At the same time, development remains uneven across countries. The challenge is not simply creating new technology, but making sure it reaches people and solves real problems.",
    tag: "Global Development, Technology, Artificial Intelligence, Innovation",
    writerName: AUTHOR,
    writerPic: WRITER_PIC,
    topicPic: "/blogs/blog-4.jpg",
    createdAt: "2026-10-07T10:00:00.000Z",
    likes: dummyLikes(15),
    comments: dummyComments(4, [
      "Technology only matters if it solves real problems. Well said.",
      "Loved the questions in the Next Challenge section.",
    ]),
    content: [
      p("Development has always been connected to technology."),
      p(
        "The steam engine transformed transportation. Electricity transformed industries. The internet transformed communication.",
      ),
      p(
        "Today, artificial intelligence and digital technologies are becoming part of the next major wave of change.",
      ),
      p(
        "But global development is not simply about creating more advanced technology.",
      ),
      p("It is about how that technology can improve people’s lives."),
      h("AI and Development"),
      p(
        "The World Bank’s World Development Report 2026 focuses on the role of artificial intelligence in developing economies.",
      ),
      p(
        "The report notes that AI is spreading faster than earlier general-purpose technologies and can potentially expand access to expertise in areas such as healthcare, agriculture, education and public services.",
      ),
      p("But access alone is not enough."),
      p(
        "Countries need reliable electricity, internet connectivity, skilled people, strong institutions and access to data.",
      ),
      p(
        "Without these foundations, the benefits of new technologies may remain concentrated in a small number of places.",
      ),
      h("Development Is More Than Technology"),
      p(
        "The World Bank’s 2026 Atlas of Global Development looks at development across five broad areas: People. Prosperity. Planet. Infrastructure. Digital transformation.",
      ),
      p(
        "Its data shows that global development has slowed significantly, with progress currently taking place at its weakest pace in around 75 years.",
      ),
      p("This creates a complicated picture."),
      p("Technology is advancing rapidly."),
      p("But not every community is benefiting at the same pace."),
      h("The Next Challenge"),
      p(
        "The important question for the coming years may not be: “How advanced can technology become?”",
      ),
      p("It may be: “How effectively can technology solve real problems?”"),
      p(
        "Can AI help a farmer make better decisions? Can digital tools make education more accessible? Can clean energy reach communities that lack reliable electricity? Can new manufacturing technologies create meaningful employment? Can innovation reduce the gap between developed and developing regions?",
      ),
      p("These questions connect technology with development."),
      h("Innovation With Purpose"),
      p(
        "For young entrepreneurs and innovators, this creates a wider field of opportunity.",
      ),
      p("The biggest problems are not always found in technology companies."),
      p(
        "They can be found in classrooms, hospitals, farms, transportation systems, cities and communities.",
      ),
      p(
        "The next generation of innovation may therefore come from people who understand both technology and the problems it is meant to solve.",
      ),
      p("Global development is not just about moving faster."),
      p(
        "It is about making progress more useful, more accessible and more connected to real human needs.",
      ),
    ].join(""),
  },
  {
    id: "featured-5",
    title: "Entrepreneurship Beyond the Metro: Opportunities in the Northeast",
    intro:
      "India’s entrepreneurial ecosystem is expanding beyond traditional startup hubs. For the Northeast, this creates an opportunity to build ventures around the region’s unique strengths, challenges and communities. With technology, education and entrepreneurial networks becoming more accessible, students can play an important role in shaping the region’s next generation of businesses.",
    tag: "Entrepreneurship, Northeast India, Startups",
    writerName: AUTHOR,
    writerPic: WRITER_PIC,
    topicPic: "/landing2.jpeg",
    createdAt: "2026-10-14T10:00:00.000Z",
    likes: dummyLikes(27),
    comments: dummyComments(5, [
      "Adapt, don't copy. This is the best advice for founders here.",
      "Great motivation for students in the Northeast.",
    ]),
    content: [
      p(
        "When we think about Indian startups, certain cities immediately come to mind. Bengaluru. Mumbai. Delhi-NCR. Hyderabad.",
      ),
      p(
        "These cities have played an important role in building India’s startup ecosystem.",
      ),
      p("But entrepreneurship doesn’t have a geographical limit."),
      p("A startup can emerge anywhere there is a problem worth solving."),
      p("And the Northeast has plenty of unique problems and opportunities."),
      h("Local problems need local understanding"),
      p(
        "The Northeast has its own geographical, cultural and economic realities.",
      ),
      p(
        "Transportation across difficult terrain, access to certain services, tourism, agriculture, handicrafts, local supply chains and regional-language accessibility are just a few areas where entrepreneurs can explore opportunities.",
      ),
      p(
        "A founder who lives in the region already has something valuable: first-hand understanding.",
      ),
      p("They know the problems because they experience them."),
      h("Don’t copy. Adapt."),
      p(
        "Entrepreneurship isn’t necessarily about taking an idea from another city and copying it exactly.",
      ),
      p("A model that works in Bengaluru may not work in Silchar."),
      p(
        "A product designed for a metropolitan customer may not address the needs of a smaller city.",
      ),
      p("The better question is: What can be adapted to our context?"),
      p(
        "Understanding local customers, infrastructure and culture can help entrepreneurs create solutions that are actually relevant.",
      ),
      h("Students have a role to play"),
      p(
        "For students in the Northeast, entrepreneurship can become a way of looking at the region differently.",
      ),
      p(
        "Instead of seeing geographical or infrastructural challenges only as limitations, entrepreneurs can ask whether they also create opportunities for innovation.",
      ),
      p("College campuses can become starting points for this process."),
      p(
        "Students can participate in competitions, attend workshops, connect with founders, work on prototypes and collaborate across disciplines.",
      ),
      p(
        "Even a small project can provide an understanding of what it takes to turn an idea into something useful.",
      ),
      h("The opportunity is getting bigger"),
      p(
        "India’s startup ecosystem has been expanding its focus beyond traditional metropolitan hubs, with initiatives aimed at supporting entrepreneurship across districts and encouraging more young and first-time founders to participate.",
      ),
      p(
        "For students in the Northeast, this means the entrepreneurial ecosystem is no longer something happening somewhere far away.",
      ),
      p("It can be built here too."),
      h("Start with what you know"),
      p("You don’t need to solve every problem in the Northeast."),
      p("Start with one."),
      p(
        "Observe it. Understand it. Talk to people experiencing it. Try a solution. Learn from the response.",
      ),
      p("Then improve."),
      p(
        "The next successful venture from the Northeast may not begin in a large corporate office.",
      ),
      p(
        "It could begin with a student noticing a problem on a college campus and deciding to do something about it.",
      ),
      p(
        "Entrepreneurship doesn’t have to begin somewhere else. It can begin here.",
      ),
    ].join(""),
  },
];
