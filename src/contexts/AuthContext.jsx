// AuthContext.js
import { fetchUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  // 🔑 Check session on app load
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,

    staleTime: 0, // 5 minutes
    cashTime: 0,
  });
}
