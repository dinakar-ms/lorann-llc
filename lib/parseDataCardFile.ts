// Parser version sentinel — bump this to force Vercel to rebuild this module
// instead of serving a cached compilation. Visible in logs via PARSER_VERSION.
export const PARSER_VERSION = "v2-segments-extras-rtf-fix";

import * as XLSX from "xlsx";

/**
 * Subset of dataCard fields we attempt to extract from uploads.
 * Matches the dataCard Sanity schema.
 */
export type ParsedDataCard = {
  name?: string;
  universe?: number;
  category?: string;
  description?: string;
  postalRecords?: number;
  phoneNumbers?: number;
  emailAddresses?: number;
  postalCpm?: number;
  phoneCpm?: number;
  emailCpm?: number;
  popularity?: number;
  cardQuality?: string;
  market?: string;
  dataType?: string;
  source?: string;
  geo?: string;
  genderMale?: number;
  genderFemale?: number;
  selects?: string[];
  segments?: { label: string; count?: number; rate?: number }[];
  extraFields?: { label: string; value: string }[];
  tags?: string[];
  minimumOrder?: number;
  minimumPrice?: number;
  netNamePercent?: number;
  brokerCommission?: number;
  agencyCommission?: number;
  exchangeAvailable?: boolean;
  reuseAvailable?: boolean;
  emailDeliveryFee?: number;
  ftpDeliveryFee?: number;
  marketEntryDate?: string;
  nextUpdateDate?: string;
  frequency?: string;
  lastUpdated?: string;
};

export type ParseResult = {
  ok: boolean;
  fields: ParsedDataCard;
  warnings: string[];
  errors: string[];
};

/* ─────────────────────────────────────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────────────────────────────────── */

