/**
 * Healthcare sub-page hero photos
 * Every page (hub, 8 categories, 38 leaf pages) gets a unique stock photo
 * relevant to that specific role or specialty.
 *
 * getHealthcareIllustration() walks slug parts from right-to-left so leaf pages
 * automatically pick up their own photo first, then fall back to their parent.
 */
import Image from "next/image";
import type { ReactNode } from "react";

interface HeroPhotoProps {
  src: string;
  alt: string;
}

function HeroPhoto({ src, alt }: HeroPhotoProps) {
  // Use Unsplash's face-detection crop so medical professional portraits
  // are always centred on the subject's face, not their torso.
  // `crop=faces,top` → smart-crop around detected faces; falls back to
  // anchoring at the top of the image if no face is found.
  // `object-top` mirrors that bias in the CSS layer as a safety net.
  const url = `${src}?auto=format&fit=crop&crop=faces,top&w=800&q=85`;

  return (
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 0px, 44vw"
        quality={65}
        priority
      />
      {/* subtle brand overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-500/8 pointer-events-none" />
    </div>
  );
}

/* ─── Photo map: every slug gets a unique photo ──────────────────────────── */

const PHOTOS: Record<string, { src: string; alt: string }> = {

  /* ── Healthcare hub ───────────────────────────────────────────────────── */
  "healthcare": {
    src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634",
    alt: "Doctor performing manual physical examination on patient with stethoscope in clinic",
  },

  /* ── Physicians & Advanced Practice ─────────────────────────────────── */
  "physicians-advanced-practice": {
    src: "https://images.unsplash.com/photo-1758691463384-771db2f192b3",
    alt: "Physician reviewing patient records at desk with stethoscope",
  },
  "physicians-doctors": {
    src: "https://images.unsplash.com/photo-1758691462954-e6fa5005474b",
    alt: "Doctor in detailed consultation with patient at clinical desk",
  },
  "nurse-practitioners": {
    src: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b",
    alt: "Nurse practitioner with stethoscope ready for independent patient care",
  },
  "podiatrists": {
    src: "https://images.unsplash.com/photo-1545463913-5083aa7359a6",
    alt: "Podiatrist performing therapeutic lower-limb examination",
  },
  "physician-assistants": {
    src: "https://plus.unsplash.com/premium_photo-1726869637677-900f2944c285",
    alt: "Physician assistant reviewing clinical medication and patient protocols",
  },
  "medical-assistants": {
    src: "https://plus.unsplash.com/premium_photo-1682141142889-218debf4f8dc",
    alt: "Medical assistant managing patient records and clinical workflow",
  },

  /* ── Nursing Professionals ───────────────────────────────────────────── */
  "nursing-professionals": {
    src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    alt: "Nursing professional in clinical setting",
  },
  "registered-nurses": {
    src: "https://images.unsplash.com/photo-1516841273335-e39b37888115",
    alt: "Registered nurses walking with care team through hospital hallway",
  },
  "licensed-practical-nurses": {
    src: "https://images.unsplash.com/photo-1586534738560-438efdf1d205",
    alt: "Licensed practical nurse in a direct patient care environment",
  },
  "certified-nursing-assistants": {
    src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133",
    alt: "Certified nursing assistant managing patient care documentation",
  },
  "certified-nurse-midwives": {
    src: "https://images.unsplash.com/photo-1457342813143-a1ae27448a82",
    alt: "Nurse midwife providing maternity and prenatal care support",
  },

  /* ── Hospital Decision Makers ────────────────────────────────────────── */
  "hospital-decision-makers": {
    src: "https://plus.unsplash.com/premium_photo-1681843129112-f7d11a2f17e3",
    alt: "Hospital leadership team in professional medical conference corridor",
  },
  "hospital-administrators": {
    src: "https://images.unsplash.com/photo-1758691462814-485c3672e447",
    alt: "Hospital administrator reviewing operational and compliance documentation",
  },
  "ceo-cfo-healthcare": {
    src: "https://plus.unsplash.com/premium_photo-1673953510197-0950d951c6d9",
    alt: "Healthcare CEO and CFO reviewing financial and strategic plans",
  },
  "chief-medical-officers": {
    src: "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe",
    alt: "Chief medical officers and senior physicians gathered in hospital corridor conference",
  },
  "chief-nursing-officers": {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    alt: "Chief nursing officer reviewing patient care data on laptop with stethoscope",
  },
  "chief-of-staff": {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    alt: "Hospital chief of staff with surgical team under operating room lights",
  },
  "medical-directors": {
    src: "https://images.unsplash.com/photo-1631563018856-81be9c118283",
    alt: "Medical director reviewing diagnostic imaging with clinical team",
  },

  /* ── Health & Therapy ────────────────────────────────────────────────── */
  "health-therapy": {
    src: "https://plus.unsplash.com/premium_photo-1702598516903-aad5a4ae868a",
    alt: "Health therapist applying kinesio tape to patient's knee",
  },
  "physical-therapists": {
    src: "https://plus.unsplash.com/premium_photo-1661962597572-e0a140d8bc20",
    alt: "Physical therapist guiding patient through strength rehabilitation exercise",
  },
  "occupational-therapists": {
    src: "https://plus.unsplash.com/premium_photo-1661767448598-f42428886f1c",
    alt: "Occupational therapist assisting patient with functional rehabilitation",
  },
  "speech-language-therapists": {
    src: "https://plus.unsplash.com/premium_photo-1661724521974-d85c95c6d279",
    alt: "Speech language therapist working with young patient on communication skills",
  },
  "respiratory-therapists": {
    src: "https://plus.unsplash.com/premium_photo-1679860816754-209f62038228",
    alt: "Respiratory therapist monitoring patient breathing and ventilation therapy",
  },
  "massage-therapists": {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
    alt: "Licensed massage therapist performing therapeutic deep tissue session",
  },
  "emts-paramedics": {
    src: "https://plus.unsplash.com/premium_photo-1664304341769-5cbee1b0a7e4",
    alt: "EMT paramedics providing emergency medical care to patient on scene",
  },
  "radiologic-technicians": {
    src: "https://plus.unsplash.com/premium_photo-1726869756488-914a1a7d5250",
    alt: "Radiologic technician reviewing diagnostic MRI and imaging results",
  },
  "dieticians-nutritionists": {
    src: "https://plus.unsplash.com/premium_photo-1661393458386-4101ce49c82f",
    alt: "Registered dietitian consulting with patient on personalized nutrition plan",
  },

  /* ── Behavioral & Mental Health ──────────────────────────────────────── */
  "behavioral-mental-health": {
    src: "https://images.unsplash.com/photo-1758273241086-f3585ef8c2f8",
    alt: "Therapist listening attentively to patient during counseling session",
  },
  "psychologists": {
    src: "https://plus.unsplash.com/premium_photo-1683141256844-9b6a7b00eddd",
    alt: "Psychologist providing evidence-based therapeutic support to patient",
  },
  "psychiatrists": {
    src: "https://images.unsplash.com/photo-1714976694867-bc0e012fab70",
    alt: "Psychiatrist in confidential evaluation and treatment consultation",
  },
  "mental-health-counselors": {
    src: "https://images.unsplash.com/photo-1714976694127-0baa5e116b11",
    alt: "Mental health counselor in empathetic active listening session",
  },
  "social-workers": {
    src: "https://images.unsplash.com/photo-1714976694810-85add1a29c96",
    alt: "Social worker meeting with individual to assess care and support needs",
  },
  "marriage-family-therapists": {
    src: "https://plus.unsplash.com/premium_photo-1664378616928-dc6842677183",
    alt: "Marriage and family therapist facilitating couple counseling session",
  },

  /* ── Dental & Vision ─────────────────────────────────────────────────── */
  "dental-vision": {
    src: "https://plus.unsplash.com/premium_photo-1682097277593-896395d8d787",
    alt: "Dentist preparing to deliver high-quality care in modern dental office",
  },
  "dentists": {
    src: "https://images.unsplash.com/photo-1631596577204-53ad0d6e6978",
    alt: "Dentist performing comprehensive oral health examination for patient",
  },
  "dental-hygienists": {
    src: "https://plus.unsplash.com/premium_photo-1674998806375-58edc35ddf3b",
    alt: "Dental hygienist conducting thorough professional teeth cleaning",
  },
  "dental-assistants": {
    src: "https://images.unsplash.com/photo-1667133295315-820bb6481730",
    alt: "Dental assistant supporting dentist with intraoral scanning technology",
  },
  "optometrists": {
    src: "https://plus.unsplash.com/premium_photo-1677333508737-6b6d642bc6d6",
    alt: "Optometrist performing comprehensive eye health and vision examination",
  },
  "opticians": {
    src: "https://plus.unsplash.com/premium_photo-1683120937778-a5174f165815",
    alt: "Optician helping customer choose eyeglasses frames at optical store showcase",
  },

  /* ── Pharmacy & Practice Management ──────────────────────────────────── */
  "pharmacy-practice-management": {
    src: "https://plus.unsplash.com/premium_photo-1682129998200-53906b91f4a7",
    alt: "Pharmacist consulting with customer on prescription medication",
  },
  "pharmacists": {
    src: "https://plus.unsplash.com/premium_photo-1682129954313-1422ce742c24",
    alt: "Pharmacist reviewing and dispensing pharmaceutical prescriptions",
  },
  "physician-practice-managers": {
    src: "https://images.unsplash.com/photo-1666886573531-48d2e3c2b684",
    alt: "Physician practice manager reviewing clinical workflow data on tablet with patient",
  },

  /* ── Specialty & Other ───────────────────────────────────────────────── */
  "specialty-other": {
    src: "https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7",
    alt: "Specialty healthcare team of doctors standing and discussing clinical cases",
  },
  "chiropractors": {
    src: "https://plus.unsplash.com/premium_photo-1661779394380-e372d6a1f198",
    alt: "Chiropractor performing spinal and musculoskeletal adjustment therapy",
  },
  "veterinarians": {
    src: "https://plus.unsplash.com/premium_photo-1661916447474-235409b19e16",
    alt: "Veterinarian providing compassionate care and treatment to animal patient",
  },
  "allied-healthcare-professionals": {
    src: "https://plus.unsplash.com/premium_photo-1661546109966-c6293278ac03",
    alt: "Diverse multiracial allied healthcare professionals collaborating as a clinical team",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

/**
 * Returns a <HeroPhoto> for the deepest matching healthcare slug segment, or
 * null if "healthcare" doesn't appear in the slugParts at all.
 *
 * Walking right-to-left means a deep leaf page like:
 *   data-assets/b2b-database/healthcare/physicians-advanced-practice/physicians-doctors
 * picks up its own photo ("physicians-doctors") before the parent fallback.
 */
export function getHealthcareIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("healthcare")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const photo = PHOTOS[slugParts[i]];
    if (photo) {
      return <HeroPhoto src={photo.src} alt={photo.alt} />;
    }
  }
  return null;
}
