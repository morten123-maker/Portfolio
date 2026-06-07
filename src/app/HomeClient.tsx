"use client";

import { useEffect, useState } from "react";
import Projects from "./components/sections/Projects";
import SpotifyAlbum from "./components/sections/SpotifyAlbum";
import MobileFooter from "./components/sections/MobileFooter";

type ActiveView = "overview" | "profile";

type ResumeRow = {
  title: string;
  meta: string;
};

const designExperienceRows: ResumeRow[] = [
  {
    title: "UX/UI Designer at Matrix gGmbH",
    meta: "2023 – now • Project MINTvernetzt",
  },
  {
    title: "Digital Media and Experiment",
    meta: "2019 – now • Studies at HSBI",
  },
  {
    title: "Internship at Curious Company GmbH",
    meta: "2022 – 2023 • Hamburg",
  },
  {
    title: "UX/UI Designer at Schüco",
    meta: "2021",
  },
];

const otherExperienceRows: ResumeRow[] = [
  {
    title: "Production Assistant at WDR",
    meta: "2021 – 2022",
  },
  {
    title: "Travelling and jobbing",
    meta: "2015 – 2018 • Europe, America, Asia",
  },
  {
    title: "Teamer in a surfcamp",
    meta: "2017 – 2020 • France",
  },
  {
    title: "Many minijobs",
    meta: "2015 – 2020",
  },
  {
    title: "Volunteering in a meditation center",
    meta: "2018 • Collaboration",
  },
  {
    title: "Crossing the Atlantic",
    meta: "2018 • Sailing boat",
  },
];

const profileSliderImages = ["/profil-1.jpg", "/profil-2-auto.jpg", "/profil-3.jpg", "/profil-4.JPG"];

const taglines = [
  "I believe good design belongs to everyone.",
  "I design for people, communities, and the spaces between them.",
  "I believe honest design is the most powerful design.",
  " I create with empathy, curiosity, and a bias for freedom.",
  "I believe design should open doors, not close them.",
  "I listen first. Then I design."
];

/* ── Topline with typewriter effect ──────────────────────── */
function SiteTopline({
  onOverviewClick,
  className = "site-topline",
}: {
  onOverviewClick: () => void;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[index];

    if (!deleting && displayed.length < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 38);
      return () => clearTimeout(timeout);
    }

    if (!deleting && displayed.length === current.length) {
      const timeout = setTimeout(() => setDeleting(true), 15000);
      return () => clearTimeout(timeout);
    }

    if (deleting && displayed.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 18);
      return () => clearTimeout(timeout);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % taglines.length);
    }
  }, [displayed, deleting, index]);

  return (
    <div className={className} aria-label="Intro">
      <button type="button" className="site-brand" onClick={onOverviewClick}>
        <strong>UX/UI Designer</strong>
        <span> – {displayed}<span aria-hidden="true">|</span></span>
      </button>
    </div>
  );
}

/* ── Bottombar ────────────────────────────────────────────── */
function SiteBottomBar({
  showSpotify,
  onOverviewClick,
  isOverviewActive,
}: {
  showSpotify: boolean;
  onOverviewClick: () => void;
  isOverviewActive: boolean;
}) {
  return (
    <div
      className={[
        "site-bottombar",
        showSpotify ? "site-bottombar--profile" : "site-bottombar--overview",
      ].join(" ")}
      aria-label="Navigation"
    >
      {showSpotify ? <SpotifyAlbum /> : <span className="site-bottombar__spacer" />}

      <nav className="site-bottombar__legal" aria-label="Legal">
        <a href="/impressum" className="site-bottombar__legal-link">Legal Notice</a>
        <span className="site-bottombar__divider" aria-hidden="true" />
        <a href="/datenschutz" className="site-bottombar__legal-link">Privacy Policy</a>
      </nav>

      <button
        type="button"
        className={["site-bottombar__overview", isOverviewActive ? "is-active" : ""]
          .filter(Boolean)
          .join(" ")}
        onClick={onOverviewClick}
        aria-current={isOverviewActive ? "page" : undefined}
      >
        <img
          src="/icons/dashboard-square-02.svg"
          alt=""
          aria-hidden="true"
          className="site-bottombar__overview-icon"
        />
        <span>Overview</span>
      </button>
    </div>
  );
}

/* ── Resume list ──────────────────────────────────────────── */
function ResumeList({ rows }: { rows: ResumeRow[] }) {
  return (
    <div className="resume-list">
      {rows.map((row) => (
        <article key={`${row.title}-${row.meta}`} className="resume-list__row">
          <h3>{row.title}</h3>
          <p>{row.meta}</p>
        </article>
      ))}
    </div>
  );
}

/* ── Hover resume card ────────────────────────────────────── */
function HoverResumeCard({
  title,
  rows,
  ariaLabel,
}: {
  title: string;
  rows: ResumeRow[];
  ariaLabel: string;
}) {
  return (
    <section className="profile-hover-card" aria-label={ariaLabel} tabIndex={0}>
      <ResumeList rows={rows} />
      <span className="resume-list__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span>↓</span>
      </span>
      <h2>{title}</h2>
    </section>
  );
}

