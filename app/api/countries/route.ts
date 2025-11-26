import { NextResponse } from "next/server";
import { CountryAPIService } from "@/lib/country-api-service";

export async function GET() {
  try {
    const countries = await CountryAPIService.getAllCountries();

    return NextResponse.json(
      {
        success: true,
        data: countries,
        total: countries.length,
        message: "Countries retrieved successfully",
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
    console.error("Error in countries API:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch countries",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 }
    );
  }
}
