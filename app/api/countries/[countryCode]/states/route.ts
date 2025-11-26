import { NextRequest, NextResponse } from "next/server";
import { CountryAPIService } from "@/lib/country-api-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { countryCode: string } }
) {
  try {
    const { countryCode } = params;

    if (!countryCode) {
      return NextResponse.json(
        {
          success: false,
          error: "Country code is required",
          data: [],
        },
        { status: 400 }
      );
    }

    const states = await CountryAPIService.getStatesByCountry(countryCode);

    return NextResponse.json(
      {
        success: true,
        data: states,
        total: states.length,
        message: `States for ${countryCode.toUpperCase()} retrieved successfully`,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("Error in states API:", error);

    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json(
        {
          success: false,
          error: "Country not found",
          message: `No country found with code: ${params.countryCode}`,
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch states",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}
