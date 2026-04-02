import { buildUrl, getHeaders } from "../config/apiConfig.js";
import { loader } from "../components/loader.js";
import { toast } from "../components/toast.js";

export async function apiRequest(endpoint, options = {}) {
  loader.show();

  try {
    const res = await fetch(buildUrl(endpoint), {
      method: options.method || "GET",
      headers: getHeaders(options, options.headers),
      body: options.body ? JSON.stringify(options.body) : null,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "API Error");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    toast.show(err.message, "error");
    throw err;
  } finally {
    loader.hide();
  }
}
