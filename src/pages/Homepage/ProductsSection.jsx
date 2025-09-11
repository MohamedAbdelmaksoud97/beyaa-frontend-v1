import { Button } from "@/components/ui/button";
import ProductCard from "@/ui/ProductCard";
function ProductsSection({ products, sectionTitle, type }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="mt-5 mb-2 text-xl font-semibold tracking-tight">
          {sectionTitle || "Products"}
        </h2>
        {sectionTitle === "our products" && (
          <Button
            variant={"link"}
            className={"hover:text-secondary-500 pl-0 text-slate-600 underline"}
          >
            Sort By
          </Button>
        )}
      </div>
      <div
        className={`grid grid-cols-2 gap-x-2 gap-y-5 lg:grid-cols-4 lg:justify-center lg:gap-x-8`}
      >
        {products.map((p) => (
          <ProductCard type={type} key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductsSection;
