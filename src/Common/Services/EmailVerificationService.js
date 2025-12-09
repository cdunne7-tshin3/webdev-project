// src/Common/Services/EmailVerificationService.js
import Parse from "parse";

// Validate email format
export const isValidEmailFormat = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if email domain exists (basic check)
export const validateEmailDomain = (email) => {
  if (!email) return false;

  const domain = email.split("@")[1];
  if (!domain) return false;

  // List of common valid domains
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "gmx.com",
    "fastmail.com",
    "nd.edu",
    "edu",
    "ac.uk",
    "edu.au", // Educational domains
  ];

  // Check if it's a common domain or ends with .edu
  return (
    commonDomains.some((d) => domain === d || domain.endsWith("." + d)) ||
    domain.endsWith(".edu") ||
    domain.endsWith(".ac.uk")
  );
};

// Get current user's email verification status
export const getCurrentUserVerificationStatus = () => {
  const currentUser = Parse.User.current();
  if (!currentUser) return false;

  return currentUser.get("customEmailVerified") || false;
};

// Send verification email to current user
export const sendVerificationEmailToCurrentUser = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const email = currentUser.get("email");

  if (!email) {
    throw new Error("User has no email address");
  }

  if (!isValidEmailFormat(email)) {
    throw new Error("Invalid email format");
  }

  // In a real application, you would:
  // 1. Generate a verification token
  // 2. Send email via SendGrid, AWS SES, or similar service
  // 3. Include a verification link with the token

  console.log(`Verification email would be sent to: ${email}`);

  // Generate a mock verification token
  const verificationToken = Math.random().toString(36).substring(2, 15);

  // Store the token in sessionStorage for demo (in production, use backend)
  sessionStorage.setItem(
    `verificationToken_${currentUser.id}`,
    verificationToken
  );
  sessionStorage.setItem(
    `tokenExpiry_${currentUser.id}`,
    Date.now() + 24 * 60 * 60 * 1000
  );

  console.log(
    `Verification link: ${window.location.origin}/verify-email?token=${verificationToken}`
  );

  // Simulate email sending delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Verification email sent to ${email}`,
        email: email,
        token: verificationToken, // Only for demo purposes
      });
    }, 1000);
  });
};

// Verify email with token
export const verifyEmailWithToken = async (token) => {
  if (!token) {
    return { success: false, message: "No verification token provided" };
  }

  const currentUser = Parse.User.current();
  if (!currentUser) {
    return { success: false, message: "No user logged in" };
  }

  // Get stored token from sessionStorage
  const storedToken = sessionStorage.getItem(
    `verificationToken_${currentUser.id}`
  );
  const tokenExpiry = sessionStorage.getItem(`tokenExpiry_${currentUser.id}`);

  // Check if token matches
  if (storedToken !== token) {
    return { success: false, message: "Invalid verification token" };
  }

  // Check if token is expired
  if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
    return { success: false, message: "Verification token has expired" };
  }

  // Mark email as verified
  currentUser.set("customEmailVerified", true);

  try {
    await currentUser.save();

    // Clean up stored tokens
    sessionStorage.removeItem(`verificationToken_${currentUser.id}`);
    sessionStorage.removeItem(`tokenExpiry_${currentUser.id}`);

    return { success: true, message: "Email verified successfully!" };
  } catch (error) {
    console.error("Error verifying email:", error);
    return {
      success: false,
      message: "Failed to verify email: " + error.message,
    };
  }
};

// Manually mark current user's email as verified (admin function)
export const markCurrentUserEmailVerified = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  currentUser.set("customEmailVerified", true);

  try {
    await currentUser.save();
    return { success: true, message: "Email marked as verified" };
  } catch (error) {
    console.error("Error marking email as verified:", error);
    throw error;
  }
};

// Resend verification email
export const resendVerificationEmail = async () => {
  return await sendVerificationEmailToCurrentUser();
};
