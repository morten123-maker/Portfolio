"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Footer from "./components/Footer";
import Loader from "./components/ui/Loader";
import GithubContributions from "./components/sections/GithubContributions";

// Lazy load components
const ProfileCard = lazy(() => import("./components/sections/ProfileCard"));
const Projects = lazy(() => import("./components/sections/Projects"));
const ProgrammingLanguages = lazy(
  () => import("./components/sections/ProgrammingLanguages")
);
const SpotifyAlbum = lazy(() => import("./components/sections/SpotifyAlbum"));

export default function HomeClient() {
  const [experienceSection, setExperienceSection] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function handleSetExperienceSection() {
    setExperienceSection((prev) => !prev);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
  <main className="h-dvh box-border overflow-hidden bg-[#111111] p-8">
    <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[440px_minmax(0,1fr)] gap-4">

      {/* LINKS */}
      <aside className="min-h-0 overflow-hidden rounded-[16px] bg-[#202020]">
        <ProfileCard />
      </aside>

      {/* RECHTS */}
      <section className="grid min-h-0 grid-rows-[minmax(0,1fr)_176px_64px] gap-4">

        {/* TOP */}
        <div className="min-h-0 overflow-hidden rounded-[16px] bg-[#202020]">
          <Projects onSetExperienceSection={handleSetExperienceSection} />
        </div>

        {/* MITTE */}
        <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_250px] gap-4">
          <div className="min-h-0 overflow-hidden rounded-[16px] bg-[#202020]">
            <SpotifyAlbum />
          </div>

          <div className="min-h-0 overflow-hidden rounded-[16px] bg-[#202020]">
            <ProgrammingLanguages />
          </div>
        </div>

        {/* UNTEN */}
<div className="grid min-h-0 grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">

  <div className="overflow-hidden rounded-[16px] bg-[#202020]">
    <GithubContributions />
  </div>

  <div className="overflow-hidden rounded-[16px] bg-[#202020]">
    <Footer />
  </div>

</div>

      </section>
    </div>
  </main>
);
}