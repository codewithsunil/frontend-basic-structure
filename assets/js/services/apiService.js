// services/apiService.js

import { buildUrl, getHeaders, TIMEOUT } from "../config/apiConfig.js";

export async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(buildUrl(endpoint), {
      method: options.method || "GET",
      headers: getHeaders(options, options.headers),
      body: options.body ? JSON.stringify(options.body) : null,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || "API Error",
        data: errorData,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}
