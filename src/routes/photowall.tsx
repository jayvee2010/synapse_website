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
  caption: string;
  status: "UNLOCKED" | "LOCKED";
  isRealPhoto: boolean;
}

// CENTRALIZED PHOTO ARCHIVE DATA (25 MEMORY CARTRIDGES)
export const PHOTOS_DATA: PhotoItem[] = [
  {
    id: 1,
    slotNumber: "01",
    src: "/photowall/photo_01.jpg",
    title: "Prize Distribution & Winner Certificates",
    date: "26 Sep 2026",
    category: "Prizes & Awards",
    location: "Main Stage · SIT Pune",
    caption: "Track winners receiving certificates of excellence and cash prize awards at the Synapse 1.0 Grand Finale.",
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
    caption: "Champion teams celebrating alongside hackathon organizers and corporate mentors from Nasdaq & Innvolution.",
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
    caption: "Top finalist teams honored on stage following 8 hours of intense prototype building and live judging demos.",
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
    caption: "The student organizing team showcasing the handcrafted newspaper SYNAPSE banner prepared for venue decoration.",
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
    caption: "SIT Pune faculty heads addressing hackathon participants and kicking off the 8-Hour AI Hackathon sprint.",
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
      caption: `Synapse 1.0 moment #${formattedSlot}. Replace image in /public/photowall/photo_${formattedSlot}.jpg to update photo.`,
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

          <p className="mt-3 text-xs sm:text-sm text-foreground/80 font-sans max-w-xl mx-auto leading-relaxed">
            &gt; Scroll through 25 unlocked moments captured during Synapse 1.0 at Symbiosis Institute of Technology (SIT), Pune.
          </p>

          {/* STATUS HUD BAR */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 border border-stone-800 bg-stone-950/80 backdrop-blur-sm text-[11px] font-hud text-foreground/80">
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

        {/* 25 PHOTO GRID (5x5 DESKTOP, 3-4 TABLET, 2 MOBILE) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
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

// RETRO CARTRIDGE CARD COMPONENT
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
      className="biome-card group relative flex flex-col justify-between border-2 border-stone-800/90 bg-stone-950/90 hover:border-cyan-400 hover:bg-stone-900/80 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,245,212,0.25)] overflow-hidden cursor-pointer"
    >
      {/* TOP CARTRIDGE HEADER */}
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-stone-800/80 bg-stone-900/60 text-[9px] font-hud">
        <span className="text-cyan-400 font-bold tracking-wider">
          MEMORY #{photo.slotNumber}
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#50fa7b]" />
          <span className="text-[8px] font-mono text-stone-500 uppercase">
            {photo.category.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* PHOTO PREVIEW / CONTAINER */}
      <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
        {!imageError ? (
          <img
            src={photo.src}
            alt={photo.title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* RETRO RETROFALLBACK PLACEHOLDER CARTRIDGE */
          <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-stone-900/80 to-stone-950 border border-dashed border-stone-800 group-hover:border-cyan-500/50 transition-colors">
            <span className="text-2xl mb-1 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
              📷
            </span>
            <div className="font-hud text-[10px] text-cyan-300 font-bold tracking-widest">
              SLOT #{photo.slotNumber}
            </div>
            <div className="text-[9px] font-mono text-stone-500 mt-0.5 uppercase">
              {photo.category}
            </div>
          </div>
        )}

        {/* OVERLAY GLOW & HOVER METADATA */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

        {/* HOVER METADATA BADGE */}
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-0.5 text-left pointer-events-none">
          <span className="font-hud text-[9px] text-white font-bold tracking-tight line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {photo.title}
          </span>
          <div className="flex items-center justify-between text-[8px] font-mono text-stone-400">
            <span>{photo.date}</span>
            <span className="text-emerald-400">UNLOCKED ✦</span>
          </div>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="px-2.5 py-1 text-center bg-stone-950 border-t border-stone-800/60">
        <span className="font-hud text-[8px] text-cyan-400/80 group-hover:text-cyan-300 uppercase tracking-wider">
          &gt; CLICK TO INSPECT &lt;
        </span>
      </div>
    </div>
  );
}

// RETRO LIGHTBOX OVERLAY MODAL COMPONENT
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* TERMINAL OVERLAY DIALOG CONTAINER */}
      <div
        className="biome-card relative w-full max-w-4xl border-2 border-cyan-500/80 bg-stone-950 shadow-[0_0_40px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER BAR */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-stone-800 bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            <span className="font-hud text-xs sm:text-sm font-bold text-cyan-300 tracking-wider">
              MEMORY #{photo.slotNumber} // ARCHIVE_DISPLAY.RAW
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-hud text-xs px-2.5 py-1 border border-stone-700 hover:border-red-400 bg-stone-900 hover:bg-red-950 text-stone-300 hover:text-red-300 transition-colors cursor-pointer"
            title="Close (ESC)"
          >
            [ X ] CLOSE
          </button>
        </div>

        {/* MAIN MODAL BODY */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 max-h-[82vh] overflow-y-auto">
          {/* IMAGE CONTAINER */}
          <div className="relative w-full max-h-[55vh] min-h-[260px] bg-stone-900/80 border border-stone-800 flex items-center justify-center overflow-hidden">
            {!modalImageError ? (
              <img
                src={photo.src}
                alt={photo.title}
                onError={() => setModalImageError(true)}
                className="max-h-[55vh] w-auto max-w-full object-contain mx-auto"
              />
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  📷
                </span>
                <div className="font-hud text-sm text-cyan-300 font-bold">
                  MEMORY CARTRIDGE #{photo.slotNumber}
                </div>
                <div className="text-xs font-mono text-stone-400 max-w-md">
                  Photo placeholder ready. Upload image file to{" "}
                  <code className="text-amber-300">public/photowall/photo_{photo.slotNumber}.jpg</code>
                </div>
              </div>
            )}
          </div>

          {/* METADATA DRAWER */}
          <div className="border border-stone-800 bg-stone-900/60 p-3.5 sm:p-4 flex flex-col gap-2 rounded-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
              <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                {photo.title}
              </h2>
              <span className="font-hud text-[10px] px-2.5 py-0.5 border border-emerald-500/50 bg-emerald-950/60 text-emerald-300 uppercase shadow-[0_0_8px_rgba(80,250,123,0.2)]">
                STATUS: {photo.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-hud text-stone-300 mt-1">
              <div>
                <span className="text-stone-500">DATE: </span>
                <span className="text-cyan-300">{photo.date}</span>
              </div>
              <div>
                <span className="text-stone-500">CATEGORY: </span>
                <span className="text-amber-300">{photo.category}</span>
              </div>
              <div>
                <span className="text-stone-500">LOCATION: </span>
                <span className="text-emerald-300">{photo.location}</span>
              </div>
            </div>

            <p className="mt-1 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
              {photo.caption}
            </p>
          </div>
        </div>

        {/* MODAL FOOTER CONTROLS */}
        <div className="flex items-center justify-between px-4 py-3 border-t-2 border-stone-800 bg-stone-900/90 text-xs font-hud">
          <button
            onClick={onPrev}
            className="px-3.5 py-1.5 border border-stone-700 hover:border-cyan-400 bg-stone-950 hover:bg-cyan-950 text-stone-200 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>&lt; PREVIOUS</span>
            <span className="text-[10px] text-stone-500 hidden sm:inline">(←)</span>
          </button>

          <span className="text-[11px] font-mono text-stone-400">
            MEMORY {currentIndex + 1} OF {total}
          </span>

          <button
            onClick={onNext}
            className="px-3.5 py-1.5 border border-stone-700 hover:border-cyan-400 bg-stone-950 hover:bg-cyan-950 text-stone-200 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>NEXT &gt;</span>
            <span className="text-[10px] text-stone-500 hidden sm:inline">(→)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
