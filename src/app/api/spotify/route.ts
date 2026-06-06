import { NextResponse } from "next/server";

type SpotifyTrackResponse = {
  id?: string;
  name?: string;
  artists?: { name: string }[];
  album?: {
    images?: { url: string }[];
  };
  external_urls?: {
    spotify?: string;
  };
};

type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  albumImage: string;
  spotifyUrl: string;
};

let cachedTracks: SpotifyTrack[] | null = null;
let cachedAt = 0;

const CACHE_DURATION = 1000 * 60 * 30;

function getRetryAfter(response: Response) {
  const retryAfter = response.headers.get("retry-after");

  if (!retryAfter) {
    return null;
  }

  return Number(retryAfter);
}

async function readSpotifyResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function normalizeTrackId(value: string) {
  const trimmed = value.trim();

  if (trimmed.includes("open.spotify.com/track/")) {
    const match = trimmed.match(/track\/([a-zA-Z0-9]+)/);
    return match?.[1] ?? trimmed;
  }

  return trimmed;
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("SPOTIFY_CLIENT_ID oder SPOTIFY_CLIENT_SECRET fehlt");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "force-cache",
    next: {
      revalidate: 3000,
    },
  });

  const data = await readSpotifyResponse(response);

  if (!response.ok) {
    console.error("Spotify Token Fehler:", data);

    const retryAfter = getRetryAfter(response);

    if (response.status === 429) {
      throw new Error(
        retryAfter
          ? `Spotify Rate Limit. Bitte in ${retryAfter} Sekunden erneut versuchen.`
          : "Spotify Rate Limit. Bitte später erneut versuchen."
      );
    }

    throw new Error(`Spotify Access Token Fehler: ${response.status}`);
  }

  if (!data.access_token) {
    throw new Error("Spotify Access Token fehlt");
  }

  return data.access_token as string;
}

async function getTrack(trackId: string, token: string) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 1800,
    },
  });

  const data = await readSpotifyResponse(response);

  if (!response.ok) {
    console.error(`Spotify Track Fehler bei ID ${trackId}:`, data);

    const retryAfter = getRetryAfter(response);

    if (response.status === 429) {
      throw new Error(
        retryAfter
          ? `Spotify Rate Limit. Bitte in ${retryAfter} Sekunden erneut versuchen.`
          : "Spotify Rate Limit. Bitte später erneut versuchen."
      );
    }

    return null;
  }

  return data as SpotifyTrackResponse;
}

export async function GET() {
  try {
    const now = Date.now();

    if (cachedTracks && now - cachedAt < CACHE_DURATION) {
      return NextResponse.json({
        tracks: cachedTracks,
        cached: true,
      });
    }

    const token = await getAccessToken();

    const trackIds = process.env.SPOTIFY_TRACK_IDS
      ?.split(",")
      .map(normalizeTrackId)
      .filter(Boolean);

    if (!trackIds || trackIds.length === 0) {
      throw new Error("SPOTIFY_TRACK_IDS fehlt oder ist leer");
    }

    const tracksData: SpotifyTrackResponse[] = [];

    for (const trackId of trackIds) {
      const track = await getTrack(trackId, token);

      if (track) {
        tracksData.push(track);
      }
    }

    const tracks: SpotifyTrack[] = tracksData
      .map((track) => ({
        id: track.id ?? "",
        title: track.name ?? "",
        artist: track.artists?.map((artist) => artist.name).join(", ") ?? "",
        albumImage: track.album?.images?.[0]?.url ?? "",
        spotifyUrl: track.external_urls?.spotify ?? "",
      }))
      .filter(
        (track) =>
          track.id &&
          track.title &&
          track.artist &&
          track.albumImage &&
          track.spotifyUrl
      );

    if (tracks.length === 0) {
      throw new Error("Keine Spotify Tracks gefunden");
    }

    cachedTracks = tracks;
    cachedAt = now;

    return NextResponse.json({
      tracks,
      cached: false,
    });
  } catch (error) {
    console.error("Spotify API Error:", error);

    if (cachedTracks) {
      return NextResponse.json({
        tracks: cachedTracks,
        cached: true,
        warning: error instanceof Error ? error.message : "Spotify failed",
      });
    }

    return NextResponse.json(
      {
        tracks: [],
        error: error instanceof Error ? error.message : "Spotify failed",
      },
      {
        status: 500,
      }
    );
  }
}