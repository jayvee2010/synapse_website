import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";

const UNSTOP_REGISTER_URL =
  "https://unstop.com/hackathons/sit-flagship-hackathon-2026-8-hour-ai-hackathon-symbiosis-institute-of-technology-sit-pune-1746836";

export const Route = createFileRoute("/photowall")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Photo Wall & Memory Archive | Synapse 1.0 SIT Pune" },
      {
        name: "description",
        content:
          "Official Synapse 1.0 Photo Archive: 25 unlocked memories and moments from the 8-Hour AI Hackathon at Symbiosis Institute of Technology (SIT), Pune.",
      },
      {
        property: "og:title",
        content: "Photo Wall & Memory Archive | Synapse 1.0 SIT Pune",
      },
      {
        property: "og:description",
        content:
          "Explore the official photo archive of Synapse 1.0 at SIT Pune — keynotes, hackathon floor, prizes, and team celebrations.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PhotoWallPage,
});

export interface PhotoItem {
  id: number;
  slotNumber: string;
  src: string;
  title: string;
  date: string;
  category: "Grand Finale" | "Prizes & Awards" | "Behind The Scenes" | "Keynote & Speech" | "Hackathon Floor";
  location: string;
  status: "UNLOCKED" | "LOCKED";
  isRealPhoto: boolean;
}

// CENTRALIZED PHOTO ARCHIVE DATA (25 MEMORY CARTRIDGES - NO TEXT DESCRIPTIONS)
export const PHOTOS_DATA: PhotoItem[] = [
  {
    id: 1,
    slotNumber: "01",
    src: "/photowall/photo_01.jpg",
    title: "Prize Distribution & Winner Certificates",
    date: "26 Sep 2026",
    category: "Prizes & Awards",
    location: "Main Stage · SIT Pune",
    status: "UNLOCKED",
    isRealPhoto: true,
  },
  {
    id: 2,
    slotNumber: "02",
    src: "/photowall/photo_02.jpg",
    title: "Winning Teams & Industry Mentors",
    date: "26 Sep 2026",
    category: "Grand Finale",
    location: "Auditorium · SIT Pune",
    status: "UNLOCKED",
    isRealPhoto: true,
  },
  {
    id: 3,
    slotNumber: "03",
    src: "/photowall/photo_03.jpg",
    title: "Finalist Teams Stage Recognition",
    date: "26 Sep 2026",
    category: "Prizes & Awards",
    location: "Main Stage · SIT Pune",
    status: "UNLOCKED",
    isRealPhoto: true,
  },
  {
    id: 4,
    slotNumber: "04",
    src: "/photowall/photo_04.jpg",
    title: "Handcrafted Synapse Banner & Student Crew",
    date: "25 Sep 2026",
    category: "Behind The Scenes",
    location: "SIT Campus Courtyard",
    status: "UNLOCKED",
    isRealPhoto: true,
  },
  {
    id: 5,
    slotNumber: "05",
    src: "/photowall/photo_05.jpg",
    title: "Faculty Address & Opening Ceremony",
    date: "26 Sep 2026",
    category: "Keynote & Speech",
    location: "Seminar Hall · SIT Pune",
    status: "UNLOCKED",
    isRealPhoto: true,
  },
  // PLACEHOLDER SLOTS 06 THROUGH 25
  ...Array.from({ length: 20 }, (_, idx) => {
    const num = idx + 6;
    const formattedSlot = String(num).padStart(2, "0");
    const categoriesList: PhotoItem["category"][] = [
      "Grand Finale",
      "Hackathon Floor",
      "Behind The Scenes",
      "Prizes & Awards",
      "Keynote & Speech",
    ];
    const category = categoriesList[idx % categoriesList.length];
    return {
      id: num,
      slotNumber: formattedSlot,
      src: `/photowall/photo_${formattedSlot}.jpg`,
      title: `Memory Node #${formattedSlot}`,
      date: "26 Sep 2026",
      category,
      location: "SIT Pune Campus",
      status: "UNLOCKED" as const,
      isRealPhoto: false,
    };
  }),
];

function PhotoWallPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "Grand Finale",
    "Prizes & Awards",
    "Behind The Scenes",
    "Keynote & Speech",
    "Hackathon Floor",
  ];

  const filteredPhotos =
    activeCategory === "ALL"
      ? PHOTOS_DATA
      : PHOTOS_DATA.filter((p) => p.category === activeCategory);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    }
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, handleClose, handleNext, handlePrev]);

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <div className="relative min-h-screen bg-[#070b14] text-foreground selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      {/* RETRO GRID & SCANLINE BACKGROUND */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 12%, rgba(0, 229, 255, 0.18), transparent 65%)",
        }}
      />

      {/* TOP FLOATING RETRO NAV BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-3 sm:px-6 pointer-events-none">
        <nav className="mx-auto max-w-7xl pointer-events-auto border-2 border-stone-700/80 bg-stone-950/90 backdrop-blur-md px-4 sm:px-7 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group text-foreground hover:text-cyan-300 transition-colors shrink-0"
          >
            <span className="inline-block w-3 h-3 bg-cyan-400 border border-cyan-200 shadow-[0_0_10px_#00e5ff] group-hover:rotate-45 transition-transform" />
            <span className="font-display font-bold text-sm tracking-wide">
              SYNAPSE 1.0
            </span>
            <span className="text-[10px] font-hud text-emerald-400 border border-emerald-500/40 bg-emerald-950/60 px-1.5 py-0.5 hidden sm:inline-block">
              PHOTO ARCHIVE
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="text-xs font-hud px-3 py-1.5 border border-stone-700 hover:border-cyan-400 text-foreground/80 hover:text-cyan-300 bg-stone-900/60 transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span className="hidden sm:inline">RETURN TO SYNAPSE</span>
              <span className="sm:hidden">BACK</span>
            </Link>

            <Link
              to="/team"
              className="text-xs font-hud px-3 py-1.5 border border-stone-700 hover:border-cyan-400 text-foreground/80 hover:text-cyan-300 bg-stone-900/60 transition-colors hidden md:flex items-center gap-1.5"
            >
              <span>👥</span>
              <span>THE TEAM</span>
            </Link>

            <a
              href={UNSTOP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-diamond text-xs py-1.5 px-3 whitespace-nowrap shrink-0"
            >
              <span>REGISTER ↗</span>
            </a>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 pt-28 sm:pt-32 pb-24">
        {/* HERO INTRO BANNER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge-pill inline-flex items-center gap-2 mb-3">
            <span className="text-cyan-400 animate-pulse">◆</span>
            <span>QUEST DISCOVERED // PHOTO ARCHIVE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
            MEMORY ARCHIVE
          </h1>

          {/* STATUS HUD BAR */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 border border-stone-800 bg-stone-950/80 backdrop-blur-sm text-[11px] font-hud text-foreground/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#50fa7b] animate-pulse" />
              <span className="text-emerald-300 font-bold">25 / 25 MOMENTS UNLOCKED</span>
            </div>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="text-stone-400">
              STATUS: <span className="text-cyan-300">ONLINE</span>
            </div>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="text-stone-400">
              LOCATION: <span className="text-amber-300">SIT PUNE</span>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "ALL"
                ? PHOTOS_DATA.length
                : PHOTOS_DATA.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] sm:text-[11px] font-hud px-3 py-1.5 border uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-cyan-400 text-cyan-300 bg-cyan-950/70 shadow-[0_0_12px_rgba(0,229,255,0.3)] font-bold"
                    : "border-stone-800 text-foreground/60 hover:text-cyan-400 hover:border-stone-700 bg-stone-950/50"
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 opacity-60">[{count}]</span>
              </button>
            );
          })}
        </div>

        {/* LARGE PHOTO GRID (2 COLUMNS DESKTOP FOR LARGE IMAGE VISIBILITY, 1 COLUMN MOBILE) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, idx) => (
            <PhotoCartridgeCard
              key={photo.id}
              photo={photo}
              onClick={() => setSelectedPhotoIndex(idx)}
            />
          ))}
        </div>
      </main>

      {/* RETRO LIGHTBOX OVERLAY MODAL */}
      {currentPhoto && (
        <RetroLightboxModal
          photo={currentPhoto}
          currentIndex={selectedPhotoIndex!}
          total={filteredPhotos.length}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

// MINECRAFT ITEM FRAME PHOTO CARTRIDGE CARD COMPONENT
function PhotoCartridgeCard({
  photo,
  onClick,
}: {
  photo: PhotoItem;
  onClick: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="minecraft-photo-frame group relative flex flex-col justify-between overflow-hidden cursor-pointer p-2.5 sm:p-3"
    >
      {/* MINECRAFT PIXEL CORNER RIVETS */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#8c5c32] border border-[#2b2016]" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#8c5c32] border border-[#2b2016]" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#8c5c32] border border-[#2b2016]" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#8c5c32] border border-[#2b2016]" />

      {/* TOP MINECRAFT HUD BAR */}
      <div className="flex items-center justify-between px-3 py-2 border-b-2 border-[#362215] bg-[#1a130c] text-[10px] sm:text-xs font-hud">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold tracking-widest">
            SLOT #{photo.slotNumber}
          </span>
          <span className="text-stone-500 font-mono text-[9px]">
            [ITEM FRAME]
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-400 shadow-[0_0_6px_#50fa7b]" />
          <span className="text-[9px] font-hud text-emerald-300 uppercase">
            {photo.category}
          </span>
        </div>
      </div>

      {/* LARGE PHOTO PREVIEW CONTAINER */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[280px] sm:min-h-[380px] overflow-hidden bg-black flex items-center justify-center border-2 border-[#2b2016] my-2">
        {!imageError ? (
          <img
            src={photo.src}
            alt={photo.title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* RETRO FALLBACK PLACEHOLDER CARTRIDGE */
          <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-[#17110c] border border-dashed border-[#5c3c26]">
            <span className="text-4xl mb-2 filter drop-shadow-[0_0_12px_rgba(0,229,255,0.5)]">
              🖼️
            </span>
            <div className="font-hud text-xs sm:text-sm text-cyan-300 font-bold tracking-widest">
              SLOT #{photo.slotNumber}
            </div>
            <div className="text-[10px] font-mono text-amber-300 mt-1 uppercase">
              {photo.category} · {photo.location}
            </div>
          </div>
        )}

        {/* OVERLAY SHADOW & TITLE TAG */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

        {/* BOTTOM TITLE BAR */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-left pointer-events-none gap-2">
          <span className="font-hud text-xs sm:text-sm text-white font-bold tracking-wide group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {photo.title}
          </span>
          <span className="font-mono text-[10px] text-amber-300 shrink-0 bg-stone-950/80 px-2 py-0.5 border border-stone-800">
            {photo.date}
          </span>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="px-3 py-1.5 text-center bg-[#1a130c] border-t-2 border-[#362215]">
        <span className="font-hud text-[9px] sm:text-[10px] text-cyan-400 group-hover:text-cyan-300 uppercase tracking-widest">
          &gt; CLICK TO EXPAND &lt;
        </span>
      </div>
    </div>
  );
}

// RETRO LIGHTBOX OVERLAY MODAL COMPONENT (NO TEXT DESCRIPTION)
function RetroLightboxModal({
  photo,
  currentIndex,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  photo: PhotoItem;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [modalImageError, setModalImageError] = useState(false);

  // Reset image error state when photo changes
  useEffect(() => {
    setModalImageError(false);
  }, [photo.id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* MINECRAFT MODAL DIALOG CONTAINER */}
      <div
        className="relative w-full max-w-6xl border-[6px] border-[#5c3c26] bg-[#17110c] shadow-[inset_4px_4px_0_#9c683c,inset_-4px_-4px_0_#362215,0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER BAR */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b-4 border-[#362215] bg-[#1a130c]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
            <span className="font-hud text-xs sm:text-sm font-bold text-cyan-300 tracking-wider">
              MEMORY #{photo.slotNumber} // {photo.title.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-hud text-xs px-3 py-1 border-2 border-[#5c3c26] hover:border-red-400 bg-[#2b1b11] hover:bg-red-950 text-stone-200 hover:text-red-300 transition-colors cursor-pointer"
            title="Close (ESC)"
          >
            [ X ] CLOSE
          </button>
        </div>

        {/* MAIN MODAL BODY - LARGE PICTURE VIEW */}
        <div className="p-3 sm:p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
          {/* IMAGE CONTAINER */}
          <div className="relative w-full max-h-[75vh] min-h-[350px] sm:min-h-[550px] bg-black border-2 border-[#362215] flex items-center justify-center overflow-hidden">
            {!modalImageError ? (
              <img
                src={photo.src}
                alt={photo.title}
                onError={() => setModalImageError(true)}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-5xl filter drop-shadow-[0_0_16px_rgba(0,229,255,0.5)]">
                  🖼️
                </span>
                <div className="font-hud text-base text-cyan-300 font-bold">
                  SLOT #{photo.slotNumber}
                </div>
                <div className="text-xs font-mono text-amber-300">
                  {photo.title}
                </div>
              </div>
            )}
          </div>

          {/* HEADER METADATA BAR (NO TEXT DESCRIPTION) */}
          <div className="border-2 border-[#362215] bg-[#1a130c] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-hud">
            <div>
              <span className="text-stone-500">LOCATION: </span>
              <span className="text-cyan-300">{photo.location}</span>
            </div>
            <div>
              <span className="text-stone-500">CATEGORY: </span>
              <span className="text-amber-300">{photo.category}</span>
            </div>
            <div>
              <span className="text-stone-500">DATE: </span>
              <span className="text-emerald-300">{photo.date}</span>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER CONTROLS */}
        <div className="flex items-center justify-between px-4 py-3 border-t-4 border-[#362215] bg-[#1a130c] text-xs font-hud">
          <button
            onClick={onPrev}
            className="px-4 py-2 border-2 border-[#5c3c26] hover:border-cyan-400 bg-[#2b1b11] hover:bg-cyan-950 text-stone-200 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>&lt; PREVIOUS</span>
            <span className="text-[10px] text-stone-500 hidden sm:inline">(←)</span>
          </button>

          <span className="text-xs font-mono text-amber-300">
            MEMORY {currentIndex + 1} OF {total}
          </span>

          <button
            onClick={onNext}
            className="px-4 py-2 border-2 border-[#5c3c26] hover:border-cyan-400 bg-[#2b1b11] hover:bg-cyan-950 text-stone-200 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>NEXT &gt;</span>
            <span className="text-[10px] text-stone-500 hidden sm:inline">(→)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
