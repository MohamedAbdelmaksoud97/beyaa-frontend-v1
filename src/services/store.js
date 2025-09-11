// services/store.js

// ✅ Centralized API base (switches between dev & prod automatically)
const API_BASE = import.meta.env.VITE_API_BASE;

export async function createStore(storeInfo) {
  const res = await fetch(`${API_BASE}/createStore`, {
    method: "POST",
    body: storeInfo, // FormData
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message);
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
