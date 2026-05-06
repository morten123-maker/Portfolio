"use client";


import Image from "next/image";
import { useState, useEffect } from "react";

const images = ["/profil-1.jpg", "/profil-2.jpg", "/profil-3.jpg"];

export default function ProfileImage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, 10000);

  return () => clearInterval(interval);
}, [index]);
  

  return (
  <div className="flex shrink-0 flex-col">
    <div className="relative h-[260px] w-full overflow-hidden rounded-xl bg-[#303030]">
      <Image
        src={images[index]}
        alt="Morten Franken"
        fill
        priority
        className="z-0 object-cover"
      />

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show profile image ${i + 1}`}
            className={`h-2 w-2 rounded-full border transition-all backdrop-blur-md ${
              i === index
                ? "border-white bg-white"
                : "border-white/40 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);
}