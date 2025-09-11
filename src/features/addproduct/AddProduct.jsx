"use client";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import MainWrapper from "@/ui/MainWrapper";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// shadcn/ui
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus } from "lucide-react";

// service
import { createProduct } from "@/services/products";
import { useStore, useStoreSlug } from "@/contexts/StoreContext";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ---------- Zod Schema ----------
const productSchema = z.object({
  name: z.string().min(1, "Product name is required").trim(),
  description: z.string().trim().optional().default(""),
  price: z.coerce.number().min(1, "Price must be ≥ 1"),
  availableSize: z
    .array(z.enum(["XS", "S", "M", "L", "XL", "XXL"]))
    .default([]),
  color: z.string().optional().default(""),
  // accept File[] (max 2). We'll validate length and basic image type if provided
  images: z
    .any()
    .optional()
    .refine(
      (val) => !val || (Array.isArray(val) && val.length <= 2),
      "You can upload up to 2 images",
    ),
  tagsRaw: z.string().optional().default(""), // comma-separated input
  isTrending: z.boolean().default(false),
});

const DEFAULTS = {
  name: "",
  description: "",
  price: 0,
  availableSize: [],
  color: "",
  images: [],
  tagsRaw: "",
  isTrending: false,
};

// ---------- Component ----------
export default function AddProduct() {
  const { slug } = useParams();
  // put your real storeId here (or pass via props/route)
  const navigate = useNavigate();
  const {
    data: store,
    isLoading: storeLoading,
    error,
    isError,
    isStoreError,
  } = useStoreSlug(slug);
  console.log(store?.id);
  const storeId = store?.id;
  const [imageNames, setImageNames] = useState([]);

  const methods = useForm({
    defaultValues: DEFAULTS,
    mode: "onBlur",
    resolver: zodResolver(productSchema),
    shouldUnregister: false,
  });

  const { handleSubmit, control, register, setValue, formState } = methods;

  const mutation = useMutation({
    mutationFn: ({ values, storeId }) => createProduct(values, storeId),
    onSuccess: (data) => {
      console.log("Product created:", data);

      toast.success("Product created successfully!");
      navigate(`/${slug}`); // ✅ navigate to homepage
    },
    onError: (err) => {
      console.error(err);
      window.alert(err.message || "Failed to create product");
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    // Transform tagsRaw => array
    const tags =
      values.tagsRaw
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];

    // Prepare file list into array<File>
    const safeImages = Array.isArray(values.images) ? values.images : [];

    const payload = {
      ...values,
      tags,
      images: safeImages.slice(0, 2),
    };

    mutation.mutate({ values: payload, storeId });
  };

  const isSubmitting = mutation.isPending || formState.isSubmitting;

  if (storeLoading) {
    return (
      <div className="grid h-24 place-items-center">
        <Spinner />
      </div>
    );
  }

  if (isStoreError) {
    return (
      <div className="text-red-600">Failed to load store: {error.message}</div>
    );
  }

  return (
    <MainWrapper pageName="Add Product">
      <div className="">
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Name */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Air Runner X" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        rows={4}
                        className="w-full rounded-sm border px-3 py-2"
                        placeholder="Tell customers about your product..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Available Sizes - ToggleGroup */}
              <Controller
                control={control}
                name="availableSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available sizes</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        className="flex flex-wrap gap-2"
                        value={field.value}
                        onValueChange={(vals) => field.onChange(vals)}
                      >
                        {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                          <ToggleGroupItem
                            key={sz}
                            value={sz}
                            className="px-3 py-2"
                          >
                            {sz}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Black/Red" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Images (max 2) — like your logo approach */}
              <FormField
                control={control}
                name="images"
                render={({ field: { value, onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Product images (up to 2)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const firstTwo = files.slice(0, 2);
                          setImageNames(firstTwo.map((f) => f.name));
                          // store as array<File> in RHF
                          onChange(firstTwo);
                        }}
                        {...rest}
                        className="mt-3 block w-full border-0 pl-0 text-slate-800 shadow-none file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:text-sm hover:file:bg-slate-200"
                      />
                    </FormControl>
                    {imageNames.length > 0 && (
                      <p className="mt-1 text-sm text-slate-600">
                        Selected: {imageNames.join(", ")}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags (comma-separated) */}
              <FormField
                control={control}
                name="tagsRaw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., sneakers, premium, limited"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-slate-500">Comma-separated</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Trending - Switch */}
              <FormField
                control={control}
                name="isTrending"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-sm border p-3">
                    <div>
                      <FormLabel>Trending</FormLabel>
                      <p className="text-xs text-slate-500">
                        Mark this product as trending
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mb-5 w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {mutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Add Product"
                )}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </MainWrapper>
  );
}
