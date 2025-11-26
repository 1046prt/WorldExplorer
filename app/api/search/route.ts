import { NextRequest, NextResponse } from "next/server";
import { SearchService } from "@/lib/search-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type") || "all";
    const limit = parseInt(searchParams.get("limit") || "20");
    const useAPI = searchParams.get("useAPI") !== "false";

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
          data: [],
        },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query must be at least 2 characters",
          data: [],
        },
        { status: 400 }
      );
    }

    const results = await SearchService.searchEnhanced(query, type, useAPI);

    return NextResponse.json(
      {
        success: true,
        data: results.slice(0, limit),
        total: results.length,
        query,
        type,
        message: `Found ${results.length} results for "${query}"`,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error in search API:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, type = "all", limit = 20, useAPI = true } = body;

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
          data: [],
        },
        { status: 400 }
      );
    }

    const results = await SearchService.searchEnhanced(query, type, useAPI);

    return NextResponse.json({
      success: true,
      data: results.slice(0, limit),
      total: results.length,
      query,
      type,
      message: `Found ${results.length} results for "${query}"`,
    });
  } catch (error) {
    console.error("Error in search API:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}
