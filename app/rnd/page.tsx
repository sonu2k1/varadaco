"use client";
import { motion } from "framer-motion";
import { Atom, Beaker, Check, CheckCircle2, ChevronRight, Dna, FlaskConical, Gauge, Microscope, ShieldCheck, Sparkles, TestTubes } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const phases = [
  {
    step: "01",
    title: "Molecular Discovery & Target Identification",
    desc: "Computational modeling to identify synergistic bioactive interactions and optimize ligand affinity before entering bench trials.",
    icon: Atom,
  },
  {
    step: "02",
    title: "Bioavailability Matrix Optimization",
    desc: "Micro-encapsulation, liposomal lipid bilayer creation, or cyclodextrin complexation to protect actives from premature metabolic degradation.",
    icon: FlaskConical,
  },
  {
    step: "03",
    title: "In-Vitro Dissolution & Clinical Assays",
    desc: "Simulated gastric and intestinal fluid testing (USP Dissolution Apparatus) to verify release kinetics, absorption rates, and cellular uptake.",
    icon: Microscope,
  },
  {
    step: "04",
    title: "Accelerated Stability & Scaling",
    desc: "ICH-compliant stability chambers (Zone IVb conditions) to prove a 24-36 month shelf life under varying temperature and humidity profiles.",
    icon: TestTubes,
  },
];

const labEquipment = [
  {
    title: "HPLC & UHPLC-MS/MS",
    desc: "Ultra-high performance liquid chromatography with tandem mass spectrometry for accurate bioactive quantification and contaminant screening.",
    icon: Gauge,
    tag: "Assay Accuracy",
    badge: "0.01 PPM Sensitivity",
    theme: "teal",
  },
  {
    title: "USP Automated Dissolution Testers",
    desc: "Multi-vessel real-time spectrophotometric dissolution testing to ensure targeted enteric release within narrow GI transit windows.",
    icon: Beaker,
    tag: "Dissolution Kinetics",
    badge: "USP Apparatus I & II",
    theme: "blue",
  },
  {
    title: "Particle Size & Zeta Potential Analyzers",
    desc: "Laser diffraction nano-sizing down to 20nm for colloidal emulsions and liposomal suspension stability verification.",
    icon: Dna,
    tag: "Nano-Colloidal",
    badge: "Down to 20nm Sizing",
    theme: "purple",
  },
  {
    title: "Accelerated ICH Stability Chambers",
    desc: "Automated climate-controlled chambers operating at 40°C / 75% RH for stability forecasting and shelf-life certification.",
    icon: ShieldCheck,
    tag: "Shelf-Life Testing",
    badge: "Zone IVb (40°C / 75% RH)",
    theme: "emerald",
  },
];


export default function RndPage() {
  return (
    <main>
      <Navbar />

      {/* Subpage Hero with Full Background Image */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1920&q=85"
            alt="Biomedical laboratory research and analytical science"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Research & Development</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div className="hero-tag-pill" style={{ backgroundColor: "rgba(124, 168, 50, 0.15)", borderColor: "rgba(124, 168, 50, 0.35)", color: "#7CA832", margin: "0 auto 14px" }}>
              <Microscope size={14} />
              <span>Clinical R&D Hub</span>
              <span className="pill-dot" style={{ backgroundColor: "#7CA832" }} />
              <span>Evidence-Led Science</span>
            </div>

            <h1 style={{ maxWidth: "880px", textAlign: "center", margin: "0 auto" }}>
              Translating molecular science into<br />
              <em style={{ color: "#7CA832" }}>bioavailable nutrition.</em>
            </h1>

            <p className="hero-text" style={{ maxWidth: "660px", fontSize: "16px", color: "#d1e8b0", margin: "16px auto 0", textAlign: "center" }}>
              Solving complex formulation challenges: enhanced cellular uptake, solubility kinetics, and active stabilization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4-Step R&D Lifecycle */}
      <section className="page-wrapper rnd-phases-section">
        <div className="rnd-section-header">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Formulation Lifecycle</p>
          <h2>Our 4-phase clinical R&D <em>framework.</em></h2>
        </div>

        <div className="rnd-phases-grid">
          {phases.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.step}
                className="card-panel rnd-phase-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                variants={fade}
              >
                <div className="rnd-phase-step">
                  {p.step}
                </div>
                <div className="icon-box" style={{ background: "rgba(21, 128, 61, 0.1)", color: "#15803D" }}>
                  <Icon size={24} />
                </div>
                <h3 className="rnd-phase-title">
                  {p.title}
                </h3>
                <p className="rnd-phase-desc">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deep Dive Science Feature */}
      <section className="rnd-deepdive-section">
        <div className="rnd-deepdive-grid">
          <div>
            <p className="eyebrow">Bioavailability Engineering</p>
            <h2>Overcoming the gut-blood <em>barrier.</em></h2>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.7", margin: "20px 0 24px" }}>
              Most active botanicals (such as curcumin, quercetin, and resveratrol) suffer from less than 1-2% baseline bioavailability due to gastric degradation and rapid hepatic first-pass metabolism.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "30px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckCircle2 color="#15803D" size={20} style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "var(--ink)" }}><strong>Liposomal Micro-Vesicles:</strong> Protects hydrophilic and lipophilic actives with biomimetic phospholipid bilayer membranes.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckCircle2 color="#15803D" size={20} style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "var(--ink)" }}><strong>DRCaps® Gastric Acid Bypass:</strong> Guarantees zero release in the stomach (pH 1.2) with complete dissolution in the duodenum (pH 6.8).</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckCircle2 color="#15803D" size={20} style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "var(--ink)" }}><strong>Self-Emulsifying Nano-Suspensions:</strong> Up to 12.5x greater plasma concentration verified via HPLC blood serum analysis.</span>
              </div>
            </div>

            <Link href="/contact?inquiry=rnd" className="button button-dark">
              Request Clinical Trial Data
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rnd-deepdive-media">
            <img
              src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=85"
              alt="High precision laboratory analysis"
              className="rnd-deepdive-img"
            />
            <div className="rnd-deepdive-overlay">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <Beaker size={18} color="#7CA832" />
                <strong style={{ fontSize: "15px" }}>Varadaco BioMatrix™ Technology</strong>
              </div>
              <p style={{ fontSize: "12px", color: "#d1e8b0", margin: 0 }}>
                12.5x higher area-under-the-curve (AUC) bioavailability compared to unformulated reference standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Instrumentation */}
      <section className="page-wrapper rnd-equip-section">
        <div className="rnd-section-header">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Instrumentation & Rigor</p>
          <h2>Analytical testing <em>infrastructure.</em></h2>
        </div>

        <div className="rnd-equip-grid">
          {labEquipment.map((eq, i) => {
            const Icon = eq.icon;
            return (
              <motion.div
                key={eq.title}
                className={`rnd-equip-card rnd-equip-${eq.theme}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="rnd-equip-accent" />
                <div className="rnd-equip-header">
                  <div className="rnd-equip-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="rnd-equip-tag">{eq.tag}</span>
                </div>
                <h4 className="rnd-equip-title">{eq.title}</h4>
                <p className="rnd-equip-desc">{eq.desc}</p>
                <div className="rnd-equip-badge">
                  <span className="rnd-equip-badge-dot" />
                  <span>{eq.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>



      <Footer />
    </main>
  );
}
