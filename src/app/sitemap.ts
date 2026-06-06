import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://mortenfranken.de", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://mortenfranken.de/impressum", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://mortenfranken.de/datenschutz", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
