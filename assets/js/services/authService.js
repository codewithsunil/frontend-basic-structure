// assets/js/services/authService.js

import { apiRequest } from "./apiService.js";
import { setAuthToken, clearAuthToken } from "../config/apiConfig.js";

// 🔹 Step 1: Login (send OTP)
export async function login(payload) {
  return apiRequest("/login", {
    method: "POST",
    body: payload,
    requireAuth: false,
  });
}

// 🔹 Step 2: Verify OTP
export async function verifyOtp(payload) {
  const res = await apiRequest("/verify-otp", {
    method: "POST",
    body: payload,
    requireAuth: false,
  });

  // ✅ Expect token after verification
  if (!res.token) {
    throw new Error("OTP verification failed: Token not received");
  }

  setAuthToken(res.token);

  return res;
}

// 🔹 Step 3: Resend OTP
export async function resendOtp(payload) {
  return apiRequest("/resend-otp", {
    method: "POST",
    body: payload,
    requireAuth: false,
  });
}

// 🔹 Logout
export function logout() {
  clearAuthToken();
}
