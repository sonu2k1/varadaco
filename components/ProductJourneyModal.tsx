"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderConfirmationModal from "./OrderConfirmationModal";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Rocket,
  X,
  CheckCircle2,
  Plus,
  Minus,
  Leaf,
  Clock,
  Sprout,
  SlidersHorizontal,
  Scale,
  TrendingUp,
} from "lucide-react";

interface IngredientItem {
  id: string;
  name: string;
  botanical: string;
  desc: string;
  image: string;
  baseDosage: number;
  unit: string;
  basePrice: number;
  dosageStep: number;
  minDosage: number;
  maxDosage: number;
  marketRange: string;
  impact: "High" | "Medium" | "Low";
  selected: boolean;
  dosage: number;
}

interface PackagingOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

interface OuterOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

interface LabelOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

const INITIAL_INGREDIENTS: IngredientItem[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha Extract",
    botanical: "Withania somnifera (KSM-66 / 5% Withanolides)",
    desc: "Helps reduce cortisol, relieve chronic stress, and boost physical stamina.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    baseDosage: 300,
    unit: "mg",
    basePrice: 28.0,
    dosageStep: 25,
    minDosage: 100,
    maxDosage: 600,
    marketRange: "250 - 600 mg",
    impact: "High",
    selected: true,
    dosage: 300,
  },
  {
    id: "black_pepper",
    name: "Black Pepper Extract",
    botanical: "Piper nigrum (95% Piperine)",
    desc: "Improves gut absorption and maximizes bioavailability of herbal extracts.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80",
    baseDosage: 10,
    unit: "mg",
    basePrice: 5.0,
    dosageStep: 1,
    minDosage: 5,
    maxDosage: 20,
    marketRange: "5 - 20 mg",
    impact: "High",
    selected: true,
    dosage: 10,
  },
  {
    id: "l_theanine",
    name: "L-Theanine",
    botanical: "Natural Amino Acid",
    desc: "Promotes calm relaxation without sedation, synergy with adaptogens.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
    baseDosage: 50,
    unit: "mg",
    basePrice: 12.0,
    dosageStep: 5,
    minDosage: 25,
    maxDosage: 100,
    marketRange: "25 - 100 mg",
    impact: "Medium",
    selected: true,
    dosage: 50,
  },
  {
    id: "zinc",
    name: "Zinc",
    botanical: "Zinc Citrate / Bisglycinate",
    desc: "Supports immune defense, cellular repair, and hormonal homeostasis.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    baseDosage: 10,
    unit: "mg",
    basePrice: 3.0,
    dosageStep: 1,
    minDosage: 5,
    maxDosage: 20,
    marketRange: "5 - 20 mg",
    impact: "Medium",
    selected: true,
    dosage: 10,
  },
  {
    id: "vitamin_d3",
    name: "Vitamin D3",
    botanical: "Cholecalciferol",
    desc: "Supports bone density, neuromuscular integrity, and positive mood.",
    image: "https://images.unsplash.com/photo-1550572017-ed200f5e6343?auto=format&fit=crop&w=400&q=80",
    baseDosage: 600,
    unit: "IU",
    basePrice: 4.0,
    dosageStep: 50,
    minDosage: 400,
    maxDosage: 1000,
    marketRange: "400 - 1000 IU",
    impact: "Medium",
    selected: true,
    dosage: 600,
  },
  {
    id: "excipients",
    name: "Excipients & Others",
    botanical: "Clean-label Plant Binders",
    desc: "Pharmaceutical-grade plant cellulose and natural glidant complex.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    baseDosage: 120,
    unit: "mg",
    basePrice: 6.0,
    dosageStep: 10,
    minDosage: 50,
    maxDosage: 200,
    marketRange: "-",
    impact: "Low",
    selected: true,
    dosage: 120,
  },
];

const BOTTLE_OPTIONS: PackagingOption[] = [
  {
    id: "hdpe_white",
    name: "HDPE White Bottle",
    subtext: "(60 Capsules)",
    price: 8.0,
    image: "/packaging/hdpe_white.jpg",
  },
  {
    id: "hdpe_black",
    name: "HDPE Black Bottle",
    subtext: "(60 Capsules)",
    price: 10.0,
    image: "/packaging/hdpe_black.jpg",
  },
  {
    id: "pet_transparent",
    name: "PET Transparent Bottle",
    subtext: "(60 Capsules)",
    price: 9.5,
    image: "/packaging/pet_clear.jpg",
  },
  {
    id: "amber_glass",
    name: "Amber Glass Bottle",
    subtext: "(60 Capsules)",
    price: 15.0,
    image: "/packaging/amber_glass.jpg",
  },
  {
    id: "alu_blister",
    name: "Alu-Alu Blister Pack",
    subtext: "(60 Capsules / 6 Strips)",
    price: 7.5,
    image: "/packaging/alu_blister.jpg",
  },
];

const OUTER_OPTIONS: OuterOption[] = [
  {
    id: "shrink_wrap",
    name: "Shrink Wrap",
    subtext: "(with Heat Seal)",
    price: 2.0,
    image: "/packaging/outer_shrink_wrap.jpg",
  },
  {
    id: "paper_box",
    name: "Paper Box",
    subtext: "(Premium Mono Carton)",
    price: 4.0,
    image: "/packaging/outer_paper_box.jpg",
  },
  {
    id: "tin_box",
    name: "Tin Box",
    subtext: "(Metal Keepsake Can)",
    price: 12.0,
    image: "/packaging/outer_tin_box.jpg",
  },
  {
    id: "pouch_pack",
    name: "Pouch Pack",
    subtext: "(Stand-up Zipper Pouch)",
    price: 3.0,
    image: "/packaging/outer_pouch_pack.jpg",
  },
  {
    id: "kraft_box",
    name: "Eco Kraft Box",
    subtext: "(Recycled Sustainable)",
    price: 5.0,
    image: "/packaging/outer_kraft_box.jpg",
  },
];

