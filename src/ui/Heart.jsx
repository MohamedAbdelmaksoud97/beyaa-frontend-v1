import { useWishlist } from "@/contexts/useWishlist";
import { Heart as Hearticon } from "lucide-react";
import { useState } from "react";
function Heart({ product, size, type }) {
  console.log(product);
  const [liked, setLiked] = useState(false);
  const { addToWishlist } = useWishlist();
  function handleClick(e) {
    e.preventDefault(); // stop <Link> navigation
    e.stopPropagation(); // stop bubbling to parent
    setLiked((s) => !s);
    addToWishlist(product);
  }
  return (
    <button
      aria-label="Add to wishlist"
      onClick={handleClick}
      className={`text-secondary-800 absolute z-10 ${type === "productPage" ? "top-6 right-10" : "absolute"} top-1 right-4 z-50 h-6 w-6 cursor-pointer rounded-full p-2 transition hover:scale-105 lg:top-1`}
    >
      <Hearticon
        stroke={liked ? "" : "#fff"}
        fill="secondary-800"
        className={`${size === "big" ? "h-7 w-7" : "h-5 w-5"} ${liked ? "fill-pink-500 text-pink-500" : "border-white"}`}
      />
    </button>
  );
}

export default Heart;
