// api/products.js
const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchProducts(storeId) {
  const res = await fetch(`${API_BASE}/${storeId}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log(data);
  return data.data;
}

export async function fetchOneProduct(id) {
  // 👇 storeId was hardcoded before — you probably want it dynamic
  const storeId = "6899413d48aa030033f87755";
  const res = await fetch(`${API_BASE}/${storeId}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  console.log(data);
  return data.data;
}

// services/products.js
export async function createProduct(formValues, storeId) {
  const url = `${API_BASE}/${storeId}/createProduct`;
  console.log(storeId);

  const fd = new FormData();
  // primitives
  fd.append("name", formValues.name);
  fd.append("description", formValues.description || "");
  fd.append("price", String(formValues.price));
  fd.append("color", formValues.color || "");
  fd.append("isTrending", String(formValues.isTrending));

  // arrays
  fd.append("availableSize", JSON.stringify(formValues.availableSize || []));
  fd.append("tags", JSON.stringify(formValues.tags || []));

  // images (up to 2)
  if (Array.isArray(formValues.images)) {
    formValues.images.slice(0, 2).forEach((file) => {
      if (file instanceof File) fd.append("images", file);
    });
  }

  const res = await fetch(url, {
    method: "POST",
    body: fd,
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create product");
  }
  return data;
}

export async function deleteProduct(slug, productId) {
  const res = await fetch(`${API_BASE}/${slug}/products/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Failed to delete product");
  }

  return true;
}
