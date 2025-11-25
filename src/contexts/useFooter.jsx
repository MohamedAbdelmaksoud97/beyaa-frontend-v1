// hooks/useFooter.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createFooter,
  updateFooter,
  deleteFooterElement,
} from "@/services/footer";

export function useCreateFooter(storeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createFooter(storeId, data),
    onSuccess: (footer) => {
      toast.success("Footer created successfully");
      // Refresh store data so footer is up-to-date everywhere
      queryClient.invalidateQueries({ queryKey: ["store"] });
      // If you also have ["store", slug] you can invalidate that too
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create footer");
    },
  });
}

export function useUpdateFooter(storeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateFooter(storeId, data),
    onSuccess: (footer) => {
      toast.success("Footer updated");
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update footer");
    },
  });
}

export function useDeleteFooterElement(storeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ section, key }) =>
      deleteFooterElement(storeId, section, key),

    onSuccess: () => {
      toast.success("Footer item deleted");

      // refresh store + UI
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },

    onError: (err) => toast.error(err.message),
  });
}
