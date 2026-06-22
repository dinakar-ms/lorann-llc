import { NextResponse } from "next/server";

// RFC 9727 — API Catalog as application/linkset+json
const catalog = {
  "linkset": [
    {
      "anchor": "https://www.lorannllc.com/.well-known/api-catalog",
      "item": [
        {
          "href": "https://www.lorannllc.com/contact",
          "type": "text/html",
          "title": "B2B Data Request — Healthcare, Real Estate, Financial, Business"
        }
      ]
    },
    {
      "anchor": "https://www.lorannllc.com",
      "describedby": [
        {
          "href": "https://www.lorannllc.com/llms.txt",
          "type": "text/plain",
          "title": "Lorann LLMs.txt — site description for AI agents"
        }
      ],
      "service-doc": [
        {
          "href": "https://www.lorannllc.com/contact",
          "title": "Data Request & Sample Form"
        }
      ],
      "service-meta": [
        {
          "href": "https://www.lorannllc.com/.well-known/mcp/server-card.json",
          "type": "application/json",
          "title": "MCP Server Card"
        }
      ]
    }
  ]
};

export async function GET() {
  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
