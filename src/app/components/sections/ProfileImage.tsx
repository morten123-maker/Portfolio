"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const profileImages = [
  "/profil-1.jpg",
  "/profil-2-auto.jpg",
  "/profil-3.jpg",

];

type ProfileImageProps = {
  className?: string;
  frameClassName?: string;
  sizes?: string;
};

export default function ProfileImage({
  className = "",
  frameClassName = "",
  sizes = "(max-width: 1079px) 100vw, 440px",
}: ProfileImageProps) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={["profile-image-slider", className].filter(Boolean).join(" ")}>
      <div
        className={["profile-image-slider__frame", frameClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          key={profileImages[imageIndex]}
          src={profileImages[imageIndex]}
          alt="Morten Franken"
          fill
          priority={imageIndex === 0}
          sizes={sizes}
          className="profile-image-slider__image"
        />

        <div className="profile-image-slider__dots" aria-label="Profilbilder wählen">
          {profileImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setImageIndex(index)}
              aria-label={`Profilbild ${index + 1} anzeigen`}
              className={[
                "profile-image-slider__dot",
                index === imageIndex ? "profile-image-slider__dot--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}