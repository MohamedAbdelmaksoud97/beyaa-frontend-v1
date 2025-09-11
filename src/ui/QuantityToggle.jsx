import { useCart } from "@/contexts/useCart";
import { useEffect, useState } from "react";

export default function QuantityToggle({ type, product }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const { updateQuantity } = useCart();
  const { productId, size } = product;

  useEffect(() => {
    updateQuantity(productId, size, quantity);
  }, [quantity]);

  return (
    <div
      className={`flex w-[100px] items-center justify-between rounded-full border px-3 ${
        type === "cart" ? "mb-0" : "mb-20"
      }`}
    >
      <button
        disabled={quantity === 1}
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className={`${quantity === 1 ? "text-slate-200" : ""} cursor-pointer px-3 py-1`}
      >
        -
      </button>
      <span className="text-md font-medium">{quantity}</span>
      <button
        onClick={() => setQuantity((q) => q + 1)}
        className="cursor-pointer px-3 py-1"
      >
        +
      </button>
    </div>
  );
}
