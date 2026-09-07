"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Atom, Award, Beaker, Check, ChevronRight, CircleGauge, FlaskConical, Globe2, HeartPulse, Leaf, Microscope, PackageCheck, Pill, ShieldCheck, Sparkles, TestTube2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSections from "@/components/TrustSections";
import TestimonialsSection from "@/components/TestimonialsSection";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const solutions = [
  ["Ashwagandha", "Natural Stress Relief & Strength Booster with standardized 5% Withanolides root extract.", "/products/ashwagandha.jpg", Leaf],
  ["Shilajit", "Pure Himalayan Resin with >75% Fulvic Acid + 84 Ionic Trace Minerals for cellular energy.", "/products/shilajit.jpg", Sparkles],
  ["Mulethi", "Pure Licorice Root rich in Glycyrrhizin and Glabridin for respiratory & digestive vitality.", "/products/mulethi.jpg", HeartPulse],
  ["Supplements", "Complete Daily Multivitamin with Zinc, B-Complex & Vitamin D3/K2 for energy.", "/products/supplements.jpg", CircleGauge],
  ["Triphala", "Three Sacred Ayurvedic Fruits (Amalaki, Bibhitaki & Haritaki) for digestive harmony.", "/products/triphala.jpg", Pill],
  ["Brahmi", "Standardized Bacopa Monnieri with 20% Bacosides for memory, focus & mental clarity.", "/products/brahmi.jpg", Microscope],
  ["Karela Jamun", "Bitter Gourd & Indian Blackberry extract with active Charantin for glucose care.", "/products/karela.jpg", Leaf],
  ["Curcumin", "95% Standardized Curcuminoids with Piperine bio-enhancer for joint & cellular health.", "/products/curcumin.jpg", Sparkles],
];

const timelineSteps = [
  {
    step: "01",
    name: "Concept",
    desc: "Target profile, molecular mapping & active selection",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
    badge: "Stage 01 • Molecular Discovery & Active Selection",
    alt: "Concept research and molecular botanical discovery",
  },
  {
    step: "02",
    name: "Formulation",
    desc: "Bioavailability optimization, assay testing & clean synthesis",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=85",
    badge: "Stage 02 • Bioavailability & Assay Formulation",
    alt: "Formulation laboratory scientist testing bioavailable nutrition",
  },
  {
    step: "03",
    name: "Manufacturing",
    desc: "Class 100,000 cleanroom commercial batch scaling",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
    badge: "Stage 03 • WHO-GMP Cleanroom Precision Scaling",
    alt: "Automated high-speed pharmaceutical manufacturing",
  },
  {
    step: "04",
    name: "Packaging",
    desc: "High-barrier Alu-Alu blister, bottling & nitrogen flushing",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=85",
    badge: "Stage 04 • High-Barrier Automated Blister & Bottling",
    alt: "Automated pharmaceutical bottle filling and packaging line",
  },
  {
    step: "05",
    name: "Delivery",
    desc: "Global regulatory release, cold-chain freight & worldwide export",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    badge: "Stage 05 • Global Distribution & Cold-Chain Logistics",
    alt: "Global freight distribution and worldwide pharmaceutical delivery",
  },
];

const process = [
  ["01", "Research & Development", "Insights that make an idea worth making.", Microscope],
  ["02", "Formulation", "Ingredients calibrated for efficacy and experience.", FlaskConical],
  ["03", "Testing & Quality", "Rigorous controls at every decision point.", ShieldCheck],
  ["04", "Manufacturing", "Repeatable quality at meaningful scale.", PackageCheck]
];

