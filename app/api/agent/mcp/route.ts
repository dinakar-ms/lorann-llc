import { NextResponse } from "next/server";

const mcpCard = {
  "name": "Lorann B2B Data",
  "version": "1.0.0",
  "description": "MCP server providing access to Lorann's verified B2B contact databases. Query healthcare professionals, real estate agents, financial advisors, and business decision-makers with specialty and geographic filters.",
  "url": "https://www.lorannllc.com",
  "transport": "https",
  "capabilities": {
    "tools": true,
    "resources": false,
    "prompts": false
  },
  "tools": [
    {
      "name": "search_contacts",
      "description": "Search Lorann's B2B contact database by profession, specialty, geography, and credential type",
      "inputSchema": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "enum": ["healthcare", "real-estate", "financial", "business"],
            "description": "Professional category to search"
          },
          "specialty": {
            "type": "string",
            "description": "Sub-specialty or credential type (e.g. 'cardiologist', 'registered-nurse')"
          },
          "state": {
            "type": "string",
            "description": "US state abbreviation to filter by geography"
          },
          "count": {
            "type": "integer",
            "description": "Estimated record count requested"
          }
        },
        "required": ["category"]
      }
    },
    {
      "name": "request_sample",
      "description": "Request a free data sample for a given professional category",
      "inputSchema": {
        "type": "object",
        "properties": {
          "category": { "type": "string" },
          "specialty": { "type": "string" },
          "email": { "type": "string", "format": "email" }
        },
        "required": ["category", "email"]
      }
    }
  ],
  "contact": {
    "name": "Lorann LLC",
    "email": "support@lorannllc.com",
    "url": "https://www.lorannllc.com/contact-us"
  },
  "legal": {
    "privacy": "https://www.lorannllc.com/privacy-policy",
    "terms": "https://www.lorannllc.com/terms-of-service"
  }
};

export async function GET() {
  return NextResponse.json(mcpCard, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
