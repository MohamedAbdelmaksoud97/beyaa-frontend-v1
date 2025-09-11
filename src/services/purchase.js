export async function createPurchase({ payload, slug }) {
  console.log(slug);
  const res = await fetch(
    `http://localhost:3000/api/v1/${slug}/createPurchase`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // <--- important
      body: JSON.stringify(payload), // <--- stringify object
      credentials: "include", // keep if you use cookies/JWT
    },
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    throw new Error(data?.message);
  }

  return data;
}
// services/orders.js
// services/purchase.js
export async function fetchOrders(slug) {
  const res = await fetch(`http://localhost:3000/api/v1/${slug}/purchases`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch orders");
  }

  return data.data; // 👈 only return the array
}

export async function updateOrderStatus({ slug, orderId, status }) {
  const res = await fetch(
    `http://localhost:3000/api/v1/${slug}/purchases/${orderId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to update status");
  }
  return data;
}
