"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ArrowRight,
  QrCode,
  Check,
  RefreshCw,
} from "lucide-react";

export interface RazorpayPaymentDetails {
  paymentId: string;
  orderId: string;
  amount: number;
  productName: string;
  method: string;
}

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  bottleName?: string;
  amount?: number; // In INR, default 99
  onSuccess: (details: RazorpayPaymentDetails) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  productName,
  bottleName = "HDPE White Bottle",
  amount = 99,
  onSuccess,
}: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>("gpay");
  const [customUpiId, setCustomUpiId] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState("HDFC");

  // Wallet state
  const [selectedWallet, setSelectedWallet] = useState("amazonpay");

  // Payment status
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form");
  const [generatedPaymentId, setGeneratedPaymentId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPaymentStep("form");
      setIsProcessing(false);
      const randId = "pay_" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setGeneratedPaymentId(randId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    // Simulate authentic Razorpay transaction flow
    setTimeout(() => {
      setPaymentStep("success");
      setIsProcessing(false);

      setTimeout(() => {
        onSuccess({
          paymentId: generatedPaymentId,
          orderId: "order_VDC" + Math.floor(100000 + Math.random() * 900000),
          amount,
          productName,
          method: activeTab.toUpperCase(),
        });
      }, 1400);
    }, 1800);
  };

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 16);
    const parts = cleaned.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(" "));
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 2) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          background: "rgba(12, 35, 64, 0.78)",
          backdropFilter: "blur(8px)",
          overflowY: "auto",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isProcessing) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            background: "#FFFFFF",
            borderRadius: "18px",
            boxShadow:
              "0 25px 60px -15px rgba(12, 35, 64, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            color: "#0c2340",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* RAZORPAY BRANDED HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #0C2340 0%, #0F325E 100%)",
              color: "#FFFFFF",
              padding: "20px 22px",
              position: "relative",
            }}
          >
            {/* Close Button */}
            {!isProcessing && (
              <button
                onClick={onClose}
                aria-label="Close Razorpay Checkout"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#FFFFFF",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
              >
                <X size={17} />
              </button>
            )}

            {/* Top Bar with Razorpay Logo & Test Mode */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", paddingRight: "36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Official Razorpay angled R SVG */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "#0c2340",
                    border: "1px solid #1c3d69",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14.5 4L7 14H12L9.5 20L17 10H12L14.5 4Z"
                      fill="#3399CC"
                    />
                  </svg>
                </div>
                <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                  Razorpay
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    background: "#3399CC",
                    color: "#FFFFFF",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Standard
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "10.5px",
                  color: "#86EFAC",
                  background: "rgba(21, 128, 61, 0.25)",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  border: "1px solid rgba(134, 239, 172, 0.3)",
                }}
              >
                <Lock size={11} />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Merchant Details & Payable Amount */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>Varadaco Industries</span>
                  <div style={{ background: "#22C55E", borderRadius: "50%", width: "13px", height: "13px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={9} color="#FFFFFF" strokeWidth={3} />
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)", marginTop: "2px" }}>
                  {productName} Cleanroom Sample Kit ({bottleName})
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.65)", display: "block" }}>Amount Payable</span>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF" }}>₹{amount}.00</span>
              </div>
            </div>

            {/* Refundable Badge */}
            <div
              style={{
                marginTop: "10px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "11px",
                color: "#E2E8F0",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>✨ 100% Refundable Sample Courier Deposit against bulk manufacturing order</span>
            </div>
          </div>

          {/* PAYMENT BODY */}
          {paymentStep === "form" && (
            <div>
              {/* Payment Method Tabs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  background: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                {[
                  { id: "upi", label: "UPI / QR", icon: Smartphone },
                  { id: "card", label: "Cards", icon: CreditCard },
                  { id: "netbanking", label: "Netbanking", icon: Building2 },
                  { id: "wallet", label: "Wallets", icon: Wallet },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      style={{
                        padding: "12px 6px",
                        border: "none",
                        background: isActive ? "#FFFFFF" : "transparent",
                        borderBottom: isActive ? "2.5px solid #2B84EA" : "2.5px solid transparent",
                        color: isActive ? "#2B84EA" : "#64748B",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div style={{ padding: "20px 22px", minHeight: "230px" }}>
                {/* 1. UPI TAB */}
                {activeTab === "upi" && (
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "12px" }}>
                      Instant Pay with UPI Apps
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                      {[
                        { id: "gpay", name: "Google Pay", icon: "🌐", bg: "#F8FAFC", border: "#E2E8F0" },
                        { id: "phonepe", name: "PhonePe", icon: "🟣", bg: "#F8FAFC", border: "#E2E8F0" },
                        { id: "paytm", name: "Paytm UPI", icon: "🔵", bg: "#F8FAFC", border: "#E2E8F0" },
                        { id: "cred", name: "CRED UPI", icon: "⚫", bg: "#F8FAFC", border: "#E2E8F0" },
                      ].map((app) => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedUpiApp(app.id)}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: selectedUpiApp === app.id ? "1.8px solid #2B84EA" : "1px solid #E2E8F0",
                            background: selectedUpiApp === app.id ? "#EFF6FF" : "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            transition: "all 0.18s ease",
                          }}
                        >
                          <span style={{ fontSize: "18px" }}>{app.icon}</span>
                          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#1E293B" }}>{app.name}</span>
                          {selectedUpiApp === app.id && (
                            <div style={{ marginLeft: "auto", width: "16px", height: "16px", borderRadius: "50%", background: "#2B84EA", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* QR Code toggle or Custom UPI ID */}
                    <div style={{ borderTop: "1px dashed #E2E8F0", paddingTop: "14px", marginTop: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Or enter UPI ID / VPA</span>
                        <button
                          onClick={() => setShowQrCode(!showQrCode)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#2B84EA",
                            fontSize: "11.5px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <QrCode size={13} />
                          {showQrCode ? "Hide QR" : "Show QR"}
                        </button>
                      </div>

                      {showQrCode ? (
                        <div style={{ textAlign: "center", padding: "12px", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                          <div
                            style={{
                              width: "120px",
                              height: "120px",
                              margin: "0 auto 8px",
                              background: "#FFFFFF",
                              border: "2px solid #0c2340",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <QrCode size={96} color="#0c2340" />
                            <div style={{ position: "absolute", width: "24px", height: "24px", background: "#3399CC", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "12px", fontWeight: 800 }}>
                              R
                            </div>
                          </div>
                          <div style={{ fontSize: "11px", color: "#64748B" }}>Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)</div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@upi or name@okhdfcbank"
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            fontSize: "12.5px",
                            outline: "none",
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 2. CARDS TAB */}
                {activeTab === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => formatCardNumber(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "13px",
                          letterSpacing: "0.08em",
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => formatExpiry(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            fontSize: "12.5px",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            fontSize: "12.5px",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Vikram Malhotra"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "12.5px",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* 3. NETBANKING TAB */}
                {activeTab === "netbanking" && (
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "10px" }}>
                      Popular Banks
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra"].map((bank) => (
                        <div
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          style={{
                            padding: "9px 10px",
                            borderRadius: "8px",
                            border: selectedBank === bank ? "1.8px solid #2B84EA" : "1px solid #E2E8F0",
                            background: selectedBank === bank ? "#EFF6FF" : "#FFFFFF",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#1E293B",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{bank}</span>
                          {selectedBank === bank && <Check size={12} color="#2B84EA" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. WALLETS TAB */}
                {activeTab === "wallet" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {["Amazon Pay", "Mobikwik", "Airtel Payments Bank"].map((w) => (
                      <div
                        key={w}
                        onClick={() => setSelectedWallet(w)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: selectedWallet === w ? "1.8px solid #2B84EA" : "1px solid #E2E8F0",
                          background: selectedWallet === w ? "#EFF6FF" : "#FFFFFF",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{w}</span>
                        {selectedWallet === w && <Check size={12} color="#2B84EA" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER CTA & SECURITY */}
              <div style={{ padding: "0 22px 22px" }}>
                <button
                  onClick={handlePay}
                  style={{
                    width: "100%",
                    background: "#2B84EA",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(43, 132, 234, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D72D6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2B84EA")}
                >
                  <Lock size={15} />
                  <span>Pay ₹{amount}.00</span>
                  <ArrowRight size={15} />
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "12px",
                    fontSize: "11px",
                    color: "#64748B",
                  }}
                >
                  <ShieldCheck size={13} color="#16A34A" />
                  <span>Secured by Razorpay • UPI / Cards / Netbanking Protected</span>
                </div>
              </div>
            </div>
          )}

          {/* PROCESSING STATE */}
          {paymentStep === "processing" && (
            <div style={{ padding: "50px 24px", textAlign: "center" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "50%",
                  border: "4px solid #E2E8F0",
                  borderTopColor: "#2B84EA",
                  margin: "0 auto 20px",
                }}
              />
              <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0C2340", margin: "0 0 6px" }}>
                Processing with Razorpay...
              </h4>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                Authorizing secure payment with your bank/UPI provider
              </p>
              <div style={{ marginTop: "16px", fontSize: "11.5px", color: "#94A3B8" }}>
                Please do not refresh or close this window
              </div>
            </div>
          )}

          {/* SUCCESS STATE */}
          {paymentStep === "success" && (
            <div style={{ padding: "40px 24px 34px", textAlign: "center" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 6px 20px rgba(22, 163, 74, 0.25)",
                }}
              >
                <CheckCircle2 size={34} />
              </motion.div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0D2619", margin: "0 0 6px" }}>
                Payment Successful!
              </h3>
              <p style={{ fontSize: "13.5px", color: "#166534", margin: "0 0 16px", lineHeight: 1.4 }}>
                Razorpay has processed your sample courier dispatch fee.
              </p>

              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  maxWidth: "340px",
                  margin: "0 auto",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "#64748B" }}>Payment ID:</span>
                  <strong style={{ color: "#0F172A", fontFamily: "monospace" }}>{generatedPaymentId}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "#64748B" }}>Amount Paid:</span>
                  <strong style={{ color: "#16A34A" }}>₹{amount}.00</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748B" }}>Status:</span>
                  <strong style={{ color: "#16A34A" }}>Confirmed & Dispatched</strong>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
