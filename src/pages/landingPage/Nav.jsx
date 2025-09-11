import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

const linkBase = "transition-colors hover:text-primary-400";
const linkActive = "text-primary-400";

// Offset so the fixed navbar doesn't cover the section
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80; // navbar height
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHashActive = (hash) =>
    location.pathname === "/" && location.hash === hash;

  const handleAboutClick = () => {
    // ensure About opens at top (works even when already on About or at page bottom)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-secondary-800/90 fixed inset-x-0 top-0 z-50 border-b border-white/10 text-white backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center"
          >
            <div className="from-primary-300 to-primary-400 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              beyaa
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <NavHashLink
              smooth
              to="/#features"
              scroll={scrollWithOffset}
              className={`${linkBase} ${isHashActive("#features") ? linkActive : ""}`}
            >
              Features
            </NavHashLink>

            <NavHashLink
              smooth
              to="/#pricing"
              scroll={scrollWithOffset}
              className={`${linkBase} ${isHashActive("#pricing") ? linkActive : ""}`}
            >
              Pricing
            </NavHashLink>

            <NavLink
              to="/beyaa/about"
              onClick={handleAboutClick}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              About
            </NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              size="sm"
              className="hover:text-primary-400 text-white hover:bg-transparent"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              size="sm"
              className="bg-primary-400 hover:bg-primary-500 text-white"
            >
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <NavHashLink
                smooth
                to="/#features"
                scroll={scrollWithOffset}
                className={`py-2 ${linkBase} ${isHashActive("#features") ? linkActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </NavHashLink>

              <NavHashLink
                smooth
                to="/#pricing"
                scroll={scrollWithOffset}
                className={`py-2 ${linkBase} ${isHashActive("#pricing") ? linkActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </NavHashLink>

              <NavLink
                to="/beyaa/about"
                onClick={handleAboutClick}
                className={({ isActive }) =>
                  `py-2 ${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                About
              </NavLink>

              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={() => {
                    setIsMenuOpen(false);

                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-primary-400 hover:bg-primary-500 text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/signup");
                  }}
                >
                  Start Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </nav>
  );
};

export default Navigation;
