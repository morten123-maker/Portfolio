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
    year: "2025",
    role: "UX/UI Designer",
    descriptionHeading: "What I've done",
    description:
      "The MINT-Mediendatenbank is an open image database for the MINT community in Germany — a place where educators, FabLabs, student labs and universities find CC-licensed assets for their everyday work, free of charge and right inside the MINTvernetzt community platform.\n\nOver an intense two-month design phase I shaped the whole product end to end: from the first concept and information architecture to the final UI and a clickable prototype in Figma. I wanted a search that inspires rather than just filters — suggesting related images while you look, offering the right formats and sizes for each platform on download, and letting people build and grab whole collections at once. A connected Sharepic generator turns a chosen image straight into a ready-to-post graphic.",
    learned:
      "I learned how much clarity a tight timeline can force. With only two months, every screen had to earn its place — so I leaned on real user needs and quick prototype feedback to decide what truly mattered, and let the rest go.",
    visitUrl: "https://mediendatenbank.mint-vernetzt.de",
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
      "Over three days at the Adventure School I guided a group of kids through their first real design process — from a blank idea to an app they pitched themselves. We started with the basics of UX and UI and a short design-thinking input, then framed a shared challenge together: imagine an app for the MINT community in their region, built from their own point of view.\n\nDay one stayed analog and playful — quick sketches and paper prototypes made in small groups. On day two we moved into Figma, turned those paper screens into real designs and click-dummies, and developed a first feature. The last day was all about telling the story: we practiced how to pitch, and the kids presented their concepts out loud.\n\nMy goal was simple: make design feel like it belongs to everyone, even at that age. The room stayed open and respectful, a place where every idea could become visible and no question was too small. Watching them turn their own thoughts into something they could tap, try and present was the best part of all.",
    learned:
      "I learned that design is strongest when it stays inviting. Kids approach ideas without fear — that openness showed me how much trust, and how little jargon, it actually takes for people to dare to design something themselves.",
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
    eyebrow: "MINTvernetzt • 2023–2026",
    cardTitle: "Community Design",
    detailTitle: "Community Design",
    year: "2023-2026",
    role: "UX/UI Designer",
    descriptionHeading: "What I've done",
    description:
      "For three years I worked as a UX/UI designer at MINTvernetzt, shaping the community platform that brings educators, initiatives and institutions across Germany together in one place. It's where people find each other, share what they've built and keep building on top of it.\n\nI stayed close to the people who actually use it. From first concepts and wireframes to the final UI and interactive prototypes in Figma, every decision started with listening — user tests, workshops, real conversations. I wanted the platform to feel less like a tool and more like an open door: something that helps a community find itself and grow.",
    learned:
      "I learned how much good design depends on a healthy way of working together. In a small team on equal footing I could bring my own ideas in and learn a lot from an experienced designer — and I noticed that honest, clear decisions almost always grow out of real conversations with the people we design for.",
    visitUrl: "https://community.mint-vernetzt.de/",
    coverImage: assetCandidates("ai01", "design-with-ai-hero", "design-with-ai", "cover-4"),
    projectImage: assetCandidates("ai02", "design-with-ai-screen", "project-4"),
    secondaryImage: assetCandidates("ai03", "design-with-ai-process", "project-4-secondary"),
    fallbackGraphic: darkFallback,
    imageAlt: "Design with AI Projektbild",
    tags: [
      { label: "UX", icon: "ux" },
      { label: "UI", icon: "ui" },
      { label: "Design System", icon: "system" },
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
    imageAlt: "Interactive Installation Projektbild",    tags: [
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
    projectVideo: "/prototypglobe.mov",
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