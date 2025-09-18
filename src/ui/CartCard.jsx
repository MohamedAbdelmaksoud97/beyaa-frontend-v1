import { Link, useLocation } from "react-router-dom";
import QuantityToggle from "./QuantityToggle";
import { Trash } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useCart } from "@/contexts/useCart";
import { motion } from "framer-motion";
import { useState } from "react";
import { useWishlist } from "@/contexts/useWishlist";
function CartCard({ product, type, setTotal }) {
  console.log(product);
  const location = useLocation();
  console.log(location);
  const cardType = location.pathname.split("/")[2];

  console.log(cardType);
  const { data: store } = useStore();
  const slug = store?.slug;
  console.log(product);
  const { removeFromCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      if (cardType === "cart") {
        removeFromCart(product.productId || product._id, product.size);
      } else {
        removeFromWishlist(product.productId || product._id, product.size);
      }
    }, 300); // match transition duration
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.9 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <div className="flex gap-6">
          <div className="w-[150px]">
            <Link to={`/${slug}/productPage/${product.productId}`}>
              <img
                className="aspect-square h-full w-full object-cover"
                src={`${import.meta.env.VITE_ASSETS_BASE}/img/products/${product.images[0]}`}
              />
            </Link>
          </div>
          <div
            className={`flex h-[150] flex-col ${type === "wishlist" ? "justify-start" : "justify-around"} `}
          >
            <div className="text-secondary-900 text-[14px] font-light">
              {product.name}
            </div>

            <div className="text-secondary-900 text-[14px] font-semibold">
              price : {product.unitPrice} EGP
            </div>

            {product.size && (
              <div className="text-secondary-900 text-[14px] font-light">
                size : {product.size}
              </div>
            )}

            {product.color && (
              <div className="text-secondary-900 text-[12px] font-light">
                Color:{product.color}
              </div>
            )}

            {type !== "wishlist" && (
              <QuantityToggle
                setTotal={setTotal}
                product={product}
                type={"cart"}
              />
            )}
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleRemove}>
          <Trash color="#C2CCD6" size={18} />
        </div>
      </div>
    </motion.div>
  );
}

export default CartCard;
