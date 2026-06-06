"use client";

import { useEffect, useRef, useState } from "react";

type MotionVideoMode = "pingpong" | "loop";

type MotionVideoProps = {
  src: string;
  active?: boolean;
  mode?: MotionVideoMode;
  className?: string;
  videoClassName?: string;
  poster?: string;
  fallbackImage?: string;
  speed?: number;
  ariaHidden?: boolean;
};

export default function MotionVideo({
  src,
  active = false,
  mode = "pingpong",
  className = "",
  videoClassName = "",
  poster,
  fallbackImage,
  speed = 1,
  ariaHidden = true,
}: MotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const [failed, setFailed] = useState(false);

  // Garantiert, dass das Video stummgeschaltet ist, sobald das Element
  // existiert. Notwendig, weil React das `muted`-Attribut beim SSR nicht
  // zuverlässig ausgibt – ohne echtes muted blockieren Browser den Autostart,
  // und das Video läuft erst nach einer Interaktion los.
  const setVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
    }
  };

  useEffect(() => {
    setFailed(false);
    directionRef.current = 1;
    lastFrameRef.current = null;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "pingpong") return;

    const handleMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime <= 0) {
        video.currentTime = Math.min(0.08, Math.max(0.02, video.duration / 20));
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    return () => video.removeEventListener("loadedmetadata", handleMetadata);
  }, [mode, src]);

  useEffect(() => {
    if (mode !== "loop") return;

    const video = videoRef.current;
    if (!video || failed) return;

    if (active) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    } else {
      video.pause();
    }
  }, [active, failed, mode, src]);

  useEffect(() => {
    if (mode !== "pingpong") return;

    const stop = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastFrameRef.current = null;
    };

    if (!active || failed) {
      stop();
      return stop;
    }

    const step = (timestamp: number) => {
      const video = videoRef.current;

      if (!video) {
        stop();
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : 0;

      if (duration > 0) {
        if (lastFrameRef.current === null) {
          lastFrameRef.current = timestamp;
        }

        const delta = Math.min((timestamp - lastFrameRef.current) / 1000, 0.045);
        lastFrameRef.current = timestamp;

        const edgePadding = Math.min(0.1, Math.max(0.025, duration * 0.015));
        const minTime = edgePadding;
        const maxTime = Math.max(minTime, duration - edgePadding);
        let nextTime = video.currentTime + delta * speed * directionRef.current;

        if (nextTime >= maxTime) {
          nextTime = maxTime;
          directionRef.current = -1;
        }

        if (nextTime <= minTime) {
          nextTime = minTime;
          directionRef.current = 1;
        }

        if (Number.isFinite(nextTime)) {
          video.currentTime = nextTime;
        }
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);

    return stop;
  }, [active, failed, mode, speed]);

  function handleLoadedData() {
    const video = videoRef.current;
    if (!video || mode !== "loop" || !active) return;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => undefined);
    }
  }

  if (failed && fallbackImage) {
    return (
      <span className={["motion-video", className].filter(Boolean).join(" ")} aria-hidden={ariaHidden}>
        <img src={fallbackImage} alt="" className={["motion-video__image", videoClassName].filter(Boolean).join(" ")} />
      </span>
    );
  }

  return (
    <span className={["motion-video", className].filter(Boolean).join(" ")} aria-hidden={ariaHidden}>
      <video
        ref={setVideoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop={mode === "loop"}
        autoPlay={active && mode === "loop"}
        preload="auto"
        className={["motion-video__video", videoClassName].filter(Boolean).join(" ")}
        onLoadedData={handleLoadedData}
        onCanPlay={handleLoadedData}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
