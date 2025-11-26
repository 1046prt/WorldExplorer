import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Exchange Rate API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const baseCurrency = searchParams.get("base") || "USD";

    // Validate currency code (basic validation)
    if (!/^[A-Z]{3}$/.test(baseCurrency)) {
      return NextResponse.json(
        { error: "Invalid currency code. Must be 3-letter currency code." },
        { status: 400 }
      );
    }

    // Fetch from external API
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`,
      {
        headers: {
          "User-Agent": "WorldExplorer-App/1.0",
        },
        // Cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Exchange Rate API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Invalid API response from exchange rate service");
    }

    // Return only the data we need (no sensitive info)
    return NextResponse.json({
      result: data.result,
      base_code: data.base_code,
      time_last_update_unix: data.time_last_update_unix,
      time_last_update_utc: data.time_last_update_utc,
      conversion_rates: data.conversion_rates,
    });
  } catch (error) {
    console.error("Exchange rate API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch exchange rates",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
