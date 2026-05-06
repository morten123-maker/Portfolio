export default function ProgrammingLanguages() {
  return (
    <div className="flex h-full flex-col justify-between p-4 text-white">
      {/* OBEN */}
      <div>
        <p className="mb-3 text-sm text-[#bdbdbd]">Skill set</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm">
            Design
          </span>
          <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm">
            Branding
          </span>
          <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm">
            UI/UX
          </span>
          <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm">
            Figma
          </span>
        </div>
      </div>

      {/* UNTEN */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#bdbdbd]">See more about me</span>

        <button
          onClick={() => (window.location.href = "/about")}
          className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2a2a2a] text-white transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-[1.02] active:scale-[0.98]"
        >
          →
        </button>
      </div>
    </div>
  );
}