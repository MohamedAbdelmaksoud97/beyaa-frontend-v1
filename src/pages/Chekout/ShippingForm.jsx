"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import MainWrapper from "@/ui/MainWrapper";
import { useCart } from "@/contexts/useCart";
import { useMutation } from "@tanstack/react-query";
import { createPurchase } from "@/services/purchase";
import { useBuyNow } from "@/contexts/BuyNowContext";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreSlug } from "@/contexts/StoreContext";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

// ---------- Zod Schema ----------
const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  phone: z
    .string()
    .trim()
    .refine(
      (v) =>
        v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15,
      { message: "Phone must be 10–15 digits" },
    ),
  address: z
    .string()
    .trim()
    .min(5, "Please enter a valid address")
    .max(120, "Address is too long"),
});

export default function ShippingForm() {
  const { setBuyNowProduct, buyNowProduct } = useBuyNow();
  const { slug } = useParams();
  const { data: store } = useStoreSlug(slug);
  const { cart } = useCart();
  const navigate = useNavigate();
  const brandHex = store?.brandColor || "#0ea5e9";

  const mutation = useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      toast.success("Purchase created successfully!");
      setBuyNowProduct(null);
      navigate(`/${slug}`); // ✅ navigate to homepage
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", address: "" },
  });

  const onSubmit = (values) => {
    let productsPayload = [];
    let grandTotal = 0;

    if (buyNowProduct) {
      productsPayload = [
        {
          slug,
          color: buyNowProduct.color,
          productId: buyNowProduct._id,
          quantity: buyNowProduct.quantity ?? 1,
          size: buyNowProduct.size,
          unitPrice: buyNowProduct.price,
          totalPrice: buyNowProduct.price * (buyNowProduct.quantity ?? 1),
        },
      ];
      grandTotal = buyNowProduct.price * (buyNowProduct.quantity ?? 1);
    } else {
      productsPayload = cart.map((item) => ({
        productId: item._id || item.productId,
        quantity: item.quantity,
        size: item.size,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
      }));
      grandTotal = cart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
    }

    const payload = {
      slug,
      products: productsPayload,
      grandTotal,
      isPOD: false,
      customerName: values.name,
      customerPhone: values.phone.replace(/\D/g, ""),
      customerAddress: values.address,
    };

    mutation.mutate({ payload, slug });
  };

  return (
    <Form {...form}>
      <MainWrapper pageName={"Shipping Info"}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="+20 10 1234 5678"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your address</FormLabel>
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
            disabled={mutation.isPending}
            className="mt-6 w-full bg-[color:var(--brand-color)] text-white active:scale-[0.98]"
            style={{ "--brand-color": brandHex }}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Checkout"
            )}
          </Button>
        </form>
      </MainWrapper>
    </Form>
  );
}
