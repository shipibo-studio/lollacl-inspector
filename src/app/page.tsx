"use client";

import { useState, useMemo, useEffect } from "react";
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
  "Banco de Chile Stage": "https://www.youtube.com/watch?v=KtuOEaE49Lk",
  "Alternative Stage": "https://www.youtube.com/watch?v=8WWMVC6SJiw",
  "Perry's Stage": "https://www.youtube.com/watch?v=hY137e88MJs",
  "Lotus Stage": "",
  "Kidzapalooza Stage": "",
};

export default function Home() {
  const today = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  // Current time state that updates every minute
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Get initial selected day based on today's date
  const getInitialDay = (): DayKey => {
    const todayDay = days.find((d) => d.date === today);
    return todayDay ? todayDay.key : "friday";
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<DayKey>(getInitialDay);

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
    return artists.map((artist) => artist.name);
  }, []);

  const sortedShows = useMemo(() => {
    return [...filteredArtists].sort((a, b) => {
      const timeA = a.time.replace(":", "");
      const timeB = b.time.replace(":", "");
      return parseInt(timeA) - parseInt(timeB);
    });
  }, [filteredArtists]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display text-[#ff3d00] mb-4 tracking-wide">
            LollaCL Inspector
          </h1>
          <p className="text-xl md:text-2xl text-[#888888] font-sans">
            Programacion Oficial - Lollapalooza Santiago 2026
          </p>
        </div>
      </header>

      {/* Search */}
      <section className="w-full px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar artista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg bg-[#1a1a1a] border-2 border-[#333333] rounded-xl text-[#f5f5f5] placeholder-[#666666] focus:outline-none focus:border-[#ff3d00] transition-colors"
              list="artists-list"
            />
            <datalist id="artists-list">
              {artistList.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
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
                  key={show.id}
                  className={`bg-[#1a1a1a] border rounded-xl p-6 transition-colors ${
                    isLive(show.day, show.time, show.endTime)
                      ? "border-[#ff3d00] shadow-lg shadow-[#ff3d00]/30"
                      : "border-[#333333] hover:border-[#ff3d00]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-2xl font-display ${
                      isLive(show.day, show.time, show.endTime) ? "text-[#ff3d00]" : "text-white"
                    }`}>
                      {show.name}
                    </h3>
                    <span className={`text-xl font-bold ${
                      isLive(show.day, show.time, show.endTime) ? "text-[#ff3d00]" : "text-[#ffffff]"
                    }`}>
                      {show.time} - {show.endTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: getStageColor(show.stage).bg,
                        color: getStageColor(show.stage).text,
                        border: `1px solid ${getStageColor(show.stage).border}`,
                      }}
                    >
                      {show.stage}
                    </span>
                    {isStageLive(show.day, show.stage) && stageStreamLinks[show.stage] && (
                        <a
                          href={stageStreamLinks[show.stage]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-[#ff0000] text-white"
                          title="Ver transmision en vivo"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
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

      {/* Footer */}
      <footer className="w-full px-4 py-8 mt-8 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#666666] leading-relaxed">
            No hay copyright. No estamos afiliados al evento. Toda la informacion
            es libre. No nos hacemos cargo de nada.
          </p>
          <p className="text-lg text-[#ff3d00] mt-4 font-display">
            Disfruten de la vida y la musica
          </p>
        </div>
      </footer>
    </div>
  );
}
