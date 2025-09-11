import { Button } from "@/components/ui/button";
import MainWrapper from "@/ui/MainWrapper";
import ProductsSection from "../Homepage/ProductsSection";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStoreSlug } from "@/contexts/StoreContext";
import { fetchProducts } from "@/services/products";
import { PackageOpen } from "lucide-react";

function Myproducts() {
  const { slug } = useParams();
  const navigate = useNavigate();

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
      <MainWrapper size={"wide"} pageName={"All Store Products"}>
        <div className="mx-auto max-w-2xl bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-slate-100">
            <PackageOpen className="h-6 w-6 text-slate-500" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            No products yet
          </h2>
          <p className="mt-2 text-slate-600">
            Add your first product to manage your catalog and start selling.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate(`/${slug}/addProducts`)}>
              Add products
            </Button>
          </div>
        </div>
      </MainWrapper>
    );
  }

  // ✅ Normal state
  return (
    <MainWrapper size={"wide"} pageName={"All Store Products"}>
      <ProductsSection type="admin" products={products} sectionTitle="" />
    </MainWrapper>
  );
}

export default Myproducts;