const LABEL_OPTIONS: LabelOption[] = [
  {
    id: "basic_label",
    name: "Basic Label",
    subtext: "(Sticker Label)",
    price: 1.0,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "premium_label",
    name: "Premium Label",
    subtext: "(Glossy Finish)",
    price: 2.0,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "matte_label",
    name: "Matte Label",
    subtext: "(Premium Soft-Touch)",
    price: 3.0,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "embossed_label",
    name: "Embossed Label",
    subtext: "(Luxury Foil Stamp)",
    price: 4.0,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "custom_design",
    name: "Custom Design",
    subtext: "(Zenon Creative Team)",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=400&q=80",
  },
];

const STEPS = [
  { id: 1, name: "Why & Benefits" },
  { id: 2, name: "Ingredients" },
  { id: 3, name: "Formulation & ROI" },
  { id: 4, name: "Bottle" },
  { id: 5, name: "Packaging" },
  { id: 6, name: "Label" },
  { id: 7, name: "MOQ & Sample" },
];

interface ProductJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function ProductJourneyModal({
  isOpen,
  onClose,
  productName = "Ashwagandha",
}: ProductJourneyModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState<IngredientItem[]>(INITIAL_INGREDIENTS);
  const [selectedBottle, setSelectedBottle] = useState<PackagingOption>(BOTTLE_OPTIONS[0]);
  const [selectedOuter, setSelectedOuter] = useState<OuterOption>(OUTER_OPTIONS[0]);
  const [selectedLabel, setSelectedLabel] = useState<LabelOption>(LABEL_OPTIONS[1]);
  const [selectedMoq, setSelectedMoq] = useState<number>(500);

  const [sampleOrdered, setSampleOrdered] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [sampleForm, setSampleForm] = useState({
    name: "",
    brand: "",
    email: "",
    phone: "",
    address: "",
  });

  const calculateIngredientCost = (item: IngredientItem) => {
    if (!item.selected) return 0;
    // Each '+' click (dosageStep) increases Benchmark Rate by exactly ₹1.00 for all ingredients
    const steps = Math.round((item.dosage - item.baseDosage) / item.dosageStep);
    return Math.max(1, item.basePrice + steps * 1.0);
  };

  const calculations = useMemo(() => {
    const active = ingredients.filter((i) => i.selected);
    const totalActiveCost = active.reduce((acc, curr) => acc + calculateIngredientCost(curr), 0);
    const bottleCost = selectedBottle.price;
    const outerCost = selectedOuter.price;
    const labelCost = selectedLabel.price;

    const baseUnitCost = Math.round(totalActiveCost + bottleCost + outerCost + labelCost);
    const suggestedSellingPrice = 179.0;
    const profitPerUnit = suggestedSellingPrice - baseUnitCost;
    const profitMarginPercent = Math.round((profitPerUnit / suggestedSellingPrice) * 100);

    const moqTiers = [
      {
        units: 200,
        unitCost: baseUnitCost + 12,
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - (baseUnitCost + 12),
        marginPercent: Math.round(((179.0 - (baseUnitCost + 12)) / 179.0) * 100),
        estProfit: (179.0 - (baseUnitCost + 12)) * 200,
      },
      {
        units: 500,
        unitCost: baseUnitCost,
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - baseUnitCost,
        marginPercent: Math.round(((179.0 - baseUnitCost) / 179.0) * 100),
        estProfit: (179.0 - baseUnitCost) * 500,
      },
      {
        units: 1000,
        unitCost: Math.max(38, baseUnitCost - 4),
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - Math.max(38, baseUnitCost - 4),
        marginPercent: Math.round(((179.0 - (baseUnitCost - 4)) / 179.0) * 100),
        estProfit: (179.0 - Math.max(38, baseUnitCost - 4)) * 1000,
      },
      {
        units: 2000,
        unitCost: Math.max(32, baseUnitCost - 8),
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - Math.max(32, baseUnitCost - 8),
        marginPercent: Math.round(((179.0 - (baseUnitCost - 8)) / 179.0) * 100),
        estProfit: "Contact Us",
      },
    ];

    const currentTier = moqTiers.find((t) => t.units === selectedMoq) || moqTiers[1];
    const totalInvestment = typeof currentTier.unitCost === "number" ? currentTier.unitCost * selectedMoq : 0;

    return {
      activeCount: active.length,
      totalActiveCost: Math.round(totalActiveCost * 100) / 100,
      bottleCost,
      outerCost,
      labelCost,
      baseUnitCost,
      suggestedSellingPrice,
      profitPerUnit,
      profitMarginPercent,
      moqTiers,
      currentTier,
      totalInvestment,
    };
  }, [ingredients, selectedBottle, selectedOuter, selectedLabel, selectedMoq]);

  const toggleIngredient = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const updateDosage = (id: string, delta: number) => {
    setIngredients((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newD = Math.max(item.minDosage, Math.min(item.maxDosage, item.dosage + delta));
          return { ...item, dosage: newD };
        }
        return item;
      })
    );
  };

  const setDosageDirect = (id: string, val: number) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, dosage: val } : item))
    );
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 2.5vw, 24px)",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(13, 38, 25, 0.78)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        style={{
          position: "relative",
          background: "#FAF8F5",
          borderRadius: "28px",
          maxWidth: "1160px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          border: "1.5px solid rgba(21, 128, 61, 0.25)",
        }}
      >
        {/* ========================================================
            STICKY HEADER WITH STEPPER
           ======================================================== */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid #E5E7EB",
            padding: "16px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            zIndex: 10,
            borderRadius: "28px 28px 0 0",
          }}
        >
          {/* Top Bar: Title & Close Button (Modern Redesign) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                  border: "1px solid #86EFAC",
                  color: "#15803D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(21, 128, 61, 0.12)",
                }}
              >
                <Leaf size={20} color="#15803D" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "17.5px",
                      fontWeight: 800,
                      color: "#0F172A",
                      letterSpacing: "-0.01em",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{productName}</span>
                    <span style={{ color: "#475569", fontWeight: 600 }}>Formulation & Production Journey</span>
                  </h3>
                  <span
                    style={{
                      fontSize: "11.5px",
                      background: "#F0FDF4",
                      color: "#15803D",
                      border: "1px solid #86EFAC",
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      boxShadow: "0 1px 3px rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#22C55E",
                        display: "inline-block",
                      }}
                    />
                    Step {currentStep} of 7
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close journey modal"
              style={{
                background: "#F1F5F9",
                border: "1px solid #E2E8F0",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748B",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E2E8F0";
                e.currentTarget.style.color = "#0F172A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F1F5F9";
                e.currentTarget.style.color = "#64748B";
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Stepper Navigation (1 to 7) */}
          <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "680px" }}>
              {STEPS.map((s, idx) => {
                const isCurrent = currentStep === s.id;
                const isDone = currentStep > s.id;
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", flex: idx === STEPS.length - 1 ? "none" : 1 }}>
                    <button
                      onClick={() => setCurrentStep(s.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "4px 8px",
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 800,
                          background: isCurrent ? "#DCFCE7" : isDone ? "#15803D" : "#F1F5F9",
                          color: isCurrent ? "#15803D" : isDone ? "#ffffff" : "#64748B",
                          border: isCurrent ? "2px solid #15803D" : isDone ? "2px solid #15803D" : "1.5px solid #E2E8F0",
                          boxShadow: isCurrent ? "0 0 0 4px rgba(34, 197, 94, 0.22)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {isDone ? <Check size={14} strokeWidth={3} /> : s.id}
                      </div>
                      <span
                        style={{
                          fontSize: "12.5px",
                          fontWeight: isCurrent ? 800 : isDone ? 700 : 500,
                          color: isCurrent ? "#15803D" : isDone ? "#15803D" : "#64748B",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.name}
                      </span>
                    </button>

                    {idx < STEPS.length - 1 && (
                      <div
                        style={{
                          height: "2px",
                          flex: 1,
                          margin: "0 8px",
                          background: isDone ? "#15803D" : "#E5E7EB",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            MODAL CONTENT AREA (STEPS 1 TO 7)
           ======================================================== */}
        <div style={{ padding: "28px 32px" }}>
          <AnimatePresence mode="wait">
            {/* ----------------------------------------------------
                STEP 1: WHY ASHWAGANDHA? (WITH REAL PLANT IMAGE)
               ---------------------------------------------------- */}
            {currentStep === 1 && (
              <motion.div
                key="modal-step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "22px",
                    border: "1px solid #E5E7EB",
                    padding: "32px",
                    display: "grid",
                    gridTemplateColumns: "1.15fr 0.85fr",
                    gap: "36px",
                    alignItems: "stretch",
                  }}
                  className="ashwagandha-overview-grid"
                >
                  {/* Left: 4 Benefits */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D", display: "block", marginBottom: "6px" }}>
                        STEP 1
                      </span>
                      <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "#111827", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                        Why <span style={{ color: "#15803D" }}>{productName}</span>?
                      </h2>
                      <p style={{ color: "#4B5563", fontSize: "15px", lineHeight: 1.55, marginBottom: "26px" }}>
                        Understand the ingredient, common wellness positioning, typical use cases and what makes it interesting for a new product.
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={{ background: "#FAF9F6", border: "1px solid #EAE5DE", borderRadius: "14px", padding: "18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ color: "#15803D", fontWeight: 800 }}>✓</span>
                            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>Stress support</h4>
                          </div>
                          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>Commonly positioned for everyday stress management.</p>
                        </div>

                        <div style={{ background: "#FAF9F6", border: "1px solid #EAE5DE", borderRadius: "14px", padding: "18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ color: "#15803D", fontWeight: 800 }}>✓</span>
                            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>Energy & stamina</h4>
                          </div>
                          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>Often used in wellness and active-lifestyle products.</p>
                        </div>

                        <div style={{ background: "#FAF9F6", border: "1px solid #EAE5DE", borderRadius: "14px", padding: "18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ color: "#15803D", fontWeight: 800 }}>✓</span>
                            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>Recovery support</h4>
                          </div>
                          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>Can be positioned around active lifestyle recovery.</p>
                        </div>

                        <div style={{ background: "#FAF9F6", border: "1px solid #EAE5DE", borderRadius: "14px", padding: "18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ color: "#15803D", fontWeight: 800 }}>✓</span>
                            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>Daily wellness</h4>
                          </div>
                          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>Useful for general wellness product concepts.</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => setCurrentStep(2)}
                        style={{
                          background: "#15803D",
                          color: "#ffffff",
                          padding: "14px 28px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "15px",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(21, 128, 61, 0.3)",
                        }}
                      >
                        Next: Choose Ingredients
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Real Plant Image & Callout */}
                  <div style={{ background: "#F4F7F3", borderRadius: "18px", border: "1px solid #DFEADB", padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ position: "relative", height: "230px", borderRadius: "14px", overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", marginBottom: "16px", background: "#E8EFE7" }}>
                        <img
                          src="/products/ashwagandha_plant_real.jpg"
                          alt="Real living Ashwagandha plant with leaves, berries, and roots"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(13, 38, 25, 0.85)", backdropFilter: "blur(6px)", color: "#A7F3D0", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 600 }}>
                          🌿 Real Withania Somnifera (Living Plant & Roots)
                        </div>
                      </div>

                      <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                        {productName}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#4B5563", margin: "0 0 16px", lineHeight: 1.4 }}>
                        A botanical ingredient commonly used in wellness formulations.
                      </p>
                    </div>

                    <div style={{ background: "#FFFFFF", borderRadius: "10px", border: "1px solid #E5E7EB", borderLeft: "4px solid #15803D", padding: "14px 16px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                        Build your business with us.
                      </h4>
                      <p style={{ fontSize: "12.5px", color: "#4B5563", margin: 0, lineHeight: 1.45 }}>
                        We can help you explore formulation, packaging, pricing and sample development.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 2: CHOOSE INGREDIENTS
               ---------------------------------------------------- */}
            {currentStep === 2 && (
              <motion.div
                key="modal-step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  border: "1px solid #E5E7EB",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Modern Step 2 Header with Live Total Pills */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "16px",
                    borderBottom: "1px solid #F0F4EF",
                    paddingBottom: "18px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "8px",
                      }}
                    >
                      <Sparkles size={12} />
                      <span>STEP 2 • ACTIVE FORMULATION</span>
                    </div>
                    <h2 style={{ fontSize: "25px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" }}>
                      Choose Raw Ingredients & Potency
                    </h2>
                    <p style={{ color: "#64748B", fontSize: "14px", margin: "4px 0 0" }}>
                      Select active botanical extracts and customize the exact dosage per single unit.
                    </p>
                  </div>

                  {/* Header Summary Pills */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div
                      style={{
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: "14px",
                        padding: "8px 16px",
                        textAlign: "right",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Actives Selected
                      </span>
                      <strong style={{ fontSize: "16px", fontWeight: 900, color: "#0F172A" }}>
                        {calculations.activeCount} <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>/ {ingredients.length}</span>
                      </strong>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                        border: "1px solid #86EFAC",
                        borderRadius: "14px",
                        padding: "8px 16px",
                        textAlign: "right",
                        boxShadow: "0 2px 8px rgba(21, 128, 61, 0.1)",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#166534", fontWeight: 800, display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Active Blend Cost
                      </span>
                      <strong style={{ fontSize: "16px", fontWeight: 900, color: "#15803D" }}>
                        ₹{calculations.totalActiveCost.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Modern Ingredient Cards List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {ingredients.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 22px",
                        borderRadius: "18px",
                        border: item.selected ? "1.5px solid #86EFAC" : "1.5px solid #E2E8F0",
                        background: item.selected ? "linear-gradient(135deg, #FFFFFF 0%, #F9FDF9 100%)" : "#FAFAFA",
                        boxShadow: item.selected ? "0 8px 24px -4px rgba(21, 128, 61, 0.08), 0 2px 6px rgba(0,0,0,0.02)" : "none",
                        position: "relative",
                        overflow: "hidden",
                        gap: "18px",
                        flexWrap: "wrap",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {/* Left Subtle Accent Line for Active State */}
                      {item.selected && (
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "4px",
                            background: "linear-gradient(180deg, #15803D 0%, #22C55E 100%)",
                          }}
                        />
                      )}

                      {/* Left: Checkbox + Photo + Details */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 1 340px" }}>
                        {/* Modern Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleIngredient(item.id)}
                          aria-label={`Toggle ${item.name}`}
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "8px",
                            border: item.selected ? "none" : "2px solid #CBD5E1",
                            background: item.selected ? "linear-gradient(135deg, #15803D 0%, #166534 100%)" : "#ffffff",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                            boxShadow: item.selected ? "0 2px 8px rgba(21, 128, 61, 0.35)" : "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {item.selected && <Check size={14} strokeWidth={3.5} />}
                        </button>

                        {/* Rounded Thumbnail with Soft Shadow */}
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "14px",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: "1.5px solid #E2E8F0",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                            background: "#ffffff",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>

                        {/* Title, Botanical, and Description */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <strong style={{ fontSize: "16px", fontWeight: 800, color: item.selected ? "#0F172A" : "#64748B" }}>
                              {item.name}
                            </strong>
                            <span
                              style={{
                                fontSize: "10.5px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                background: item.impact === "High" ? "#FEF2F2" : "#F0FDF4",
                                color: item.impact === "High" ? "#DC2626" : "#15803D",
                                border: item.impact === "High" ? "1px solid #FECACA" : "1px solid #BBF7D0",
                                padding: "2px 8px",
                                borderRadius: "100px",
                              }}
                            >
                              {item.impact} Impact
                            </span>
                          </div>

                          <span style={{ fontSize: "12px", color: "#15803D", fontWeight: 600, display: "block", marginTop: "2px" }}>
                            {item.botanical}
                          </span>
                          <p style={{ fontSize: "12.5px", color: "#475569", margin: "4px 0 0", lineHeight: "1.45" }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center/Right: Dedicated Benchmark Rate Badge */}
                      <div
                        style={{
                          background: item.selected ? "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)" : "#F1F5F9",
                          border: item.selected ? "1px solid #BBF7D0" : "1px solid #E2E8F0",
                          borderRadius: "14px",
                          padding: "8px 16px",
                          textAlign: "right",
                          minWidth: "120px",
                          boxShadow: item.selected ? "0 2px 6px rgba(21, 128, 61, 0.08)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 800,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: item.selected ? "#166534" : "#64748B",
                            display: "block",
                          }}
                        >
                          Benchmark Rate
                        </span>
                        <strong
                          style={{
                            fontSize: "16.5px",
                            fontWeight: 900,
                            color: item.selected ? "#15803D" : "#94A3B8",
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                            display: "block",
                            marginTop: "2px",
                          }}
                        >
                          ₹{calculateIngredientCost(item).toFixed(2)}
                        </strong>
                      </div>

                      {/* Right: Modern Pill Dosage Stepper */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: "#ffffff",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "14px",
                          padding: "4px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                      >
                        <button
                          onClick={() => updateDosage(item.id, -item.dosageStep)}
                          disabled={!item.selected || item.dosage <= item.minDosage}
                          aria-label="Decrease dosage"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "none",
                            background: item.dosage <= item.minDosage ? "transparent" : "#F1F5F9",
                            color: item.dosage <= item.minDosage ? "#CBD5E1" : "#1E293B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: item.dosage <= item.minDosage ? "not-allowed" : "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>

                        <div
                          style={{
                            padding: "0 14px",
                            textAlign: "center",
                            minWidth: "82px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 800,
                              color: item.selected ? "#0F172A" : "#94A3B8",
                              display: "block",
                              lineHeight: 1.2,
                            }}
                          >
                            {item.dosage} <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748B" }}>{item.unit}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => updateDosage(item.id, item.dosageStep)}
                          disabled={!item.selected || item.dosage >= item.maxDosage}
                          aria-label="Increase dosage"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "none",
                            background: item.dosage >= item.maxDosage ? "transparent" : "#F1F5F9",
                            color: item.dosage >= item.maxDosage ? "#CBD5E1" : "#1E293B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: item.dosage >= item.maxDosage ? "not-allowed" : "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 2 Bottom Navigation */}
                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F0F4EF",
                    paddingTop: "20px",
                  }}
                >
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      padding: "12px 22px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#ffffff",
                      fontWeight: 700,
                      color: "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    style={{
                      background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                      color: "#ffffff",
                      padding: "13px 28px",
                      borderRadius: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      boxShadow: "0 6px 18px rgba(21, 128, 61, 0.25)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next: Formulation & Cost
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 3: FORMULATION & COST SIMULATOR (MODERN REDESIGN)
               ---------------------------------------------------- */}
            {currentStep === 3 && (
              <motion.div
                key="modal-step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  border: "1px solid #E5E7EB",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Modern Step 3 Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "16px",
                    borderBottom: "1px solid #F0F4EF",
                    paddingBottom: "18px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "8px",
                      }}
                    >
                      <Sparkles size={12} />
                      <span>STEP 3 • LIVE COST & FORMULATION SIMULATOR</span>
                    </div>
                    <h2 style={{ fontSize: "25px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" }}>
                      Try Different Formulations & Live Economics
                    </h2>
                    <p style={{ color: "#64748B", fontSize: "14px", margin: "4px 0 0" }}>
                      Slide ingredient concentrations to immediately calibrate unit economics, dosage potency, and profit margins.
                    </p>
                  </div>
                </div>

                {/* Side-by-Side Modern Layout */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "28px", alignItems: "start" }} className="formulation-grid">
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                      <thead>
                        <tr style={{ color: "#334155", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left" }}>
                          <th style={{
                            padding: "10px 14px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                            borderLeft: "1px solid #E2E8F0",
                            borderRadius: "10px 0 0 10px",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                              <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#DCFCE7", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Leaf size={12} color="#15803D" />
                              </span>
                              <span>Ingredient</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "10px 14px",
                            minWidth: "240px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                              <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#EFF6FF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <SlidersHorizontal size={12} color="#2563EB" />
                              </span>
                              <span>Your Amount</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "10px 14px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                              <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#F1F5F9", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Scale size={12} color="#475569" />
                              </span>
                              <span>Market Range</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "10px 14px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                              <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#FEF3C7", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={12} color="#D97706" />
                              </span>
                              <span>Impact</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "10px 14px",
                            textAlign: "right",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                            borderRight: "1px solid #E2E8F0",
                            borderRadius: "0 10px 10px 0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "7px" }}>
                              <span>Cost Impact</span>
                              <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#F0FDF4", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <TrendingUp size={12} color="#15803D" />
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredients.filter((i) => i.selected).map((item) => {
                          const cost = calculateIngredientCost(item);
                          return (
                            <tr
                              key={item.id}
                              style={{
                                background: "#FFFFFF",
                                borderRadius: "14px",
                                border: "1.5px solid #E2E8F0",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <td style={{ padding: "14px", borderRadius: "14px 0 0 14px" }}>
                                <strong style={{ fontSize: "14.5px", fontWeight: 800, color: "#0F172A", display: "block" }}>
                                  {item.name}
                                </strong>
                                <span style={{ fontSize: "11.5px", color: "#15803D", fontWeight: 600, display: "block", marginTop: "1px" }}>
                                  {item.botanical}
                                </span>
                              </td>
                              <td style={{ padding: "14px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                  {(() => {
                                    const percent = Math.round(
                                      ((item.dosage - item.minDosage) / (item.maxDosage - item.minDosage)) * 100
                                    );
                                    return (
                                      <input
                                        type="range"
                                        min={item.minDosage}
                                        max={item.maxDosage}
                                        step={item.dosageStep}
                                        value={item.dosage}
                                        onChange={(e) => setDosageDirect(item.id, Number(e.target.value))}
                                        className="modern-pharma-slider"
                                        style={{
                                          flex: 1,
                                          background: `linear-gradient(to right, #15803D 0%, #22C55E ${percent}%, #E2E8F0 ${percent}%, #E2E8F0 100%)`,
                                        }}
                                      />
                                    );
                                  })()}
                                  <span
                                    style={{
                                      minWidth: "75px",
                                      textAlign: "center",
                                      fontSize: "13px",
                                      fontWeight: 800,
                                      color: "#15803D",
                                      background: "#F0FDF4",
                                      border: "1px solid #BBF7D0",
                                      padding: "4px 10px",
                                      borderRadius: "100px",
                                      boxShadow: "0 1px 3px rgba(21, 128, 61, 0.08)",
                                    }}
                                  >
                                    {item.dosage} {item.unit}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: "14px", fontSize: "13px", color: "#64748B", fontWeight: 600 }}>
                                {item.marketRange}
                              </td>
                              <td style={{ padding: "14px" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em",
                                    background: item.impact === "High" ? "#FEF2F2" : item.impact === "Medium" ? "#FFFBEB" : "#F0FDF4",
                                    color: item.impact === "High" ? "#DC2626" : item.impact === "Medium" ? "#D97706" : "#15803D",
                                    border: item.impact === "High" ? "1px solid #FECACA" : item.impact === "Medium" ? "1px solid #FDE68A" : "1px solid #BBF7D0",
                                    padding: "3px 9px",
                                    borderRadius: "100px",
                                  }}
                                >
                                  {item.impact === "High" ? "▲ High" : item.impact === "Medium" ? "▲ Medium" : "● Standard"}
                                </span>
                              </td>
                              <td style={{ padding: "14px", textAlign: "right", borderRadius: "0 14px 14px 0" }}>
                                <strong
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: 900,
                                    color: "#0F172A",
                                    background: "#F8FAFC",
                                    border: "1px solid #E2E8F0",
                                    padding: "4px 10px",
                                    borderRadius: "8px",
                                    display: "inline-block",
                                  }}
                                >
                                  ₹{cost.toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Right: Modern Live Economics Card */}
                  <div
                    style={{
                      background: "linear-gradient(180deg, #FFFFFF 0%, #F9FDF9 100%)",
                      borderRadius: "20px",
                      border: "1.5px solid #86EFAC",
                      padding: "24px 22px",
                      boxShadow: "0 8px 30px -4px rgba(21, 128, 61, 0.12), 0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Top Price Box */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                        border: "1px solid #BBF7D0",
                        padding: "14px 18px",
                        borderRadius: "14px",
                        boxShadow: "0 2px 6px rgba(21, 128, 61, 0.08)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#166534" }}>
                          Total Cost / Unit
                        </span>
                        <span style={{ fontSize: "10.5px", background: "#ffffff", padding: "2px 8px", borderRadius: "100px", color: "#15803D", fontWeight: 800, border: "1px solid #86EFAC" }}>
                          LIVE
                        </span>
                      </div>
                      <div style={{ fontSize: "34px", fontWeight: 900, color: "#15803D", marginTop: "4px", letterSpacing: "-0.02em" }}>
                        ₹{calculations.totalActiveCost.toFixed(2)}
                      </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div style={{ marginTop: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4px", borderBottom: "1px solid #F1F5F0" }}>
                        <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>Suggested MSRP</span>
                        <strong style={{ fontSize: "17px", color: "#0F172A", fontWeight: 800 }}>₹149.00</strong>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4px" }}>
                        <div>
                          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600, display: "block" }}>Your Profit / Unit</span>
                          <span style={{ fontSize: "11.5px", color: "#15803D", fontWeight: 800 }}>
                            {Math.round(((149.0 - calculations.totalActiveCost) / 149.0) * 100)}% Gross Margin
                          </span>
                        </div>
                        <strong style={{ fontSize: "19px", color: "#15803D", fontWeight: 900 }}>
                          ₹{(149.0 - calculations.totalActiveCost).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    {/* Premium Callout */}
                    <div
                      style={{
                        marginTop: "18px",
                        background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
                        border: "1px solid #86EFAC",
                        borderRadius: "14px",
                        padding: "12px 14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#166534", fontWeight: 800, fontSize: "12.5px" }}>
                        <Sparkles size={15} color="#15803D" />
                        <span>High-Margin Formula Profile</span>
                      </div>
                      <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#15803D", lineHeight: 1.45 }}>
                        Balanced active clinical dosing with exceptional commercial retail potential.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 Bottom Navigation */}
                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F0F4EF",
                    paddingTop: "20px",
                  }}
                >
                  <button
                    onClick={() => setCurrentStep(2)}
                    style={{
                      padding: "12px 22px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#ffffff",
                      fontWeight: 700,
                      color: "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    style={{
                      background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                      color: "#ffffff",
                      padding: "13px 28px",
                      borderRadius: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      boxShadow: "0 6px 18px rgba(21, 128, 61, 0.25)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next: Bottle Packaging
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 4: BOTTLE PACKAGING
               ---------------------------------------------------- */}
            {currentStep === 4 && (
              <motion.div
                key="modal-step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 4</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>Choose Bottle Packaging</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Select primary bottle format and material specifications.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px" }}>
                  {BOTTLE_OPTIONS.map((b) => {
                    const isSelected = selectedBottle.id === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBottle(b)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #15803D" : "1px solid #E5E7EB",
                          borderRadius: "14px",
                          padding: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", background: "#15803D", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <img src={b.image} alt={b.name} style={{ height: "110px", width: "100%", objectFit: "contain", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "4px 0" }}>{b.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "#6B7280" }}>{b.subtext}</span>
                        <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>₹{b.price.toFixed(2)} / Unit</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setCurrentStep(3)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={() => setCurrentStep(5)} style={{ background: "#15803D", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>Next: Outer Packaging <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 5: OUTER PACKAGING
               ---------------------------------------------------- */}
            {currentStep === 5 && (
              <motion.div
                key="modal-step5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 5</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>Choose Outer Packaging</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Select secondary outer protective packaging and retail box finish.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px" }}>
                  {OUTER_OPTIONS.map((o) => {
                    const isSelected = selectedOuter.id === o.id;
                    return (
                      <div
                        key={o.id}
                        onClick={() => setSelectedOuter(o)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #15803D" : "1px solid #E5E7EB",
                          borderRadius: "14px",
                          padding: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", background: "#15803D", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <img src={o.image} alt={o.name} style={{ height: "110px", width: "100%", objectFit: "contain", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "4px 0" }}>{o.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "#6B7280" }}>{o.subtext}</span>
                        <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>₹{o.price.toFixed(2)} / Unit</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setCurrentStep(4)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={() => setCurrentStep(6)} style={{ background: "#15803D", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>Next: Label Design <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 6: LABEL DESIGN
               ---------------------------------------------------- */}
            {currentStep === 6 && (
              <motion.div
                key="modal-step6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 6</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>Choose Label Design</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Select front label aesthetic, finish, and printing quality.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px" }}>
                  {LABEL_OPTIONS.map((l) => {
                    const isSelected = selectedLabel.id === l.id;
                    return (
                      <div
                        key={l.id}
                        onClick={() => setSelectedLabel(l)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #15803D" : "1px solid #E5E7EB",
                          borderRadius: "14px",
                          padding: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", background: "#15803D", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <img src={l.image} alt={l.name} style={{ height: "110px", width: "100%", objectFit: "contain", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "4px 0" }}>{l.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "#6B7280" }}>{l.subtext}</span>
                        <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>₹{l.price.toFixed(2)} / Unit</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setCurrentStep(5)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={() => setCurrentStep(7)} style={{ background: "#15803D", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>Next: MOQ & Pricing <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 7: MOQ & SAMPLE (EXACT IMAGE 2)
               ---------------------------------------------------- */}
            {currentStep === 7 && (
              <motion.div
                key="modal-step7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 7</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>MOQ, Pricing & Final Summary</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Choose batch volume to calculate exact unit economics and dispatch lab sample.</p>
                </div>

                {/* MOQ Table */}
                <div style={{ overflowX: "auto", marginBottom: "24px" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                    <thead>
                      <tr style={{ color: "#6B7280", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", textAlign: "left" }}>
                        <th style={{ padding: "8px 14px" }}>Select MOQ (Units)</th>
                        <th style={{ padding: "8px 14px" }}>Total Cost per Unit</th>
                        <th style={{ padding: "8px 14px" }}>Selling Price per Unit</th>
                        <th style={{ padding: "8px 14px" }}>Profit per Unit</th>
                        <th style={{ padding: "8px 14px", textAlign: "right" }}>Est. Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.moqTiers.map((tier) => {
                        const isSelected = selectedMoq === tier.units;
                        return (
                          <tr
                            key={tier.units}
                            onClick={() => setSelectedMoq(tier.units)}
                            style={{
                              background: isSelected ? "#15803D" : "#FAFAF9",
                              color: isSelected ? "#ffffff" : "#111827",
                              cursor: "pointer",
                              borderRadius: "8px",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <td style={{ padding: "14px", fontWeight: 700, fontSize: "14.5px", borderRadius: "8px 0 0 8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: isSelected ? "2px solid #ffffff" : "2px solid #9CA3AF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {isSelected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff" }} />}
                                </div>
                                {tier.units >= 2000 ? "2000+ Units" : `${tier.units} Units`}
                              </div>
                            </td>
                            <td style={{ padding: "14px", fontWeight: 600 }}>₹{tier.unitCost.toFixed(2)}</td>
                            <td style={{ padding: "14px" }}>₹{tier.sellingPrice.toFixed(2)}</td>
                            <td style={{ padding: "14px", fontWeight: 700 }}>
                              ₹{tier.profitPerUnit.toFixed(2)}{" "}
                              <span style={{ fontSize: "12px", color: isSelected ? "#86EFAC" : "#16A34A" }}>({tier.marginPercent}%)</span>
                            </td>
                            <td style={{ padding: "14px", textAlign: "right", fontWeight: 700, borderRadius: "0 8px 8px 0" }}>
                              {typeof tier.estProfit === "number" ? `₹${tier.estProfit.toLocaleString("en-IN")}` : tier.estProfit}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Exact Image 2 Summary & Launch Bar */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 260px",
                    gap: "14px",
                    alignItems: "stretch",
                  }}
                  className="summary-launch-grid"
                >
                  {/* Left Pill: Step 7 Summary - Clickable to open Order Confirmation Popup */}
                  <div
                    onClick={() => setShowOrderConfirmation(true)}
                    role="button"
                    tabIndex={0}
                    title="Click to view Order Confirmation & Invoice"
                    style={{
                      background: "#0D2619",
                      borderRadius: "16px",
                      padding: "20px 18px",
                      color: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 18px rgba(13, 38, 25, 0.25)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 10px 28px rgba(21, 128, 61, 0.4)";
                      e.currentTarget.style.borderColor = "#22C55E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow = "0 4px 18px rgba(13, 38, 25, 0.25)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ display: "inline-block", background: "#15803D", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", textTransform: "uppercase", marginBottom: "6px" }}>
                          STEP 7
                        </span>
                        <span style={{ fontSize: "10.5px", color: "#86EFAC", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}>
                          View Invoice ↗
                        </span>
                      </div>
                      <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0 4px" }}>Summary</h3>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>Review your product and proceed.</p>
                    </div>

                    <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ width: "42px", height: "50px", background: "#C29B38", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                        <div style={{ width: "22px", height: "5px", background: "#E5E7EB", borderRadius: "2px", position: "absolute", top: "-3px" }} />
                        <div style={{ width: "24px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                        <div style={{ width: "24px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                        <div style={{ width: "16px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                      </div>
                    </div>
                  </div>

                  {/* Middle Panel: Your Product Summary */}
                  <div style={{ background: "#FAF8F5", borderRadius: "16px", border: "1px solid #E8E3DA", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Your Product Summary</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "16px" }}>🌿</span>
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Product</span>
                            <strong style={{ fontSize: "12.5px", color: "#111827" }}>{productName} Capsules</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "16px" }}>⏱️</span>
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Formulation Cost</span>
                            <strong style={{ fontSize: "12.5px", color: "#15803D" }}>₹{calculations.totalActiveCost.toFixed(2)} / Cap</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedBottle.image} alt={selectedBottle.name} style={{ width: "28px", height: "34px", objectFit: "contain" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Bottle</span>
                            <strong style={{ fontSize: "12.5px", color: "#111827" }}>{selectedBottle.name}</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedOuter.image} alt={selectedOuter.name} style={{ width: "28px", height: "34px", objectFit: "contain" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Packaging</span>
                            <strong style={{ fontSize: "12.5px", color: "#111827" }}>{selectedOuter.name}</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedLabel.image} alt={selectedLabel.name} style={{ width: "28px", height: "34px", objectFit: "contain" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Label</span>
                            <strong style={{ fontSize: "12.5px", color: "#111827" }}>{selectedLabel.name}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #E5E0D8", display: "flex", justifyContent: "flex-end", gap: "24px" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Your Profit per Unit</span>
                        <strong style={{ fontSize: "16px", color: "#15803D" }}>₹{calculations.currentTier.profitPerUnit.toFixed(2)} ({calculations.currentTier.marginPercent}%)</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Total Investment</span>
                        <strong style={{ fontSize: "16px", color: "#15803D" }}>₹{calculations.totalInvestment.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Ready to Launch? Order Sample Now */}
                  <div style={{ background: "#FAF8F5", borderRadius: "16px", border: "1px solid #E8E3DA", padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Ready to Launch?</h4>
                          <p style={{ fontSize: "11.5px", color: "#4B5563", marginTop: "3px" }}>Get your free sample & start your brand</p>
                        </div>
                        <span style={{ fontSize: "28px" }}>🚀</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSampleOrdered(true)}
                      style={{
                        marginTop: "12px",
                        background: "#15803D",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        boxShadow: "0 4px 14px rgba(21, 128, 61, 0.3)",
                      }}
                    >
                      Order Sample Now
                    </button>
                  </div>
                </div>

                {/* Inline Sample Confirmation Alert / Form */}
                {sampleOrdered && (
                  <div style={{ marginTop: "24px", padding: "20px", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "14px", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "#15803D", color: "#ffffff", marginBottom: "10px" }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0D2619", margin: "0 0 6px" }}>Sample Request Dispatched to Zenon Cleanrooms!</h3>
                    <p style={{ fontSize: "13.5px", color: "#166534", margin: 0, lineHeight: 1.5 }}>
                      We have registered your formulation order for <strong>{productName}</strong> ({selectedMoq} Units batch scale). Our lab team will courier your sample batch with Certificate of Analysis (CoA) within 48 hours.
                    </p>
                  </div>
                )}

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setCurrentStep(6)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={onClose} style={{ background: "#0D2619", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer" }}>Finish & Close</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Order Confirmation & Invoice Modal (Exact Image 1 Spec) */}
      <OrderConfirmationModal
        isOpen={showOrderConfirmation}
        onClose={() => setShowOrderConfirmation(false)}
        data={{
          productTitle: `${productName} Capsules`,
          productImage: selectedBottle.image || "/packaging/hdpe_white.jpg",
          bottleName: selectedBottle.name,
          outerName: selectedOuter.name,
          labelName: selectedLabel.name,
          quantity: selectedMoq,
          unitPrice: calculations.currentTier.sellingPrice,
          discountPerUnit: 15.0,
          totalInvestment: calculations.totalInvestment,
          profitPerUnit: calculations.currentTier.profitPerUnit,
          customerName: sampleForm.name || "Vikram Malhotra",
          customerAddress: sampleForm.address || "Plot 42, Okhla Industrial Area Ph-III",
          customerCityState: "New Delhi, Delhi",
          customerZip: "110020",
          customerCountry: "India",
          paymentMethod: "Visa **** 4242",
          shippingMethod: "Standard shipping",
          orderId: "ID12345",
        }}
      />
    </div>
  );
}