const portfolioItems = [
  {
    title: "Men’s Health",
    desc: "We specialize in a wide range of men’s wellness and health products.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Women’s Health",
    desc: "We deliver a range of women’s wellness products that are specifically designed for them.",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Kid’s Health",
    desc: "We take into account the specific nutrient requirement for kids.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Sports Nutrition",
    desc: "Our sports nutrition products are made with quality ingredients.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Medical Nutrition",
    desc: "We bring unique, efficacious solutions to answer your nutritional needs.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Phytopharma",
    desc: "All products have proven to be effective in improving overall health.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Probiotics",
    desc: "All products have proven to be effective in improving overall health.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "Ayurvedic",
    desc: "Our array of Ayurvedic nutrition is designed to promote balance, wellness.",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
];

const services = [
  {
    title: "PRIVATE LABELLING",
    desc: "Varadaco is a leading full-service private label manufacturer. Whether you are a startup or an established enterprise, we scale custom formulations for your brand.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6L38 22L24 36L8 20L22 6Z" />
        <circle cx="18" cy="16" r="2.5" />
        <path d="M20 28C22 30 26 30 28 26C30 22 28 18 24 20" />
        <path d="M26 14C27 12 29 11 31 12" />
      </svg>
    ),
  },
  {
    title: "REGULATORY COMPLIANCES",
    desc: "Ensure all necessary global licensing and compliance, working closely with regulatory authorities like US FDA, FSSAI, AYUSH, and EFSA.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M27 8L36 17L32 21L23 12L27 8Z" />
        <path d="M19 16L30 27" />
        <path d="M24 21L10 35L7 32L21 18" />
        <path d="M12 40H36" />
        <path d="M16 44H32" />
      </svg>
    ),
  },
  {
    title: "CRAMS",
    desc: "Varadaco is a trusted contract research & manufacturing partner, specializing in pharmaceutical-grade cleanroom scaling and active bioactives.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6H28V12H20V6Z" />
        <path d="M24 12V20" />
        <path d="M12 28H20V40H12V28Z" />
        <path d="M28 28H36V40H28V28Z" />
        <path d="M6 42H42" />
        <circle cx="10" cy="42" r="2" />
        <circle cx="24" cy="42" r="2" />
        <circle cx="38" cy="42" r="2" />
      </svg>
    ),
  },
  {
    title: "PACKAGING",
    desc: "High-barrier Alu-Alu blister packaging, automated softgel bottling, and nitrogen-flushed single-serve stick pack delivery formats.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 16L24 8L38 16L24 24L10 16Z" />
        <path d="M10 16V34L24 42V24" />
        <path d="M38 16V34L24 42" />
        <path d="M16 12.5L30 20.5" />
        <path d="M34 14L20 22" />
      </svg>
    ),
  },
];


const heroBackgrounds = [
  {
    src: "/images/pharma-ashwagandha-roots-composite.jpg",
    alt: "Authentic dried Ashwagandha roots and active pharmaceutical extraction in laboratory",
    badge: "100% PURE ASHWAGANDHA ROOT ACTIVES",
  },
  {
    src: "/images/pharma-ashwagandha-bg.jpg",
    alt: "Living Ashwagandha botanical plants, roots, and active extraction science",
    badge: "ASHWAGANDHA BOTANICALS & PHARMA EXTRACTION",
  },
  {
    src: "/images/pharma-cleanroom-bg.jpg",
    alt: "WHO-GMP Certified cleanroom manufacturing facility and automated packaging lines",
    badge: "WHO-GMP CERTIFIED PHARMA CLEANROOM SCALE",
  },
];

