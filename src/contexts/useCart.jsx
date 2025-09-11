import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ---- Actions (all immutable updates to trigger rerenders) ----
  const addToCart = (product, quantity = 1, size = null) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product._id && item.size === size,
      );
      if (idx >= 0) {
        const updated = [...prev];
        const item = updated[idx];
        const newQty = item.quantity + quantity;
        updated[idx] = {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty,
        };
        // move to top
        const [moved] = updated.splice(idx, 1);
        return [moved, ...updated];
      }
      return [
        {
          productId: product._id,
          name: product.name,
          images: product.images,
          size,
          quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
        },
        ...prev,
      ];
    });
  };

  const removeFromCart = (productId, size = null) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  // ---- Derived values (memoized) ----
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const grandTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.totalPrice, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      grandTotal,
    }),
    [cart, totalItems, grandTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
