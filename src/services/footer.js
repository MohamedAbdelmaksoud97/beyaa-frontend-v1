// services/footer.js

// 🚨 Adjust this if your backend is mounted differently.
// If your footer route is actually /api/v1/:id/footer (without /stores),
// change API_BASE to "/api/v1" instead of "/api/v1/stores".
const API_BASE = import.meta.env.VITE_API_BASE;

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    credentials: "include", // send cookies (if you use cookie-based auth)
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || "Something went wrong";
    throw new Error(message);
  }

  return data;
}

// CREATE footer for a store
export async function createFooter(storeId, payload) {
  const body = await jsonFetch(`${API_BASE}/${storeId}/footer`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // backend returns: { status: "success", data: store.footer }
  return body?.data ?? body;
}

// UPDATE footer for a store
export async function updateFooter(storeId, payload) {
  const body = await jsonFetch(`${API_BASE}/${storeId}/footer`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return body?.data ?? body;
}

// services/footer.js

// Delete one footer element (socialLinks OR quickLinks)
export async function deleteFooterElement(storeId, section, key) {
  const res = await fetch(`${API_BASE}/${storeId}/footer/${section}/${key}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete element");

  return data.data; // updated footer
}
