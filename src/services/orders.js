// services/orders.js
const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchOrders(slug) {
  const res = await fetch(`${API_BASE}/${slug}/purchases`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch orders");
  }

  return data?.data;
}

export async function updateOrderStatus({ slug, orderId, status }) {
  const res = await fetch(`${API_BASE}/${slug}/purchases/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update status");
  }

  return data;
}

export async function deletePurchase({ slug, orderId }) {
  const res = await fetch(`${API_BASE}/${slug}/purchases/${orderId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Failed to delete purchase");
  }

  return true;
}
