"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe2,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom Formulation & R&D",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const scrollToForm = (prefillSubject?: string) => {
    if (prefillSubject) {
      setFormData((prev) => ({ ...prev, subject: prefillSubject }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqs = [
    {
      q: "What is your typical Minimum Order Quantity (MOQ) for custom formulations?",
      a: "For catalog formulations, pilot MOQs start from 500 to 1,000 units. For fully bespoke custom active blends with proprietary coating, commercial runs typically start from 5,000 to 10,000 units.",
    },
    {
      q: "Are your manufacturing facilities WHO-GMP and ISO certified?",
      a: "Yes. Our Haridwar manufacturing complex and Delhi R&D testing suites are certified under WHO-GMP, ISO 22000:2018, HACCP, and US FDA cGMP standards with ISO Class 7 cleanrooms.",
    },
    {
      q: "Do you support international regulatory filings and export dossiers?",
      a: "Absolutely. Our in-house Regulatory Affairs team prepares full CTD/ACTD dossiers, Certificates of Analysis (CoA), Free Sale Certificates (FSC), stability data (Zone IVb), and customs documentation for US, EU, GCC, and ASEAN markets.",
    },
    {
      q: "How fast can you provide laboratory prototype samples?",
      a: "Bench-scale prototype samples (including organoleptic flavor profiling and dissolution testing) are formulated, packaged, and dispatched via cold-chain courier within 7 to 10 business days.",
    },
    {
      q: "What are your shipping rates, cold-chain handling, and delivery schedules?",
      a: "We maintain temperature-controlled logistics across India and tie-ups with global freight forwarders (Air & Sea Cargo from Delhi IGI Airport and JNPT Port Mumbai) with full real-time tracking.",
    },
  ];

  return (
    <main style={{ background: "#FBF9F5", color: "#1F2937", minHeight: "100vh" }}>
      <Navbar />

      {/* 1. HERO BANNER: MINT GRADIENT WITH PHARMA SHOWCASE CARD */}
      <section
        style={{
          background: "linear-gradient(135deg, #E8F5ED 0%, #F2FBF5 45%, #E1F4EA 100%)",
          padding: "70px 4.5vw 80px",
          borderBottom: "1px solid #D5E7DC",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Heading, Subtext, Stats, and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(254, 240, 138, 0.55)",
                border: "1px solid rgba(234, 179, 8, 0.4)",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "11px",
                fontWeight: 800,
                color: "#1E3A2F",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "14px" }}>🔔</span>
              <span>DIRECT PHARMA SUPPORT • 24/7 RESPONSE DESK</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: "#0D2619",
                marginBottom: "18px",
                letterSpacing: "-0.025em",
              }}
            >
              Contact Us &{" "}
              <span style={{ color: "#0D9488" }}>Partner With Us</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                color: "#475569",
                maxWidth: "520px",
                marginBottom: "32px",
              }}
            >
              Have questions about our custom formulations, WHO-GMP contract manufacturing, or clinical R&D? Send us a message and our commercial science desk will get back to you promptly.
            </p>

            {/* 3 Metric / Stat Cards */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              {[
                { top: "24h SLA", sub: "FAST REPLY" },
                { top: "WhatsApp", sub: "INSTANT CHAT" },
                { top: "B2B / Export", sub: "GLOBAL PARTNER" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(209, 231, 218, 0.8)",
                    borderRadius: "14px",
                    padding: "14px 20px",
                    minWidth: "115px",
                    boxShadow: "0 4px 12px rgba(13, 38, 25, 0.04)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#0D2619",
                      lineHeight: 1.1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.top}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#64748B",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Send Us A Message Button */}
            <button
              onClick={() => scrollToForm()}
              style={{
                background: "#0D9488",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "30px",
                padding: "13px 28px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(13, 148, 136, 0.28)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f766e";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0D9488";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <span>Send Us A Message</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>

          {/* Right Column: Floating Pharma Product Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "1 / 1",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow:
                  "0 25px 50px -12px rgba(13, 38, 25, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                background: "#E6F4EA",
              }}
            >
              <img
                src="/images/pharma_contact_hero.jpg"
                alt="Varadaco Pharmaceutical Formulation & Manufacturing"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Floating Top Right Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0D2619",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>📍 Uttarakhand & Delhi Labs</span>
              </div>

              {/* Floating Bottom Left Hotline Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "7px 14px",
                  borderRadius: "20px",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#15803D",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={13} color="#15803D" />
                <span>+91 9822767273</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BREADCRUMBS BAR */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "18px 4.5vw 0" }}>
        <div
          style={{
            fontSize: "11.5px",
            color: "#64748B",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "#0D2619" }}>Contact Us</span>
        </div>
      </div>

      {/* 3. REACH OUT DIRECTLY & SEND US A MESSAGE GRID */}
      <section
        ref={formRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 4.5vw 70px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN: REACH OUT DIRECTLY */}
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#7CA832",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              REACH OUT DIRECTLY
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#0D2619",
                marginBottom: "24px",
                lineHeight: 1.2,
              }}
            >
              We'd Love to Hear <br />From You!
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Card 1: Corporate Office Address */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#FEE2E2",
                    color: "#DC2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px",
                    }}
                  >
                    CORPORATE OFFICE ADDRESS
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#4B5563", lineHeight: 1.5 }}>
                    Plot 42, Okhla Industrial Area Phase-III, New Delhi, Delhi 110020
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#6B7280", marginTop: "3px" }}>
                    Manufacturing Campus: SIDCUL Industrial Area, Haridwar, Uttarakhand 249403
                  </div>
                </div>
              </div>

              {/* Card 2: Phone / WhatsApp */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#DCFCE7",
                    color: "#15803D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px",
                    }}
                  >
                    PHONE / WHATSAPP
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#15803D" }}>
                    +91 9822767273 / +91 11 4982 3100
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#6B7280", marginTop: "2px" }}>
                    Available on WhatsApp & Direct Client Desk (Mon - Sat)
                  </div>
                </div>
              </div>

              {/* Card 3: Email Inquiry */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    color: "#2563EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px",
                    }}
                  >
                    EMAIL INQUIRY
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                    partnerships@varadaco.com
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#6B7280", marginTop: "2px" }}>
                    Response time: Within 24 business hours
                  </div>
                </div>
              </div>

              {/* Card 4: Order / Inquire Instantly on WhatsApp */}
              <div
                style={{
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "14px",
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#166534",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "6px",
                  }}
                >
                  ORDER INSTANTLY ON WHATSAPP
                </div>
                <p style={{ fontSize: "12px", color: "#15803D", lineHeight: 1.5, margin: "0 0 12px" }}>
                  Have a quick question or want to place a commercial formulation inquiry now? Click below to start chatting with our commercial desk directly on WhatsApp (+91-9822767273).
                </p>
                <a
                  href="https://wa.me/919822767273?text=Hi%20Varadaco%20Team%2C%20I%20am%20interested%20in%20contract%20manufacturing%20and%20formulation%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#22C55E",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(34, 197, 94, 0.3)",
                  }}
                >
                  <MessageCircle size={16} />
                  <span>CHAT ON WHATSAPP (+91-9822767273)</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SEND US A MESSAGE FORM */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E5E7EB",
              padding: "32px 30px",
              boxShadow: "0 10px 30px -8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                SEND US A MESSAGE
              </h3>
              <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
                Please fill out the contact form below and we will contact you directly via phone or email.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  background: "#F0FDF4",
                  borderRadius: "14px",
                  border: "1px solid #BBF7D0",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#15803D",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0D2619", marginBottom: "6px" }}>
                  Message Transmitted Successfully!
                </h4>
                <p style={{ fontSize: "13px", color: "#166534", maxWidth: "340px", margin: "0 auto 18px", lineHeight: 1.5 }}>
                  Thank you, <strong>{formData.name}</strong>. Our formulation specialist will review your inquiry and connect within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "#0D2619",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Full Name */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "13px",
                      background: "#F9FAFB",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Email and Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Inquiry Subject */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                    INQUIRY SUBJECT
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "13px",
                      background: "#F9FAFB",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Custom Formulation & R&D">Custom Formulation & R&D</option>
                    <option value="WHO-GMP Contract Manufacturing">WHO-GMP Contract Manufacturing</option>
                    <option value="Product Sample & Spec Request">Product Sample & Spec Request</option>
                    <option value="Private Label & Custom Packaging">Private Label & Custom Packaging</option>
                    <option value="Global Export & Regulatory Dossier">Global Export & Regulatory Dossier</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write details about your query here (dosage format, estimated batch quantity, timeline, target actives)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "13px",
                      background: "#F9FAFB",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    marginTop: "6px",
                    background: "#2D4C38",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    width: "100%",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1F3827")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2D4C38")}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. SOURCING & CLEANROOM MANUFACTURING NETWORKS */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 4.5vw 70px",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "24px",
            padding: "44px 36px",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#7CA832",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              OUR SOURCING & MANUFACTURING NETWORKS
            </span>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#0D2619",
                marginBottom: "10px",
              }}
            >
              Cleanroom Manufacturing & Global Sourcing
            </h2>
            <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              We source high-purity active botanicals from certified cultivation hubs across India, formulate in WHO-GMP cleanrooms in Uttarakhand & Delhi, and export globally.
            </p>
          </div>

          {/* Map Visual & Details Grid */}
          <div
            style={{
              background: "#FAF9F5",
              border: "1px solid #EDE8E1",
              borderRadius: "18px",
              padding: "28px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {/* Left: Supply Route Schematic Diagram */}
            <div style={{ position: "relative", minHeight: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100%" height="220" viewBox="0 0 380 220" fill="none" style={{ maxWidth: "380px" }}>
                {/* Connecting Route Lines */}
                <line x1="120" y1="60" x2="260" y2="90" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="120" y1="60" x2="190" y2="170" stroke="#A7F3D0" strokeWidth="1.8" />
                <line x1="260" y1="90" x2="190" y2="170" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="190" y1="170" x2="310" y2="160" stroke="#7CA832" strokeWidth="2" />

                {/* Nodes */}
                {/* Node 1: Uttarakhand Cleanroom */}
                <circle cx="120" cy="60" r="14" fill="#0D2619" />
                <circle cx="120" cy="60" r="6" fill="#22C55E" />
                <text x="120" y="38" textAnchor="middle" fill="#0D2619" fontSize="10" fontWeight="800">
                  HARIDWAR FACILITY
                </text>
                <text x="120" y="24" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="700">
                  WHO-GMP Cleanroom (120k sq.ft)
                </text>

                {/* Node 2: Delhi R&D */}
                <circle cx="260" cy="90" r="12" fill="#E2E8F0" stroke="#7CA832" strokeWidth="2" />
                <circle cx="260" cy="90" r="5" fill="#7CA832" />
                <text x="260" y="118" textAnchor="middle" fill="#0D2619" fontSize="10" fontWeight="800">
                  DELHI R&D LAB
                </text>
                <text x="260" y="130" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="700">
                  UHPLC & Stability Assays
                </text>

                {/* Node 3: Raw Botanical Sourcing Hub */}
                <circle cx="190" cy="170" r="10" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <circle cx="190" cy="170" r="4" fill="#15803D" />
                <text x="190" y="196" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="800">
                  ORGANIC SOURCING HUBS
                </text>

                {/* Node 4: Global Air & Sea Cargo */}
                <circle cx="310" cy="160" r="14" fill="#0D9488" />
                <path d="M305 160L315 160M311 156L315 160L311 164" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <text x="310" y="188" textAnchor="middle" fill="#0D9488" fontSize="9" fontWeight="800">
                  GLOBAL DISPATCH
                </text>
              </svg>
            </div>

            {/* Right: Detailed Facility Specifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Box 1 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderLeft: "4px solid #15803D",
                  borderRadius: "10px",
                  padding: "16px 18px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#111827", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>
                  UTTARAKHAND CENTRAL WHO-GMP FACILITY
                </div>
                <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.55 }}>
                  Located in Haridwar, our state-of-the-art facility conducts automated capsule filling, tablet compression, nitrogen-flushed bottling, and blister packaging under ISO Class 7 cleanrooms and strict ISO 22000 protocols.
                </div>
              </div>

              {/* Box 2 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderLeft: "4px solid #7CA832",
                  borderRadius: "10px",
                  padding: "16px 18px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#111827", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>
                  DELHI R&D & PHARMACEUTICAL TESTING LABS
                </div>
                <div style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.55 }}>
                  Okhla Phase-III central research hub housing UHPLC-MS/MS, USP automated dissolution testers, particle size analyzers, and climate-controlled stability chambers for complete Certificate of Analysis (CoA) validation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 4.5vw 70px",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "24px",
            padding: "44px 36px",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#7CA832",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              IMMEDIATE HELP
            </span>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#0D2619",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "880px", margin: "0 auto" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    background: "#FAF9F5",
                    border: isOpen ? "1.5px solid #15803D" : "1px solid #E5E7EB",
                    borderRadius: "12px",
                    padding: "16px 22px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: isOpen ? "#15803D" : "#111827",
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: isOpen ? "#15803D" : "#9CA3AF",
                        lineHeight: 1,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      style={{
                        fontSize: "13px",
                        color: "#4B5563",
                        lineHeight: 1.6,
                        marginTop: "12px",
                        paddingTop: "10px",
                        borderTop: "1px dashed #E5E7EB",
                      }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM FORMULATION SUGGESTION / IDEA BOX */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 4.5vw 80px",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            padding: "36px 30px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>💡</div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            HAVE A NEW FORMULATION SUGGESTION?
          </h3>
          <p
            style={{
              fontSize: "12.5px",
              color: "#6B7280",
              lineHeight: 1.6,
              maxWidth: "540px",
              margin: "0 auto 20px",
            }}
          >
            We are always partnering with innovative brands to engineer novel herbal blends, bioavailable botanicals, and customized delivery formats. If you have an exciting idea or unique active requirement, let's bring it to life!
          </p>
          <button
            onClick={() => scrollToForm("Custom Formulation & R&D")}
            style={{
              background: "#2D4C38",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "20px",
              padding: "10px 24px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1F3827")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2D4C38")}
          >
            SUGGEST A FORMULATION
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
