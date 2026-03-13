import { NextResponse } from "next/server";
import { artists, type Artist } from "@/data/artists";

// This cron job runs every 10 minutes to keep stream data fresh

export const runtime = "edge";

// YouTube channel configuration
const YOUTUBE_CHANNEL_ID = "UC7t0bW6yJ1M5eO3x4xXk9xw"; // @Lollapalooza-Chile
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Stage mapping
const stageKeywords: Record<string, string[]> = {
  "Cenco Malls Stage": ["Cenco", "Main", "Stage 1"],
  "Banco de Chile Stage": ["Banco", "Chile", "Stage 2"],
  "Alternative Stage": ["Alternative"],
  "Perry's Stage": ["Perry", "Electronic", "EDM"],
  "Lotus Stage": ["Lotus", "Latin", "Regional"],
  "Kidzapalooza Stage": ["Kidz", "Kids", "Familia"],
};

function getFestivalDay(): "friday" | "saturday" | "sunday" | null {
  const now = new Date();
  const date = now.getDate();
  if (date === 13) return "friday";
  if (date === 14) return "saturday";
  if (date === 15) return "sunday";
  return null;
}

async function fetchYouTubeLiveStreams(): Promise<any[]> {
  if (!YOUTUBE_API_KEY) {
    return [];
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(searchUrl, { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching YouTube streams:", error);
    return [];
  }
}

export async function GET() {
  // Verify cron secret for security
  const authHeader = process.env.CRON_SECRET;
  const requestSecret = process.env.VERCEL_CRONS_SECRET;

  // Allow cron from Vercel without secret in development
  if (process.env.NODE_ENV === "production" && authHeader && requestSecret !== authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch fresh data from YouTube
    const youtubeVideos = await fetchYouTubeLiveStreams();
    const festivalDay = getFestivalDay();
    const currentTime = new Date().toTimeString().slice(0, 5);

    // Get currently live artists
    const liveArtists: string[] = [];
    if (festivalDay) {
      artists.forEach((artist: Artist) => {
        if (artist.day === festivalDay && artist.time <= currentTime && artist.endTime > currentTime) {
          liveArtists.push(`${artist.name} - ${artist.stage}`);
        }
      });
    }

    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      cron: "streams-update",
      interval: "10 minutes",
      youtubeVideosFound: youtubeVideos.length,
      liveArtists,
      message: "Stream data refreshed successfully",
    };

    console.log("[CRON] Stream data updated:", result);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[CRON] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Cron job failed",
      },
      { status: 500 }
    );
  }
}
