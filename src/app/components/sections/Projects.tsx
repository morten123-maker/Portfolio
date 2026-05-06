"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProjectsProps } from "../../page";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

type Project = {
  title: string;
  duration: string;
  role: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  year: string;
  figmaUrl?: string;
};

const projects: Project[] = [
  {
    title: "MINTvernetzt",
    duration: "3 years",
    role: "working student at MINTvernetzt",
    description:
      "During my three years as a working student at MINTvernetzt, I worked as a UX/UI Designer on the MINTvernetzt community platform and related digital products such as the MINT-Mediendatenbank. I contributed to multiple features across the platform, covering the full design process from concept and wireframing to UI design and prototyping in Figma. My work was strongly user-centered, including planning and conducting user tests and workshops to validate and improve design decisions.",
    images: [
      {
        src: "/mintvernetzt.png",
        alt: "MINTvernetzt project preview",
      },
    ],
    year: "2023 - 2026",
    figmaUrl: "#",
  },
  {
    title: "Globetrotter web app",
    duration: "8 weeks",
    role: "Internship at Curios Company",
    description:
      "As the Designer, I was part of the development of a mobile app for Globetrotter Stores in Hamburg. Within my internship semester from October 2022 to April 2023, I was involved in a web app for Globetrotter, among others. The work process included concept, mockup & styleframes, UX, UI, and concept adaptation. We used Figma for UI/UX and prototyping and Illustrator for the illustrations.",
    images: [
      {
        src: "/globetrotter.png",
        alt: "Globetrotter web app preview",
      },
    ],
    year: "2022",
    figmaUrl: "#",
  },
  {
    title: "Connected Dependencies",
    duration: "6 weeks",
    role: "Exhibition in Berlin",
    description:
      "Connected Dependencies is an exhibition project exploring interaction, connection and dependency between humans, digital systems and physical space. The project combines visual storytelling, spatial design and interaction design into an immersive installation experience.",
    images: [
      {
        src: "/connected-dependencies.png",
        alt: "Connected Dependencies exhibition preview",
      },
    ],
    year: "2023",
    figmaUrl: "#",
  },
];

export default function Projects({ onSetExperienceSection }: ProjectsProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    projects.map(() => 0)
  );
  const [showProjects, setShowProjects] = useState(false);

  const currentProject = projects[currentProjectIndex];
  const currentImageIndex = currentImageIndexes[currentProjectIndex];
  const currentImage = currentProject.images[currentImageIndex];

  const resetToStart = useCallback(() => {
    setShowProjects(false);
    setCurrentProjectIndex(0);
    setCurrentImageIndexes(projects.map(() => 0));
  }, []);

  function nextProject() {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  }

  function previousProject() {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  }

  function setProjectImage(projectIndex: number, imageIndex: number) {
    setCurrentImageIndexes((prev) => {
      const next = [...prev];
      next[projectIndex] = imageIndex;
      return next;
    });
  }

  useEffect(() => {
    if (!showProjects) return;

    let resetTimer: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(resetToStart, 30000);
    };

    startTimer();

    window.addEventListener("click", startTimer);
    window.addEventListener("keydown", startTimer);
    window.addEventListener("mousemove", startTimer);
    window.addEventListener("touchstart", startTimer);

    return () => {
      clearTimeout(resetTimer);
      window.removeEventListener("click", startTimer);
      window.removeEventListener("keydown", startTimer);
      window.removeEventListener("mousemove", startTimer);
      window.removeEventListener("touchstart", startTimer);
    };
  }, [showProjects, resetToStart]);

  return (
    <section
      id="projects"
      className="max-md:hidden h-full overflow-hidden rounded-xl bg-[#202020]"
    >
      {!showProjects ? (
        <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl">
          <Image
            src="/graphic.png"
            alt="Project preview"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <button
            onClick={() => setShowProjects(true)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            rounded-lg bg-[#b84a3c] px-6 py-3 text-sm font-semibold text-white
            transition-all duration-200 hover:scale-105 hover:bg-[#c95749]"
          >
            View Projects
          </button>
        </div>
      ) : (
        <div className="flex h-full min-h-[420px] flex-col gap-6 p-4">
          <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-6 max-xl:grid-cols-1">
            <div className="min-h-0 overflow-y-auto pr-2">
              <h2 className="text-3xl font-bold text-white">
                {currentProject.title}
              </h2>

              <p className="mt-2 text-sm font-semibold text-white">
                {currentProject.duration} • {currentProject.role}
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#cfcfcf]">
                {currentProject.description}
              </p>

              <a
                href={currentProject.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg border border-[#727272]
                px-4 py-2 text-sm font-semibold text-white transition-all duration-200
                hover:border-white hover:bg-white hover:text-black"
              >
                Discover more
                <span className="text-base">🎨</span>
              </a>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-lg bg-white">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {currentProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setProjectImage(currentProjectIndex, index)
                      }
                      aria-label={`Show image ${index + 1}`}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm font-semibold text-[#cfcfcf]">
                  {currentProject.year}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[14px] bg-[#2a2a2a] p-3">
            <p className="shrink-0 text-sm text-[#cfcfcf]">
              {currentProjectIndex + 1} of {projects.length} Projects
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <button
                onClick={previousProject}
                className="flex items-center gap-2 rounded-lg border border-[#727272]
                px-4 py-2 text-sm font-semibold text-white transition-all duration-200
                hover:border-white hover:bg-white hover:text-black"
              >
                <GrLinkPrevious />
                Previous Project
              </button>

              <button
                onClick={nextProject}
                className="flex items-center gap-2 rounded-lg border border-[#727272]
                px-4 py-2 text-sm font-semibold text-white transition-all duration-200
                hover:border-white hover:bg-white hover:text-black"
              >
                Next Project
                <GrLinkNext />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}