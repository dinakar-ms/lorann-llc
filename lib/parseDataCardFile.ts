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

  /* SEGMENTS — postal/phone/email counts + CPMs (cols E, F) */
  const segments = find("SEGMENTS");
  if (segments) {
    for (let i = segments.start; i < segments.end; i++) {
      const label = normalizeLabel(getCell(rows[i], 0));
      const countRaw = getCellRaw(rows[i], 4);
      const rateRaw = getCellRaw(rows[i], 5);
      const count = parseNumber(countRaw);
      const rate = parseRateOrPercent(rateRaw);
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
    if (fields.universe === undefined) {
      // Fallback: use postalRecords as universe when total wasn't given separately.
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

  /* GENDER / CAN SELECT — handles both narrative string ("74% FEMALE 10% MALE")
     and Male/Female key/value pairs (col A label, col B fraction or %). */
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
      // Narrative line like "74% FEMALE 10% MALE"
      const m = a.match(/(\d+(?:\.\d+)?)\s*%\s*female.*?(\d+(?:\.\d+)?)\s*%\s*male/i);
      if (m) {
        fields.genderFemale = Number(m[1]);
        fields.genderMale = Number(m[2]);
        continue;
      }
      const m2 = a.match(/(\d+(?:\.\d+)?)\s*%\s*male.*?(\d+(?:\.\d+)?)\s*%\s*female/i);
      if (m2) {
        fields.genderMale = Number(m2[1]);
        fields.genderFemale = Number(m2[2]);
        continue;
      }
      // Male / Female single-key rows (fraction or percent)
      if (labelLower === "male") {
        const n = parseNumber(b);
        if (n !== undefined) fields.genderMale = n <= 1 ? Math.round(n * 1000) / 10 : n;
      } else if (labelLower === "female") {
        const n = parseNumber(b);
        if (n !== undefined) fields.genderFemale = n <= 1 ? Math.round(n * 1000) / 10 : n;
      }
    }
  }

  /* MINIMUM ORDER */
  const minOrder = find("MINIMUM ORDER");
  if (minOrder) {
    for (let i = minOrder.start; i < minOrder.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const label = normalizeLabel(getCell(rows[i], 0));
      const val = getCellRaw(rows[i], 1);
      if (label === "minimum quantity") {
        const n = parseNumber(val);
        if (n !== undefined) fields.minimumOrder = n;
      } else if (label === "minimum price") {
        const n = parseNumber(val);
        if (n !== undefined) fields.minimumPrice = n;
      }
    }
  }

  /* ADDRESSING — Email / FTP delivery fees */
  const addressing = find("ADDRESSING");
  if (addressing) {
    for (let i = addressing.start; i < addressing.end; i++) {
      if (isSectionHeader(rows[i])) break;
      const label = normalizeLabel(getCell(rows[i], 0));
      const val = getCellRaw(rows[i], 1);
      if (label === "email") {
        const n = parseRateOrPercent(val);
        if (n !== undefined) fields.emailDeliveryFee = n;
      } else if (label === "ftp") {
        const n = parseRateOrPercent(val);
        if (n !== undefined) fields.ftpDeliveryFee = n;
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

  /* DESCRIPTION — collected from col D (index 3) across the MEDIA TYPE → UNIT OF SALE band */
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
  // pdf-parse exposes a default in CJS and named exports in ESM. Handle both.
  const mod = (await import("pdf-parse")) as unknown as {
    default?: (data: Buffer) => Promise<{ text: string }>;
  };
  const pdfParse =
    typeof mod.default === "function"
      ? mod.default
      : (mod as unknown as (data: Buffer) => Promise<{ text: string }>);
  const result = await pdfParse(buf);
  return result.text || "";
}

async function extractTextFromDocx(buf: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer: buf });
  return result.value || "";
}

/** Strip RTF control codes to plain text (no library — RTF is well-defined enough). */
function extractTextFromRtf(buf: Buffer): string {
  let s = buf.toString("utf8");
  // Convert escaped Unicode like 舗? → real character
  s = s.replace(/\\u(-?\d+)\??/g, (_m, code: string) => {
    const n = parseInt(code, 10);
    if (Number.isNaN(n)) return "";
    return String.fromCharCode(n < 0 ? n + 65536 : n);
  });
  // Convert hex escapes like \'e9 → character
  s = s.replace(/\\'([0-9a-fA-F]{2})/g, (_m, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  // Convert paragraph / line break control words to newlines
  s = s.replace(/\\par\b\s?/g, "\n");
  s = s.replace(/\\line\b\s?/g, "\n");
  s = s.replace(/\\tab\b\s?/g, "\t");
  // Remove RTF groups containing fonts/colors/etc — anything starting with \fonttbl, \colortbl, \stylesheet, \info, \*\...
  s = s.replace(/\{\\\*\\[a-zA-Z]+[^{}]*\}/g, "");
  s = s.replace(/\{\\(?:fonttbl|colortbl|stylesheet|info|generator|userprops|pict)[^{}]*\}/g, "");
  // Remove remaining control words (\word optional negative arg)
  s = s.replace(/\\[a-zA-Z]+-?\d* ?/g, "");
  // Remove remaining braces
  s = s.replace(/[{}]/g, "");
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

    // First line that isn't a section header is likely the title.
    const firstNonHeader = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .find((l) => l && !KNOWN_SECTIONS.has(l.toUpperCase()));
    if (firstNonHeader) fields.name = firstNonHeader;

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
