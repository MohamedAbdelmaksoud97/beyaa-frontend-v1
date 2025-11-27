"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordRequest } from "@/services/user";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Navigation from "@/pages/landingPage/Nav";
import { Loader2 } from "lucide-react";

const schema = z.object({
  newPassword: z.string().min(6),
  newPasswordConfirm: z.string().min(6),
});

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ newPassword, newPasswordConfirm }) =>
      resetPasswordRequest(token, { newPassword, newPasswordConfirm }),

    onSuccess: () => {
      toast.success("Password reset successful!");
      navigate("/login");
    },

    onError: (err) => toast.error(err.message),
  });

  return (
    <Form {...form}>
      <Navigation />

      <div className="mt-24 flex justify-center px-4 md:mt-28">
        <div className="mx-5 w-full max-w-lg pb-16 lg:px-0">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Reset Password
          </h1>

          <form
            onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
            className="space-y-6"
          >
            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-11 rounded-sm border-slate-300 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm */}
            <FormField
              control={form.control}
              name="newPasswordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
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
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}
