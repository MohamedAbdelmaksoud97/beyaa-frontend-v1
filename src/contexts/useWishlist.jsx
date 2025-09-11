import { useEffect, useState } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ---- Wishlist Actions ----
  const addToWishlist = (product, size = null) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.productId === product._id && item.size === size,
      );
      if (exists) return prev; // already in wishlist
      return [
        ...prev,
        {
          productId: product._id || product.productId,
          name: product.name,
          price: product.price,
          size,
          images: product.images,
          color: product.color,
        },
      ];
    });
  };

  const removeFromWishlist = (productId, size = null) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  };

  const clearWishlist = () => setWishlist([]);

  const totalItems = wishlist.length;

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    totalItems,
  };
}
