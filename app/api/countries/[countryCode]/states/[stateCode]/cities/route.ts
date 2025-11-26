import { NextRequest, NextResponse } from "next/server";
import { CountryAPIService } from "@/lib/country-api-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { countryCode: string; stateCode: string } }
) {
  try {
    const { countryCode, stateCode } = params;

    if (!countryCode || !stateCode) {
      return NextResponse.json(
        {
          success: false,
          error: "Country code and state code are required",
          data: [],
        },
        { status: 400 }
      );
    }

    const cities = await CountryAPIService.getCitiesByState(
      countryCode,
      stateCode
    );

    return NextResponse.json(
      {
        success: true,
        data: cities,
        total: cities.length,
        message: `Cities for ${stateCode} in ${countryCode.toUpperCase()} retrieved successfully`,
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
    console.error("Error in cities by state API:", error);

    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json(
        {
          success: false,
          error: "State or country not found",
          message: `No state ${params.stateCode} found in country ${params.countryCode}`,
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch cities",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}
