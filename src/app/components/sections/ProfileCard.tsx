"use client";

import MotionVideo from "./MotionVideo";

type ProfileCardProps = {
  mode?: "sidebar" | "panel";
  activeView?: "projects" | "profile";
  activeProjectIndex?: number | null;
  onProfileClick?: () => void;
  onOverviewClick?: () => void;
  onProjectClick?: (index: number) => void;
};

const competencies = [
  { name: "UX", icon: "ux" },
  { name: "UI", icon: "ui" },
  { name: "Design System", icon: "system" },
  { name: "Design with AI", icon: "ai" },
  { name: "3D", icon: "3d" },
  { name: "Motion Design", icon: "motion" },
];

export default function ProfileCard({ onProfileClick }: ProfileCardProps) {
  return (
    <button type="button" className="legacy-profile-card" onClick={onProfileClick}>
      <span className="legacy-profile-card__media" aria-hidden="true">
        <MotionVideo
          src="/Profile-1.mp4"
          active
          mode="loop"
          poster="/profil-1.jpg"
          fallbackImage="/profil-1.jpg"
          className="legacy-profile-card__motion"
          videoClassName="legacy-profile-card__video"
        />
      </span>
      <span className="legacy-profile-card__copy">
        <span>Morten Franken</span>
        <strong>Hallooooo!</strong>
      </span>
    </button>
  );
}

export function ProfilePanel() {
  return (
    <article className="profile-page-card" id="profile">
      <div className="profile-page-card__image" aria-hidden="true">
        <MotionVideo
          src="/Profile-1.mp4"
          active
          mode="loop"
          poster="/profil-1.jpg"
          fallbackImage="/profil-1.jpg"
          className="profile-page-card__motion"
          videoClassName="profile-page-card__video"
        />
      </div>

      <div className="profile-page-card__body">
        <p className="profile-page-card__name">Morten Franken</p>
        <h1 className="profile-page-card__title">Hallooooo!</h1>

        <p className="profile-page-card__copy">
          I&apos;m Morten, a digital designer focused on interaction and user
          experience. I believe good design begins with people talking,
          listening, and learning from one another.
        </p>

        <div className="profile-page-card__competencies">
          <h2>My competencies</h2>
          <div className="profile-page-card__pills">
            {competencies.map((competency) => (
              <span key={competency.name} className="profile-competency-pill">
                <img src={`/icons/${competency.icon}.svg`} alt="" aria-hidden="true" />
                {competency.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
