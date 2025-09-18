"use client";
/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { motion, AnimatePresence } from "framer-motion";
import StepHero from "./stepHero";
import { useMutation } from "@tanstack/react-query";
import { createStore } from "../../services/store";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const fullSchema = z.object({
  storeName: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters long." }),
  whatSell: z.string().min(1, { message: "Please describe what you sell." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  brandColor: z.string().min(1, { message: "Please select a brand color." }),
  logo: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024, // 2MB max
      "Logo size must be less than 2MB",
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Only images are allowed",
    ),
  heading: z
    .string()
    .min(2, { message: "Heading must be at least 2 characters long." }),
  subHeading: z
    .string()
    .min(4, { message: "Subheading must be at least 4 characters long." }),
  heroImage: z.string().min(1, { message: "Please select a hero image." }),
});

const DEFAULTS = {
  storeName: "",
  whatSell: "",
  description: "",
  brandColor: "#2664e9",
  logo: null,
  heading: "",
  subHeading: "",
  heroImage: "",
};

const STEP_FIELDS = {
  1: ["storeName", "whatSell", "description"],
  2: ["brandColor", "logo"],
  3: ["heading", "subHeading", "heroImage"],
};

const TOTAL_STEPS = 3;

export default function CreateStoreWizard({ onCreateStore }) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createStore,
    onSuccess: (data) => {
      console.log("Store created:", data);
      navigate(`/${data?.data?.slug}`); // Redirect to the new store page
      toast.success("Store created successfully!");
      // You could also trigger a refetch or update UI here
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const [logo, setLogo] = useState(null);

  const methods = useForm({
    defaultValues: DEFAULTS,
    mode: "onBlur",
    shouldUnregister: false,
    resolver: zodResolver(fullSchema),
  });
  const {
    handleSubmit,
    setValue,
    trigger,
    register,
    control,
    watch,
    getValues,
  } = methods;
  const [step, setStep] = React.useState(1);

  const brandColor = watch("brandColor") || "#22d172";

  const onSubmit = (values) => {
    console.log("ttttttttttttt", values);
    try {
      const formData = new FormData();

      // Append all required fields with consistent naming
      formData.append("name", values.storeName); // Changed to match backend
      formData.append("storeInformation", values.description);
      formData.append("whatSell", values.whatSell);
      formData.append("brandColor", values.brandColor);
      formData.append("heading", values.heading);
      formData.append("subHeading", values.subHeading);
      formData.append("heroImage", values.heroImage); // Ensure this is a string path

      // Handle files
      if (values.logo) {
        formData.append("logo", values.logo);
      }

      // Create and append userInterface

      // Get auth token (assuming you're using cookies/localStorage)

      // Send request with auth header
      mutation.mutate(formData);
    } catch (error) {
      console.error("Submission error:", error);
      window.alert(`Error: ${error.message}`);
    }
  };
  const onError = (errors) => {
    console.log("FORM ERRORS:", errors);
  };

  // validate only current step
  const validateAndNext = async (nextStep) => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    const logoFile = watch("logo");
    if (logoFile && logoFile instanceof File) {
      setValue("logo", logoFile, { shouldValidate: true });
    }
    setStep(nextStep);
  };
  const isSubmitting = mutation.isPending || methods.formState.isSubmitting;

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-16">
      <header className="pt-8 pb-4">
        <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
          Create Your Store
        </h1>
        <div className="bg-primary-100 mt-3 h-[3px] w-full rounded-full">
          <div
            className="bg-primary-500 h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 5 + 1 / 5) * 100}%` }}
          />
        </div>
      </header>

      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-5"
            noValidate
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-5">
                    <FormField
                      control={control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
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
                      control={control}
                      name="description"
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
                      type="button"
                      className="w-full"
                      onClick={() => validateAndNext(2)}
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-6">
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
                                onChange={(e) => {
                                  onChange(e.target.files[0]);
                                  setLogo(e.target.files[0].name);

                                  console.log(
                                    "Logo file selected:",
                                    e.target.files[0].name,
                                  );
                                }}
                                {...field}
                                className="file sss mt-3 block w-full border-0 pl-0 text-slate-800 shadow-none file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:text-sm hover:file:bg-slate-200"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>Pick your brand color</FormLabel>
                      <input
                        type="color"
                        {...register("brandColor")}
                        className="mt-3 h-12 w-20 cursor-pointer rounded border"
                      />
                    </div>
                    <div className="mt-15 flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        className="flex-1"
                        onClick={() => validateAndNext(3)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <StepHero
                    control={control}
                    brandColor={brandColor}
                    setStep={setStep}
                    watch={watch}
                    setValue={setValue}
                    trigger={trigger}
                    register={register}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