function normalizeLabel(raw: unknown): string {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(raw: unknown): number | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : undefined;
  const cleaned = String(raw).replace(/[,$%\s]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

/** Extract first $X.XX/M or $X/F or X% style number from a string. */
function parseRateOrPercent(raw: unknown): number | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  const s = String(raw);
  const m = s.match(/(\d+(?:\.\d+)?)/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function parseBool(raw: unknown): boolean | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  if (typeof raw === "boolean") return raw;
  const s = String(raw).toLowerCase().trim();
  if (["yes", "y", "true", "1", "allowed", "is allowed"].some((k) => s.includes(k))) return true;
  if (["no", "n", "false", "0", "not allowed", "is not allowed"].some((k) => s.includes(k)))
    return false;
  return undefined;
}

function parseDate(raw: unknown): string | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  if (typeof raw === "number" && raw > 25569) {
    const ms = (raw - 25569) * 86400 * 1000;
    return new Date(ms).toISOString().slice(0, 10);
  }
  const s = String(raw).trim();
  // mm/dd/yyyy
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return undefined;
}

function getCell(row: unknown[], idx: number): string {
  if (!Array.isArray(row) || idx >= row.length) return "";
  const v = row[idx];
  return v === null || v === undefined ? "" : String(v).trim();
}

function getCellRaw(row: unknown[], idx: number): unknown {
  if (!Array.isArray(row) || idx >= row.length) return "";
  return row[idx];
}

/** Whitelist of NextMark section header names (uppercase, normalized). */
const KNOWN_SECTIONS = new Set([
  "SEGMENTS",
  "MEDIA TYPE",
  "DESCRIPTION",
  "SOURCE",
  "GEOGRAPHY",
  "OPT-IN",
  "OPT IN",
  "SELECTS",
  "UNIT OF SALE INFORMATION",
  "UNIT OF SALE",
  "AVERAGE INCOME",
  "GENDER",
  "CAN SELECT",
  "MINIMUM ORDER",
  "REUSE",
  "TELEMARKETING",
  "CANCELLATION",
  "KEY CODING",
  "ADDRESSING",
  "MANAGER CONTACT INFORMATION",
  "ID NUMBERS",
  "MAINTENANCE",
  "DATA CARD MAINTENANCE",
  "NET NAME ARRANGEMENTS",
  "EXCHANGES",
  "COMMISSIONS",
  "DATE",
  "ADDITIONAL CHARGES",
  "NET NAME POLICY",
]);

/** A row is a section header only if col A matches a known section name AND
 *  cols B/C are empty. Col D may contain description text. */
function isSectionHeader(row: unknown[]): string | null {
  const a = getCell(row, 0);
  if (!a) return null;
  const upper = a.toUpperCase().trim();
  if (!KNOWN_SECTIONS.has(upper)) return null;
  if (getCell(row, 1)) return null;
  if (getCell(row, 2)) return null;
  return upper;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Simple "Field | Value" key/value parser (for the template we ship)
 * ────────────────────────────────────────────────────────────────────────── */

const FIELD_ALIASES: Record<string, keyof ParsedDataCard> = {
  name: "name",
  "media name": "name",
  "data card name": "name",
  title: "name",
  description: "description",
  summary: "description",
  universe: "universe",
  "universe total count": "universe",
  "total count": "universe",
  "total records": "universe",
  "postal records": "postalRecords",
  "phone numbers": "phoneNumbers",
  phones: "phoneNumbers",
  "email addresses": "emailAddresses",
  emails: "emailAddresses",
  category: "category",
  industry: "category",
  market: "market",
  "data type": "dataType",
  type: "dataType",
  source: "source",
  geography: "geo",
  geo: "geo",
  country: "geo",
  "card quality grade": "cardQuality",
  "card quality": "cardQuality",
  "quality grade": "cardQuality",
  popularity: "popularity",
  "popularity score": "popularity",
  "postal cpm": "postalCpm",
  "phone cpm": "phoneCpm",
  "email cpm": "emailCpm",
  "gender male": "genderMale",
  "gender percent male": "genderMale",
  "gender female": "genderFemale",
  "gender percent female": "genderFemale",
  "minimum order": "minimumOrder",
  "minimum order quantity": "minimumOrder",
  "minimum price": "minimumPrice",
  "net name percentage": "netNamePercent",
  "net name percent": "netNamePercent",
  "broker commission": "brokerCommission",
  "agency commission": "agencyCommission",
  "exchange available": "exchangeAvailable",
  "reuse available": "reuseAvailable",
  "email delivery fee": "emailDeliveryFee",
  "ftp delivery fee": "ftpDeliveryFee",
  "market entry date": "marketEntryDate",
  "next update date": "nextUpdateDate",
  frequency: "frequency",
  "update frequency": "frequency",
  "last updated": "lastUpdated",
  selects: "selects",
  "available selects": "selects",
};

const NUMBER_FIELDS = new Set<keyof ParsedDataCard>([
  "universe",
  "postalRecords",
  "phoneNumbers",
  "emailAddresses",
  "postalCpm",
  "phoneCpm",
  "emailCpm",
  "popularity",
  "genderMale",
  "genderFemale",
  "minimumOrder",
  "minimumPrice",
  "netNamePercent",
  "brokerCommission",
  "agencyCommission",
  "emailDeliveryFee",
  "ftpDeliveryFee",
]);
const BOOL_FIELDS = new Set<keyof ParsedDataCard>(["exchangeAvailable", "reuseAvailable"]);
const DATE_FIELDS = new Set<keyof ParsedDataCard>([
  "marketEntryDate",
  "nextUpdateDate",
  "lastUpdated",
]);

function assignField(
  out: ParsedDataCard,
  key: keyof ParsedDataCard,
  raw: unknown,
  warnings: string[]
) {
  if (raw === null || raw === undefined || raw === "") return;
  if (key === "selects") {
    const s = String(raw);
    const parts = s
      .split(/[\n,;|]/)
      .map((x) => x.trim())
      .filter(Boolean);
    if (parts.length) out.selects = parts;
    return;
  }
  if (NUMBER_FIELDS.has(key)) {
    const v = parseNumber(raw);
    if (v === undefined) {
      warnings.push(`Could not parse number for ${key}: "${String(raw)}"`);
      return;
    }
    (out as Record<string, unknown>)[key] = v;
    return;
  }
  if (BOOL_FIELDS.has(key)) {
    const v = parseBool(raw);
    if (v === undefined) {
      warnings.push(`Could not parse boolean for ${key}: "${String(raw)}"`);
      return;
    }
    (out as Record<string, unknown>)[key] = v;
    return;
  }
  if (DATE_FIELDS.has(key)) {
    const v = parseDate(raw);
    if (v === undefined) {
      warnings.push(`Could not parse date for ${key}: "${String(raw)}"`);
      return;
    }
    (out as Record<string, unknown>)[key] = v;
    return;
  }
  (out as Record<string, unknown>)[key] = String(raw).trim();
}

function parseSimpleKV(rows: unknown[][]): ParsedDataCard {
  const out: ParsedDataCard = {};
  const warnings: string[] = [];
  for (const row of rows) {
    if (!Array.isArray(row) || row.length < 2) continue;
    const label = normalizeLabel(row[0]);
    if (!label) continue;
    const key = FIELD_ALIASES[label];
    if (!key) continue;
    assignField(out, key, row[1], warnings);
  }
  return out;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * NextMark / SRDS-style section parser (Infodepots, NextMark, etc.)
 * ────────────────────────────────────────────────────────────────────────── */

function parseNextMark(rows: unknown[][]): { fields: ParsedDataCard; warnings: string[] } {
  const fields: ParsedDataCard = {};
  const warnings: string[] = [];

  // Title is typically on row 1 or 2 (mixed case, no other section yet)
  for (let i = 0; i < Math.min(rows.length, 4); i++) {
    const a = getCell(rows[i], 0);
    if (!a) continue;
    if (a.toUpperCase() === a) continue; // section header — skip
    fields.name = a;
    break;
  }

  // Build a map of sections → row index ranges
  type SectionRange = { name: string; start: number; end: number };
  const sections: SectionRange[] = [];
  for (let i = 0; i < rows.length; i++) {
    const h = isSectionHeader(rows[i]);
    if (h) {
      if (sections.length) sections[sections.length - 1].end = i;
      sections.push({ name: h, start: i + 1, end: rows.length });
    }
  }
  if (sections.length) sections[sections.length - 1].end = rows.length;

  const find = (...names: string[]): SectionRange | undefined => {
    const want = names.map((n) => n.toUpperCase().trim());
    return sections.find((s) => want.includes(s.name.toUpperCase().trim()));
  };

  /* SEGMENTS — supports both NextMark column layouts:
   *   (a) Excel-like:  label | … | … | … | count | rate
   *   (b) Single line:  "425,000 Total Universe /Universe Rate $80.00/M"
   * The count-first form is common in RTF/PDF NextMark exports.
   *
   * Every row (universe, postal/phone/email, product variants) goes into
   * fields.segments, and the well-known ones also populate the named fields.
   */
  const segments = find("SEGMENTS");
  if (segments) {
    const collected: NonNullable<ParsedDataCard["segments"]> = [];
    for (let i = segments.start; i < segments.end; i++) {
      const colA = getCell(rows[i], 0);
      if (!colA) continue;

      // Try column layout first (Excel-style)
      const countRawE = getCellRaw(rows[i], 4);
      const rateRawF = getCellRaw(rows[i], 5);
      let rawLabel = colA;
      let count = parseNumber(countRawE);
      let rate = parseRateOrPercent(rateRawF);

      // If no count in column E, try the single-line "<count> <label> $<rate>/M" pattern
      if (count === undefined) {
        const m = colA.match(
          /^([\d,]+)\s+(.+?)(?:\s+\$([\d.]+)\s*\/\s*[MmFf])?\s*$/
        );
        if (m) {
          count = parseNumber(m[1]);
          rawLabel = m[2].trim();
          if (m[3]) rate = parseRateOrPercent(m[3]);
        }
      }

      if (count === undefined && rate === undefined) continue;

      // Skip the row that's just the column header line "Segment Name … Count Rate"
      const normalized = normalizeLabel(rawLabel);
      if (normalized === "segment name" || normalized.includes("count rate")) continue;

      collected.push({
        label: rawLabel,
        ...(count !== undefined ? { count } : {}),
        ...(rate !== undefined ? { rate } : {}),
      });

      const label = normalized;
      if (label.includes("total universe") || label.includes("universe rate")) {
        if (count !== undefined) fields.universe = count;
      } else if (label.includes("postal records") || label === "postal") {
        if (count !== undefined) fields.postalRecords = count;
        if (rate !== undefined) fields.postalCpm = rate;
      } else if (label.includes("phone numbers") || label === "phones" || label === "phone") {
        if (count !== undefined) fields.phoneNumbers = count;
        if (rate !== undefined) fields.phoneCpm = rate;
      } else if (label.includes("email addresses") || label === "emails" || label === "email") {
        if (count !== undefined) fields.emailAddresses = count;
        if (rate !== undefined) fields.emailCpm = rate;
      }
    }
    if (collected.length) fields.segments = collected;
    if (fields.universe === undefined) {
      fields.universe = fields.postalRecords ?? fields.emailAddresses ?? fields.phoneNumbers;
    }
  }

  /* MEDIA TYPE — first non-empty col-A row is market; second is dataType */
  const media = find("MEDIA TYPE");
  if (media) {
    const vals: string[] = [];
    for (let i = media.start; i < media.end; i++) {
      const v = getCell(rows[i], 0);
      const h = isSectionHeader(rows[i]);
      if (h) break;
      if (v) vals.push(v);
      if (vals.length === 2) break;
    }
    if (vals[0]) fields.market = vals[0];
    if (vals[1]) fields.dataType = vals[1];
  }

  /* SOURCE — next non-empty col-A value */
  const source = find("SOURCE");
  if (source) {
    for (let i = source.start; i < source.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const v = getCell(rows[i], 0);
      if (v && !v.startsWith("(")) {
        fields.source = v;
        break;
      }
    }
  }

  /* GEOGRAPHY */
  const geo = find("GEOGRAPHY");
  if (geo) {
    for (let i = geo.start; i < geo.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const v = getCell(rows[i], 0);
      if (v) {
        fields.geo = v;
        break;
      }
    }
  }

  /* SELECTS — every col-A value until next section */
  const selects = find("SELECTS");
  if (selects) {
    const list: string[] = [];
    for (let i = selects.start; i < selects.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const v = getCell(rows[i], 0);
      if (v) list.push(v);
    }
    if (list.length) fields.selects = list;
  }

  /* GENDER / CAN SELECT — handles every common layout:
     - Narrative: "74% FEMALE 10% MALE"
     - Standalone: "42% MALE" then "58% FEMALE"
     - KV pairs: Male | 0.42 ; Female | 0.58
  */
  const gender = find("GENDER");
  if (gender) {
    for (let i = gender.start; i < gender.end; i++) {
      if (isSectionHeader(rows[i]) && i !== gender.start - 1) {
        const h = isSectionHeader(rows[i]);
        if (h && h !== "CAN SELECT") break;
      }
      const a = getCell(rows[i], 0).trim();
      const b = getCellRaw(rows[i], 1);
      const labelLower = a.toLowerCase();
      // Narrative variants in one line
      const fm = a.match(/(\d+(?:\.\d+)?)\s*%\s*female.*?(\d+(?:\.\d+)?)\s*%\s*male/i);
      if (fm) {
        fields.genderFemale = Number(fm[1]);
        fields.genderMale = Number(fm[2]);
        continue;
      }
      const mf = a.match(/(\d+(?:\.\d+)?)\s*%\s*male.*?(\d+(?:\.\d+)?)\s*%\s*female/i);
      if (mf) {
        fields.genderMale = Number(mf[1]);
        fields.genderFemale = Number(mf[2]);
        continue;
      }
      // Standalone "42% MALE" / "58% FEMALE"
      const standaloneMale = a.match(/(\d+(?:\.\d+)?)\s*%\s*male\b/i);
      if (standaloneMale && !a.match(/female/i)) {
        fields.genderMale = Number(standaloneMale[1]);
        continue;
      }
      const standaloneFemale = a.match(/(\d+(?:\.\d+)?)\s*%\s*female\b/i);
      if (standaloneFemale) {
        fields.genderFemale = Number(standaloneFemale[1]);
        continue;
      }
      // Male / Female single-key rows
      if (labelLower === "male") {
        const n = parseNumber(b);
        if (n !== undefined) fields.genderMale = n <= 1 ? Math.round(n * 1000) / 10 : n;
      } else if (labelLower === "female") {
        const n = parseNumber(b);
        if (n !== undefined) fields.genderFemale = n <= 1 ? Math.round(n * 1000) / 10 : n;
      }
    }
  }

  /* MINIMUM ORDER — supports:
     - "Minimum Quantity | 5000" (Excel col-A label, col-B value)
     - Bare "10,000" line under the section (use first number found)
  */
  const minOrder = find("MINIMUM ORDER");
  if (minOrder) {
    for (let i = minOrder.start; i < minOrder.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const colA = getCell(rows[i], 0);
      const label = normalizeLabel(colA);
      const val = getCellRaw(rows[i], 1);
      if (label === "minimum quantity") {
        const n = parseNumber(val);
        if (n !== undefined) fields.minimumOrder = n;
      } else if (label === "minimum price") {
        const n = parseNumber(val);
        if (n !== undefined) fields.minimumPrice = n;
      } else if (fields.minimumOrder === undefined && /^[\d,]+$/.test(colA)) {
        // Bare number row — first one is the minimum order qty
        const n = parseNumber(colA);
        if (n !== undefined) fields.minimumOrder = n;
      }
    }
  }

  /* ADDRESSING — Email / FTP delivery fees. Supports both:
     - "Email | $25.00/F"  (col-B value)
     - "EMAIL $50.00/F"     (combined in col A)
  */
  const addressing = find("ADDRESSING");
  if (addressing) {
    for (let i = addressing.start; i < addressing.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const colA = getCell(rows[i], 0);
      const colB = getCellRaw(rows[i], 1);
      // Combined "LABEL $value/F" pattern
      const combo = colA.match(/^(EMAIL|FTP)\b\s+(\$?[\d.]+\s*\/?\s*[MFmf]?)/i);
      if (combo) {
        const n = parseRateOrPercent(combo[2]);
        if (n !== undefined) {
          if (combo[1].toUpperCase() === "EMAIL") fields.emailDeliveryFee = n;
          else fields.ftpDeliveryFee = n;
        }
        continue;
      }
      const label = normalizeLabel(colA);
      if (label === "email") {
        const n = parseRateOrPercent(colB);
        if (n !== undefined) fields.emailDeliveryFee = n;
      } else if (label === "ftp") {
        const n = parseRateOrPercent(colB);
        if (n !== undefined) fields.ftpDeliveryFee = n;
      }
    }
  }

  /* DATE — RTF NextMark format with "UPDATED MM/DD/YYYY" + "CONFIRMED MM/DD/YYYY" */
  const dateSection = find("DATE");
  if (dateSection) {
    for (let i = dateSection.start; i < dateSection.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const colA = getCell(rows[i], 0);
      const m = colA.match(/^(UPDATED|CONFIRMED|MARKET ENTRY|NEXT UPDATE|LAST UPDATE)\s+(.+?)$/i);
      if (m) {
        const tag = m[1].toUpperCase();
        const d = parseDate(m[2]);
        if (d) {
          if (tag === "UPDATED" || tag === "LAST UPDATE") fields.lastUpdated = d;
          else if (tag === "MARKET ENTRY") fields.marketEntryDate = d;
          else if (tag === "NEXT UPDATE") fields.nextUpdateDate = d;
        }
      }
    }
  }

  /* MAINTENANCE / DATA CARD MAINTENANCE — dates and frequency */
  for (const sectionName of ["MAINTENANCE", "DATA CARD MAINTENANCE"]) {
    const s = find(sectionName);
    if (!s) continue;
    for (let i = s.start; i < s.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const label = normalizeLabel(getCell(rows[i], 0));
      const val = getCellRaw(rows[i], 1);
      if (label.startsWith("market entry")) {
        const d = parseDate(val);
        if (d) fields.marketEntryDate = d;
      } else if (label.startsWith("last update")) {
        const d = parseDate(val);
        if (d) fields.lastUpdated = d;
      } else if (label.startsWith("next update")) {
        const d = parseDate(val);
        if (d) fields.nextUpdateDate = d;
      } else if (label.startsWith("update frequency") || label === "frequency") {
        const v = String(val ?? "").trim();
        if (v) {
          // Normalize to schema-allowed values
          const lower = v.toLowerCase();
          const map: Record<string, string> = {
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            quarterly: "Quarterly",
            "semi-annually": "Semi-Annually",
            semiannually: "Semi-Annually",
            annually: "Annually",
          };
          fields.frequency = map[lower] || v;
        }
      }
    }
  }

  /* NET NAME ARRANGEMENTS — "Floor" → netNamePercent (e.g. "85%") */
  const netName = find("NET NAME ARRANGEMENTS");
  if (netName) {
    for (let i = netName.start; i < netName.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const label = normalizeLabel(getCell(rows[i], 0));
      const val = getCellRaw(rows[i], 1);
      if (label === "floor") {
        const n = parseRateOrPercent(val);
        if (n !== undefined) fields.netNamePercent = n;
      }
    }
  }

  /* COMMISSIONS — Broker / Agency */
  const commissions = find("COMMISSIONS");
  if (commissions) {
    for (let i = commissions.start; i < commissions.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const label = normalizeLabel(getCell(rows[i], 0));
      const val = getCellRaw(rows[i], 1);
      if (label === "broker") {
        const n = parseRateOrPercent(val);
        if (n !== undefined) fields.brokerCommission = n;
      } else if (label === "agency") {
        const n = parseRateOrPercent(val);
        if (n !== undefined) fields.agencyCommission = n;
      }
    }
  }

  /* EXCHANGES / REUSE — boolean from "Exchange is allowed" / "is not allowed" lines */
  const exchanges = find("EXCHANGES");
  if (exchanges) {
    for (let i = exchanges.start; i < exchanges.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const text = getCell(rows[i], 0).toLowerCase();
      if (text.includes("exchange")) {
        if (text.includes("not allowed")) fields.exchangeAvailable = false;
        else if (text.includes("allowed")) fields.exchangeAvailable = true;
      }
    }
  }
  const reuse = find("REUSE");
  if (reuse) {
    for (let i = reuse.start; i < reuse.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const text = getCell(rows[i], 0).toLowerCase();
      if (text.includes("reuse")) {
        if (text.includes("not allowed")) fields.reuseAvailable = false;
        else if (text.includes("allowed")) fields.reuseAvailable = true;
      }
    }
  }

  /* DESCRIPTION — RTF/text format: lines between DESCRIPTION header and the
     next known section. Also harvest selects from a "Selectable by:" sub-list. */
  const descSection = find("DESCRIPTION");
  if (descSection) {
    const descLines: string[] = [];
    const selectsFromDesc: string[] = [];
    let inSelectableBy = false;
    for (let i = descSection.start; i < descSection.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const v = getCell(rows[i], 0);
      if (!v) {
        inSelectableBy = false;
        continue;
      }
      if (/^Selectable by\s*:?\s*$/i.test(v) || /^Select(?:able)?(?:\s+by)?\s*:$/i.test(v)) {
        inSelectableBy = true;
        descLines.push(v);
        continue;
      }
      if (inSelectableBy) {
        // A valid select is a short Title-Case label (1-4 words, each starting
        // with a capital letter). Anything else ends the list.
        const trimmed = v.replace(/[:;.]+$/, "").trim();
        const words = trimmed.split(/\s+/);
        const isTitleCase = words.every((w) => /^[A-Z][A-Za-z/&-]*$/.test(w));
        if (words.length > 4 || !isTitleCase || words.length < 1) {
          inSelectableBy = false;
        } else {
          selectsFromDesc.push(trimmed);
        }
      }
      descLines.push(v);
    }
    if (descLines.length) {
      const joined = descLines.join(" ").replace(/\s+/g, " ").trim();
      if (joined.length > 20 && !fields.description) fields.description = joined;
    }
    if (selectsFromDesc.length && !fields.selects?.length) {
      fields.selects = selectsFromDesc;
    }
  }

  /* DESCRIPTION — Excel layout fallback: collected from col D across the
     MEDIA TYPE → UNIT OF SALE band */
  const descStart = media?.start ?? 8;
  const descEndSection = sections.find(
    (s) => s.start > descStart && (s.name === "UNIT OF SALE INFORMATION" || s.name === "AVERAGE INCOME")
  );
  const descEnd = descEndSection?.start ?? Math.min(rows.length, descStart + 40);
  const descPieces: string[] = [];
  for (let i = descStart; i < descEnd; i++) {
    const d = getCell(rows[i], 3);
    if (d) descPieces.push(d);
  }
  if (descPieces.length) {
    const joined = descPieces
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (joined.length > 20) fields.description = joined;
  }

  /* EXTRA FIELDS — labeled rows in any section that aren't already mapped to
     a known field. The user can edit them on the Review page and they show
     up on the public data card. */
  const extras: { label: string; value: string }[] = [];
  // Sections whose contents are already fully consumed by the structured fields
  // above; skip them to avoid duplicating known data into extras.
  const consumedSections = new Set([
    "SEGMENTS",
    "DESCRIPTION",
    "MEDIA TYPE",
    "GEOGRAPHY",
    "SOURCE",
    "SELECTS",
    "GENDER",
    "CAN SELECT",
    "MINIMUM ORDER",
    "ADDRESSING",
    "DATE",
    "MAINTENANCE",
    "DATA CARD MAINTENANCE",
    "NET NAME ARRANGEMENTS",
    "EXCHANGES",
    "REUSE",
    "COMMISSIONS",
  ]);
  const seenExtraLabels = new Set<string>();
  for (const section of sections) {
    if (consumedSections.has(section.name)) continue;
    for (let i = section.start; i < section.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const colA = getCell(rows[i], 0).trim();
      const colB = getCell(rows[i], 1).trim();
      if (!colA) continue;

      let label: string | undefined;
      let value: string | undefined;

      // Pattern 1: clean label + value in two columns
      if (colB) {
        label = colA;
        value = colB;
      } else {
        // Pattern 2: "Label  Value" combined in one cell, last token is value
        // (covers "Cancellation Fee  $125.00/F", "UPDATED 01/16/2026", etc.)
        const m = colA.match(/^(.+?)\s{1,}([$\d][^\s].*?)$/);
        if (m && m[1].trim().length > 1) {
          label = m[1].trim();
          value = m[2].trim();
        }
      }

      if (!label || !value) continue;

      // De-dup by lowercase label so the same row doesn't appear twice
      const key = `${section.name}|${label.toLowerCase()}`;
      if (seenExtraLabels.has(key)) continue;
      seenExtraLabels.add(key);

      // Prefix with section so the user knows context
      const fullLabel = `${section.name} · ${label}`;
      extras.push({ label: fullLabel, value });
    }
  }
  if (extras.length) fields.extraFields = extras;

  return { fields, warnings };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Format detection + main entry point
 * ────────────────────────────────────────────────────────────────────────── */

/** Heuristic: NextMark format has SEGMENTS, MEDIA TYPE, or SOURCE section headers in col A. */
function looksLikeNextMark(rows: unknown[][]): boolean {
  let found = 0;
  const wanted = new Set([
    "SEGMENTS",
    "MEDIA TYPE",
    "SOURCE",
    "GEOGRAPHY",
    "SELECTS",
    "MAINTENANCE",
    "DATA CARD MAINTENANCE",
    "ADDRESSING",
    "COMMISSIONS",
  ]);
  for (const row of rows.slice(0, 80)) {
    const h = isSectionHeader(row);
    if (h && wanted.has(h.toUpperCase())) found++;
    if (found >= 3) return true;
  }
  return false;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Text extractors (PDF / DOCX / RTF)
 * ────────────────────────────────────────────────────────────────────────── */

async function extractTextFromPdf(buf: Buffer): Promise<string> {
  // pdf-parse v2 exposes a `PDFParse` class with an async `getText()` method.
  // The constructor accepts `{ data }` where data is a Uint8Array/Buffer.
  const { PDFParse } = (await import("pdf-parse")) as unknown as {
    PDFParse: new (options: { data: Uint8Array | Buffer }) => {
      getText: () => Promise<{ text?: string }>;
      destroy: () => Promise<void>;
    };
  };
  const parser = new PDFParse({ data: new Uint8Array(buf) });
  try {
    const result = await parser.getText();
    return (result && result.text) || "";
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function extractTextFromDocx(buf: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer: buf });
  return result.value || "";
}

/** Strip an RTF group (and any nested groups) starting at index `i`, where
 *  s[i] === "{". Returns the index immediately after the closing "}". */
function stripGroup(s: string, i: number): number {
  let depth = 0;
  for (; i < s.length; i++) {
    const c = s[i];
    if (c === "\\" && i + 1 < s.length) {
      i++;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return s.length;
}

/** Strip RTF control codes to plain text (no library — RTF is well-defined enough). */
function extractTextFromRtf(buf: Buffer): string {
  let s = buf.toString("utf8");

  // 1) Remove destination groups that contain non-textual data (pictures, font
  // tables, styles, embedded objects, etc.) — properly accounting for nested
  // braces. These leak binary noise into the text otherwise.
  const destinations = [
    "pict", "fonttbl", "colortbl", "stylesheet", "info", "generator",
    "userprops", "object", "rsidtbl", "themedata", "latentstyles",
    "datastore", "listtable", "listoverridetable", "revtbl", "ud",
    "footnote", "endnote", "field", "shp", "shppict", "nonshppict",
  ];
  const dre = new RegExp(`^\\{\\\\(?:\\*\\\\)?(?:${destinations.join("|")})\\b`);
  let out = "";
  for (let i = 0; i < s.length; ) {
    if (s[i] === "{") {
      // Look at what kind of group this is
      const tail = s.slice(i, i + 64);
      if (dre.test(tail)) {
        i = stripGroup(s, i);
        continue;
      }
    }
    out += s[i];
    i++;
  }
  s = out;

  // 2) Unicode escapes (\uNNNN?)
  s = s.replace(/\\u(-?\d+)\??/g, (_m, code: string) => {
    const n = parseInt(code, 10);
    if (Number.isNaN(n)) return "";
    return String.fromCharCode(n < 0 ? n + 65536 : n);
  });
  // 3) Hex escapes (\'e9)
  s = s.replace(/\\'([0-9a-fA-F]{2})/g, (_m, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  // 4) Paragraph / line break / tab → real whitespace
  s = s.replace(/\\par\b\s?/g, "\n");
  s = s.replace(/\\line\b\s?/g, "\n");
  s = s.replace(/\\tab\b\s?/g, "\t");
  // 5) Strip any remaining control words
  s = s.replace(/\\[a-zA-Z]+-?\d* ?/g, "");
  s = s.replace(/[{}]/g, "");

  // 6) Final per-line cleanup: drop hex-noise leftovers (long hex/alnum runs)
  s = s
    .split(/\r?\n/)
    .filter((line) => {
      const t = line.trim();
      if (!t) return true; // keep blank lines for paragraph spacing
      // Pure hex runs > 24 chars are almost certainly leaked image data
      if (/^[0-9a-fA-F]{24,}$/.test(t)) return false;
      // Single-letter "marker" lines RTF leaves behind
      if (/^[*\\]+$/.test(t)) return false;
      // Lines that are just RTF escape artifacts like "\*", "\*.\*.\*", etc.
      if (/^[\\*().\d ]+$/.test(t) && t.length < 30) return false;
      // Schema URLs / XML declarations
      if (/^\\\*?https?:/.test(t)) return false;
      if (/^\\\*?\?xml /.test(t)) return false;
      return true;
    })
    .join("\n");

  return s;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Text → pseudo-rows converter
 *
 * Strategy: each line of extracted text becomes either:
 *   - a section header row [TEXT, "", "", "", "", ""], OR
 *   - a label:value row [label, value, "", "", "", ""], OR
 *   - a single-cell row [text] (for prose / description)
 *
 * We detect "Label: Value" and "Label  Value" (multi-space) patterns. Standalone
 * uppercase lines become NextMark section markers, letting parseNextMark take over.
 * ────────────────────────────────────────────────────────────────────────── */

function textToRows(text: string): unknown[][] {
  const rows: unknown[][] = [];
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/[\t ]+/g, " ").trim())
    .filter((l) => l.length > 0);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    // Standalone uppercase line that matches a known NextMark section
    if (line === upper && KNOWN_SECTIONS.has(upper)) {
      rows.push([upper, "", "", "", "", ""]);
      continue;
    }

    // "Label: Value" pattern
    const colon = line.match(/^([^:]{2,60}?):\s+(.+)$/);
    if (colon) {
      rows.push([colon[1].trim(), colon[2].trim(), "", "", "", ""]);
      continue;
    }

    // "Count  Label  Rate" — NextMark RTF/PDF format
    // e.g. "103,000  L 1 Month Auto Insurance  $85.00/M"
    const tripleCountFirst = line.match(
      /^([\d,]+)\s{1,}(.+?)\s{1,}(\$[\d.]+\s*\/\s*[MmFf])\s*$/
    );
    if (tripleCountFirst) {
      // Pack to mirror Excel column layout: [label, "", "", "", count, rate]
      rows.push([
        tripleCountFirst[2].trim(),
        "",
        "",
        "",
        tripleCountFirst[1],
        tripleCountFirst[3],
      ]);
      continue;
    }

    // "Label  Value" — two or more spaces separator (common in PDF extracts)
    const dblSpace = line.match(/^(.{2,60}?)\s{2,}(.+)$/);
    if (dblSpace) {
      // Look for a count + rate pattern: e.g. "Postal Records 5675 $75.00/M"
      const triple = line.match(/^(.{2,60}?)\s{2,}([\d,]+)\s+(\$[\d.]+\/[MF])\s*$/i);
      if (triple) {
        rows.push([triple[1].trim(), "", "", "", triple[2], triple[3]]);
        continue;
      }
      rows.push([dblSpace[1].trim(), dblSpace[2].trim(), "", "", "", ""]);
      continue;
    }

    // Fallback — whole line goes in col A; parseSimpleKV will ignore, parseNextMark
    // can still use it for description collection.
    rows.push([line, "", "", "", "", ""]);
  }

  return rows;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Main entry point — async because PDF/DOCX need async libraries
 * ────────────────────────────────────────────────────────────────────────── */

/** Heuristic: text-extracted format that has NextMark section names. */
function textLooksLikeNextMark(rows: unknown[][]): boolean {
  return looksLikeNextMark(rows);
}

export async function parseDataCardFile(
  buf: Buffer,
  filename: string
): Promise<ParseResult> {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const fields: ParsedDataCard = {};
  const warnings: string[] = [];

  // Spreadsheet path (xlsx/xls/csv) — unchanged
  if (["xlsx", "xls", "csv"].includes(ext)) {
    let workbook: XLSX.WorkBook;
    try {
      workbook = XLSX.read(buf, { type: "buffer", cellDates: false });
    } catch (err) {
      return {
        ok: true,
        fields,
        warnings: [`Could not read spreadsheet (${(err as Error).message || "unknown"}).`],
        errors: [],
      };
    }
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return { ok: true, fields, warnings: ["File contains no sheets."], errors: [] };
    }
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      blankrows: false,
      defval: "",
    });
    if (looksLikeNextMark(rows)) {
      const r = parseNextMark(rows);
      Object.assign(fields, r.fields);
      warnings.push(...r.warnings);
    } else {
      const kv = parseSimpleKV(rows);
      Object.assign(fields, kv);
    }
  }
  // PDF / DOCX / RTF — extract text, convert to pseudo-rows, run same parsers
  else if (["pdf", "docx", "rtf"].includes(ext)) {
    let text = "";
    try {
      if (ext === "pdf") text = await extractTextFromPdf(buf);
      else if (ext === "docx") text = await extractTextFromDocx(buf);
      else text = extractTextFromRtf(buf);
    } catch (err) {
      return {
        ok: true,
        fields,
        warnings: [
          `Could not extract text from ${filename}: ${(err as Error).message || "unknown"}. Admin will fill in fields manually.`,
        ],
        errors: [],
      };
    }

    if (!text.trim()) {
      return {
        ok: true,
        fields,
        warnings: [`No text could be extracted from ${filename} — admin will fill in fields manually.`],
        errors: [],
      };
    }

    // Find the data card name by scanning the first ~30 lines for a clean title.
    // Skip junk: section headers, URL/schema lines, lines that are all symbols/digits,
    // generic "NextMark Data Card Recommendations" headers, etc.
    const candidateLines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .slice(0, 30);

    const isLikelyTitle = (l: string): boolean => {
      if (KNOWN_SECTIONS.has(l.toUpperCase())) return false;
      if (l.length < 5 || l.length > 200) return false;
      if (/^[\\\/*().\d\s]+$/.test(l)) return false; // pure punctuation/digits
      if (/^\\\*?https?:/i.test(l)) return false; // URLs
      if (/wordml|xmlns|schemas\.microsoft/i.test(l)) return false; // XML noise
      if (/^NextMark Data Card Recommendations/i.test(l)) return false;
      if (/^Times New Roman|^Arial|^Calibri|^Cambria/i.test(l)) return false;
      // Title shouldn't be a font list ("X;Y;Z;")
      if ((l.match(/;/g)?.length ?? 0) >= 2) return false;
      // Must have at least one letter
      if (!/[A-Za-z]/.test(l)) return false;
      return true;
    };

    let titleLine: string | undefined;
    for (const line of candidateLines) {
      if (!isLikelyTitle(line)) continue;
      // Strip trailing NextMark page metadata like " 06/10/2026 NM683694 Page"
      let cleaned = line
        .replace(/\s+\d{1,2}\/\d{1,2}\/\d{2,4}\s+NM\d+.*$/i, "")
        .replace(/\s+NM\d+\s*Page\s*\d*$/i, "")
        .replace(/\s+Page\s*\d+$/i, "")
        .trim();
      // Must still have at least 2 words after stripping
      if (cleaned.split(/\s+/).length < 2) continue;
      titleLine = cleaned;
      break;
    }
    if (titleLine) fields.name = titleLine;

    const rows = textToRows(text);
    if (textLooksLikeNextMark(rows)) {
      const r = parseNextMark(rows);
      // Don't let the NextMark title-detection clobber the first-line title above
      // unless it found something real and we didn't already have a name.
      if (!fields.name) fields.name = r.fields.name;
      Object.assign(fields, { ...r.fields, name: fields.name });
      warnings.push(...r.warnings);
    } else {
      const kv = parseSimpleKV(rows);
      Object.assign(fields, { ...kv, name: fields.name || kv.name });
    }
  }
  // .doc (legacy binary Word) — not parseable; just acknowledge upload
  else {
    return {
      ok: true,
      fields,
      warnings: [`.${ext} files cannot be auto-parsed — admin will fill in fields manually.`],
      errors: [],
    };
  }

  // Soft validation — never blocks the upload.
  const softErrors: string[] = [];
  if (!fields.name) softErrors.push("Could not detect a data card name from the file.");
  if (fields.universe === undefined)
    softErrors.push("Could not detect total universe / record count from the file.");

  return {
    ok: true,
    fields,
    warnings: [...warnings, ...softErrors],
    errors: [],
  };
}