function Button({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <a href="#contact" className={dark ? "button button-dark" : "button button-light"}>
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

export default function Home() {
  const [currentHeroBg, setCurrentHeroBg] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 4500);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % timelineSteps.length);
    }, 4000);
    return () => clearInterval(stepTimer);
  }, []);

  return (
    <main>
      <Navbar />

      <section className="pharma-hero" id="top">
        {/* Animated Background Slider */}
        <div className="pharma-hero-bg-slider">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroBackgrounds[currentHeroBg].src}
              className="pharma-hero-bg-slide"
              style={{ backgroundImage: `url(${heroBackgrounds[currentHeroBg].src})` }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="pharma-hero-top-banner">
          Factory direct sales spot quick delivery
        </div>

        <div className="pharma-hero-content">
          <motion.div
            className="pharma-hero-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pharma-hero-card-accent" />

            <div className="pharma-hero-badge">
              <Sparkles size={12} className="pharma-hero-badge-icon" />
              <span>{heroBackgrounds[currentHeroBg].badge}</span>
            </div>

            <h1 className="pharma-hero-title">
              From scientific idea to<br />
              market-ready product.
            </h1>

            <p className="pharma-hero-desc">
              Premium medical-grade bottles and packaging solutions for pharmaceuticals, tablets, syrups, and nutraceuticals. Safeguard formula purity with uncompromising quality and certified integrity.
            </p>

            <Link href="/products" className="pharma-hero-btn">
              <span>EXPLORE CATALOG</span>
              <ArrowRight size={15} />
            </Link>

            {/* Slider Dots */}
            <div className="pharma-hero-dots">
              {heroBackgrounds.map((bg, idx) => (
                <button
                  key={bg.src}
                  className={`pharma-hero-dot ${currentHeroBg === idx ? "active" : ""}`}
                  onClick={() => setCurrentHeroBg(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section partnership" id="about">
        <motion.div
          className="partnership-copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">About Varadaco Industries</p>
          <h2>Your brand.<br /><em>Our science.</em></h2>
          <p>Bring the ambition. We bring the insight, formulation expertise, and operational discipline to take it further.</p>
          <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D", fontWeight: 800, padding: "14px 28px", fontSize: "15px" }}>
            Start a partnership
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <div className="partnership-image-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={timelineSteps[activeTimelineStep].name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <img
                src={timelineSteps[activeTimelineStep].image}
                alt={timelineSteps[activeTimelineStep].alt}
              />
              <div className="partnership-image-badge">
                <ShieldCheck size={18} color="#7CA832" />
                <span>{timelineSteps[activeTimelineStep].badge}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="timeline">
          {timelineSteps.map((item, i) => {
            const isActive = activeTimelineStep === i;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={isActive ? "active" : ""}
                onMouseEnter={() => setActiveTimelineStep(i)}
                onClick={() => setActiveTimelineStep(i)}
                style={{ cursor: "pointer" }}
              >
                <span>{item.step}</span>
                <div>
                  <b>{item.name}</b>
                  <small>{item.desc}</small>
                </div>
                <i />
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section process" id="capabilities">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
          <p className="eyebrow">The Varadaco difference</p>
          <h2>From scientific idea to<br />market-ready product.</h2>
        </motion.div>
        <div className="process-grid">
          {process.map(([num, title, desc, Icon], i) => (
            <motion.article
              key={String(num)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              variants={fade}
            >
              <span>{num as string}</span>
              <Icon size={27} />
              <h3>{title as string}</h3>
              <p>{desc as string}</p>
              <ArrowDownRight />
            </motion.article>
          ))}
        </div>
        <div className="process-line">
          <span>Discovery</span>
          <i />
          <span>Development</span>
          <i />
          <span>Delivery</span>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="services-section" id="services">
        <div className="services-header">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <Link href="/services" style={{ textDecoration: "none", color: "inherit", display: "inline-block" }}>
              <h2 className="services-title">Our Services</h2>
              <div className="services-underline" />
            </Link>
          </motion.div>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <Link
              key={service.title}
              href="/services"
              className="service-card"
            >
              <div className="service-corner-blob" />
              <div className="service-icon-box">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="service-read-more">
                Read More
                <ChevronRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* OUR PORTFOLIO SECTION */}
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-header">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h2 className="portfolio-title">OUR PORTFOLIO</h2>
            <div className="portfolio-underline" />
          </motion.div>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item, idx) => (
            <motion.a
              key={item.title}
              href="/products"
              className="portfolio-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="portfolio-card-bg"
              />
              <div className="portfolio-card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="section solutions" id="products">
        <div className="section-heading">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="eyebrow">Explore Our Products</p>
            <h2>Nutrition for the<br /><em>way life moves.</em></h2>
          </motion.div>
          <Link className="text-link" href="/products">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="solution-grid">
          {solutions.map(([title, desc, img, Icon], i) => (
            <motion.div
              key={String(title)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              variants={fade}
              whileHover={{ y: -5 }}
            >
              <Link href="/products" className="solution-card" style={{ display: "block", textDecoration: "none" }}>
                <div className="card-image">
                  <img src={img as string} alt={title as string} />
                </div>
                <div className="card-body">
                  <Icon size={21} />
                  <h3>{title as string}</h3>
                  <p>{desc as string}</p>
                  <span>Explore <ArrowRight size={15} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="quality section" id="quality">
        <motion.div
          className="quality-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Quality, made visible</p>
          <h2>Confidence at every<br /><em>checkpoint.</em></h2>
        </motion.div>
        <div className="certs">
          {[
            { title: "GMP", label: "c-GMP Certified", icon: Award },
            { title: "ISO", label: "ISO 22000:2018", icon: ShieldCheck },
            { title: "HACCP", label: "Hazard Analysis", icon: Check },
            { title: "FSSAI", label: "Central License", icon: Award },
            { title: "WHO–GMP", label: "Global Standard", icon: Sparkles },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ scale: 1.08, y: -8 }}
              >
                <div className="cert-icon-wrap">
                  <Icon size={20} />
                </div>
                <b>{item.title}</b>
                <small>{item.label}</small>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="global" id="global">
        <div className="global-bg-grid" />
        <div className="global-glow-orb" />

        <motion.div
          className="global-copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Global Reach & Export Standards</p>
          <h2>Nutrition without<br /><em>borders.</em></h2>
          <p>
            Trusted by healthcare leaders and innovative nutraceutical brands worldwide. We formulate, manufacture, and clear global regulatory dossiers for seamless delivery to over 30+ international markets.
          </p>

          <div className="global-features-list">
            <div className="global-feature-item">
              <ShieldCheck size={18} color="#a3e635" />
              <span>Full Regulatory Dossier Support (FDA, EFSA, TGA, AYUSH)</span>
            </div>
            <div className="global-feature-item">
              <Globe2 size={18} color="#a3e635" />
              <span>Worldwide Cold-Chain Logistics & Maritime Freight</span>
            </div>
            <div className="global-feature-item">
              <Check size={18} color="#a3e635" />
              <span>100% Batch Traceability with Certified CoA & Lab Reports</span>
            </div>
          </div>

          <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D", fontWeight: 800, padding: "14px 28px", fontSize: "15px", marginTop: "24px", display: "inline-flex" }}>
            Inquire About Global Export
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.div
          className="global-visual-container"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* 3D Photorealistic Illuminated Globe with Atmosphere */}
          <div className="globe-sphere-wrapper">
            <div className="globe-atmosphere-glow" />
            <img
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=85"
              alt="Global nutraceutical supply network"
              className="globe-image"
            />
            <div className="globe-inner-shadow" />

            {/* Glowing Hub Radar Markers */}
            <div className="global-hub-pin pin-us" title="North America: US FDA Registered">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">North America</span>
            </div>

            <div className="global-hub-pin pin-eu" title="Europe: EFSA Standard">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Europe</span>
            </div>

            <div className="global-hub-pin pin-me" title="Middle East: GCC & Halal Hub">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Middle East</span>
            </div>

            <div className="global-hub-pin pin-asia" title="Asia-Pacific: GMP Manufacturing">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Asia-Pacific</span>
            </div>

            <div className="global-hub-pin pin-aus" title="Oceania: TGA Standards">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Australia</span>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="global-stat-card stat-top-right anim-float">
            <b>30+</b>
            <small>Countries Served Worldwide</small>
          </div>

          <div className="global-stat-card stat-bottom-left anim-float-delay">
            <div className="stat-pill-row">
              <ShieldCheck size={16} color="#7CA832" />
              <span>100% Export Clearance</span>
            </div>
            <small>WHO-GMP • CoAs • Halal • Kosher</small>
          </div>
        </motion.div>
      </section>



      {/* OUR VALUABLE CLIENTS & CERTIFICATIONS SECTIONS */}
      <TrustSections />

      {/* TESTIMONIALS SECTION (Dual-Row Marquee + 3D Fanned Deck) */}
      <TestimonialsSection />

      {/* COMPACT CTA BANNER */}
      <section className="cta-banner-section">
        <motion.div
          className="cta-banner-card"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-banner-content">
            <span className="cta-banner-pill">Ready to Collaborate?</span>
            <h3 className="cta-banner-title">Let’s engineer your next formulation breakthrough.</h3>
            <p className="cta-banner-desc">From initial molecular discovery to full WHO-GMP commercial scale.</p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D" }}>
              Request Formulation Consultation
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
