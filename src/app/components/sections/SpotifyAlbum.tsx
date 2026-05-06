"use client";

import { useState } from "react";

const tracks = [
  {
    title: "Acid Love Story",
    artist: "MONKYMAN",
    cover: "/spotify-cover.jpg",
  },
  {
    title: "From Me to You - Mono / Remast",
    artist: "The Beatles",
    cover: "/spotify-cover-2.jpg",
  },
];

export default function SpotifyAlbum() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = tracks[currentTrack];

  function nextTrack() {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }

  function previousTrack() {
    setCurrentTrack((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  }

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[16px] bg-[#405993] px-6 py-5 text-white">
      {/* SONG INFO */}
      <div className="flex items-center gap-3">
        <img
          src={track.cover}
          alt={track.title}
          className="h-12 w-12 rounded-[6px] object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{track.title}</h3>
          <p className="truncate text-sm text-white/70">{track.artist}</p>
        </div>
      </div>

      {/* PROGRESS */}
      <div>
        <div className="mb-1 h-[3px] w-full rounded-full bg-white/40">
          <div className="h-full w-[38%] rounded-full bg-white" />
        </div>

        <div className="flex justify-between text-xs text-white/70">
          <span>0:38</span>
          <span>-1:18</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={previousTrack}
          className="text-2xl transition hover:scale-110 active:scale-95"
        >
          ⏮
        </button>

        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-[#405993] transition hover:scale-105 active:scale-95"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={nextTrack}
          className="text-2xl transition hover:scale-110 active:scale-95"
        >
          ⏭
        </button>
      </div>

      {/* SPÄTER: WAVEFORM */}
      {/* WAVEFORM */}
<div className="absolute bottom-0 left-0 flex h-10 w-full items-end justify-between px-4 opacity-80">
  {Array.from({ length: 34 }).map((_, index) => (
    <span
      key={index}
      className={`w-[4px] rounded-full bg-green-400 ${
        isPlaying ? "animate-wave" : ""
      }`}
      style={{
        height: `${10 + ((index * 11) % 30)}px`,
        animationDelay: `${index * 0.06}s`,
        animationDuration: `${1.7 + (index % 5) * 0.12}s`,
      }}
    />
  ))}
</div>
    </div>
  );
}