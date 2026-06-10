/**
 * Fix repeating and unregistered icons across hub pages.
 * Run: node scripts/fix-icons.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

// ─── Icon assignments per document ──────────────────────────────────────────
// All icons must exist in components/ui/IconByName.tsx REGISTRY.
// Format: { _key: "...", icon: "IconName" }

const PATCHES = [

  // ── Healthcare hub (fix 7 non-registry icons + ensure all unique) ──────────
  {
    ids: ["page-data-assets-b2b-database-healthcare", "drafts.page-data-assets-b2b-database-healthcare"],
    items: [
      { _key: "dbbb22d57970", icon: "Stethoscope"  }, // Doctors Email List
      { _key: "b8bc4f7316c2", icon: "UserCheck"    }, // Physician Email Lists (UserCog→UserCheck)
      { _key: "53820462e6a3", icon: "Pill"          }, // US Pharmacist Email List
      { _key: "aaabdfc3faf4", icon: "Heart"         }, // Veterinarians (Cat→Heart)
      { _key: "1514fd6e80e9", icon: "FileText"      }, // Medical Mailing Lists (ClipboardList→FileText)
      { _key: "74eb50dc7e28", icon: "Hospital"      }, // Hospital Mailing List (Building2→Hospital)
      { _key: "a0ee4c6580b7", icon: "HeartPulse"   }, // Nurses Email List
      { _key: "bae2399c8c1a", icon: "Crosshair"    }, // Plastic Surgeons (Scissors→Crosshair)
      { _key: "6389126b5bf8", icon: "Activity"      }, // Cardiologists
      { _key: "5581dbcdb19d", icon: "Wrench"        }, // Chiropractors (Hand→Wrench)
      { _key: "f6d5da2c9321", icon: "Cross"         }, // Dentist Email List (Smile→Cross)
      { _key: "c299888fa67c", icon: "Eye"           }, // X-Ray Laboratories (Scan→Eye)
    ],
  },

  // ── Technology hub (fix 2 non-registry icons) ──────────────────────────────
  {
    ids: ["page-data-assets-b2b-database-technology", "drafts.page-data-assets-b2b-database-technology"],
    items: [
      { _key: "4a25ea66fab2", icon: "Monitor"          }, // Operating System Users
      { _key: "c62e882d7420", icon: "Database"          }, // ERP Users
      { _key: "8ad0563571a3", icon: "Users"             }, // CRM Users
      { _key: "f1b502ffda9e", icon: "Network"           }, // Network Users
      { _key: "e2b1eebb52cc", icon: "Cpu"               }, // Software Email Lists
      { _key: "0e798322aeb2", icon: "Server"            }, // DBMS Users (HardDrive→Server)
      { _key: "ca01988ba2c8", icon: "Briefcase"         }, // Business Technology (Settings2→Briefcase)
      { _key: "4c60a27871f5", icon: "Layers"            }, // Groupware
    ],
  },

  // ── Other Industry hub (fix 5 non-registry icons) ──────────────────────────
  {
    ids: ["page-data-assets-b2b-database-other-industry", "drafts.page-data-assets-b2b-database-other-industry"],
    items: [
      { _key: "f3532905910a", icon: "Cpu"         }, // IT Decision Makers
      { _key: "854c19b44f0a", icon: "Wrench"      }, // Construction (HardHat→Wrench)
      { _key: "e13d1c406ec1", icon: "Globe2"      }, // Agriculture (Wheat→Globe2)
      { _key: "26e35df10c35", icon: "Award"       }, // Sports Industry (Trophy→Award)
      { _key: "7b0671fe691f", icon: "Banknote"    }, // Banking & Finance
      { _key: "365b316ed5ea", icon: "Landmark"    }, // Hotels (BedDouble→Landmark)
      { _key: "7b42e557d601", icon: "ShieldCheck" }, // Insurance
      { _key: "a2fda8e3375b", icon: "Globe"       }, // Travel Industry (Plane→Globe)
      { _key: "3ea02de28ed6", icon: "Building"    }, // Real Estate (B2B)
      { _key: "a3b436dda32e", icon: "Factory"     }, // Manufacturing
    ],
  },

  // ── physicians-advanced-practice (all were "UserCog" → Circle fallback) ────
  {
    ids: ["PdAWFpcplbJqFo3W1kprFj"],
    items: [
      { _key: "91b096723965", icon: "Stethoscope" }, // Physicians & Doctors
      { _key: "02b1b376b9dc", icon: "Activity"    }, // Podiatrists
      { _key: "792459a31941", icon: "HeartPulse"  }, // Nurse Practitioners
      { _key: "1fdb6269892d", icon: "UserCheck"   }, // Physician Assistants
      { _key: "d36e64ec7edf", icon: "Users2"      }, // Medical Assistants
    ],
  },

  // ── nursing-professionals (all were "HeartPulse" — unique now) ─────────────
  {
    ids: ["P4n5H6Le0izBS9IEByevjr"],
    items: [
      { _key: "3ec19905a351", icon: "HeartPulse"  }, // Registered Nurses
      { _key: "9cbd4f8bb3e8", icon: "Heart"        }, // Licensed Practical Nurses
      { _key: "94ab5352f281", icon: "Users"        }, // Certified Nursing Assistants
      { _key: "1db3cfae8bb5", icon: "Users2"       }, // Certified Nurse-Midwives
    ],
  },

  // ── hospital-decision-makers (all were "Building2" — unique now) ───────────
  {
    ids: ["PdAWFpcplbJqFo3W1kpsWl"],
    items: [
      { _key: "9c7c248804f4", icon: "Building2"   }, // Hospital Administrators
      { _key: "34cb789acd59", icon: "Briefcase"   }, // Healthcare CEO & CFO
      { _key: "5495a15d8a66", icon: "Stethoscope" }, // Chief Medical Officers
      { _key: "bf5c85bffe82", icon: "HeartPulse"  }, // Chief Nursing Officers
      { _key: "43fa980026a9", icon: "Users"        }, // Chief of Staff
      { _key: "010fd6ddb9fa", icon: "Brain"        }, // Medical Directors
    ],
  },

  // ── health-therapy (all were "Activity" — unique now) ─────────────────────
  {
    ids: ["3A1Ilil0nNCkGiJ6qqAIl3"],
    items: [
      { _key: "d3defe5032a2", icon: "Activity"    }, // Physical Therapists
      { _key: "6b845f6b571b", icon: "Wrench"      }, // Occupational Therapists
      { _key: "f2d9cc284c82", icon: "Radio"       }, // Speech & Language Therapists
      { _key: "9b83bff4996c", icon: "Heart"       }, // Respiratory Therapists
      { _key: "5b5071d63c7e", icon: "Users2"      }, // Massage Therapists
      { _key: "362be96d54ef", icon: "Zap"         }, // EMTs & Paramedics
      { _key: "a17500a805db", icon: "Eye"         }, // Radiologic Technicians
      { _key: "25f4340cf69e", icon: "Pill"        }, // Dieticians & Nutritionists
    ],
  },

  // ── behavioral-mental-health (all were "Brain" — unique now) ──────────────
  {
    ids: ["3A1Ilil0nNCkGiJ6qqAJo4"],
    items: [
      { _key: "d96fbbf7411a", icon: "Brain"       }, // Psychologists
      { _key: "13c4ef131c4e", icon: "Stethoscope" }, // Psychiatrists
      { _key: "a824e4620975", icon: "Users2"      }, // Mental Health Counselors
      { _key: "7deee3216bfa", icon: "Users"       }, // Social Workers & Case Managers
      { _key: "c637050ac839", icon: "Heart"       }, // Marriage & Family Therapists
    ],
  },

  // ── dental-vision (all were "Smile" → Circle fallback — unique now) ────────
  {
    ids: ["PdAWFpcplbJqFo3W1kpuU8"],
    items: [
      { _key: "2e4ec4520b4e", icon: "Cross"       }, // Dentists
      { _key: "81d9477f4249", icon: "Shield"      }, // Dental Hygienists
      { _key: "4f881f1eff41", icon: "UserCheck"   }, // Dental Assistants
      { _key: "87638f7ce807", icon: "Eye"         }, // Optometrists
      { _key: "21eea59c63f5", icon: "Search"      }, // Opticians
    ],
  },

  // ── pharmacy-practice-management (all were "Pill" — unique now) ────────────
  {
    ids: ["P4n5H6Le0izBS9IEByexGD"],
    items: [
      { _key: "e4281497b3a1", icon: "Pill"        }, // Pharmacists
      { _key: "449b0f9b4ae5", icon: "Briefcase"   }, // Physician Practice Managers
    ],
  },

  // ── specialty-other (all were "Award" — unique now) ────────────────────────
  {
    ids: ["P4n5H6Le0izBS9IEByexRX"],
    items: [
      { _key: "514f7c6d213c", icon: "Activity"    }, // Chiropractors
      { _key: "d97f0e65d35b", icon: "Heart"       }, // Veterinarians
      { _key: "982d3883239e", icon: "Users"        }, // Allied Healthcare Professionals
    ],
  },
];

// ─── Apply patches ───────────────────────────────────────────────────────────
async function main() {
  let total = 0;
  for (const { ids, items } of PATCHES) {
    for (const docId of ids) {
      // Build a single patch that sets every icon by its _key
      let patch = client.patch(docId);
      for (const { _key, icon } of items) {
        patch = patch.set({ [`childrenItems[_key=="${_key}"].icon`]: icon });
      }
      try {
        await patch.commit();
        console.log(`✓ Patched ${docId} (${items.length} icons)`);
        total += items.length;
      } catch (err) {
        if (err.message?.includes("not found") || err.statusCode === 404) {
          console.log(`  skip (not found): ${docId}`);
        } else {
          console.error(`✗ Error on ${docId}:`, err.message);
        }
      }
    }
  }
  console.log(`\nDone — ${total} icon fields updated.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
