// layout.tsx
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const avenir = localFont({
  src: [
    {
      path: "./fonts/AvenirNextCyr-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AvenirNextCyr-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/AvenirNextCyr-Demi.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/AvenirNextCyr-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/AvenirNextCyr-Heavy.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
});

const siteUrl = "https://mortenfranken.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Morten Franken",
  description: "UX/UI & Digital Designer – Interaction and user experience.",
  keywords: [
    "Morten Franken",
    "UX/UI Designer",
    "Digital Designer",
    "Interaction Design",
    "Design System",
    "Portfolio",
  ],
  creator: "Morten Franken",
  authors: [{ name: "Morten Franken" }],
  icons: {
    icon: [{ url: "/gradient.jpeg", type: "image/jpeg" }],
    shortcut: "/gradient.jpeg",
    apple: [{ url: "/gradient.jpeg", type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    title: "Morten Franken",
    description: "UX/UI & Digital Designer – Interaction and user experience.",
    siteName: "Morten Franken – Portfolio",
    images: [
      {
        url: "/portfolio_highres.png",
        width: 1920,
        height: 1440,
        alt: "Morten Franken Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morten Franken",
    description: "UX/UI & Digital Designer",
    images: ["/portfolio_highres.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={avenir.variable}>
      <head>
        {/* Structured data for rich Google search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Morten Franken",
              url: siteUrl,
              image: `${siteUrl}/portfolio_highres.png`,
              jobTitle: "UX/UI Designer",
              worksFor: {
                "@type": "Organization",
                name: "MINTvernetzt (Matrix gGmbH)",
              },
              description: "UX/UI & Digital Designer",
            }),
          }}
        />
      </head>
      <body className={avenir.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
