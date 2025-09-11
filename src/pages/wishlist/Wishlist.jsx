import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/useWishlist";
import CartCard from "@/ui/CartCard";
import MainWrapper from "@/ui/MainWrapper";
import { Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreSlug } from "@/contexts/StoreContext";
import { motion } from "framer-motion";

function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: store } = useStoreSlug(slug);
  const brandHex = store?.brandColor || "#0ea5e9";

  return (
    <MainWrapper pageName={"Wishlist"}>
      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex h-64 flex-col items-center justify-center gap-4 text-center text-slate-500"
        >
          {/* Animated heart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heart className="h-12 w-12 text-slate-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-secondary-900 text-lg font-medium"
          >
            Your wishlist is empty
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-slate-500"
          >
            Save products you love to view them later.
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
        <div className="flex flex-col gap-6">
          {wishlist.map((product) => (
            <CartCard key={product._id} type="wishlist" product={product} />
          ))}
        </div>
      )}
    </MainWrapper>
  );
}

export default Wishlist;
