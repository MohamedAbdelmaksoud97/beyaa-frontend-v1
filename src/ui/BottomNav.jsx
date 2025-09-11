import { NavLink, useParams } from "react-router-dom";
import { Home, Store, ShoppingCart, Heart, Settings, Plus } from "lucide-react";
import { useUser } from "@/contexts/AuthContext";
import { useStore } from "@/contexts/StoreContext";

function BottomNav() {
  const { slug } = useParams();
  const { data: user } = useUser();
  const { data: store } = useStore();
  console.log(store);
  //  const slug = store?.slug;
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center ${
      isActive ? "text-primary-500" : "text-[#78797D]"
    }`;

  if (user)
    return (
      <div className="md:flex md:flex-row md:justify-center">
        <nav className="fixed inset-x-0 bottom-0 z-30 z-5000 justify-around border-t border-slate-300 bg-white shadow-2xl md:inset-x-auto md:mb-2 md:flex md:rounded-full">
          <div className="flex w-full max-w-3xl items-center justify-center gap-6 px-4 pt-2 pb-3 md:justify-around md:gap-10 md:px-4 md:py-1 md:pt-1.5 lg:px-9">
            {/* Home */}

            {/* Settings (only if logged in) */}

            <>
              <NavLink to={`/${slug}/addProducts`} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <Plus
                      size={18}
                      strokeWidth={2}
                      absoluteStrokeWidth
                      className={
                        isActive ? "text-primary-500" : "text-[#78797D]"
                      }
                    />
                    <div
                      className={
                        isActive
                          ? "text-primary-500 text-[14px]"
                          : "text-[14px] text-[#78797D]"
                      }
                    >
                      Product
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink to={`/${slug}/settings`} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <Settings
                      size={18}
                      strokeWidth={2}
                      absoluteStrokeWidth
                      className={
                        isActive ? "text-primary-500" : "text-[#78797D]"
                      }
                    />
                    <div
                      className={
                        isActive
                          ? "text-primary-500 text-[14px]"
                          : "text-[14px] text-[#78797D]"
                      }
                    >
                      Settings
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink to={`/${slug}/myProducts`} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <Store
                      size={18}
                      strokeWidth={2}
                      absoluteStrokeWidth
                      className={
                        isActive
                          ? "text-primary-500 text-[14px]"
                          : "text-[14px] text-[#78797D]"
                      }
                    />
                    <div
                      className={
                        isActive
                          ? "text-primary-500 text-[14px]"
                          : "text-[14px] text-[#78797D]"
                      }
                    >
                      My products
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink to={`/${slug}/myOrders`} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <Store
                      size={18}
                      strokeWidth={2}
                      absoluteStrokeWidth
                      className={
                        isActive ? "text-primary-500" : "text-[#78797D]"
                      }
                    />
                    <div
                      className={
                        isActive
                          ? "text-primary-500 text-[14px]"
                          : "text-[14px] text-[#78797D]"
                      }
                    >
                      orders
                    </div>
                  </>
                )}
              </NavLink>
            </>
          </div>
        </nav>
      </div>
    );
}

export default BottomNav;
