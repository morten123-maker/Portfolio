"use client";

import SpotifyAlbum from "./SpotifyAlbum";

/**
 * Mobile-only footer: Spotify card + legal links.
 * Rendered at the end of the scrollable body in Overview and Profile.
 * The CSS class `.mobile-footer` is display:none above 720px.
 */
export default function MobileFooter() {
  return (
    <div className="mobile-footer" aria-label="Footer">
      <SpotifyAlbum />
      <nav className="mobile-footer__legal" aria-label="Legal">
        <a href="/impressum">Legal Notice</a>
        <span aria-hidden="true" />
        <a href="/datenschutz">Privacy Policy</a>
      </nav>
    </div>
  );
}
