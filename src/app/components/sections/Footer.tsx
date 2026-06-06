"use client";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <section className="portfolio-footer__question did-you-know" aria-label="Did you know">
        <span>Did you know...?</span>
      </section>

      <nav className="portfolio-footer__links" aria-label="Rechtliches">
        <a href="/impressum">Impressum</a>
        <span aria-hidden="true" />
        <a href="/datenschutz">Datenschutz</a>
      </nav>
    </footer>
  );
}
