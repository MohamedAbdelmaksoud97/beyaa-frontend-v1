import DeleteProduct from "@/features/DeleteProduct";
import Heart from "./Heart";
import { Link, useParams } from "react-router-dom";
function ProductCard({ product, type }) {
  const { slug } = useParams();
  console.log(product);
  return (
    <div>
      <Link to={`/${slug}/productPage/${product._id}`}>
        <div className="group cursor-pointer">
          <div className="relative w-[full] cursor-pointer overflow-hidden">
            <Heart product={product} />
            <img
              src={`http://localhost:3000/img/products/${product.images[0]}`}
              alt={product.name}
              className="object-fit aspect-square w-full transition-transform duration-300 hover:scale-[1.05]"
            />
          </div>
          <div className="mt-1.5">
            <h3 className="text-secondary-900 font-regular mb-1 text-sm">
              {product.name}
            </h3>
            <p className="text-secondary-900 text-sm font-semibold tracking-tight">
              EGP{" "}
              {Number(product.price).toLocaleString("en-EG", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </Link>
      {type === "admin" ? (
        <DeleteProduct productId={product.productId || product._id} />
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductCard;
