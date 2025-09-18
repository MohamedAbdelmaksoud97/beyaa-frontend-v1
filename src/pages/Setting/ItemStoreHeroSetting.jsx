// ItemStoreHeroSetting.jsx
"use client";

//import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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
import ImageCarousel from "@/features/signup/imageCarousel";

import { updateStore } from "@/services/store";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const schema = z.object({
  heroImage: z.string().optional().or(z.literal("")),
  heading: z
    .string()
    .min(2, { message: "Heading must be at least 2 characters." })
    .optional()
    .or(z.literal("")),
  subHeading: z
    .string()
    .min(2, { message: "Subheading must be at least 2 characters." })
    .optional()
    .or(z.literal("")),
});

function stripEmpty(obj) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== "" && v !== undefined) out[k] = v;
  });
  return out;
}

function ItemStoreHeroSetting() {
  /*
  const { data: storeResp } = useQuery({
    queryKey: ["store"],
    queryFn: getMyStore,
  });
*/
  const { data: store } = useStore();
  const whatSell = store?.whatSell || "Other";

  //const store = storeResp?.data ?? storeResp;

  const storeId = store?._id;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { heroImage: "", heading: "", subheading: "" },
    mode: "onSubmit",
  });

  //const whatSell = useMemo(() => store?.whatSell || "Other", [store]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => {
      if (!storeId) throw new Error("Store not found");
      return updateStore(stripEmpty(values), storeId);
    },
    onSuccess: () => {
      //const s = updated?.data ?? updated;

      toast.success("Store hero updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const { control, handleSubmit, setValue, watch, formState } = form;
  const isSubmitting = mutation.isPending || formState.isSubmitting;

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={control}
          name="heroImage"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageCarousel
          brandColor={store?.brandColor}
          watch={watch}
          onSelect={(imagePath) =>
            setValue("heroImage", imagePath, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
          heading={watch("heading")}
          subheading={watch("subHeading")}
          control={control}
          slides={[
            { image: `/images/heroImage/${whatSell}/image1.jpg` },
            { image: `/images/heroImage/${whatSell}/image2.jpg` },
            { image: `/images/heroImage/${whatSell}/image3.jpg` },
          ]}
        />

        <FormField
          control={control}
          name="heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">Heading</FormLabel>
              <FormControl>
                <Input
                  className="h-11 rounded-sm border-slate-300 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="subHeading"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">Subheading</FormLabel>
              <FormControl>
                <Input
                  className="h-11 rounded-sm border-slate-300 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting || !storeId}
          className="mt-2 h-11 w-full text-base font-medium"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updatting...
            </span>
          ) : (
            "Update Hero section"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ItemStoreHeroSetting;
