import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { logout } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LogoutConfirm({ open, setOpen }) {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logout();
      setOpen(false);
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsPending(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40"
          onClick={() => setOpen(false)} // close on outside click
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
          >
            <h2 className="mb-3 text-center text-lg font-semibold text-gray-900">
              Confirm Logout
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="hover:bg-gray-200"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isPending}
                className="flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LogoutConfirm;
