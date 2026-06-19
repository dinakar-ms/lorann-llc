import { NextResponse } from "next/server";

const skillsIndex = {
  "$schema": "https://agentskills.dev/schema/v0.1.0/skills.json",
  "name": "Lorann B2B Data Skills",
  "description": "AI agent skills for interacting with Lorann's B2B contact database platform",
  "version": "1.0.0",
  "skills": [
    {
      "id": "search-b2b-contacts",
      "name": "Search B2B Contacts",
      "description": "Search and filter Lorann's verified B2B contact databases by profession, specialty, geography, and credential type",
      "type": "action",
      "url": "https://www.lorannllc.com/contact-us",
      "inputSchema": {
        "type": "object",
        "properties": {
          "profession": {
            "type": "string",
            "description": "Professional category (e.g. 'physicians', 'nurses', 'real estate agents')"
          },
          "location": {
            "type": "string",
            "description": "US state or metro area"
          },
          "specialty": {
            "type": "string",
            "description": "Sub-specialty or credential"
          }
        }
      }
    },
    {
      "id": "request-data-sample",
      "name": "Request Free Data Sample",
      "description": "Request a free sample of Lorann's B2B contact data for a given professional category",
      "type": "action",
      "url": "https://www.lorannllc.com/contact-us"
    },
    {
      "id": "get-record-counts",
      "name": "Get Record Counts",
      "description": "Get estimated record counts for a B2B contact list by profession and geography",
      "type": "query",
      "url": "https://www.lorannllc.com/contact-us"
    },
    {
      "id": "check-compliance",
      "name": "Check Data Compliance",
      "description": "Verify compliance requirements (HIPAA, CCPA, CAN-SPAM, DNC) for a given B2B contact list",
      "type": "query",
      "url": "https://www.lorannllc.com/data-compliance"
    }
  ]
};

export async function GET() {
  return NextResponse.json(skillsIndex, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
