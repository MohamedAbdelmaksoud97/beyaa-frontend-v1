import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/products";
import { useStore } from "@/contexts/StoreContext";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

function DeleteProduct({ productId }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: store } = useStore();
  const slug = store?.slug;

  // ✅ use isPending instead of isLoading
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(slug, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setOpen(false);
    },
    onError: (err) => {
      console.error("Delete failed:", err.message);
    },
  });

  return (
    <>
      {/* Trigger button */}
      <Button
        onClick={() => setOpen(true)}
        className="mt-3 mb-5 hover:bg-slate-100"
        variant="outline"
      >
        Delete
      </Button>

      {/* Popup with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
            >
              <h2 className="text-secondary-900 mb-3 text-lg font-semibold">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="hover:bg-slate-100"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => mutate()}
                  disabled={isPending}
                  className="flex items-center gap-2 hover:opacity-90"
                >
                  {isPending ? (
                    <>
                      <Spinner className="h-4 w-4 text-white" />
                      Deleting...
                    </>
                  ) : (
                    "Yes, Delete"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DeleteProduct;
