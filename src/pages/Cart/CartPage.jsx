import { Button } from "@/components/ui/button";
import { useBuyNow } from "@/contexts/BuyNowContext";
import { useStoreSlug } from "@/contexts/StoreContext";
import { useCart } from "@/contexts/useCart";
import CartCard from "@/ui/CartCard";
import MainWrapper from "@/ui/MainWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function CartPage() {
  const { setBuyNowProduct } = useBuyNow();
  setBuyNowProduct(null);
  const { cart, grandTotal } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: store } = useStoreSlug(slug);
  const brandHex = store?.brandColor || "#0ea5e9";
  console.log(brandHex);

  return (
    <MainWrapper pageName={"My Cart"}>
      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex h-64 flex-col items-center justify-center gap-4 text-center text-slate-500"
        >
          {/* Animated cart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ShoppingCart className="h-12 w-12 text-slate-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-secondary-900 text-lg font-medium"
          >
            Your cart is empty
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-slate-500"
          >
            Looks like you haven’t added anything yet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={() => navigate(`/${slug}/products`)}
              className="mt-2 bg-[color:var(--brand-color)] text-white shadow transition-transform duration-300 hover:scale-[1.05] hover:bg-[color:var(--brand-color)] hover:opacity-90 active:scale-[0.98]"
              style={{ "--brand-color": brandHex }}
            >
              Browse Products
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <div>
              Total price:
              <span className="ml-1 font-medium">{grandTotal}</span>
            </div>
            {cart.map((product) => (
              <CartCard
                key={`${product.productId}-${product.size || "default"}`}
                product={product}
              />
            ))}
          </div>

          <motion.div layout transition={{ duration: 0.3 }}>
            <Button
              onClick={() => navigate(`/${slug}/shippingForm`)}
              className="mt-6 w-full bg-[color:var(--brand-color)] text-white shadow transition-transform duration-300 hover:scale-[1.05] hover:bg-[color:var(--brand-color)] hover:opacity-90 active:scale-[0.98]"
              style={{ "--brand-color": brandHex }}
            >
              Checkout
            </Button>
          </motion.div>
        </>
      )}
    </MainWrapper>
  );
}

export default CartPage;
