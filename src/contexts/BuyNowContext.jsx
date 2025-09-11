"use client";
import React, { createContext, useContext, useState } from "react";

const BuyNowContext = createContext();

export function BuyNowProvider({ children }) {
  const [buyNowProduct, setBuyNowProduct] = useState(null);

  return (
    <BuyNowContext.Provider value={{ buyNowProduct, setBuyNowProduct }}>
      {children}
    </BuyNowContext.Provider>
  );
}

export function useBuyNow() {
  const ctx = useContext(BuyNowContext);
  if (!ctx) {
    throw new Error("useBuyNow must be used inside a BuyNowProvider");
  }
  return ctx;
}
