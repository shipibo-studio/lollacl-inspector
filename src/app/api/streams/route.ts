import { NextResponse } from "next/server";
import { artists, type Artist } from "@/data/artists";

// Edge runtime for better performance
export const runtime = "edge";

// Stage streaming configuration
interface StageStream {
  stage: string;
  streamUrl: string | null;
  isLive: boolean;
  currentArtist: string | null;
  schedule: string;
}

// YouTube channel base URL
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Lollapalooza-Chile/streams";

// Get the current festival day based on date
function getFestivalDay(): "friday" | "saturday" | "sunday" | null {
  const now = new Date();
  const date = now.getDate();
  
  // Lollapalooza Chile 2026: March 13-15
  if (date === 13) return "friday";
  if (date === 14) return "saturday";
  if (date === 15) return "sunday";
  
  return null;
}

// Stage configuration - these URLs can be updated when streams go live
function getStageStreams(): StageStream[] {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM" format
  const festivalDay = getFestivalDay();

  // Stream URLs - Update these when streams are live
  // These are placeholder URLs - in production, these would come from a CMS or YouTube API
  const streams: StageStream[] = [
    {
      stage: "Cenco Malls Stage",
      streamUrl: null, // Set to YouTube URL when live
      isLive: false,
      currentArtist: null,
      schedule: "14:30 - 00:50",
    },
    {
      stage: "Banco de Chile Stage",
      streamUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "13:45 - 22:15",
    },
    {
      stage: "Alternative Stage",
      streamUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "14:15 - 23:30",
    },
    {
      stage: "Perry's Stage",
      streamUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "14:00 - 00:30",
    },
    {
      stage: "Lotus Stage",
      streamUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "13:30 - 23:45",
    },
    {
      stage: "Kidzapalooza Stage",
      streamUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "15:30 - 19:50",
    },
  ];

  // Find currently live artists
  if (festivalDay) {
    artists.forEach((artist: Artist) => {
      if (artist.day === festivalDay && artist.time <= currentTime && artist.endTime > currentTime) {
        const stageIndex = streams.findIndex((s) => s.stage === artist.stage);
        if (stageIndex !== -1 && !streams[stageIndex].isLive) {
          streams[stageIndex].isLive = true;
          streams[stageIndex].currentArtist = artist.name;
        }
      }
    });
  }

  // Update stream URLs based on live status
  // In production, fetch actual live stream URLs from YouTube API
  streams.forEach((stream: StageStream) => {
    if (stream.isLive) {
      // These would be the actual live stream URLs
      // For now, we point to the channel's streams page
      stream.streamUrl = YOUTUBE_CHANNEL_URL;
    }
  });

  return streams;
}

export async function GET() {
  try {
    const streams = getStageStreams();
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      channelUrl: YOUTUBE_CHANNEL_URL,
      festival: "Lollapalooza Chile 2026",
      dates: "13-15 de Marzo",
      stages: streams,
      totalStages: streams.length,
      liveNow: streams.filter((s) => s.isLive).length,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stream information",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
