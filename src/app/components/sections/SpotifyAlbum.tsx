"use client";

import { useEffect, useMemo, useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
  albumImage: string;
  spotifyUrl: string;
  background: string;
};

function getBackground(trackTitle: string) {
  const title = trackTitle.toLowerCase();

  if (title.includes("acid love story")) {
    return "linear-gradient(135deg, #131313 0%, #171717 52%, #111111 100%)";
  }

  if (title.includes("mare nero")) {
    return "linear-gradient(135deg, #111815 0%, #132119 100%)";
  }

  return "linear-gradient(135deg, #171313 0%, #151111 58%, #111111 100%)";
}

const fallbackTrack: Track = {
  id: "fallback-acid-love-story",
  title: "Acid Love Story",
  artist: "MONKYMAN",
  albumImage: "/album-fallback.png",
  spotifyUrl: "https://open.spotify.com/",
  background: "linear-gradient(135deg, #131313 0%, #171717 52%, #111111 100%)",
};

function SkipIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {direction === "previous" ? (
        <>
          <path d="M7.75 4L3.5 9L7.75 14V4Z" fill="currentColor" />
          <path d="M14.5 4L10.25 9L14.5 14V4Z" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M10.25 4L14.5 9L10.25 14V4Z" fill="currentColor" />
          <path d="M3.5 4L7.75 9L3.5 14V4Z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.5 2.7V11.3L11 7L4.5 2.7Z" fill="currentColor" />
    </svg>
  );
}

export default function SpotifyAlbum() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    async function loadSpotify() {
      try {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 8000);

        const response = await fetch("/api/spotify", {
          cache: "no-store",
          signal: controller.signal,
        });

        window.clearTimeout(timeout);

        if (!response.ok) return;

        const data = await response.json();
        const spotifyTracks = Array.isArray(data) ? data : data.tracks;

        if (!spotifyTracks || spotifyTracks.length === 0) return;

        const mappedTracks = spotifyTracks.map(
          (track: Omit<Track, "background">) => ({
            ...track,
            background: getBackground(track.title),
          })
        );

        setTracks(mappedTracks);
      } catch {
        setTracks([]);
      }
    }

    loadSpotify();
  }, []);

  useEffect(() => {
    setCurrentTrack(0);
  }, [tracks.length]);

  const visibleTracks = useMemo(() => (tracks.length ? tracks : [fallbackTrack]), [tracks]);
  const track = visibleTracks[currentTrack] ?? visibleTracks[0] ?? fallbackTrack;

  function nextTrack() {
    setCurrentTrack((prev) => (prev + 1) % visibleTracks.length);
  }

  function previousTrack() {
    setCurrentTrack((prev) => (prev === 0 ? visibleTracks.length - 1 : prev - 1));
  }

  function openSpotify() {
    window.open(track.spotifyUrl, "_blank", "noopener,noreferrer");
  }

  return (
<div className="spotify-compact">
      <div className="spotify-compact__track">
        <span className="spotify-compact__cover-wrap">
          <img
            src={track.albumImage}
            alt={track.title}
            className="spotify-compact__cover"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
          <span className="spotify-compact__fallback-cover" aria-hidden="true" />
        </span>

        <div className="spotify-compact__copy">
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
        </div>
      </div>

      <div className="spotify-compact__controls" aria-label="Music controls">
        <button
          type="button"
          onClick={previousTrack}
          aria-label="Previous track"
          className="spotify-compact__skip spotify-compact__skip--previous"
        >
          <SkipIcon direction="previous" />
        </button>

        <button
          type="button"
          onClick={nextTrack}
          aria-label="Next track"
          className="spotify-compact__skip spotify-compact__skip--next"
        >
          <SkipIcon direction="next" />
        </button>
      </div>

      <button type="button" className="spotify-compact__open" onClick={openSpotify}>
        <span className="spotify-compact__open-icon" aria-hidden="true">
          <PlayIcon />
        </span>
        <span>Open in Spotify</span>
      </button>
    </div>
  );
}
