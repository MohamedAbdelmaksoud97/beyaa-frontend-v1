"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgotPasswordRequest } from "@/services/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Navigation from "@/pages/landingPage/Nav";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: () => {
      toast.success("If this email exists, a reset link was sent!", {
        duration: 8000,
      });
    },
    onError: (err) => {
      toast.error(err.message || "Error sending reset email");
    },
  });

  return (
    <Form {...form}>
      <Navigation />

      <div className="mt-24 flex justify-center px-4 md:mt-28">
        <div className="mx-5 w-full max-w-lg pb-16 lg:px-0">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Forgot Password
          </h1>

          <p className="mb-6 text-center text-slate-600">
            Enter your email and we’ll send a reset link.
          </p>

          <form
            onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 rounded-sm border-slate-300 text-base"
                      placeholder="your@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}
