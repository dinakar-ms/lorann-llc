/**
 * Assign unique, relevant icons to every useCases[] item across
 * all B2C database and B2B other-industry leaf pages.
 * All icons must exist in components/ui/IconByName.tsx REGISTRY.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

// Each entry: published ID (draft ID auto-derived by prepending "drafts.")
const PATCHES = [

  // ── B2C: Healthcare & Wellness ───────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-healthcare-wellness",
    items: [
      { _key: "36d15b11db6b", icon: "Activity"    }, // Fitness Membership Growth
      { _key: "96326af6d751", icon: "Pill"         }, // Supplement & Nutrition Sales
      { _key: "663435dbf4d4", icon: "Monitor"      }, // Telehealth Enrollment
      { _key: "478220af5f23", icon: "ShieldCheck"  }, // Health Insurance Enrollment
      { _key: "8645b2fe99d5", icon: "Sparkles"     }, // Wellness App Acquisition
      { _key: "82a867c723ee", icon: "Heart"        }, // Senior Health Services
    ],
  },

  // ── B2C: Automotive ──────────────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-automotive",
    items: [
      { _key: "82c7949697a0", icon: "Car"          }, // New Vehicle Conquest
      { _key: "c7435a9904fd", icon: "Wrench"       }, // Service & Maintenance
      { _key: "7a3c43de69d0", icon: "ShieldCheck"  }, // Auto Insurance Cross-Sell
      { _key: "a887cc9ff257", icon: "Zap"          }, // Electric Vehicle Campaigns
      { _key: "5d72fea41b0c", icon: "Plug"         }, // Auto Aftermarket Products
      { _key: "2aeab20e5025", icon: "Tag"          }, // Dealer Event Marketing
    ],
  },

  // ── B2C: DTC / CPG ───────────────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-dtc-cpg",
    items: [
      { _key: "2ff9a7fa9b60", icon: "ShoppingBag"  }, // Subscription Box Acquisition
      { _key: "2ed80e1bf2d6", icon: "Sparkles"     }, // Brand Sampling Programs
      { _key: "2aa1232fa5e4", icon: "RefreshCw"    }, // Loyalty Program Reactivation
      { _key: "03b63fa1bb33", icon: "Calendar"     }, // Seasonal Product Launches
      { _key: "a7c4c2f235f7", icon: "TrendingUp"   }, // Retail Channel Expansion
      { _key: "ae808fb13a1f", icon: "Users"        }, // Consumer Review Generation
    ],
  },

  // ── B2C: Education & EdTech ──────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-education-edtech",
    items: [
      { _key: "cb1bae3bd882", icon: "Users2"       }, // K-12 Parent Outreach
      { _key: "c9c51c9c18ba", icon: "Award"        }, // College Enrollment Campaigns
      { _key: "fa48d17e3539", icon: "Monitor"      }, // Online Learning Acquisition
      { _key: "c120250caa36", icon: "Cpu"          }, // EdTech Product Marketing
      { _key: "e26f0d016992", icon: "Target"       }, // Test Prep Program Enrollment
      { _key: "56ada70b937e", icon: "Banknote"     }, // Student Loan Refinancing
    ],
  },

  // ── B2C: Financial Services ──────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-financial-services",
    items: [
      { _key: "0b368880fc8a", icon: "CreditCard"   }, // Credit Card Acquisition
      { _key: "eb89b51fa4fc", icon: "Home"         }, // Mortgage Origination
      { _key: "17a7ea14b4cc", icon: "TrendingUp"   }, // Wealth Management Growth
      { _key: "ff10ba3a0d69", icon: "ShieldCheck"  }, // Insurance Product Cross-Sell
      { _key: "da084825c9af", icon: "Banknote"     }, // Personal Loan Marketing
      { _key: "6d47cfe3f140", icon: "FileText"     }, // Financial Literacy Programs
    ],
  },

  // ── B2C: Home Services ───────────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-home-services",
    items: [
      { _key: "9e68503712b5", icon: "Wrench"       }, // HVAC Service Marketing
      { _key: "9c454df41efe", icon: "Home"         }, // Roofing & Exterior Projects
      { _key: "b35da1d09cfd", icon: "Sparkles"     }, // Home Remodeling Leads
      { _key: "2b8f35a3fb28", icon: "Shield"       }, // Pest Control Subscriptions
      { _key: "ad28aa948fc9", icon: "Globe2"       }, // Landscaping & Lawn Care
      { _key: "3baa308dbc23", icon: "Lock"         }, // Home Security Systems
    ],
  },

  // ── B2C: Real Estate ─────────────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-real-estate",
    items: [
      { _key: "285b54711243", icon: "Award"        }, // First-Time Buyer Programs
      { _key: "71f4e33b16d8", icon: "TrendingUp"   }, // Move-Up Buyer Targeting
      { _key: "c27f01612d2d", icon: "MapPin"       }, // Relocation Assistance
      { _key: "ff3a6dd33431", icon: "Target"       }, // Listing Lead Generation
      { _key: "1bea756a2713", icon: "Banknote"     }, // Home Equity Products
      { _key: "0af3d1fa7749", icon: "Building"     }, // Rental Property Investment
    ],
  },

  // ── B2C: Retail & E-Commerce ─────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-retail-ecommerce",
    items: [
      { _key: "a1dba171ac34", icon: "UserCheck"    }, // New Customer Acquisition
      { _key: "8554e059f91e", icon: "ShoppingCart" }, // Cart Abandonment Recovery
      { _key: "1c5a61a407e7", icon: "Calendar"     }, // Seasonal Campaign Targeting
      { _key: "d7cc0b8477f8", icon: "Heart"        }, // Brand Loyalty Programs
      { _key: "fe7935eef8ca", icon: "ShoppingBag"  }, // Marketplace Seller Outreach
      { _key: "9407cabfba42", icon: "TrendingUp"   }, // Retail Store Traffic
    ],
  },

  // ── B2C: Telecommunications ──────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-telecommunications",
    items: [
      { _key: "eb2c24605943", icon: "RefreshCw"    }, // Carrier Switch Campaigns
      { _key: "06afa7679cca", icon: "Globe"        }, // Broadband Expansion
      { _key: "d49639ab0234", icon: "Layers"       }, // Bundle Upsell Programs
      { _key: "77c4f17d5719", icon: "Zap"          }, // Device Upgrade Campaigns
      { _key: "0f9086bc70bb", icon: "Play"         }, // Cord-Cutter Streaming Offers
      { _key: "190ee8fc20e8", icon: "Building2"    }, // Business Service Cross-Sell
    ],
  },

  // ── B2C: Travel ──────────────────────────────────────────────────────────
  {
    id: "page-data-assets-b2c-database-travel",
    items: [
      { _key: "c3dd1fdac140", icon: "Globe"        }, // Destination Awareness Campaigns
      { _key: "8ab5348097fe", icon: "Landmark"     }, // Cruise Line Acquisition
      { _key: "a446c54fef0b", icon: "Award"        }, // Loyalty Program Enrollment
      { _key: "dbb91a64d794", icon: "CreditCard"   }, // Travel Credit Card Marketing
      { _key: "d4c6e631d24d", icon: "Users"        }, // Group & Event Travel
      { _key: "00a27f83f7c1", icon: "Zap"          }, // Last-Minute Deal Distribution
    ],
  },

  // ── B2B Other-Industry: Agriculture ──────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-agriculture-industry-email-lists",
    items: [
      { _key: "46a829b65300", icon: "Crosshair"    }, // Precision Ag Technology Sales
      { _key: "91e1ef9551b9", icon: "Globe2"       }, // Agricultural Input Sales
      { _key: "a7d3c2a9e104", icon: "Truck"        }, // Farm Equipment Campaigns
      { _key: "e7c47413371e", icon: "Banknote"     }, // Agribusiness Financial Services
      { _key: "eecb485437d2", icon: "Database"     }, // Agricultural Software Sales
      { _key: "e3ca1ba54de7", icon: "Calendar"     }, // Agricultural Trade Events
    ],
  },

  // ── B2B Other-Industry: Banking & Finance ────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-banking-finance-email-lists",
    items: [
      { _key: "8d2848ef091d", icon: "Server"       }, // Core Banking Technology Sales
      { _key: "17c4616215cf", icon: "ShieldCheck"  }, // Regulatory Compliance Solutions
      { _key: "6229b15bb329", icon: "TrendingUp"   }, // Wealth Management Platforms
      { _key: "d1502d9eee10", icon: "Building2"    }, // Commercial Lending Products
      { _key: "dfd7c1239080", icon: "Users2"       }, // Financial Services Recruiting
      { _key: "9d3ba4a77b66", icon: "Calendar"     }, // Banking Industry Events
    ],
  },

  // ── B2B Other-Industry: Construction ─────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-construction-industry-email-list",
    items: [
      { _key: "62a7760609ac", icon: "Wrench"       }, // Construction Equipment Sales
      { _key: "7f11966ac8b2", icon: "Building"     }, // Building Materials Marketing
      { _key: "652db04625f5", icon: "Database"     }, // Construction Software Sales
      { _key: "afcfdc7aa3b7", icon: "ShieldCheck"  }, // Jobsite Safety Programs
      { _key: "842ccefe83dd", icon: "Users2"       }, // Subcontractor Recruitment
      { _key: "3f13909791e0", icon: "Shield"       }, // Construction Insurance Services
    ],
  },

  // ── B2B Other-Industry: Hotels ───────────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-hotels-email-lists",
    items: [
      { _key: "96c11c601bd6", icon: "Monitor"      }, // Hotel Technology Sales
      { _key: "efe106657435", icon: "ShoppingBag"  }, // Hospitality Supply Programs
      { _key: "110153f3a8c2", icon: "Globe"        }, // Hotel F&B Partnerships
      { _key: "d261218c415a", icon: "TrendingUp"   }, // Revenue Management Consulting
      { _key: "23da5f2d09af", icon: "UserCheck"    }, // Hotel Staffing Solutions
      { _key: "4bd1d0170021", icon: "Target"       }, // Group Sales Prospecting
    ],
  },

  // ── B2B Other-Industry: Insurance ────────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-insurance-contact-lists",
    items: [
      { _key: "752c268f1ec0", icon: "Cpu"          }, // Insurtech Platform Sales
      { _key: "d868eaea3e3b", icon: "Building"     }, // Agency Management Solutions
      { _key: "58392c0897e2", icon: "Database"     }, // Actuarial Software Sales
      { _key: "e4ae783732db", icon: "ShieldCheck"  }, // Insurance Program Marketing
      { _key: "92e0766a1a32", icon: "Wrench"       }, // Claims Technology Solutions
      { _key: "4fe5debc4186", icon: "UserCheck"    }, // Insurance Talent Acquisition
    ],
  },

  // ── B2B Other-Industry: IT Decision Makers ───────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-it-decision-makers-mailing-list",
    items: [
      { _key: "28921232a03b", icon: "Monitor"      }, // Enterprise Software Demos
      { _key: "b089cd60e393", icon: "Globe"        }, // Cloud Migration Campaigns
      { _key: "3769fc993209", icon: "Lock"         }, // Cybersecurity Solution Sales
      { _key: "7404d54e6b7c", icon: "Target"       }, // IT Consulting Lead Generation
      { _key: "5c37c3be76fb", icon: "Calendar"     }, // Technology Event Marketing
      { _key: "3a2e43bad5b2", icon: "Layers"       }, // IT Vendor Consolidation
    ],
  },

  // ── B2B Other-Industry: Manufacturing ────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-manufacturing-industry-email-lists",
    items: [
      { _key: "ebcb01955d0c", icon: "Zap"          }, // Industrial Automation Sales
      { _key: "fd3e94816b18", icon: "Wrench"       }, // MRO Supply Agreements
      { _key: "726a8f495d27", icon: "Database"     }, // ERP Implementation Services
      { _key: "b2eac8d36824", icon: "ShieldCheck"  }, // Quality Management Solutions
      { _key: "3d21f6adf5df", icon: "Users2"       }, // Workforce Training Programs
      { _key: "b099c7ffffea", icon: "Activity"     }, // Industrial Energy Solutions
    ],
  },

  // ── B2B Other-Industry: Real Estate ──────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-real-estate-data-list",
    items: [
      { _key: "f5b832ff2e96", icon: "Database"     }, // Real Estate CRM Sales
      { _key: "9e3a08fe6641", icon: "Banknote"     }, // Mortgage Lender Partnerships
      { _key: "54e92de8c911", icon: "Building2"    }, // Property Technology Marketing
      { _key: "48a3865dff57", icon: "Award"        }, // Real Estate Training Programs
      { _key: "d68ba658b90c", icon: "ShieldCheck"  }, // Title & Closing Services
      { _key: "45f66cbde691", icon: "Users"        }, // Real Estate Franchise Recruitment
    ],
  },

  // ── B2B Other-Industry: Sports Industry ──────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-sports-industry-email-lists",
    items: [
      { _key: "3772c31b3e9d", icon: "Award"        }, // Sports Sponsorship Sales
      { _key: "c68138ad9fc7", icon: "Monitor"      }, // Venue Technology Upgrades
      { _key: "2c0d0e9d7c78", icon: "Zap"          }, // Athletic Equipment Sales
      { _key: "2c4265bec49e", icon: "Radio"        }, // Sports Media Rights
      { _key: "0c741990c65a", icon: "BarChart3"    }, // Sports Analytics Platforms
      { _key: "200feb468a48", icon: "Heart"        }, // Fan Experience Programs
    ],
  },

  // ── B2B Other-Industry: Travel ───────────────────────────────────────────
  {
    id: "page-data-assets-b2b-database-other-industry-travel-data-lists",
    items: [
      { _key: "9c187ecacf85", icon: "Monitor"      }, // Travel Technology Sales
      { _key: "f3c7b47ceb68", icon: "Globe"        }, // Destination Marketing Programs
      { _key: "8108a2320267", icon: "Landmark"     }, // Cruise Line Agent Outreach
      { _key: "10fb3d446937", icon: "Briefcase"    }, // Corporate Travel Management
      { _key: "dfe0d2be4897", icon: "ShieldCheck"  }, // Travel Insurance Products
      { _key: "766e9f39fa6d", icon: "UserCheck"    }, // Travel Advisor Recruitment
    ],
  },
];

async function main() {
  let total = 0;

  for (const { id, items } of PATCHES) {
    // Patch both published and draft versions
    for (const docId of [id, `drafts.${id}`]) {
      let patch = client.patch(docId);
      for (const { _key, icon } of items) {
        patch = patch.set({ [`useCases[_key=="${_key}"].icon`]: icon });
      }
      try {
        await patch.commit();
        console.log(`✓ ${docId} (${items.length} icons)`);
        total += items.length;
      } catch (err) {
        if (err.statusCode === 404 || err.message?.includes("not found")) {
          console.log(`  skip: ${docId}`);
        } else {
          console.error(`✗ ${docId}:`, err.message);
        }
      }
    }
  }

  console.log(`\nDone — ${total} useCase icon fields updated.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
