export type ProjectTag = {
  label: string;
  icon?: string;
};

export type PortfolioProject = {
  id: string;
  navTitle: string;
  eyebrow: string;
  cardTitle: string;
  detailTitle: string;
  year: string;
  role: string;
  descriptionHeading: string;
  description: string;
  learned: string;
  visitUrl?: string;
  coverImage: string[];
  projectImage: string[];
  projectVideo?: string;
  secondaryImage: string[];
  fallbackGraphic: string;
  imageAlt: string;
  tags: ProjectTag[];
  className: string;
  hoverImage?: string;
  videoSrc: string;
  motionClassName: string;
};

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function assetCandidates(...names: string[]) {
  return names.flatMap((name) => [
    `/${name}.png`,
    `/${name}.jpg`,
    `/${name}.jpeg`,
    `/${name}.webp`,
    `/${name}.svg`,
    `/${name}.PNG`,
    `/${name}.JPG`,
    `/${name}.JPEG`,
    `/${name}.WEBP`,
  ]);
}

function fallbackCover({
  bg = "#131313",
  shape = "M742 90 C894 102 1014 218 1040 374 C1068 548 956 694 784 742 C586 798 420 684 390 512 C356 316 520 74 742 90 Z",
  accent = "#1db954",
  line = "M310 534 C438 340 596 282 724 324 C856 368 916 470 1018 494",
}: {
  bg?: string;
  shape?: string;
  accent?: string;
  line?: string;
}) {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="900" fill="${bg}" />
      <path d="${shape}" fill="${accent}" opacity="0.88" />
      <path d="${line}" fill="none" stroke="#c7a247" stroke-width="4" opacity="0.9" />
    </svg>
  `);
}

const blueFallback = fallbackCover({
  accent: "#1051f2",
  shape: "M686 -40 C822 24 894 134 888 272 C878 480 708 572 646 744 C604 862 666 936 812 960 L1200 960 L1200 -40 Z",
  line: "M612 -30 C744 62 808 168 784 316 C752 512 598 612 584 748 C574 842 640 918 806 956",
});

const greenFallback = fallbackCover({
  accent: "#1fc65b",
  shape: "M768 60 C960 92 1108 242 1088 414 C1062 636 844 748 640 712 C426 674 300 494 354 318 C404 154 574 28 768 60 Z",
  line: "M306 456 C414 184 650 44 858 124 C1014 184 1084 304 1122 438",
});

const darkFallback = fallbackCover({
  accent: "#252525",
  line: "M-60 720 C280 572 512 452 724 520 C890 574 986 700 1260 612",
});

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "mint-mediendatenbank",
    navTitle: "MINT-Mediendatenbank",
    eyebrow: "Design • 2025",
    cardTitle: "MINT-Mediendatenbank",
    detailTitle: "MINT-Mediendatenbank • Design",
    year: "2023-2026",
    role: "UX/UI Designer",
    descriptionHeading: "What I've done",
    description:
      "For three years I worked as a UX/UI designer at MINTvernetzt, shaping the community platform and products like the MINT-Mediendatenbank — an open space where educators find, share and build on each other's material.\n\nI stayed close to the people who actually use it. From the first concept and wireframes to the final UI and prototypes in Figma, every decision started with listening — user tests, workshops, real conversations. I wanted the platform to feel less like a tool and more like an open door: something that helps people find one another and keep building together.",
    learned:
      "Ich habe gelernt, wie sehr gutes Design von einem gesunden Miteinander lebt. In einem kleinen Team auf Augenhöhe konnte ich meine Ideen einbringen und von einer erfahrenen Designerin viel mitnehmen – und gemerkt, dass ehrliche, klare Entscheidungen fast immer aus echten Gesprächen mit den Menschen entstehen, für die wir gestalten.",
    visitUrl: "https://community.mint-vernetzt.de/",
    coverImage: assetCandidates("datenbank01", "mint-mediendatenbank-hero", "mediendatenbank-hero", "cover-1"),
    projectImage: assetCandidates("datenbank02", "mint-mediendatenbank-screen", "mediendatenbank-screen", "project-1", "lila"),
    secondaryImage: assetCandidates("datenbank03", "mint-design-system", "figma-mint", "project-1-secondary"),
    fallbackGraphic: blueFallback,
    imageAlt: "MINT-Mediendatenbank Projektbild",
    tags: [
      { label: "UX", icon: "ux" },
      { label: "UI", icon: "ui" },
      { label: "Design System", icon: "system" },
    ],
    className: "project-card--mint",
    hoverImage: "/Mediendatenbubble.png",
    videoSrc: "/bubbleblue.mp4",
    motionClassName: "project-card__motion-video--mint",
  },
  {
    id: "figma-workshop-kids",
    navTitle: "Figma Workshop with Kids",
    eyebrow: "Adventure School • 2025",
    cardTitle: "Figma Workshop with Kids",
    detailTitle: "Figma Design Workshop with Kids",
    year: "2025",
    role: "Workshop",
    descriptionHeading: "Description",
    description:
      "I introduced a group of kids to the basics of UX and UI design — through play, quick sketches and a lot of curiosity. We started by framing a small problem together, then moved into first wireframes and tiny interactive prototypes in Figma.\n\nMy goal was simple: make design feel like it belongs to everyone, even at that age. The room stayed open and respectful, a place where every idea could become visible and no question was too small. Watching them turn their own thoughts into something they could tap and try was the best part of the day.",
    learned:
      "Ich habe gelernt, dass Design am stärksten ist, wenn es einladend bleibt. Kinder gehen ohne Angst an Ideen heran – diese Offenheit hat mir gezeigt, wie viel Vertrauen und wie wenig Fachjargon es eigentlich braucht, damit Menschen sich trauen, selbst zu gestalten.",
    visitUrl: "https://community.mint-vernetzt.de/",
    coverImage: assetCandidates("workshop01", "figma-workshop-hero", "workshop-hero", "cover-workshop"),
    projectImage: assetCandidates("workshop02", "figma-workshop-slide", "workshop-slide", "project-workshop"),
    secondaryImage: assetCandidates("workshop03", "figma-workshop-prototype", "workshop-prototype"),
    fallbackGraphic: greenFallback,
    imageAlt: "Figma Workshop Projektbild",
    tags: [{ label: "Workshop", icon: "teacher" }],
    className: "project-card--workshop",
    hoverImage: "/Workshopbubble.png",
    videoSrc: "/bubblegreen.mp4",
    motionClassName: "project-card__motion-video--workshop",
  },
  {
    id: "design-with-ai",
    navTitle: "Community Design",
    eyebrow: "2023-2026",
    cardTitle: "Community Design",
    detailTitle: "Community Design",
    year: "2023-2026",
    role: "UX/UI Designer",
    descriptionHeading: "What I've explored",
    description:
      "This is an ongoing exploration of what community-centered design can look like when AI becomes part of the process. I'm curious how AI can support ideation, speed up visual iteration and make room for better decisions — without ever taking the decision away from people.\n\nFor me the real question is less about the technology and more about trust: how do we keep design honest and transparent, and firmly in human hands, while still letting it move faster and reach further?",
    learned:
      "Ich habe gelernt, dass gute AI-Erfahrungen klare Grenzen, sichtbares Feedback und viel Kontext brauchen. AI wird erst dann wirklich hilfreich, wenn Menschen die Kontrolle behalten und jeden Zwischenschritt nachvollziehen können.",
    coverImage: assetCandidates("ai01", "design-with-ai-hero", "design-with-ai", "cover-4"),
    projectImage: assetCandidates("ai02", "design-with-ai-screen", "project-4"),
    secondaryImage: assetCandidates("ai03", "design-with-ai-process", "project-4-secondary"),
    fallbackGraphic: darkFallback,
    imageAlt: "Design with AI Projektbild",
    tags: [
      { label: "UX", icon: "ux" },
      { label: "Design with AI", icon: "ai" },
    ],
    className: "project-card--ai",
    videoSrc: "/bubblegreen.mp4",
    motionClassName: "project-card__motion-video--ai",
  },
  {
    id: "interactive-installation",
    navTitle: "Interactive Installation",
    eyebrow: "Exhibition in Berlin • 2023",
    cardTitle: "Interactive Installation",
    detailTitle: "Interactive Installation • Design",
    year: "2023",
    role: "UX / Design with AI",
    descriptionHeading: "What I've done",
    description:
      "Connected Dependencies is a multimedia installation about the growing dependency between humans and artificial intelligence. It turns the question into a physical encounter: a screen, a sensor hand, a directional sound shower — and a voice that only becomes present when someone chooses to touch it.\n\nThe work asks how this closeness to AI changes our perception of identity, privacy and humanity. Instead of giving an answer, the installation creates a quiet moment in the exhibition space where visitors can feel the relationship for themselves and reflect on the responsibility that comes with it.",
    learned:
      "I learned how much interaction can be shaped through timing, distance and atmosphere. In an installation, the interface has to be immediately understandable — but the strongest moments happen when the technology becomes quiet enough for people to think.",
    coverImage: ["/berlin2.png"],
    projectImage: ["/berlin3.png"],
    secondaryImage: ["/berlin4.png"],
    fallbackGraphic: blueFallback,
    imageAlt: "Interactive Installation Projektbild",
    tags: [
      { label: "UX", icon: "ux" },
      { label: "Design with AI", icon: "ai" },
    ],
    className: "project-card--installation",
    hoverImage: "/Interactivebubble.png",
    videoSrc: "/bubbleblue.mp4",
    motionClassName: "project-card__motion-video--installation",
  },
  {
    id: "augmented-reality-app",
    navTitle: "Augmented Reality App",
    eyebrow: "Experience for Globetrotter • 2022",
    cardTitle: "Augmented Reality App",
    detailTitle: "Augmented Reality App • Experience for Globetrotter",
    year: "2022",
    role: "UX/UI Designer",
    descriptionHeading: "What I've done",
    description:
      "During my internship semester I worked on a web app for Globetrotter\'s \"Eine grünere Wahl\" event. The app was opened through QR codes in the Hamburg store and in online orders, guiding visitors to one of fifteen selected sustainable products.\n\nThe idea was a fake AR experience: product criteria such as recycled material, social responsibility or Made in EU appeared as illustrated bubbles that could move through the room. I worked on concept, mockups, styleframes, UX, UI and prototyping in Figma, with illustrations built in Illustrator.",
    learned:
      "I learned how important clear anchors are in spatial interfaces. The experience had to feel playful, but people first needed orientation: what to scan, what to look at, and why the product was part of a greener choice.",
    coverImage: ["/globetrotter1.png"],
    projectImage: ["/globetrotter2.png"],
    secondaryImage: ["/globetrotter3.png"],
    fallbackGraphic: greenFallback,
    imageAlt: "Augmented Reality App Projektbild",
    tags: [
      { label: "UX", icon: "ux" },
      { label: "UI", icon: "ui" },
    ],
    className: "project-card--ar",
    hoverImage: "/Globetrotterbubble.png",
    videoSrc: "/bubblegreen.mp4",
    motionClassName: "project-card__motion-video--ar",
  },
];