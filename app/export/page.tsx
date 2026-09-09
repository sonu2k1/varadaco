"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Package,
  ShieldCheck,
  Sparkles,
  FileCheck,
  Layers,
  Award,
  Building2,
  Send,
  PhoneCall
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const exportPackages = [
  {
    id: "basic",
    name: "BASIC PACKAGE",
    subtitle: "Essential Support",
    desc: "A practical starting point for businesses preparing their first product.",
    badge: "Startup Ready",
    color: "#3B592D",
    includes: [
      "Product consultation",
      "Requirement assessment",
      "Documentation checklist",
      "Packaging guidance",
      "Basic support",
    ],
    ctaText: "Get Started",
    ctaLink: "/contact?package=basic",
    featured: false,
  },
  {
    id: "standard",
    name: "STANDARD PACKAGE",
    subtitle: "Comprehensive Support",
    desc: "Designed for businesses preparing products for commercial launch.",
    badge: "Most Popular",
    color: "#15803D",
    includes: [
      "Product documentation support",
      "Packaging guidance",
      "Label support",
      "Export documentation guidance",
      "Regulatory coordination",
      "Customer support",
    ],
    ctaText: "Choose Standard",
    ctaLink: "/contact?package=standard",
    featured: true,
  },
  {
    id: "premium",
    name: "PREMIUM PACKAGE",
    subtitle: "End-to-End Support",
    desc: "A complete support package for businesses requiring broader product and export assistance.",
    badge: "End-to-End",
    color: "#0D2619",
    includes: [
      "Product development coordination",
      "Documentation support",
      "Packaging & labelling support",
      "Export assistance",
      "Regulatory coordination",
      "Priority support",
    ],
    ctaText: "Choose Premium",
    ctaLink: "/contact?package=premium",
    featured: false,
  },
  {
    id: "enterprise",
    name: "ENTERPRISE PACKAGE",
    subtitle: "Custom Business Solution",
    desc: "Designed for established businesses with multiple products or customized requirements.",
    badge: "Tailored Scaling",
    color: "#0f766e",
    includes: [
      "Multiple product support",
      "Customized documentation",
      "Export assistance",
      "Portfolio support",
      "Dedicated account management",
      "Customized business requirements",
    ],
    ctaText: "Request Custom Quote",
    ctaLink: "/contact?package=enterprise",
    featured: false,
  },
];

export default function ExportPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=85"
            alt="Export and global market logistics"
            style={{ objectPosition: "center 35%" }}
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Export & Global Market Support</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div
              className="hero-tag-pill"
              style={{
                backgroundColor: "rgba(124, 168, 50, 0.15)",
                borderColor: "rgba(124, 168, 50, 0.35)",
                color: "#7CA832",
                margin: "0 auto 14px",
              }}
            >
              <Globe2 size={14} />
              <span>Global Reach & Regulatory Excellence</span>
            </div>

            <h1 style={{ maxWidth: "900px", textAlign: "center", margin: "0 auto" }}>
              Export & Global Market Support
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 600,
                color: "#7CA832",
                marginTop: "12px",
                maxWidth: "750px",
              }}
            >
              Helping Health & Wellness Brands Prepare for Global Opportunities
            </p>

            <p
              className="hero-text"
              style={{
                maxWidth: "720px",
                fontSize: "16px",
                color: "#d1e8b0",
                margin: "16px auto 0",
                textAlign: "center",
                lineHeight: "1.7",
              }}
            >
              Expanding into international markets requires organized product information, appropriate documentation, professional packaging and reliable business support. Our team helps businesses coordinate the requirements involved in preparing products for export-oriented opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Export Service Packages Grid */}
      <section className="page-wrapper" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>06. Structured Solutions</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
            EXPORT SERVICE <em>PACKAGES</em>
          </h2>
          <div className="trust-underline" />
          <p style={{ color: "#475569", fontSize: "16px", marginTop: "16px", lineHeight: "1.6" }}>
            Tailored support tiers engineered to help your brand smoothly navigate compliance, documentation, packaging, and international distribution.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {exportPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              className="card-panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              variants={fade}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: pkg.featured ? "2px solid #15803D" : "1.5px solid #E2E8DF",
                background: pkg.featured ? "#F7FBF8" : "#FFFFFF",
                boxShadow: pkg.featured
                  ? "0 18px 40px rgba(21, 128, 61, 0.12)"
                  : "0 10px 25px rgba(0, 0, 0, 0.03)",
                borderRadius: "20px",
                padding: "32px 26px",
              }}
            >
              {pkg.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "24px",
                    background: "#15803D",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "4px 12px",
                    borderRadius: "100px",
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              <div style={{ marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#7CA832",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {pkg.name}
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink)", marginTop: "4px" }}>
                  {pkg.subtitle}
                </h3>
                <p style={{ fontSize: "14px", color: "#475569", marginTop: "8px", lineHeight: "1.5" }}>
                  {pkg.desc}
                </p>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #E2E8DF", margin: "16px 0" }} />

              <div style={{ flex: 1, marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#1E251F", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>
                  Package Includes:
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pkg.includes.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: "#334155" }}>
                      <CheckCircle2 size={16} color="#15803D" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={pkg.ctaLink}
                  className="button button-dark"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    background: pkg.featured ? "#15803D" : "var(--ink)",
                    borderColor: pkg.featured ? "#15803D" : "var(--ink)",
                  }}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Support Features */}
      <section style={{ background: "#F0F4EF", padding: "80px 4.5vw", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            <div>
              <p className="eyebrow">Export Capabilities</p>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "18px" }}>
                Complete global coordination for <em>growing health brands.</em>
              </h2>
              <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.75", marginBottom: "20px" }}>
                Whether you are launching your first batch or coordinating continuous multi-container international shipments, our team coordinates the requirements from regulatory dossiers to export logistics.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D" }}>
                  Discuss Your Requirements
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+919822767273" className="button button-light" style={{ background: "#FFFFFF" }}>
                  <PhoneCall size={15} />
                  <span>Call +91 9822767273</span>
                </a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8DF" }}>
                <FileCheck size={26} color="#15803D" style={{ marginBottom: "10px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Documentation</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Certificate of analysis, free sale certificates, and regulatory dossiers.</p>
              </div>
              <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8DF" }}>
                <Package size={26} color="#15803D" style={{ marginBottom: "10px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Packaging & Labels</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Custom export-compliant artwork, barcoding, and multilingual labeling.</p>
              </div>
              <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8DF" }}>
                <ShieldCheck size={26} color="#15803D" style={{ marginBottom: "10px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Quality Support</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Rigorous batch testing and quality verification support at every stage.</p>
              </div>
              <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8DF" }}>
                <Globe2 size={26} color="#15803D" style={{ marginBottom: "10px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Global Markets</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Assisting businesses expanding into domestic and international markets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
