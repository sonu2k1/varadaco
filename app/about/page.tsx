"use client";
import { motion } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, ChevronRight, Compass, Eye, Globe2, HeartHandshake, Lightbulb, MapPin, Medal, Microscope, PackageCheck, ShieldCheck, Sparkles, Target, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientsSection, CertificationsSection } from "@/components/TrustSections";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const awards = [
  {
    year: "2025",
    title: "Excellence in Contract Manufacturing",
    issuer: "Global Nutraceutical & Life Sciences Forum",
    desc: "Awarded for exceptional batch uniformity, automated cleanroom scaling, and zero-defect quality control across 500+ formulations.",
    badge: "Winner 2025",
    color: "#3B592D",
  },
  {
    year: "2024",
    title: "Best Bioavailability Innovation Award",
    issuer: "CPhI World Formulation Summit",
    desc: "Recognized for breakthrough research in self-emulsifying liposomal delivery and targeted enteric acid-resistant capsule technology.",
    badge: "Gold Trophy",
    color: "#15803D",
  },
  {
    year: "2024",
    title: "Top Global Health Science Exporter",
    issuer: "International Trade & Commerce Council",
    desc: "Honoring consistent export quality, regulatory dossier approval speed, and supply chain reliability across 30+ international markets.",
    badge: "Global Honor",
    color: "#7CA832",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Subpage Hero with Full Background Image */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="/images/pharma-cleanroom-bg.jpg"
            alt="WHO-GMP pharmaceutical cleanroom and automated medicine manufacturing laboratory"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>About Us</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div className="hero-tag-pill" style={{ backgroundColor: "rgba(124, 168, 50, 0.15)", borderColor: "rgba(124, 168, 50, 0.35)", color: "#7CA832", margin: "0 auto 14px" }}>
              <Users size={14} />
              <span>About Varadaco Industries</span>
            </div>

            <h1 style={{ maxWidth: "880px", textAlign: "center", margin: "0 auto" }}>
              Pioneering science-led<br />
              <em style={{ color: "#7CA832" }}>health & nutraceuticals.</em>
            </h1>

            <p className="hero-text" style={{ maxWidth: "660px", fontSize: "16px", color: "#d1e8b0", margin: "16px auto 0", textAlign: "center" }}>
              Two decades of excellence in evidence-based formulations, molecular bioavailability, and global WHO-GMP manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. WHO ARE WE? */}
      <section className="page-wrapper" id="who-we-are" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "50px", alignItems: "center" }}>
          <div>
            <p className="eyebrow">1. Introduction</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)", marginBottom: "20px" }}>
              WHO ARE <em>WE?</em>
            </h2>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.75", marginBottom: "18px" }}>
              Varadaco Industries is a full-service pharmaceutical-grade contract manufacturer and formulation innovator. Founded in 2004, we have dedicated over two decades to decoding the relationship between bioavailable phytonutrients, micro-encapsulated actives, and human cellular vitality.
            </p>
            <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.75", marginBottom: "26px" }}>
              From initial molecular formulation, organoleptic sensory optimization, and clinical assay testing to high-speed WHO-GMP cleanroom packaging, we empower the world’s leading healthcare brands to bring safe, compliant, and efficacious products to market.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "30px" }}>
              <div style={{ background: "#FCFBF9", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8DF" }}>
                <strong style={{ display: "block", fontSize: "28px", color: "var(--ink)", fontWeight: 900 }}>20+</strong>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Years of Innovation</span>
              </div>
              <div style={{ background: "#FCFBF9", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8DF" }}>
                <strong style={{ display: "block", fontSize: "28px", color: "#15803D", fontWeight: 900 }}>500+</strong>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Proven Formulations</span>
              </div>
              <div style={{ background: "#FCFBF9", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8DF" }}>
                <strong style={{ display: "block", fontSize: "28px", color: "#7CA832", fontWeight: 900 }}>30+</strong>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Countries Exported</span>
              </div>
              <div style={{ background: "#FCFBF9", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8DF" }}>
                <strong style={{ display: "block", fontSize: "28px", color: "var(--ink)", fontWeight: 900 }}>100+</strong>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Global Brand Clients</span>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 40px rgba(6, 36, 25, 0.12)" }}>
            <img
              src="/images/arranging_capsules.jpg"
              alt="Automated rotary die encapsulation and pharmaceutical capsule manufacturing"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", background: "rgba(6, 36, 25, 0.92)", color: "white", padding: "20px 24px", borderRadius: "16px", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <ShieldCheck size={20} color="#34d399" />
                <strong style={{ fontSize: "16px" }}>WHO-GMP & ISO 22000 Certified Plant</strong>
              </div>
              <p style={{ fontSize: "12px", color: "#d1e2f2", margin: 0, lineHeight: "1.5" }}>
                Operating automated continuous rotary die softgel encapsulation, acid-resistant capsule lines, and computerized batch traceability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR VALUABLE CLIENTS */}
      <ClientsSection />

      {/* 3. CERTIFICATIONS */}
      <CertificationsSection />

      {/* 4. AWARDS */}
      <section className="page-wrapper" id="awards" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>4. Recognition & Honors</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
            HONORS & <em>AWARDS</em>
          </h2>
          <div className="trust-underline" />
          <p style={{ color: "#546863", fontSize: "15px", marginTop: "16px", lineHeight: "1.6" }}>
            Our relentless commitment to clinical quality, advanced bioavailability delivery, and regulatory compliance has been recognized across global industry forums.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {awards.map((award, idx) => (
            <motion.div
              key={award.title}
              className="card-panel"
              style={{ display: "flex", flexDirection: "column", position: "relative" }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              variants={fade}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: `${award.color}15`, color: award.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trophy size={22} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 800, background: `${award.color}12`, color: award.color, padding: "4px 10px", borderRadius: "100px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {award.badge}
                </span>
              </div>

              <div style={{ fontSize: "13px", fontWeight: 800, color: award.color, marginBottom: "4px" }}>
                {award.year} • {award.issuer}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px", lineHeight: "1.3" }}>
                {award.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#546863", lineHeight: "1.6", marginTop: "auto" }}>
                {award.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. VISION */}
      <section style={{ background: "#F0F4EF", padding: "85px 4.5vw", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} id="vision">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>5. Long-Term Benchmark</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
              OUR <em>VISION</em>
            </h2>
            <div className="trust-underline" />
          </div>

          <div className="card-panel" style={{ background: "linear-gradient(135deg, #0D2619 0%, #143B28 100%)", color: "white", padding: "48px 42px", boxShadow: "0 16px 40px rgba(13, 38, 25, 0.15)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
              <div>
                <div className="icon-box" style={{ background: "rgba(255,255,255,0.12)", color: "#7CA832", width: "60px", height: "60px", marginBottom: "18px" }}>
                  <Eye size={30} />
                </div>
                <h3 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px", color: "#ffffff" }}>
                  Pioneering Tomorrow’s Bioactive Nutrition
                </h3>
                <p style={{ color: "#d1e8b0", lineHeight: "1.75", fontSize: "16px" }}>
                  To be recognized globally as the gold-standard life science co-creator, establishing new frontiers in cellular absorption, standardized natural bioactives, and clinical nutrition that enhances longevity worldwide.
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.06)", padding: "30px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7CA832", marginBottom: "16px" }}>
                  Key Strategic Benchmarks:
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#e2e8f0" }}>
                  <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={18} color="#7CA832" style={{ flexShrink: 0, marginTop: "2px" }} />
                    Pioneer next-generation liposomal, sub-micron, and enteric delivery systems.
                  </span>
                  <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={18} color="#7CA832" style={{ flexShrink: 0, marginTop: "2px" }} />
                    Empower 200+ global brands with clinically validated turnkey science.
                  </span>
                  <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={18} color="#7CA832" style={{ flexShrink: 0, marginTop: "2px" }} />
                    Promote zero-carbon green manufacturing across all production suites.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="contact" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="contact-mark" style={{ left: "50%", transform: "translateX(-50%)", right: "auto" }}>N</div>
        <p className="eyebrow light" style={{ justifyContent: "center" }}>Collaborate with us</p>
        <h2 style={{ textAlign: "center", maxWidth: "800px", margin: "12px auto 16px" }}>
          Ready to build something <em>extraordinary?</em>
        </h2>
        <p style={{ textAlign: "center", margin: "0 auto", maxWidth: "600px" }}>
          Let’s discuss your formula concept, scaling requirements, or regulatory roadmap.
        </p>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", marginTop: "28px" }}>
          <Link href="/contact" className="button button-light">
            Contact Our Science Team
            <ArrowRight size={17} />
          </Link>
          <Link href="/products" className="button button-dark" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
            Browse Product Solutions
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
