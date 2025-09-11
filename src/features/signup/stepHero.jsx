"use client";
/* eslint-disable no-unused-vars */
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import imageCarousel from "./imageCarousel.jsx"; // Assuming this is the correct import path
import ImageCarousel from "./imageCarousel.jsx";
import { Spinner } from "@/components/ui/shadcn-io/spinner/index.jsx";

export default function StepHero({
  control,
  brandColor,
  setStep,
  watch,
  setValue,
  register,
  isSubmitting,
}) {
  const heading = watch("heading");
  const subheading = watch("subheading");
  const whatSell = watch("whatSell");
  console.log(whatSell);

  return (
    <div className="space-y-5">
      {/* keep heroImage in the form state */}
      <FormField
        control={control}
        name="heroImage"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
            <FormMessage /> {/* 👈 shows error like "Required" */}
          </FormItem>
        )}
      />
      <ImageCarousel
        watch={watch}
        onSelect={(imagePath) => {
          console.log("User chose:", imagePath);
          // Update the form state with the selected image path

          setValue("heroImage", imagePath, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }}
        heading={heading}
        subheading={subheading}
        control={control}
        brandColor={brandColor}
        slides={[
          {
            image: `/images/heroImage/${whatSell}/image1.jpg`,
          },
          {
            image: `/images/heroImage/${whatSell}/image2.jpg`,
          },
          {
            image: "/images/slide3.jpg",
          },
        ]}
      />
      {/* Heading input */}
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
      {/* Subheading input */}
      <FormField
        control={control}
        name="subheading"
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
      {/* Navigation buttons */}
      <div className="mt-10 flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={() => {
            setStep(2);
          }}
        >
          Back
        </Button>
        <Button type="submit" variant="default" className="flex-1">
          {isSubmitting ? <Spinner /> : "Create my store"}
        </Button>
      </div>
    </div>
  );
}
