// src/Components/EmailVerification/EmailVerification.js
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getCurrentUserVerificationStatus,
  sendVerificationEmailToCurrentUser,
  verifyEmailWithToken,
  resendVerificationEmail,
} from "../../Common/Services/EmailVerificationService";
import Parse from "parse";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isVerified, setIsVerified] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkVerificationStatus();

    // If there's a token in URL, verify it
    if (token) {
      handleTokenVerification(token);
    }
  }, [token]);

  const checkVerificationStatus = () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserEmail(currentUser.get("email") || "");
      setIsVerified(getCurrentUserVerificationStatus());
    }
  };

  const handleTokenVerification = async (verificationToken) => {
    setVerifying(true);
    try {
      const result = await verifyEmailWithToken(verificationToken);
      if (result.success) {
        setIsVerified(true);
        setMessage("✅ " + result.message);
        // Remove token from URL
        setTimeout(() => {
          navigate("/verify-email", { replace: true });
        }, 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Error verifying email: " + error.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleSendVerification = async () => {
    setSending(true);
    setMessage("");

    try {
      const result = await sendVerificationEmailToCurrentUser();
      setMessage(
        `✅ ${result.message}\n\n📧 Check your inbox for the verification link!\n\n(Demo: Click here to verify with token: ${result.token})`
      );
    } catch (error) {
      setMessage("Failed to send verification email: " + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleResendEmail = async () => {
    setSending(true);
    setMessage("");

    try {
      const result = await resendVerificationEmail();
      setMessage(`✅ Verification email resent to ${result.email}`);
    } catch (error) {
      setMessage("Failed to resend email: " + error.message);
    } finally {
      setSending(false);
    }
  };

  // Demo function to simulate clicking email link
  const handleDemoVerify = (demoToken) => {
    if (demoToken) {
      handleTokenVerification(demoToken);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Email Verification</h1>

      <div style={{ marginBottom: "20px" }}>
        <a href="/home" style={{ color: "#008CBA" }}>
          ← Back to Home
        </a>
      </div>

      {verifying ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
          }}
        >
          <h2>Verifying your email...</h2>
          <p>Please wait while we confirm your email address.</p>
        </div>
      ) : isVerified ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            border: "2px solid #4CAF50",
          }}
        >
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
          <h2 style={{ color: "#4CAF50", marginBottom: "15px" }}>
            Email Verified!
          </h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "10px" }}>
            {userEmail}
          </p>
          <p style={{ color: "#666" }}>
            Your email address has been successfully verified. You have full
            access to all platform features.
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              padding: "30px",
              backgroundColor: "#fff3cd",
              borderRadius: "8px",
              border: "2px solid #FF9800",
              marginBottom: "30px",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>⚠️</div>
            <h2 style={{ marginBottom: "15px" }}>Email Not Verified</h2>
            <p style={{ fontSize: "16px", marginBottom: "15px" }}>
              Your email address <strong>{userEmail}</strong> has not been
              verified yet.
            </p>
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}
            >
              Please verify your email to ensure you can recover your account
              and receive important notifications.
            </p>

            <button
              onClick={handleSendVerification}
              disabled={sending}
              style={{
                padding: "12px 24px",
                backgroundColor: sending ? "#ccc" : "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: sending ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {sending ? "Sending..." : "📧 Send Verification Email"}
            </button>
          </div>

          {message && (
            <div
              style={{
                padding: "20px",
                backgroundColor: message.startsWith("✅")
                  ? "#e8f5e9"
                  : "#ffebee",
                borderRadius: "8px",
                border: `2px solid ${
                  message.startsWith("✅") ? "#4CAF50" : "#f44336"
                }`,
                marginBottom: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}

              {/* Demo: Extract token from message and create clickable link */}
              {message.includes("token:") && (
                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={() => {
                      const tokenMatch = message.match(/token: (\w+)/);
                      if (tokenMatch) {
                        handleDemoVerify(tokenMatch[1]);
                      }
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#008CBA",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🔗 Click Here to Verify (Demo)
                  </button>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "10px",
                    }}
                  >
                    In production, you would click the link in your email
                    instead.
                  </p>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>How it works:</h3>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>Click "Send Verification Email" above</li>
              <li>Check your inbox for an email from the platform</li>
              <li>Click the verification link in the email</li>
              <li>Your email will be verified automatically</li>
            </ol>

            <p style={{ fontSize: "12px", color: "#666", marginTop: "15px" }}>
              <strong>Note:</strong> In this demo environment, a mock token is
              displayed. In production, you would receive a real email with a
              verification link.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
