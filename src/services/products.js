// api/products.js
export async function fetchProducts(storeId) {
  const res = await fetch(`http://localhost:3000/api/v1/${storeId}/products`); // replace with your API
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log(data);
  return data.data;
}
export async function fetchOneProduct(id) {
  const res = await fetch(
    `http://localhost:3000/api/v1/6899413d48aa030033f87755/products/${id}`,
  ); // replace with your API
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log(data);
  return data.data;
}

// services/products.js
export async function createProduct(formValues, storeId) {
  const url = `http://localhost:3000/api/v1/${storeId}/createProduct`;

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
  const res = await fetch(
    `http://localhost:3000/api/v1/${slug}/products/${productId}`,
    {
      method: "DELETE",
      credentials: "include", // keep cookies/JWT if needed
    },
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Failed to delete product");
  }

  return true;
}
