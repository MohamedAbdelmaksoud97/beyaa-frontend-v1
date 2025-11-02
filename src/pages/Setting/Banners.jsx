// Banners.jsx
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useParams } from "react-router-dom";

import { addBanner, removeBanner } from "@/services/store"; // ✅ import removeBanner
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // ✅ confirm dialog
import { Loader2, Trash2 } from "lucide-react"; // ✅ Trash icon
import toast from "react-hot-toast";
import { useStoreSlug } from "@/contexts/StoreContext";
import MainWrapper from "@/ui/MainWrapper";

// ✅ Validation schema (link optional)
const bannerSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  link: z.union([z.literal(""), z.string().url("Invalid URL")]).optional(),
  image: z
    .any()
    .refine((f) => f instanceof File, "Banner image is required")
    .refine((f) => f.size <= 5 * 1024 * 1024, "Image must be < 5MB")
    .refine((f) => f.type?.startsWith("image/"), "Only images allowed"),
});

export default function Banners() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const { data: storeResp } = useStoreSlug(slug);

  const store = storeResp?.data ?? storeResp;
  const banners = store?.banners ?? [];
  const storeId = store?._id;
  const brandColor = store?.brandColor || "#000000";

  const methods = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
      image: null,
    },
  });

  // ✅ Add banner
  const addMutation = useMutation({
    mutationFn: async (values) => {
      if (!storeId) throw new Error("Store not found");
      const fd = new FormData();
      fd.append("title", values.title);
      if (values.description) fd.append("description", values.description);
      fd.append("startDate", values.startDate);
      fd.append("endDate", values.endDate);
      if (values.link && values.link.trim() !== "")
        fd.append("link", values.link);
      fd.append("image", values.image);
      return addBanner(storeId, fd);
    },
    onSuccess: (updatedBanners) => {
      queryClient.setQueryData(["store"], (prev) => {
        const s = prev?.data ?? prev;
        return { ...s, banners: updatedBanners };
      });
      toast.success("Banner added!");
      queryClient.invalidateQueries({ queryKey: ["store"] });
      setOpen(false);
      methods.reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add banner");
    },
  });

  // ✅ Remove banner
  const removeMutation = useMutation({
    mutationFn: async (bannerId) => {
      if (!storeId) throw new Error("Store not found");
      return removeBanner(storeId, bannerId);
    },
    onSuccess: () => {
      toast.success("Banner deleted!");
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete banner");
    },
  });

  const onSubmit = (values) => {
    addMutation.mutate(values);
  };

  // ✅ Newest-first banners
  const sortedBanners = [...banners].reverse();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-20">
      {/* Add banner button */}
      <Button
        onClick={() => setOpen(true)}
        className="mb-4 h-11 w-full text-base font-medium"
      >
        Add Banner
      </Button>

      {/* Heading */}
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
        Banners
      </h1>

      {/* Empty state */}
      {sortedBanners.length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-10 text-center">
          <p className="mb-4 text-slate-500">No banners yet.</p>
        </div>
      )}

      {/* List of banners */}
      {sortedBanners.length > 0 && (
        <div className="mt-6 space-y-6">
          {sortedBanners.map((b) => {
            const Wrapper = b.link ? NavLink : "div";
            return (
              <div key={b._id || b.title} className="relative">
                <Wrapper
                  to={b.link || undefined}
                  className="relative block w-full overflow-hidden rounded-xl shadow-md transition hover:scale-[1.01] hover:shadow-lg"
                >
                  {/* Banner image */}
                  {b.image && (
                    <img
                      src={`${import.meta.env.VITE_ASSETS_BASE}/img/banners/${b.image}`}
                      alt={b.title}
                      className="h-56 w-full object-fill sm:h-72 md:h-80"
                    />
                  )}

                  {/* Gradient overlay on the left */}
                  <div
                    className="absolute inset-y-0 left-0 w-2/3"
                    style={{
                      background: `linear-gradient(to right, #4c4c4d 20%, transparent 100%)`,
                    }}
                  />

                  {/* Text overlay on the left */}
                  <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 text-white sm:p-10">
                    <h3 className="mb-3 max-w-[200px] text-2xl font-semibold break-words">
                      {b.title}
                    </h3>
                    {b.description && (
                      <p className="max-w-[300px] text-base leading-relaxed break-words whitespace-pre-wrap text-slate-100">
                        {b.description}
                      </p>
                    )}
                  </div>
                </Wrapper>

                {/* Delete Icon */}
                <div className="absolute top-3 right-3 z-30">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full bg-gray-100 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this banner?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The banner will be
                          permanently removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => removeMutation.mutate(b._id)}
                        >
                          {removeMutation.isPending
                            ? "Deleting..."
                            : "Delete Banner"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Dates */}
                <div className="text-secondary-900 mt-2 text-center text-xs">
                  {new Date(b.startDate).toLocaleDateString()} →{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dialog (popup) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a new Banner</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={methods.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Banner title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Optional description"
                          rows={3}
                          className="mt-2 w-full rounded-md border border-slate-300 p-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={methods.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={methods.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link (optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="/products/123 or /some-page"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="image"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Banner Image (Recommended 1112*320)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            onChange(e.target.files?.[0] ?? null)
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={addMutation.isPending}
                    className="w-full"
                  >
                    {addMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </span>
                    ) : (
                      "Add Banner"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
