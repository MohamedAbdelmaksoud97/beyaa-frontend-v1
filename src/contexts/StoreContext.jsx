// AuthContext.js
import { getMyStore, getStore } from "@/services/store";

import { useQuery } from "@tanstack/react-query";
//import { useParams } from "react-router-dom";

export function useStore() {
  // 🔑 Check session on app load
  return useQuery({
    queryKey: ["store"],
    queryFn: () => getMyStore(),
    //retry: 3,
  });
}

export function useStoreSlug(slug) {
  // 🔑 Check session on app load
  return useQuery({
    queryKey: ["store", slug],
    enabled: !!slug,
    queryFn: () => getStore(slug),
    //retry: false,
  });
}
