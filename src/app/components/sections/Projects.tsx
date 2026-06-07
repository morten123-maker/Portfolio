"use client";

import { CSSProperties, useMemo, useState } from "react";
import MotionVideo from "./MotionVideo";
import SpotifyAlbum from "./SpotifyAlbum";
import {
  portfolioProjects,
  type PortfolioProject,
  type ProjectTag,
} from "./portfolioData";

type ProjectsProps = {
  activeProjectIndex: number | null;
  onProjectSelect: (index: number) => void;
  onBackToOverview: () => void;
  onProfileSelect: () => void;
};

function SvgIcon({ name, className = "" }: { name: string; className?: string }) {
  return <img src={`/icons/${name}.svg`} alt="" aria-hidden="true" className={className} />;
}

function OverviewIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"/>
      <path d="M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"/>
      <path d="M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"/>
      <path d="M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"/>
    </svg>
  );
}

function TagPill({ tag }: { tag: ProjectTag }) {
  return (
    <span className="project-tag">
      {tag.icon && <SvgIcon name={tag.icon} className="project-tag__icon" />}
      <span>{tag.label}</span>
    </span>
  );
}

function Img({
  src,
  fallback,
  alt,
  className,
  style,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}

function ProjectAssetImage({
  sources,
  fallback,
  alt,
  className,
  style,
}: {
  sources?: string[];
  fallback: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
}) {
  const sourceKey = `${sources?.join("|") ?? ""}|${fallback}`;
  const [candidateIndex, setCandidateIndex] = useState(0);
  const candidates = useMemo(() => {
    const merged = [...(sources ?? []), fallback].filter(Boolean);
    return merged.filter((src, index) => merged.indexOf(src) === index);
  }, [sourceKey]);

  return (
    <img
      src={candidates[candidateIndex] ?? fallback}
      alt={alt}
      className={className}
      style={style}
      onError={() =>
        setCandidateIndex((c) => (c < candidates.length - 1 ? c + 1 : c))
      }
    />
  );
}

/* ── Detail nav ──────────────────────────────────────────── */
function DetailNav({
  projects,
  activeIndex,
  onSelect,
  onOverview,
}: {
  projects: PortfolioProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onOverview: () => void;
}) {
  const total = projects.length;
  // Cyclic navigation — wraps around at both ends
  // (last → next → first, first → previous → last).
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return (
    <nav className="detail-nav" aria-label="Project navigation">
      <button type="button" className="detail-nav__overview" onClick={onOverview}>
        <OverviewIcon className="detail-nav__icon" />
        <span>Back to Overview</span>
      </button>

      <div className="detail-nav__arrows">
        <button
          type="button"
          className="detail-nav__arrow detail-nav__arrow--prev"
          onClick={() => onSelect(prevIndex)}
          aria-label={`Previous project: ${projects[prevIndex].cardTitle}`}
        >
          <svg className="detail-nav__icon" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true"><path d="M7 3L2 8L7 13M2.5 8H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>{projects[prevIndex].cardTitle}</span>
        </button>
        <button
          type="button"
          className="detail-nav__arrow detail-nav__arrow--next"
          onClick={() => onSelect(nextIndex)}
          aria-label={`Next project: ${projects[nextIndex].cardTitle}`}
        >
          <span>{projects[nextIndex].cardTitle}</span>
          <svg className="detail-nav__icon" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true"><path d="M13 3L18 8L13 13M17.5 8H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </nav>
  );
}

/* ── More projects ───────────────────────────────────────── */
function MoreProjects({ projects, activeIndex, onSelect, onOverview }: { projects: PortfolioProject[]; activeIndex: number; onSelect: (i: number) => void; onOverview: () => void; }) {
  // Show the projects that follow the current one in cyclic order — this
  // mirrors the "Next Project" flow and never repeats the active project.
  const total = projects.length;
  const count = Math.min(3, total - 1);
  const others = Array.from({ length: count }, (_, step) => {
    const i = (activeIndex + step + 1) % total;
    return { p: projects[i], i };
  });

  return (
    <section className="more-projects" aria-label="More projects">
      <div className="more-projects__header">
        <h2>More Projects</h2>
        <button type="button" className="more-projects__view-all" onClick={onOverview}>
          <span>View All</span>
          <OverviewIcon className="more-projects__view-all-icon" />
        </button>
      </div>
      <div className="more-projects__grid">
        {others.map(({ p, i }) => (
          <button key={p.id} type="button" className="more-projects__card" onClick={() => onSelect(i)} aria-label={`${p.detailTitle} öffnen`}>
            <span className="more-projects__card-media">
              <ProjectAssetImage sources={p.coverImage} fallback={p.fallbackGraphic} alt="" className="more-projects__card-image" />
            </span>
            <span className="more-projects__card-overlay">
              <span className="more-projects__card-title">{p.cardTitle}</span>
              <span className="more-projects__card-meta">
                <span className="more-projects__card-eyebrow">{p.eyebrow}</span>
                <span className="more-projects__card-dot" aria-hidden="true" />
                <span className="more-projects__card-year">{p.year}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}


function ProjectPageFooter({ onOverview }: { onOverview: () => void }) {
  return (
    <footer className="project-page-footer" aria-label="Footer">
      <SpotifyAlbum />
      <nav className="project-page-footer__legal" aria-label="Legal">
        <a href="/impressum">Legal Notice</a>
        <span aria-hidden="true" />
        <a href="/datenschutz">Privacy Policy</a>
      </nav>
      <button type="button" className="project-page-footer__overview" onClick={onOverview}>
        <OverviewIcon className="project-page-footer__overview-icon" />
        <span>Overview</span>
      </button>
    </footer>
  );
}

function StoryImage({ src, fallback, alt, className = "", contain = false }: { src: string; fallback: string; alt: string; className?: string; contain?: boolean }) {
  return (
    <div className={["story-image", contain ? "story-image--contain" : "", className].filter(Boolean).join(" ")}>
      <Img src={src} fallback={fallback} alt={alt} className="story-image__asset" style={contain ? { objectFit: "contain" } : undefined} />
    </div>
  );
}

/* ── Default detail ──────────────────────────────────────── */
function DefaultProjectDetail({ project, projects, activeIndex, onSelect, onOverview }: { project: PortfolioProject; projects: PortfolioProject[]; activeIndex: number; onSelect: (i: number) => void; onOverview: () => void; }) {
  const paragraphs = useMemo(() => project.description.split("\n\n").filter(Boolean), [project.description]);
  return (
    <article className="project-detail-v2">
      <DetailNav projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
      <div className="project-detail-v2__scroll">
        <section className="project-hero-v2">
          <ProjectAssetImage sources={project.coverImage} fallback={project.fallbackGraphic} alt="" className="project-hero-v2__image" />
        </section>
        <div className="project-detail-v2__container" style={{ marginTop: 18 }}>
          <section className="project-intro-v2">
            <h1 className="project-intro-v2__title">{project.detailTitle}</h1>
            <div className="project-intro-v2__grid">
              <div className="project-intro-v2__copy">
                <h2>{project.descriptionHeading}</h2>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                {project.visitUrl && <a href={project.visitUrl} target="_blank" rel="noreferrer">visit {project.visitUrl.replace("https://", "")} ↗</a>}
              </div>
              <aside className="project-intro-v2__meta">
                <div className="project-intro-v2__meta-block">
                  <h2>My Role</h2>
                  <div className="project-intro-v2__tags">{project.tags.map((tag) => <TagPill key={tag.label} tag={tag} />)}</div>
                </div>
                <div className="project-intro-v2__meta-block">
                  <h2>Year</h2>
                  <p>{project.year}</p>
                </div>
              </aside>
            </div>
          </section>
          <section className="project-showcase-v2">
            <div className="project-showcase-v2__visual">
              {project.projectVideo ? (
                <video src={project.projectVideo} autoPlay loop muted playsInline className="project-showcase-v2__image" style={{ objectFit: "contain", background: "#1a1a1a" }} />
              ) : (
                <ProjectAssetImage sources={project.projectImage} fallback={project.fallbackGraphic} alt={project.imageAlt} className="project-showcase-v2__image" />
              )}
            </div>
            <div className="project-learned-v2">
              <h2>What I&apos;ve learned</h2>
              <p>{project.learned}</p>
            </div>
          </section>
          <section className="project-showcase-v2 project-showcase-v2--reverse">
            <div className="project-learned-v2">
              <h2>What I&apos;ve learned</h2>
              <p>{project.learned}</p>
            </div>
            <div className="project-showcase-v2__visual">
              <ProjectAssetImage sources={project.secondaryImage} fallback={project.fallbackGraphic} alt="Weiteres Projektbild" className="project-showcase-v2__image" />
            </div>
          </section>
        </div>
        <MoreProjects projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
        <ProjectPageFooter onOverview={onOverview} />
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════
   INTERACTIVE INSTALLATION — custom layout
   ══════════════════════════════════════════════════════════ */


function InstallationDetail({ project, projects, activeIndex, onSelect, onOverview }: { project: PortfolioProject; projects: PortfolioProject[]; activeIndex: number; onSelect: (i: number) => void; onOverview: () => void; }) {
  const fb = project.fallbackGraphic;
  const paragraphs = project.description.split("\n\n").filter(Boolean);

  return (
    <article className="project-detail-v2">
      <DetailNav projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
      <div className="project-detail-v2__scroll">
        <section className="project-hero-v2">
          <Img src="/berlin2.png" fallback={fb} alt="Connected Dependencies installation view" className="project-hero-v2__image" />
        </section>

        <div className="project-detail-v2__container" style={{ marginTop: 18 }}>
          <section className="project-intro-v2">
            <h1 className="project-intro-v2__title">{project.detailTitle}</h1>
            <div className="project-intro-v2__grid">
              <div className="project-intro-v2__copy">
                <h2>{project.descriptionHeading}</h2>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <aside className="project-intro-v2__meta">
                <div className="project-intro-v2__meta-block">
                  <h2>My Role</h2>
                  <div className="project-intro-v2__tags">{project.tags.map((tag) => <TagPill key={tag.label} tag={tag} />)}</div>
                </div>
                <div className="project-intro-v2__meta-block">
                  <h2>Year</h2>
                  <p>{project.year}</p>
                </div>
              </aside>
            </div>
          </section>

          <section className="project-story-row project-story-row--diagram">
            <StoryImage src="/berlin3.png" fallback={fb} alt="Diagram of the installation setup" contain />
            <div className="project-learned-v2 project-story-copy">
              <h2>Concept</h2>
              <p>A portrait monitor gives the AI a face. Above it, a sound shower creates a narrow field of sound; below it, a 3D-printed hand hides the Arduino sensor.</p>
              <p>The installation starts only when a visitor places their hand into the sculpture. That simple gesture turns observation into contact.</p>
            </div>
          </section>

          <section className="project-wide-image">
            <StoryImage src="/berlin4.png" fallback={fb} alt="Visitor touching the sensor hand" />
            <p>Photo: Pauline Tillmann</p>
          </section>

          <section className="project-story-row project-story-row--reverse">
            <div className="project-learned-v2 project-story-copy">
              <h2>Software</h2>
              <p>The AI speaks as a character of circuits and code. It greets the visitor, compares human and artificial existence, and slowly shifts from reassurance to unease.</p>
              <p>Three visual states — white, red and black — support this monologue and make the artificial presence feel both familiar and distant.</p>
            </div>
            <StoryImage src="/berlin5.png" fallback={fb} alt="Three visual states of the AI face" contain />
          </section>

          <section className="project-two-images">
            <StoryImage src="/berlin7.png" fallback={fb} alt="Visitor experiencing the installation" />
            <StoryImage src="/berlin6.png" fallback={fb} alt="Installation monitor in the exhibition space" />
          </section>
        </div>

        <MoreProjects projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
        <ProjectPageFooter onOverview={onOverview} />
      </div>
    </article>
  );
}

function GlobetrotterDetail({ project, projects, activeIndex, onSelect, onOverview }: { project: PortfolioProject; projects: PortfolioProject[]; activeIndex: number; onSelect: (i: number) => void; onOverview: () => void; }) {
  const fb = project.fallbackGraphic;
  const paragraphs = project.description.split("\n\n").filter(Boolean);

  return (
    <article className="project-detail-v2">
      <DetailNav projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
      <div className="project-detail-v2__scroll">
        <section className="project-hero-v2">
          <Img src="/globetrotter1.png" fallback={fb} alt="Globetrotter store with AR product card" className="project-hero-v2__image" />
        </section>

        <div className="project-detail-v2__container" style={{ marginTop: 18 }}>
          <section className="project-intro-v2">
            <h1 className="project-intro-v2__title">{project.detailTitle}</h1>
            <div className="project-intro-v2__grid">
              <div className="project-intro-v2__copy">
                <h2>{project.descriptionHeading}</h2>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                {project.visitUrl && <a href={project.visitUrl} target="_blank" rel="noreferrer">visit www.mediendatenbank.mint-vernetzt.de ↗</a>}
              </div>
              <aside className="project-intro-v2__meta">
                <div className="project-intro-v2__meta-block">
                  <h2>My Role</h2>
                  <div className="project-intro-v2__tags">{project.tags.map((tag) => <TagPill key={tag.label} tag={tag} />)}</div>
                </div>
                <div className="project-intro-v2__meta-block">
                  <h2>Year</h2>
                  <p>{project.year}</p>
                </div>
              </aside>
            </div>
          </section>

          <section className="project-story-row project-story-row--ar-intro">
            <StoryImage src="/globetrotter2.png" fallback={fb} alt="QR code screen for the green choice product" contain />
            <div className="project-learned-v2 project-story-copy">
              <h2>Concept</h2>
              <p>The QR code became the bridge between store and digital layer. After scanning, visitors landed directly on a product story instead of a generic campaign page.</p>
              <p>Each product received its own visual world, so the sustainability criteria could be discovered step by step.</p>
            </div>
          </section>

          <section className="project-wide-image project-wide-image--full">
            <StoryImage src="/globetrotter3.png" fallback={fb} alt="Bubble system with sustainable criteria in the store" />
          </section>

          <section className="project-two-images project-two-images--ar">
            <StoryImage src="/globetrotter5.png" fallback={fb} alt="Shoes suspended in the Globetrotter store" />
            <StoryImage src="/globetrotter4.png" fallback={fb} alt="Jacket installation in the Globetrotter store" />
          </section>
        </div>

        <MoreProjects projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />
        <ProjectPageFooter onOverview={onOverview} />
      </div>
    </article>
  );
}

/* ── Project detail router ───────────────────────────────── */
function ProjectDetail({ project, projects, activeIndex, onSelect, onOverview }: { project: PortfolioProject; projects: PortfolioProject[]; activeIndex: number; onSelect: (i: number) => void; onOverview: () => void; }) {
  if (project.id === "interactive-installation") {
    return <InstallationDetail project={project} projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />;
  }
  if (project.id === "augmented-reality-app") {
    return <GlobetrotterDetail project={project} projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />;
  }
  return <DefaultProjectDetail project={project} projects={projects} activeIndex={activeIndex} onSelect={onSelect} onOverview={onOverview} />;
}

/* ── Project card ────────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: PortfolioProject; index: number; onOpen: () => void; }) {
  const [motionActive, setMotionActive] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={() => setMotionActive(true)}
      onPointerLeave={() => setMotionActive(false)}
      onFocus={() => setMotionActive(true)}
      onBlur={() => setMotionActive(false)}
      className={["project-card", project.className, motionActive ? "is-motion-visible" : ""].filter(Boolean).join(" ")}
      style={{ "--card-index": index } as CSSProperties}
      aria-label={`${project.detailTitle} öffnen`}
    >
      <span className="project-card__media" aria-hidden="true">
        <MotionVideo src={project.videoSrc} active={motionActive} className="project-card__motion" videoClassName={["project-card__motion-video", project.motionClassName].filter(Boolean).join(" ")} speed={1} />
      </span>
      <span className="project-card__overlay">
        <span className="project-card__shade" />
        <span className="project-card__content">
          <span className="project-card__tags">{project.tags.map((tag) => <TagPill key={tag.label} tag={tag} />)}</span>
          <span className="project-card__eyebrow">{project.eyebrow}</span>
          <span className="project-card__title">{project.cardTitle}</span>
        </span>
      </span>
    </button>
  );
}

function AboutCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="project-card project-card--about is-motion-visible" aria-label="About me öffnen">
      <span className="project-card__about-media" aria-hidden="true">
        <img className="project-card__about-ocean-poster" src="/ocean-poster.jpg" alt="" />
        <MotionVideo src="/oceanvid.MP4" active mode="loop" poster="/ocean-poster.jpg" fallbackImage="/ocean-poster.jpg" className="project-card__about-ocean" videoClassName="project-card__about-ocean-video" />
        <img className="project-card__about-photo" src="/profil-2-auto.jpg" alt="" />
        <span className="project-card__about-gradient" />
      </span>
      <span className="project-card__overlay">
        <span className="project-card__content project-card__content--about">
          <span className="project-card__eyebrow">About me • 1995</span>
          <span className="project-card__title">Morten Franken</span>
        </span>
      </span>
    </button>
  );
}

/* ── Overview ────────────────────────────────────────────── */
export default function Projects({ activeProjectIndex, onProjectSelect, onBackToOverview, onProfileSelect }: ProjectsProps) {
  const openedProject = activeProjectIndex === null ? null : portfolioProjects[activeProjectIndex];

  if (openedProject) {
    return (
      <section id="projects" className="projects-section projects-section--detail">
        <ProjectDetail project={openedProject} projects={portfolioProjects} activeIndex={activeProjectIndex as number} onSelect={onProjectSelect} onOverview={onBackToOverview} />
      </section>
    );
  }

  const [mint, workshop, ai, installation, ar] = portfolioProjects;

  return (
    <section id="projects" className="projects-section projects-section--overview">
      <div className="overview-layout">
        <div className="overview-row overview-row--top">
          <ProjectCard project={mint} index={0} onOpen={() => onProjectSelect(0)} />
          <ProjectCard project={workshop} index={1} onOpen={() => onProjectSelect(1)} />
        </div>
        <div className="overview-row overview-row--bottom">
          <ProjectCard project={ai} index={2} onOpen={() => onProjectSelect(2)} />
          <ProjectCard project={installation} index={3} onOpen={() => onProjectSelect(3)} />
          <div className="overview-stack">
            <AboutCard onOpen={onProfileSelect} />
            <ProjectCard project={ar} index={4} onOpen={() => onProjectSelect(4)} />
          </div>
        </div>
      </div>
    </section>
  );
}
