import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Menu, Heart, ShoppingCart, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useStoreSlug } from "@/contexts/StoreContext";
import { useCart } from "@/contexts/useCart";
import { useUser } from "@/contexts/AuthContext";
import LogoutConfirm from "./LogoutConfirm";

export default function HeaderBar({
  links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ],
}) {
  const { slug } = useParams();
  const { data: store } = useStoreSlug(slug);
  const { totalItems } = useCart();
  const { data: user } = useUser();
  const [open, setOpen] = useState(false); // mobile nav
  const [showLogout, setShowLogout] = useState(false); // logout popup

  const storeName = store?.name;
  const storeLogo = store?.logo;
  const brandHex = store?.brandColor || "#0ea5e9";

  const toWithSlug = (href = "/") => {
    const clean = href.startsWith("/") ? href : `/${href}`;
    return `/${slug}${clean === "/" ? "" : clean}`;
  };

  const navLinks = links.map((l) => ({ ...l, href: toWithSlug(l.href) }));

  const linkClass = ({ isActive }) =>
    `text-sm transition ${
      isActive
        ? "[color:var(--brand-color)]"
        : "text-slate-700 hover:text-black"
    }`;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur"
      style={{ "--brand-color": brandHex }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left (mobile menu) + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <NavLink
            end
            to={toWithSlug("/")}
            className="text-xl font-semibold tracking-tight"
          >
            <Logo logo={storeLogo} name={storeName} />
          </NavLink>
        </div>

        {/* Center: Nav (desktop) */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.label} end to={l.href} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <NavLink
            to={toWithSlug("/wishlist")}
            className={({ isActive }) =>
              `relative flex items-center ${
                isActive
                  ? "[color:var(--brand-color)]"
                  : "text-slate-700 hover:text-black"
              }`
            }
          >
            <Heart size={20} />
          </NavLink>

          <NavLink
            to={toWithSlug("/cart")}
            className={({ isActive }) =>
              `relative flex items-center ${
                isActive
                  ? "[color:var(--brand-color)]"
                  : "text-slate-700 hover:text-black"
              }`
            }
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: brandHex }}
                >
                  {totalItems}
                </span>
              )}
            </div>
          </NavLink>

          {/* Logout icon */}
          {user && (
            <button
              title="Log out"
              aria-label="Log out"
              onClick={() => setShowLogout(true)}
              className="flex cursor-pointer items-center text-slate-700 hover:text-black"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-2">
            <ul className="flex flex-col gap-1 py-2">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <NavLink
                    end
                    to={l.href}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm ${
                        isActive
                          ? "[color:var(--brand-color)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}

              <li className="mt-2 flex items-center justify-between px-3">
                <NavLink
                  to={toWithSlug("/wishlist")}
                  className={({ isActive }) =>
                    isActive
                      ? "[color:var(--brand-color)]"
                      : "text-slate-700 hover:text-black"
                  }
                  onClick={() => setOpen(false)}
                >
                  <Heart size={20} />
                </NavLink>

                <NavLink
                  to={toWithSlug("/cart")}
                  className={({ isActive }) =>
                    isActive
                      ? "[color:var(--brand-color)]"
                      : "text-slate-700 hover:text-black"
                  }
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart size={20} />
                </NavLink>

                {user && (
                  <button
                    title="Log out"
                    aria-label="Log out"
                    onClick={() => {
                      setOpen(false);
                      setShowLogout(true);
                    }}
                    className="flex cursor-pointer items-center text-slate-700 hover:text-black"
                  >
                    <LogOut size={20} />
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Logout popup */}
      <LogoutConfirm open={showLogout} setOpen={setShowLogout} />
    </header>
  );
}
