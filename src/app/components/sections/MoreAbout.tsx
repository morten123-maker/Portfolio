export default function SeeMoreAboutMe() {
  return (
    <div className="relative flex h-full min-h-[180px] overflow-hidden rounded-[22px] text-white">
      {/* Hintergrundbild */}
      <img
        src="/bg.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* optional dunkler Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Inhalt */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <p className="text-center text-base font-medium text-[#f1f1f1]">
          See more about me
        </p>

        <button
          onClick={() => (window.location.href = "/about")}
          className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-[#3a3a3a] bg-[#242424]/90 transition-all duration-200 hover:scale-[1.03] hover:bg-[#2d2d2d] active:scale-[0.97]"
          aria-label="See more about me"
        >
          <img
            src="/iconfigma.svg"
            alt="Figma Logo"
            className="h-8 w-8 object-contain"
          />
        </button>
      </div>
    </div>
  );
}