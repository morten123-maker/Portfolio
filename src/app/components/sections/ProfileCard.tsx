"use client";

import React from "react";
import ProfileImage from "./ProfileImage.tsx";
import { FaPlay } from "react-icons/fa6";



export default function ProfileCard() {
  return (
    <aside
      id="profile"
      className="h-full max-h-full overflow-y-auto rounded-[18px] bg-[#202020] p-5 text-white
      scrollbar-thin scrollbar-thumb-[#4a4a4a] scrollbar-track-transparent"
    >
      <div className="flex min-h-full flex-col gap-7">
        <div className="shrink-0">
          <ProfileImage />
        </div>

        <PersonalStatement />
        <Competencies />
      </div>
    </aside>
  );
}

function PersonalStatement() {
  return (
    <div className="flex flex-col gap-4 px-1">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-sm font-normal text-[#9faed0]">
            Morten Franken
          </h3>

          
        </div>
        <h1 className="text-[28px] leading-[32px] tracking-[-0.03em] font-extrabold">
  Halloooo!
</h1>
      </div>

      <p className="text-[16px] font-normal leading-[1.55] text-[#d7d7d7]">
        I am a Digital Designer. Since 2020 I’m focusing on interaction design.
        <br />
        I’ve gathered experience with facets in design, including UI/UX, Design
        with AI, generative design and 2, 3D motion design. My goal as an
        interaction designer is to create a link between a tool and its users. I
        design this connection that has experiences and stories people can
        empathize and interact with.
      </p>
    </div>
  );
}

function Competencies() {
  const row1 = ["UX", "UI", "Design System"];
  const row2 = ["Design with AI", "Motion Design", "3D",];

  return (
    <div className="mt-auto px-1 pb-1">
      <h2 className="mb-3 text-base font-medium text-white">
        My competencies
      </h2>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {row1.map((competency) => (
            <CompetencyPill key={competency}>{competency}</CompetencyPill>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {row2.map((competency) => (
            <CompetencyPill key={competency}>{competency}</CompetencyPill>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetencyPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full bg-[#343434] px-3 py-2 text-sm font-normal leading-none text-[#eeeeee]">
      {children}
    </span>
  );
}
