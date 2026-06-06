import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Morten Franken",
  description: "Digital Designer Portfolio von Morten Franken",
  alternates: {
    canonical: "https://mortenfranken.de",
  },
};

export default function Home() {
  return <HomeClient />;
}
