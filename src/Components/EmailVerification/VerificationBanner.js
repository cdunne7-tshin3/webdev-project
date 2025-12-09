// src/Components/EmailVerification/VerificationBanner.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

const VerificationBanner = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      setIsVerified(true); // Hide banner if no user
      return;
    }

    // Explicitly check customEmailVerified field
    const verified = currentUser.get("customEmailVerified");
    console.log("customEmailVerified value:", verified); // Debug log
    console.log("User email:", currentUser.get("email")); // Debug log

    // Treat undefined, null, or false as "not verified"
    const isActuallyVerified = verified === true;
    setIsVerified(isActuallyVerified);

    // Check if user has dismissed the banner in this session
    const wasDismissed = sessionStorage.getItem("verificationBannerDismissed");
    setDismissed(wasDismissed === "true");
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("verificationBannerDismissed", "true");
  };

  if (isVerified || dismissed) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#fff3cd",
        borderBottom: "2px solid #FF9800",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontSize: "24px" }}>⚠️</span>
        <div>
          <strong style={{ fontSize: "16px" }}>Email Not Verified</strong>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
            Please verify your email address to ensure account security.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link
          to="/verify-email"
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF9800",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Verify Now
        </Link>
        <button
          onClick={handleDismiss}
          style={{
            padding: "8px 12px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#999",
          }}
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VerificationBanner;
