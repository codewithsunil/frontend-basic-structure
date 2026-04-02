// assets/js/config/apiConfig.js

import { getEnv } from "./envHelper.js";
import { APP_CONFIG } from "./appConfig.js";

// 🔹 Base Config
export const API_BASE_URL = getEnv("API_BASE_URL", "");
export const TIMEOUT = getEnv("TIMEOUT", 10000);

// 🔐 Token helpers
export function getAuthToken() {
  return localStorage.getItem("auth_token") || null;
}

export function setAuthToken(token) {
  localStorage.setItem("auth_token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("auth_token");
}

// 🔹 Build Headers
export function getHeaders(options = {}, customHeaders = {}) {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    Accept: "application/json",

    // 🔑 Always send API key
    "X-API-KEY": getEnv("API_KEY", ""),

    // 📱 App Info
    "X-APP-TYPE": APP_CONFIG.APP_TYPE,
    "X-APP-VERSION": APP_CONFIG.APP_VERSION,

    // 🔐 Auth token (optional)
    ...(options.requireAuth !== false &&
      token && {
        Authorization: `Bearer ${token}`,
      }),

    ...customHeaders,
  };
}

// 🔹 Build URL
export function buildUrl(endpoint = "") {
  return `${API_BASE_URL}${endpoint}`;
}
