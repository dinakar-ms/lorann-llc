import { NextResponse } from "next/server";

const catalog = {
  "$schema": "https://spec.openapis.org/oas/3.1/meta/base",
  "apis": [
    {
      "id": "lorann-data-request",
      "title": "Lorann B2B Data Request",
      "description": "Request verified B2B contact lists for healthcare professionals, real estate agents, financial advisors, and business executives. Supports filtering by specialty, geography, credential type, and practice setting.",
      "type": "REST",
      "contact": {
        "name": "Lorann Data Team",
        "email": "support@lorannllc.com",
        "url": "https://www.lorannllc.com/contact-us"
      },
      "documentation": "https://www.lorannllc.com/contact-us",
      "categories": ["healthcare", "real-estate", "financial-services", "business"],
      "formats": ["csv", "xlsx", "json"],
      "authentication": "contact-for-access"
    }
  ],
  "contact": {
    "name": "Lorann LLC",
    "url": "https://www.lorannllc.com",
    "email": "support@lorannllc.com"
  },
  "version": "1.0.0",
  "published": "2024-01-01T00:00:00Z"
};

export async function GET() {
  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
