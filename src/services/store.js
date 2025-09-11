export async function createStore(storeInfo) {
  const res = await fetch("http://localhost:3000/api/v1/createStore", {
    method: "POST",
    //headers: { "Content-Type": "multipart/form-data" },
    body: storeInfo,
    credentials: "include", // keep if you use cookies/JWT
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    throw new Error(data?.message);
  }

  return data;
}
export async function updateStore(storeInfo, storeId) {
  const res = await fetch(`http://localhost:3000/api/v1/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    //headers: { "Content-Type": "multipart/form-data" },
    body: JSON.stringify(storeInfo),
    credentials: "include", // keep if you use cookies/JWT
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    throw new Error(data?.message);
  }

  return data.data;
}
export async function getMyStore() {
  const res = await fetch("http://localhost:3000/api/v1/getMyStore", {
    credentials: "include", // keep if you use cookies/JWT
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    throw new Error(data?.message);
  }

  return data.data;
}
export async function getStore(storeSlug) {
  const res = await fetch(
    `https://beyaa-api-env.eba-qwicqvfm.eu-north-1.elasticbeanstalk.com/api/v1/${storeSlug}`,
    {
      credentials: "include", // keep if you use cookies/JWT
    },
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    throw new Error(data?.message);
  }

  return data.data;
}

// services/store.js

// ...your other imports/exports here

export async function updateStoreBrand(formData, storeId) {
  // Do NOT set Content-Type; the browser will add the correct multipart boundary
  const res = await fetch(`http://localhost:3000/api/v1/${storeId}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Update failed");
  }
  return data;
}
