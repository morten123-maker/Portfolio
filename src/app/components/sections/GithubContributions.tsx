export default function GithubContributions() {
  return (
    <div className="flex h-full items-center justify-between px-4 text-sm text-white">

      {/* LEFT TEXT */}
      <div className="flex items-center gap-2 text-[#bdbdbd]">
        <span className="text-red-500">❤️</span>
        <span>Let’s drink one or three coffees together</span>
      </div>

      {/* BUTTON */}
      <button className="flex items-center gap-2 rounded-[12px] bg-[#2a2a2a] px-4 py-2 text-white transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-[1.02] active:scale-[0.98]">
        
        {/* ICON */}
        <span>☕</span>

        {/* TEXT */}
        <span>Buy me a coffee</span>
      </button>
    </div>
  );
}
