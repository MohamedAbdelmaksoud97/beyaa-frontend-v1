// ItemStoreBrandSetting.jsx
"use client";
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

import { getMyStore, updateStoreBrand } from "@/services/store";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  logo: z
    .any()
    .optional()
    .refine((f) => !f || f instanceof File, "Invalid file.")
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Logo must be < 2MB")
    .refine((f) => !f || f.type?.startsWith("image/"), "Only images allowed"),
  brandColor: z.string().min(1, { message: "Please select a brand color." }),
});

export default function ItemStoreBrandSetting() {
  const queryClient = useQueryClient();

  const { data: storeResp, isLoading } = useQuery({
    queryKey: ["store"],
    queryFn: getMyStore,
  });

  const store = storeResp?.data ?? storeResp;
  const storeId = store?._id;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { brandColor: "#2664e9", logo: null },
    mode: "onBlur",
    shouldUnregister: false,
  });

  const { control, handleSubmit, reset, formState } = methods;
  const isSubmitting = formState.isSubmitting;

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (!storeId) throw new Error("Store not found");
      return updateStoreBrand(formData, storeId);
    },
    onSuccess: (updated) => {
      const s = updated?.data ?? updated;
      queryClient.setQueryData(["store"], (prev) =>
        prev?.data ? { ...prev, data: { ...prev.data, ...s } } : s,
      );
      if (s?._id) {
        queryClient.setQueryData(["store", "id", s._id], (prev) =>
          prev ? { ...prev, ...s } : s,
        );
      }

      toast.success("Brand settings updated!");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const onSubmit = (values) => {
    const fd = new FormData();
    if (values.brandColor) fd.append("brandColor", values.brandColor);
    if (values.logo instanceof File) fd.append("logo", values.logo);
    mutation.mutate(fd);
  };

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10">
      <header className="pt-8 pb-4">
        <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
          Brand Settings
        </h1>
      </header>

      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Logo */}
            <div>
              <FormLabel>Add your logo (optional)</FormLabel>
              <FormField
                control={control}
                name="logo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                        {...field}
                        className="mt-3 block w-full border-0 pl-0 text-slate-800 shadow-none file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:text-sm hover:file:bg-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Brand color */}
            <div>
              <FormLabel>Pick your brand color</FormLabel>
              <FormField
                control={control}
                name="brandColor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="color"
                        {...field}
                        className="mt-3 h-12 w-20 cursor-pointer rounded border"
                        value={field.value || "#2664e9"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant="default"
              disabled={
                mutation.isPending || isSubmitting || !storeId || isLoading
              }
              className="mt-2 h-11 w-full text-base font-medium"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updatting...
                </span>
              ) : (
                "Update my Brand"
              )}
            </Button>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
