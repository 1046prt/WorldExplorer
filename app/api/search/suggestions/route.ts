import { NextRequest, NextResponse } from "next/server";
import { SearchService } from "@/lib/search-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

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
      return NextResponse.json({
        success: true,
        data: [],
        message: "Query too short for suggestions",
      });
    }

    const suggestions = SearchService.getSearchSuggestions(query);

    return NextResponse.json(
      {
        success: true,
        data: suggestions,
        total: suggestions.length,
        query,
        message: `Found ${suggestions.length} suggestions for "${query}"`,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error in suggestions API:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch suggestions",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}
