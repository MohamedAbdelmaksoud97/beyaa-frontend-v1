import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Heart from "@/ui/Heart";
import HeaderBar from "@/ui/HeaderBar";
import { useCart } from "@/contexts/useCart";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOneProduct } from "@/services/products";
import { useStoreSlug } from "@/contexts/StoreContext";
import { useBuyNow } from "@/contexts/BuyNowContext";
import toast, { Toaster } from "react-hot-toast";

// -------------------- Toggle Button with Number Tracker --------------------
function QuantityToggle({ quantity, setQuantity }) {
  return (
    <div className="md:pn-2 mt-1 mb-20 flex items-center gap-4 border-b pb-12 md:mb-2">
      <button
        disabled={quantity === 1}
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className={`${quantity === 1 ? "border-slate-200 text-slate-200" : ""} rounded-full border px-3 py-1`}
      >
        -
      </button>
      <span className="text-md font-medium">{quantity}</span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="rounded-full border px-3 py-1"
      >
        +
      </button>
    </div>
  );
}

// -------------------- Bottom Buttons --------------------
function BottomButtons({ product, quantity, size }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: store } = useStoreSlug(slug);
  const brandHex = store?.brandColor || "#0ea5e9"; // fallback hex if not set
  //const slug = store?.slug; // fallback hex if not set
  console.log(store);

  const { addToCart } = useCart();
  const { setBuyNowProduct } = useBuyNow();
  console.log(product);
  return (
    <div
      style={{ "--brand-color": brandHex }}
      className="fixed bottom-0 left-0 mt-1 flex w-full items-center justify-between border-t bg-white p-4 md:static md:mb-5 lg:static lg:gap-4 lg:border-0"
    >
      <span className="text-secondary-900 text-md font-bold">
        EGP{product.price}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => {
            (console.log(product),
              addToCart(product, quantity, size),
              toast.success("item added to the cart"));
          }}
          className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Add to cart
        </button>
        <button
          onClick={() => {
            navigate(`/${slug}/shippingForm`);
            setBuyNowProduct({ ...product, quantity, size });
          }}
          className="cursor-pointer rounded-lg bg-[color:var(--brand-color)] px-4 py-2 text-white hover:opacity-90 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

// -------------------- Main Product Page --------------------
export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const { productId } = useParams();

  console.log(productId);
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", productId], // cache key
    queryFn: () => fetchOneProduct(productId), // the fetcher function
    staleTime: 1000 * 60 * 10, // (optional) 5 min cache
  });
  console.log(product);
  const availableSizes = product?.availableSize || [];

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <HeaderBar />
      <div
        className={`relative mx-auto w-full max-w-lg bg-white px-5 lg:mt-10 lg:flex lg:max-w-5xl lg:gap-10`}
      >
        <Heart product={product} type={"productPage"} size={"big"} />
        {/* Product Image */}
        <div className="my-5 flex justify-between rounded-full bg-white"></div>
        <div className="relative lg:w-1/2">
          <img
            src={`${import.meta.env.VITE_ASSETS_BASE}/img/products/${product.images[0]}`}
            alt="Loose Fit Denim Jacket"
            className="aspect-square w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-secondary-900 text-xl font-bold">
                {product.name}
              </h2>
            </div>
            <p className="text-secondary-900 text-md mb-4">
              {product.description}
            </p>

            {/* Size Options */}
            <div className="mb-1">
              {product.color && (
                <p className="text-secondary-900 mb-4 font-semibold">
                  Color : {product.color}
                </p>
              )}
              <div className="flex gap-2 border-t pt-12 pb-4">
                {availableSizes.map((selectedSize) => (
                  <button
                    key={selectedSize}
                    className={`${size === selectedSize ? "bg-slate-200" : ""} text-secondary-900 cursor-pointer rounded-md border px-4 py-2 capitalize`}
                    onClick={() => {
                      setSize(selectedSize);
                    }}
                  >
                    {selectedSize}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Toggle */}
            <QuantityToggle quantity={quantity} setQuantity={setQuantity} />
          </div>

          {/* Bottom Buttons */}
          <BottomButtons product={product} quantity={quantity} size={size} />
        </div>
      </div>
    </div>
  );
}
