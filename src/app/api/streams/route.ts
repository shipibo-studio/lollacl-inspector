import { NextResponse } from "next/server";
import { artists, type Artist } from "@/data/artists";

// Edge runtime for better performance
export const runtime = "edge";

// YouTube video interface
interface YouTubeVideo {
  videoId: string;
  title: string;
  channelId: string;
  liveBroadcastContent: string;
}

// Stage streaming configuration
interface StageStream {
  stage: string;
  streamUrl: string | null;
  embedUrl: string | null;
  isLive: boolean;
  currentArtist: string | null;
  schedule: string;
  youtubeVideoId: string | null;
}

// YouTube channel configuration
const YOUTUBE_CHANNEL_ID = "UC7t0bW6yJ1M5eO3x4xXk9xw"; // @Lollapalooza-Chile
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Lollapalooza-Chile/streams";

// Stage mapping - maps stage names to YouTube video titles/keywords
const stageKeywords: Record<string, string[]> = {
  "Cenco Malls Stage": ["Cenco", "Main", "Stage 1"],
  "Banco de Chile Stage": ["Banco", "Chile", "Stage 2"],
  "Alternative Stage": ["Alternative"],
  "Perry's Stage": ["Perry", "Electronic", "EDM"],
  "Lotus Stage": ["Lotus", "Latin", "Regional"],
  "Kidzapalooza Stage": ["Kidz", "Kids", "Familia"],
};

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

// Convert YouTube watch URL to embed URL
function getEmbedUrl(videoId: string | null): string | null {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

// Fetch live streams from YouTube Data API
async function fetchYouTubeLiveStreams(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.log("[STREAMS] No YOUTUBE_API_KEY configured, using fallback");
    return getFallbackYouTubeVideos();
  }

  try {
    // Search for live streams from the channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(searchUrl, {
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (!response.ok) {
      console.error("[STREAMS] YouTube API error:", response.status);
      return getFallbackYouTubeVideos();
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      console.log("[STREAMS] Found live streams from YouTube API:", data.items.length);
      return data.items.map((item: { id: { videoId: string }; snippet: { title: string; channelId: string; liveBroadcastContent: string } }) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
      }));
    }

    // If no live streams, check for upcoming streams
    const upcomingUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=upcoming&type=video&key=${YOUTUBE_API_KEY}`;
    
    const upcomingResponse = await fetch(upcomingUrl, {
      next: { revalidate: 60 }
    });

    if (upcomingResponse.ok) {
      const upcomingData = await upcomingResponse.json();
      if (upcomingData.items && upcomingData.items.length > 0) {
        console.log("[STREAMS] Found upcoming streams from YouTube API:", upcomingData.items.length);
        return upcomingData.items.map((item: { id: { videoId: string }; snippet: { title: string; channelId: string; liveBroadcastContent: string } }) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          channelId: item.snippet.channelId,
          liveBroadcastContent: "upcoming",
        }));
      }
    }

    return getFallbackYouTubeVideos();
  } catch (error) {
    console.error("[STREAMS] Error fetching YouTube streams:", error);
    return getFallbackYouTubeVideos();
  }
}

// Fallback YouTube videos for demo purposes (when API key is not available)
function getFallbackYouTubeVideos(): YouTubeVideo[] {
  // These are example video IDs - in production, these would be the actual live stream URLs
  return [
    {
      videoId: "dQw4w9WgXcQ", // Placeholder - would be actual live stream
      title: "Lollapalooza Chile 2026 - EN VIVO",
      channelId: YOUTUBE_CHANNEL_ID,
      liveBroadcastContent: "live",
    },
  ];
}

// Match YouTube video to stage based on title
function matchVideoToStage(video: YouTubeVideo, stages: string[]): string | null {
  const title = video.title.toLowerCase();
  
  for (const stage of stages) {
    const keywords = stageKeywords[stage] || [];
    for (const keyword of keywords) {
      if (title.includes(keyword.toLowerCase())) {
        return stage;
      }
    }
  }
  
  return null;
}

// Stage configuration
function getDefaultStageStreams(): StageStream[] {
  return [
    {
      stage: "Cenco Malls Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "14:30 - 00:50",
      youtubeVideoId: null,
    },
    {
      stage: "Banco de Chile Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "13:45 - 22:15",
      youtubeVideoId: null,
    },
    {
      stage: "Alternative Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "14:15 - 23:30",
      youtubeVideoId: null,
    },
    {
      stage: "Perry's Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "14:00 - 00:30",
      youtubeVideoId: null,
    },
    {
      stage: "Lotus Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "13:30 - 23:45",
      youtubeVideoId: null,
    },
    {
      stage: "Kidzapalooza Stage",
      streamUrl: null,
      embedUrl: null,
      isLive: false,
      currentArtist: null,
      schedule: "15:30 - 19:50",
      youtubeVideoId: null,
    },
  ];
}

// Main function to get all stage streams
function getStageStreams(youtubeVideos: YouTubeVideo[]): StageStream[] {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM" format
  const festivalDay = getFestivalDay();

  const streams = getDefaultStageStreams();

  // Match YouTube videos to stages
  const stageToVideo: Record<string, YouTubeVideo> = {};
  
  for (const video of youtubeVideos) {
    const stages = Object.keys(stageKeywords);
    const matchedStage = matchVideoToStage(video, stages);
    
    if (matchedStage && !stageToVideo[matchedStage]) {
      stageToVideo[matchedStage] = video;
    } else if (!matchedStage) {
      // Assign first unmatched video to first available stage
      for (const stage of stages) {
        if (!stageToVideo[stage]) {
          stageToVideo[stage] = video;
          break;
        }
      }
    }
  }

  // Update streams with YouTube video info
  for (const stream of streams) {
    const video = stageToVideo[stream.stage];
    if (video) {
      stream.youtubeVideoId = video.videoId;
      stream.streamUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
      stream.embedUrl = getEmbedUrl(video.videoId);
      stream.isLive = video.liveBroadcastContent === "live";
    }
  }

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

  return streams;
}

export async function GET() {
  try {
    // Fetch live streams from YouTube
    const youtubeVideos = await fetchYouTubeLiveStreams();
    const streams = getStageStreams(youtubeVideos);
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      channelUrl: YOUTUBE_CHANNEL_URL,
      channelId: YOUTUBE_CHANNEL_ID,
      festival: "Lollapalooza Chile 2026",
      dates: "13-15 de Marzo",
      stages: streams,
      totalStages: streams.length,
      liveNow: streams.filter((s) => s.isLive).length,
      youtubeVideos: youtubeVideos.map(v => ({
        videoId: v.videoId,
        title: v.title,
        liveBroadcastContent: v.liveBroadcastContent,
      })),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("[STREAMS] Error in streams API:", error);
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