/* ── Profile image slider ─────────────────────────────────── */
function ProfileImageSlider() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % profileSliderImages.length);
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="profile-image-slider" aria-label="Profile image slider">
      <div
        className="profile-image-slider__track"
        style={{ transform: `translate3d(-${activeImage * 100}%, 0, 0)` }}
      >
        {profileSliderImages.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            className="profile-image-slider__image"
            onError={(event) => { event.currentTarget.src = "/profil-1.jpg"; }}
          />
        ))}
      </div>

      <div className="profile-image-slider__dots">
        {profileSliderImages.map((src, index) => (
          <button
            type="button"
            key={`${src}-dot`}
            className={[
              "profile-image-slider__dot",
              activeImage === index ? "profile-image-slider__dot--active" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => setActiveImage(index)}
            aria-label={`Bild ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Profile intro card ───────────────────────────────────── */
function ProfileIntroCard() {
  return (
    <article className="profile-intro-card" aria-label="About Morten Franken">
      <ProfileImageSlider />
      <div className="profile-intro-card__copy">
        <p className="profile-intro-card__name">(He/Him)</p>
        <h1>Hallo, I&apos;m Morten</h1>
        <p>
          I&apos;m a digital designer who believes great experiences start with listening.
        </p>
        <p>
          I approach every project by getting close to people – their needs, their frustrations,
          their everyday realities. Design, for me, isn&apos;t about aesthetics alone. It&apos;s
          about creating spaces where people feel understood, empowered, and free.
        </p>
        <p>
          I work best in collaboration: thinking together, building together, questioning together.
          I take on projects I believe in – ones that connect communities, remove barriers, and
          leave something useful behind.
        </p>
      </div>
    </article>
  );
}

/* ── All Design Projects tile ─────────────────────────────── */
function AllDesignProjectsTile({ onOverviewClick }: { onOverviewClick: () => void }) {
  return (
    <button
      type="button"
      className="profile-design-projects"
      onClick={onOverviewClick}
      aria-label="Alle Designprojekte öffnen"
    >
      <span className="profile-design-projects__label">
        <span>All Design Projects</span>
        <span className="profile-design-projects__arrow" aria-hidden="true">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 9H22M15 2L22 9L15 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ── Profile view ─────────────────────────────────────────── */
function ProfileView({
  onOverviewClick,
  onOverviewToplineClick,
}: {
  onOverviewClick: () => void;
  onOverviewToplineClick: () => void;
}) {
  return (
    <section className="profile-view" aria-label="About me">
      {/* Mobile-only: topline scrolls inside this container */}
      <SiteTopline
        onOverviewClick={onOverviewToplineClick}
        className="site-topline site-topline--inscroll"
      />
      <div className="profile-grid">
        <ProfileIntroCard />
        <HoverResumeCard
          title="Design Experience"
          rows={designExperienceRows}
          ariaLabel="Design Experience"
        />
        <HoverResumeCard
          title="Other Experience"
          rows={otherExperienceRows}
          ariaLabel="Other Experience"
        />
        <AllDesignProjectsTile onOverviewClick={onOverviewClick} />
        {/* Mobile-only: Spotify + legal scroll in at the bottom */}
        <MobileFooter />
      </div>
    </section>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function HomeClient() {
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  function openProfile() {
    setActiveView("profile");
    setActiveProjectIndex(null);
  }

  function openProject(index: number) {
    setActiveView("overview");
    setActiveProjectIndex(index);
  }

  function openOverview() {
    setActiveView("overview");
    setActiveProjectIndex(null);
  }

  const isOverviewActive = activeView === "overview" && activeProjectIndex === null;

  return (
    <main className="portfolio-shell">
      {/* Desktop only — hidden on mobile via CSS */}
      {activeProjectIndex === null && (
        <SiteTopline
          onOverviewClick={openOverview}
          className="site-topline site-topline--desktop"
        />
      )}

      <div className={["portfolio-viewport", activeProjectIndex !== null ? "portfolio-viewport--project-open" : ""].filter(Boolean).join(" ")}>
        {activeView === "profile" ? (
          <ProfileView
            onOverviewClick={openOverview}
            onOverviewToplineClick={openOverview}
          />
        ) : (
          <Projects
            activeProjectIndex={activeProjectIndex}
            onProjectSelect={openProject}
            onBackToOverview={openOverview}
            onProfileSelect={openProfile}
            topline={
              activeProjectIndex === null ? (
                <SiteTopline
                  onOverviewClick={openOverview}
                  className="site-topline site-topline--inscroll"
                />
              ) : undefined
            }
          />
        )}
      </div>

      {activeProjectIndex === null && (
        <SiteBottomBar
          showSpotify={activeView === "profile"}
          onOverviewClick={openOverview}
          isOverviewActive={isOverviewActive}
        />
      )}
    </main>
  );
}
