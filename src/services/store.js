// services/store.js
import { parseJsonSafe, makeApiError } from "./http";
// ✅ Centralized API base (switches between dev & prod automatically)
const API_BASE = import.meta.env.VITE_API_BASE;

// services/store.js

export async function createStore(storeInfo) {
  const res = await fetch(`${API_BASE}/createStore`, {
    method: "POST",
    body: storeInfo,
    credentials: "include",
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    throw makeApiError(res, data, "Create store failed"); // ✅ keeps fields
  }

  return data;
}

export async function updateStore(storeInfo, storeId) {
  const res = await fetch(`${API_BASE}/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeInfo),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data.data;
}

export async function getMyStore() {
  const res = await fetch(`${API_BASE}/getMyStore`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data.data;
}

export async function getStore(storeSlug) {
  const res = await fetch(`${API_BASE}/${storeSlug}`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data.data;
}

export async function updateStoreBrand(formData, storeId) {
  const res = await fetch(`${API_BASE}/${storeId}`, {
    method: "PATCH",
    body: formData, // FormData
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Update failed");
  }

  return data;
}

export async function addBanner(storeId, formData) {
  const res = await fetch(`${API_BASE}/${storeId}/banners`, {
    method: "POST",
    body: formData, // FormData with fields: image, title, startDate, endDate, etc.
    credentials: "include",
  });
  const data = await parseJsonSafe(res);

  if (!res.ok) {
    throw makeApiError(res, data, "Add banner failed"); // ✅ keeps fields
  }

  return data.data; // returns updated banners array
}

export async function removeBanner(storeId, bannerId) {
  const res = await fetch(`${API_BASE}/${storeId}/banners/${bannerId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || "Remove banner failed");
  }

  return true; // success, no content (204)
}
