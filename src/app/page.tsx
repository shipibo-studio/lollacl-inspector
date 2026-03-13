"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { artists } from "@/data/artists";

type DayKey = "friday" | "saturday" | "sunday";

const days: { key: DayKey; label: string; date: string }[] = [
  { key: "friday", label: "Viernes 13", date: "2026-03-13" },
  { key: "saturday", label: "Sabado 14", date: "2026-03-14" },
  { key: "sunday", label: "Domingo 15", date: "2026-03-15" },
];

// Stage color mapping
const stageColors: Record<string, { bg: string; text: string; border: string }> = {
  "Cenco Malls Stage": { bg: "#ff1744", text: "#ffffff", border: "#ff1744" },
  "Banco de Chile Stage": { bg: "#00e676", text: "#000000", border: "#00e676" },
  "Alternative Stage": { bg: "#2979ff", text: "#ffffff", border: "#2979ff" },
  "Perry's Stage": { bg: "#ffea00", text: "#000000", border: "#ffea00" },
  "Lotus Stage": { bg: "#9c27b0", text: "#ffffff", border: "#9c27b0" },
  "Kidzapalooza Stage": { bg: "#00bcd4", text: "#000000", border: "#00bcd4" },
};

const getStageColor = (stage: string) => {
  return stageColors[stage] || { bg: "#333333", text: "#888888", border: "#333333" };
};

// Stage streaming links
const stageStreamLinks: Record<string, string> = {
  "Cenco Malls Stage": "https://www.youtube.com/watch?v=mFgT15aay24",
  "Banco de Chile Stage": "https://www.youtube.com/watch?v=bHbSQYrnAuo",
  "Alternative Stage": "https://www.youtube.com/watch?v=IyUXoLEiaDw",
  "Perry's Stage": "https://www.youtube.com/watch?v=CDwu-EPFLwA",
  "Lotus Stage": "",
  "Kidzapalooza Stage": "",
};

