/**
 * Thin fetch wrapper for the future backend.
 *
 * Nothing in the current UI calls this yet — it's here so that, when a
 * backend exists (e.g. to save contact/quote submissions, list live
 * inventory, etc.), you only need to:
 *   1. set VITE_API_BASE_URL in .env (see .env.example)
 *   2. call api.get/post/put/del from a component or a new file in src/services
 *
 * Example:
 *   import { api } from "../services/api";
 *   await api.post("/quotes", { name, phone, facilityType, ... });
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API ${method} ${path} failed (${res.status}): ${message}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
};
