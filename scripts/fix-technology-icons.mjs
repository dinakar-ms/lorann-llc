/**
 * Fix repeating / non-registry icons in all technology sub-hub pages.
 * Every leaf group currently assigns the same icon to ALL children.
 * This script gives each child a unique, relevant, registry-safe icon.
 *
 * Registry icons used (all exist in components/ui/IconByName.tsx):
 * Activity, BarChart3, Banknote, Building, Building2, Code, Crosshair,
 * Database, Factory, Globe, Globe2, Layers, Monitor, Network, Phone,
 * Plug, Rocket, Server, ServerCog, Target, TrendingUp, Truck, UserCheck,
 * Users, Users2, Wrench, Zap
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const PATCHES = [

  // ── CRM Users (8 items — all were "Users") ────────────────────────────────
  {
    ids: ["page-data-assets-b2b-database-technology-crm-users-mailing-data"],
    items: [
      { _key: "ae97c50b313c", icon: "Target"      }, // Achiever CRM        — sales targeting
      { _key: "d09abf7cd288", icon: "Phone"        }, // Acqueon CRM         — contact centre
      { _key: "cb2a324c3e11", icon: "Crosshair"   }, // CRM Solutions       — precision
      { _key: "a4f51e10c922", icon: "Users"        }, // CRM Users           — general users
      { _key: "948be5e3e932", icon: "Building2"   }, // Microsoft Dynamics  — enterprise
      { _key: "37a378408690", icon: "Zap"          }, // Salesforce CRM      — lightning
      { _key: "345fe184f75e", icon: "UserCheck"   }, // OnContact CRM       — verified contacts
      { _key: "5ef08b9e8c74", icon: "Database"    }, // Siebel CRM (Oracle) — Oracle/DB
    ],
  },

  // ── ERP Users (8 items — all were "Database") — published + draft ─────────
  {
    ids: [
      "page-data-assets-b2b-database-technology-erp-users-email-lists",
      "drafts.page-data-assets-b2b-database-technology-erp-users-email-lists",
    ],
    items: [
      { _key: "9bdba796e9b9", icon: "Globe"        }, // BroadVision ERP    — e-commerce/internet
      { _key: "e6ec3dff0a9b", icon: "Factory"      }, // Epicor ERP         — manufacturing
      { _key: "442ff560c15a", icon: "Truck"         }, // Unleashed ERP      — inventory/supply chain
      { _key: "6d72cfdc7829", icon: "Building"     }, // Timberline/Sage 300 — construction
      { _key: "ae67aa2fe5b7", icon: "TrendingUp"   }, // Upside Software    — growth/optimisation
      { _key: "fdc400c49bc2", icon: "Users2"       }, // i4a ERP            — association mgmt
      { _key: "2ca1cb6b8452", icon: "Server"       }, // IBM ERP            — enterprise server
      { _key: "28cf51073cd2", icon: "Layers"       }, // IBS Enterprise ERP — multi-layer enterprise
    ],
  },

  // ── Operating System Users (3 items — all were "Monitor") — pub + draft ───
  {
    ids: [
      "page-data-assets-b2b-database-technology-operating-system-users-list",
      "drafts.page-data-assets-b2b-database-technology-operating-system-users-list",
    ],
    items: [
      { _key: "7aaa7ba02912", icon: "Monitor"      }, // Microsoft Windows  — desktop OS
      { _key: "8d2866c38aaa", icon: "Code"         }, // Linux              — open-source/dev OS
      { _key: "2d81d4a591ab", icon: "ServerCog"   }, // Unix               — enterprise server OS
    ],
  },

  // ── Software Email Lists (9 items — all were "Cpu") ───────────────────────
  {
    ids: ["page-data-assets-b2b-database-technology-software-email-lists"],
    items: [
      { _key: "15a24f2225ae", icon: "Banknote"    }, // Intuit QuickBooks  — accounting/finance
      { _key: "41751797b0e4", icon: "Server"       }, // VMware             — server virtualisation
      { _key: "f20d9d862b5f", icon: "Activity"    }, // TIBCO Software     — real-time analytics
      { _key: "556dd5a78e2a", icon: "BarChart3"   }, // Tableau            — data visualisation
      { _key: "ba2d4183c8b9", icon: "Wrench"      }, // PLM Software       — product lifecycle
      { _key: "1a9ca76cd787", icon: "Globe2"      }, // Esri ArcGIS        — geographic/mapping
      { _key: "f43b69472694", icon: "Plug"         }, // Cogz CMMS         — maintenance/equipment
      { _key: "e5a5f68a769e", icon: "Users2"      }, // Paycom             — HR/payroll/people
      { _key: "c221f80caa7e", icon: "Network"     }, // Cisco channel      — networking
    ],
  },

  // ── DBMS Users (2 items — both were "HardDrive" → not in registry) ────────
  {
    ids: ["page-data-assets-b2b-database-technology-dbms-users-email-data"],
    items: [
      { _key: "2c5fcf0fff48", icon: "Database"    }, // MongoDB            — document database
      { _key: "3f1996f35c86", icon: "Server"      }, // IBM Db2            — enterprise DB server
    ],
  },

  // ── Business Technology (4 items — all were "Settings2" → not in registry)
  {
    ids: ["page-data-assets-b2b-database-technology-business-technology-email-lists"],
    items: [
      { _key: "416fe538c6a0", icon: "Rocket"      }, // 3D printing        — cutting-edge mfg
      { _key: "bef3f9a3e734", icon: "Code"        }, // Apple iOS dev      — mobile development
      { _key: "1deb6f972946", icon: "Database"    }, // Enterprise DBs     — databases
      { _key: "a89c5b43e278", icon: "Globe"       }, // Google App Engine  — cloud/web platform
    ],
  },
];

async function main() {
  let total = 0;
  for (const { ids, items } of PATCHES) {
    for (const docId of ids) {
      let patch = client.patch(docId);
      for (const { _key, icon } of items) {
        patch = patch.set({ [`childrenItems[_key=="${_key}"].icon`]: icon });
      }
      try {
        await patch.commit();
        console.log(`✓ ${docId} (${items.length} icons)`);
        total += items.length;
      } catch (err) {
        if (err.statusCode === 404 || err.message?.includes("not found")) {
          console.log(`  skip (not found): ${docId}`);
        } else {
          console.error(`✗ ${docId}:`, err.message);
        }
      }
    }
  }
  console.log(`\nDone — ${total} icon fields updated.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