// Convert YouTube watch URL to embed URL
const getEmbedUrl = (url: string): string => {
  if (!url) return "";
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

export default function Home() {
  // Current time state that updates every second
  const [currentTime, setCurrentTime] = useState(new Date());
  // Track last minute to detect 00 or 30
  const [lastMinute, setLastMinute] = useState<number | null>(null);
  // Trigger refresh at minute 00 or 30
  const [minuteTrigger, setMinuteTrigger] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const minute = now.getMinutes();
      
      // Check if minute is 00 or 30 and we haven't triggered yet
      if ((minute === 0 || minute === 30) && minute !== lastMinute) {
        setLastMinute(minute);
        setMinuteTrigger(prev => prev + 1);
      } else if (minute !== lastMinute && lastMinute !== null) {
        setLastMinute(minute);
      }
      
      setCurrentTime(now);
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, [lastMinute]);

  // Get current date string (updates when currentTime changes)
  const today = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, [currentTime, minuteTrigger]);

  // Get initial selected day based on today's date
  const getInitialDay = (): DayKey => {
    const todayDay = days.find((d) => d.date === today);
    return todayDay ? todayDay.key : "friday";
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<DayKey>(() => {
    const todayDay = days.find((d) => d.date === today);
    return todayDay ? todayDay.key : "friday";
  });

  // Modal state for YouTube video
  const [videoModal, setVideoModal] = useState<{ stage: string; url: string } | null>(null);

  // Update selected day when the page loads or date changes
  useEffect(() => {
    const todayDay = days.find((d) => d.date === today);
    if (todayDay) {
      setSelectedDay(todayDay.key);
    }
  }, [today]);

  // Scroll to first live artist on page load
  const artistRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Check if an artist is currently performing (within start time to end time)
  const isLive = (day: string, time: string, endTime: string): boolean => {
    const artistDay = days.find((d) => d.key === day);
    if (!artistDay) return false;

    // Handle times past midnight (e.g., 00:50)
    let showEndDate = new Date(artistDay.date + "T" + endTime + ":00");
    const showDate = new Date(artistDay.date + "T" + time + ":00");
    
    // If end time is less than start time, it means it ends after midnight
    if (endTime < time) {
      showEndDate = new Date(showEndDate.getTime() + 24 * 60 * 60 * 1000);
    }
    
    const now = new Date();

    // Check if it's the same day
    const todayStr = now.toISOString().split("T")[0];
    if (artistDay.date !== todayStr) return false;

    // Show is live from start time to end time
    return now >= showDate && now <= showEndDate;
  };

  // Check if a show has already ended (past artists)
  const hasEnded = (day: string, time: string, endTime: string): boolean => {
    const artistDay = days.find((d) => d.key === day);
    if (!artistDay) return false;

    // Handle times past midnight (e.g., 00:50)
    let showEndDate = new Date(artistDay.date + "T" + endTime + ":00");
    
    // If end time is less than start time, it means it ends after midnight
    if (endTime < time) {
      showEndDate = new Date(showEndDate.getTime() + 24 * 60 * 60 * 1000);
    }
    
    const now = new Date();

    // Check if it's the same day
    const todayStr = now.toISOString().split("T")[0];
    if (artistDay.date !== todayStr) return false;

    // Show has ended if current time is after end time
    return now > showEndDate;
  };

  // Check if any show on a stage is currently live
  const isStageLive = (day: string, stage: string): boolean => {
    const stageArtists = artists.filter(a => a.day === day && a.stage === stage);
    return stageArtists.some(artist => isLive(artist.day, artist.time, artist.endTime));
  };

  const filteredArtists = useMemo(() => {
    if (!searchQuery) {
      return artists.filter((artist) => artist.day === selectedDay);
    }
    return artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        artist.day === selectedDay
    );
  }, [searchQuery, selectedDay]);

  const artistList = useMemo(() => {
    return [...new Set(artists.map((artist) => artist.name))];
  }, []);

  const sortedShows = useMemo(() => {
    return [...filteredArtists].sort((a, b) => {
      const timeA = a.time.replace(":", "");
      const timeB = b.time.replace(":", "");
      return parseInt(timeA) - parseInt(timeB);
    });
  }, [filteredArtists]);

  // Scroll to first live artist on page load
  useEffect(() => {
    // Find the first live artist for the current day
    const liveArtist = sortedShows.find(show => 
      isLive(show.day, show.time, show.endTime)
    );
    
    if (liveArtist) {
      const element = document.getElementById(`artist-${liveArtist.id}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [sortedShows, selectedDay, today]);

  return (
    <div className="min-h-screen text-[#f5f5f5] font-sans">
      {/* Header */}
      <header className="w-full py-8 px-4 relative">
        {/* Clock and Search Icon */}
        <div className="fixed top-6 right-4 flex items-center gap-3">
          <button
            onClick={() => {
              const searchInput = document.getElementById('search-input');
              if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="p-2 bg-black/50 rounded text-white hover:bg-black/70 transition-colors"
            title="Buscar artista"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="px-3 py-1 bg-black/50 rounded text-default font-mono text-white">
            {currentTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display mb-4 tracking-wide">
            LollaCL Inspector
          </h1>
          <p className="text-xl text-[#888888] font-sans">
            Programación Lollapalooza Santiago 2026
          </p>
        </div>
      </header>

      {/* Search */}
      <section className="w-full px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Buscar artista..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                // Check if selected artist exists and switch to their day
                const artist = artists.find(a => a.name === value);
                if (artist) {
                  setSelectedDay(artist.day);
                }
              }}
              className="w-full px-6 py-4 pr-12 text-lg bg-[#1a1a1a] border-2 border-[#333333] rounded-xl text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#ff3d00] transition-colors"
              list="artists-list"
            />
            <datalist id="artists-list">
              {artistList.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#666666] hover:text-white"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {!searchQuery && (
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#666666]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            )}
          </div>
        </div>
      </section>

      {/* Day Tabs */}
      <section className="w-full px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                className={`px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-display rounded-lg transition-all duration-200 ${
                  selectedDay === day.key
                    ? "bg-[#ff3d00] text-white scale-105 shadow-lg shadow-[#ff3d00]/30"
                    : "bg-[#1a1a1a] text-[#888888] hover:bg-[#333333] hover:text-[#f5f5f5]"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shows Grid */}
      <section className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {sortedShows.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {sortedShows.map((show) => (
                <div
                  id={`artist-${show.id}`}
                  key={show.id}
                  ref={(el) => { artistRefs.current[show.id] = el; }}
                  className={`bg-[#1a1a1a] border rounded-xl p-6 transition-colors ${
                    hasEnded(show.day, show.time, show.endTime)
                      ? "border-[#333333] opacity-60"
                      : isLive(show.day, show.time, show.endTime)
                        ? "border-[#ff3d00] shadow-lg shadow-[#ff3d00]/30"
                        : "border-[#333333] hover:border-[#ff3d00]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-2xl font-display ${
                      hasEnded(show.day, show.time, show.endTime)
                        ? "text-[#666666]"
                        : isLive(show.day, show.time, show.endTime)
                          ? "text-[#ff3d00]"
                          : "text-white"
                    }`}>
                      {show.name}
                    </h3>
                    <span className={`text-xl font-bold ${
                      hasEnded(show.day, show.time, show.endTime)
                        ? "text-[#666666]"
                        : isLive(show.day, show.time, show.endTime)
                          ? "text-[#ff3d00]"
                          : "text-[#ffffff]"
                    }`}>
                      {show.time} - {show.endTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: hasEnded(show.day, show.time, show.endTime) 
                          ? "#333333" 
                          : getStageColor(show.stage).bg,
                        color: hasEnded(show.day, show.time, show.endTime) 
                          ? "#666666" 
                          : getStageColor(show.stage).text,
                        border: `1px solid ${hasEnded(show.day, show.time, show.endTime) 
                          ? "#333333" 
                          : getStageColor(show.stage).border}`,
                      }}
                    >
                      {show.stage}
                    </span>
                    {isStageLive(show.day, show.stage) && stageStreamLinks[show.stage] && !hasEnded(show.day, show.time, show.endTime) && (
                        <button
                          onClick={() => setVideoModal({ stage: show.stage, url: stageStreamLinks[show.stage] })}
                          className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-[#ff0000] text-white hover:bg-[#cc0000] transition-colors"
                          title="Ver transmision en vivo"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[#666666]">
                No se encontraron artistas para este dia
              </p>
            </div>
          )}
        </div>
      </section>

      {/* YouTube Link */}
      <section className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="https://www.youtube.com/@Lollapalooza-Chile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] border-2 border-[#333333] rounded-xl hover:border-[#ff0000] transition-colors group"
          >
            <svg
              className="w-8 h-8 text-[#ff0000] group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-lg font-sans text-[#f5f5f5] group-hover:text-white">
              Canal Oficial - Lollapalooza Chile
            </span>
          </a>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setVideoModal(null)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModal(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#ff3d00] transition-colors z-10"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={getEmbedUrl(videoModal.url)}
              title={videoModal.stage}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full px-4 py-8 mt-8 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-[#999999] leading-relaxed">
            No hay copyright. No hay afiliación alguna al evento. Toda la informacion
            es libre. No nos hacemos cargo de nada. Si el streaming no funciona, no es mi problema. Si los horarios cambian, trataré de tenerlo actualizado, pero no prometo nada.
          </p>
          <p className="text-xs text-[#999999] leading-relaxed mt-4">
            Si a pesar de todo quieren contactarme, pueden hacerlo al mail <a href="mailto:lollacl2026.ebii8h@bumpmail.io" className="text-[#cccccc] underline">lollacl2026.ebii8h@bumpmail.io</a>.
          </p>
          <p className="text-sm text-[#ff3d00] mt-4 leading-tight">
            Disfruten de la vida y la musica y no se olviden de salir a bailar o hacer un mosh aunque sea un rato, aunque sea con amigos, aunque sea con desconocidos, aunque sea solos.
          </p>
        </div>
      </footer>
    </div>
  );
}
