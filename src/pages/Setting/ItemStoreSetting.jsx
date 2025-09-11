import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
//import { useAuth } from "@/contexts/AuthContext";
import { getStore, updateStore } from "@/services/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { z } from "zod";
import ItemStoreHeroSetting from "./ItemStoreHeroSetting";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters long." })
    .optional()
    .or(z.literal("")),

  whatSell: z
    .string()
    .min(1, { message: "Please describe what you sell." })
    .optional()
    .or(z.literal("")),

  storeInformation: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .optional()
    .or(z.literal("")),
});

function ItemStoreSetting() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: store } = useQuery({
    queryKey: ["store", slug],
    queryFn: () => getStore(slug),
  });
  console.log(store);

  //const { user } = useAuth();
  const mutation = useMutation({
    mutationFn: (values) => updateStore(values, store?._id),
    onSuccess: (res) => {
      console.log(res);
      //const updatedStore = res?.data;
      const newSlug = res?.slug;

      toast.success("Store updated successfully");

      // Invalidate old query

      queryClient.invalidateQueries({ queryKey: ["store"] });
      // Redirect if slug changed
      if (newSlug && newSlug !== slug) {
        navigate(`/${newSlug}/settings`, { replace: true });
      }
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatSell: "",
      storeInformation: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
    // values already contain: name, email, password, passwordConfirm, phone
    // add role only if your API allows clients to set it (often this is server-side only)
    // const payload = { ...values, role: "admin" };
    mutation.mutate(values);
  };
  //const isSubmitting = mutation.isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      {" "}
      {/* ✅ provides RHF context for shadcn components */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">Store Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="h-11 rounded-sm border-slate-300 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatSell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What do you sell</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="h-11 w-full rounded-sm border px-3"
                >
                  <option value="">Select…</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your store</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={4}
                  className="w-full rounded-sm border px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="default"
          className="mt-2 h-11 w-full text-base font-medium"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updatting...
            </span>
          ) : (
            "Update my Store"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ItemStoreSetting;
