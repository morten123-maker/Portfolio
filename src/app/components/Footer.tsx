export default function Footer() {
  return (
    <div className="flex h-full items-center justify-between px-4 text-sm">

      {/* LEFT TEXT (kein Button) */}
      <div
        onClick={() => window.location.href = "mailto:deinemail@example.com"}
        className="flex cursor-pointer items-center gap-2 text-[#bdbdbd] transition hover:text-white"
      >
        <span>💬</span>
        <span>Write a message</span>
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => window.open("https://deinewebsite.de/contact", "_blank")}
        className="flex items-center gap-2 rounded-[12px] bg-[#2a2a2a] px-4 py-2 text-white transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>📞</span>
        <span>Get in touch</span>
      </button>

    </div>
  );
}
