import { Button } from "@/components/ui/button";
import MainWrapper from "@/ui/MainWrapper";
import ProductCard from "@/ui/ProductCard";
import ProductsSection from "../Homepage/ProductsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products";
import { useStoreSlug } from "@/contexts/StoreContext";
import { useParams, useNavigate } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import { useUser } from "@/contexts/AuthContext";

function Products() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: store } = useStoreSlug(slug);
  const storeId = store?._id ?? store?.id; // ✅ safe + flexible

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"], // cache key
    queryFn: () => fetchProducts(storeId), // the fetcher function
    staleTime: 1000 * 60 * 5, // (optional) 5 min cache
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  // ✅ Empty state: no products
  if (!products || products.length === 0) {
    return (
      <MainWrapper size={"wide"} pageName={"Explore our products"}>
        <div className="mx-auto max-w-2xl bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-slate-100">
            <PackageOpen className="h-6 w-6 text-slate-500" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            No products yet
          </h2>

          {user && (
            <>
              <p className="mt-2 text-slate-600">
                Add your first product to start selling. You can create items,
                set prices, and mark trending picks.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate(`/${slug}/addProducts`)}>
                  Add products
                </Button>
              </div>
            </>
          )}
        </div>
      </MainWrapper>
    );
  }

  // ✅ Normal state: has products
  const trendingProducts = products
    .filter((product) => product.isTrending === true)
    .slice(0, 10);

  const newArrivalProducts = products.slice(-10);

  return (
    <MainWrapper size={"wide"} pageName={"Explore our products"}>
      <ProductsSection products={trendingProducts} sectionTitle="Trending" />
      <ProductsSection
        products={newArrivalProducts}
        sectionTitle="New Arrival"
      />
      <ProductsSection products={products} sectionTitle="Our products" />
    </MainWrapper>
  );
}

export default Products;
