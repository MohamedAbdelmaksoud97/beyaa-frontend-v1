"use client";
/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/user.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//import { handleValidationErrors } from "../../utils/helpers.js";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/pages/landingPage/Nav.jsx";
// ── Validation
const formSchema = z
  .object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "At least 8 characters."),
    passwordConfirm: z.string(),
    phone: z.string().min(6, "Enter a valid phone."),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });

export default function CreateStoreForm({ setStep }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      navigate("/createStore");
      // navigate/toast here
    },
    onError: (error) => {
      console.error("Error creating store:", error.data.error.keyPattern);

      // Handle validation errors from the server

      // If server didn’t send errors, try to infer duplicate email

      if (error.data.error.keyPattern?.email) {
        form.setError("email", {
          type: "server",
          message: "Email already exists. Please use another email.",
        });
        return;
      }
      if (error.data.error.keyPattern?.phone) {
        form.setError("phone", {
          type: "server",
          message: "phone already exists. Please use another one.",
        });
        return;
      }

      const fieldErrors = error?.cause?.fieldErrors;
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([name, message]) => {
          form.setError(name, { type: "server", message });
        });
        return;
      }
      console.error(error.message);
    },
  });

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
    // values already contain: name, email, password, passwordConfirm, phone
    // add role only if your API allows clients to set it (often this is server-side only)
    // const payload = { ...values, role: "admin" };
    mutation.mutate(values);
  };

  /*
  const onSubmit = () => {
    // values already contain: name, email, password, passwordConfirm, phone
    // add role only if your API allows clients to set it (often this is server-side only)
    // const payload = { ...values, role: "admin" };
    setStep(2); // Move to the next step after successful signup
  };
*/
  const isSubmitting = mutation.isPending || form.formState.isSubmitting;

  return (
    <>
      <Navigation />
      <div className="mx-auto w-full max-w-md px-5 pt-20 pb-16">
        {/* Header */}
        <header className="pt-8 pb-4">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Create Your Store
          </h1>

          {/* Thin progress bar under the title (adjust width% to match step) */}
          <div className="bg-primary-100 mt-3 h-[3px] w-full rounded-full">
            <div
              className="bg-primary-500 h-full -translate-x-full rounded-full transition-transform duration-300 ease-in-out data-[open=true]:translate-x-0"
              style={{ width: "18%" }} // ← adjust step progress here
            />
          </div>
        </header>

        {/* Form */}
        <Form {...form}>
          <AnimatePresence mode="wait">
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-normal">
                        Your Name
                      </FormLabel>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-normal">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-normal">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=""
                          {...field}
                          className="h-11 rounded-sm border-slate-300 text-base"
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Minimum 6 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-normal">
                        Password confirm
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-normal">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          inputMode="tel"
                          placeholder=""
                          {...field}
                          className="h-11 rounded-sm border-slate-300 text-base"
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
                  className="h-11 w-full text-base font-medium"
                >
                  {isSubmitting ? <Spinner /> : "Create account"}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
        </Form>
      </div>
    </>
  );
}
