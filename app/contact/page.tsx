"use client";

import { useState, FormEvent } from "react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Open mail client with pre-filled content
    const body = `Hi Lorann Team,

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone || "—"}

Interested in: ${data.interest}

Message:
${data.message}

Thanks!`;

    window.location.href = `mailto:info@lorannllc.com?subject=${encodeURIComponent(
      `New Inquiry — ${data.interest}`
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="Get In Touch"
        title={<>Let&apos;s build an audience <span className="text-gradient">that performs.</span></>}
        description="Tell us your goals — we'll develop a data strategy aligned to your targeting, activation, and performance needs. Expect a reply within one business day."
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
            {/* Contact info */}
            <div className="reveal">
              <h2 className="font-display font-bold text-3xl lg:text-4xl leading-tight tracking-tight text-slate-900 mb-5">
                Reach us directly
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Prefer email or phone? You can also reach the team directly using the contact information below.
              </p>
              <div className="space-y-5">
                <a href="mailto:info@lorannllc.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">Email</div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">info@lorannllc.com</div>
                  </div>
                </a>
                <a href="tel:+19145655300" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">Phone</div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">+1 914-565-5300</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">Address</div>
                    <div className="font-semibold text-slate-900">
                      75 Lake Rd, Suite 326<br />
                      Congers, NY 10920-2343
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl border border-slate-150"
                style={{ background: "linear-gradient(135deg, #E4EDFF 0%, #F0F5FF 100%)" }}
              >
                <h3 className="font-display font-semibold text-slate-900 mb-2">Typical response time</h3>
                <p className="text-slate-600 text-sm">Within one business day. For urgent requests, call during business hours ET.</p>
              </div>
            </div>

            {/* Form */}
            <div className="reveal">
              {submitted ? (
                <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 grid place-items-center">
                    <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Message ready to send</h3>
                  <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                    Your email client has been opened with the message pre-filled. If nothing happened, email us directly at{" "}
                    <a href="mailto:info@lorannllc.com" className="text-blue-600 font-semibold hover:underline">
                      info@lorannllc.com
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-slate-150 rounded-2xl p-8 lg:p-10 shadow-lg space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                      I&apos;m interested in *
                    </label>
                    <select
                      name="interest"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                    >
                      <option value="" disabled>Choose one</option>
                      <option>Audience Targeting</option>
                      <option>Data Enrichment</option>
                      <option>Signal eXchange™</option>
                      <option>Lead Generation</option>
                      <option>Data Activation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                      Tell us about your goals *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 resize-none"
                      placeholder="Share your audience goals, channels, timelines…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group/btn inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[12px] text-slate-500">
                    Your email client will open with a pre-filled message. We respect your privacy — submissions are not stored on our servers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
