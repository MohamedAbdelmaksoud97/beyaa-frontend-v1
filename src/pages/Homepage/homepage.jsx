"use client";
import React from "react";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Info,
  Phone,
} from "lucide-react";
import HeaderBar from "../../ui/HeaderBar.jsx";
import HeroImg from "./HeroImg.jsx";
import ProductCard from "../../ui/ProductCard.jsx";
import ProductsSection from "./ProductsSection.jsx";
import BottomNav from "@/ui/BottomNav.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products.js";

import { Spinner } from "@/components/ui/shadcn-io/spinner/index.jsx";
import { useStoreSlug } from "@/contexts/StoreContext.jsx";
import { useParams } from "react-router-dom";
import Form from "@/features/signup/Form.jsx";
/**
 * Storefront screen in plain React (JS) + Tailwind + lucide-react icons.
 * No Next.js dependencies. Uses <img> for images.
 */

// -------------------- Header --------------------

// -------------------- Product Card --------------------

// -------------------- Bottom Navigation --------------------

// -------------------- Page --------------------
export default function Homepage() {
  const { slug } = useParams();

  console.log(slug);
  const {
    data: store,
    isLoading: storeLoading,
    isError: isStoreError,
  } = useStoreSlug(slug);
  console.log(store);
  const storeId = store?._id ?? store?.id; // ✅ safe + flexible

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"], // cache key
    queryFn: () => fetchProducts(storeId), // the fetcher function
    staleTime: 1000 * 60 * 2, // (optional) 5 min cache
    retry: 3,
  });

  if (storeLoading) {
    return (
      <div className="grid h-24 place-items-center">
        <Spinner />
      </div>
    );
  }

  if (isStoreError) {
    return (
      <div className="text-red-600">Failed to load store: {error.message}</div>
    );
  }

  console.log(store);

  console.log(products);
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const newArrivalProducts = products.slice(0, 10);
  console.log(newArrivalProducts);

  const bestSellerProducts = products
    .sort((a, b) => b.numberOfPurchases - a.numberOfPurchases)
    .slice(0, 6);
  console.log(bestSellerProducts);

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <HeaderBar store={store} />

      {/* Hero banner */}
      <HeroImg store={store} />
      {/* Content */}
      <main className="mx-auto max-w-6xl px-5 pt-6 pb-30">
        {/* Best seller */}
        <ProductsSection
          products={bestSellerProducts}
          sectionTitle="Best seller"
        />

        {/* New Arrival */}
        <ProductsSection
          products={newArrivalProducts}
          sectionTitle="New Arrival"
        />
      </main>

      <BottomNav />

      {/* Simple footer anchors the header links */}
    </div>
  );
}

// Named exports if you want to import the components individually
