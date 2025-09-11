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
import Navigation from "@/pages/landingPage/Nav";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"; // ✅ import loader

// ---------------- Schema ----------------
const SignInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("You have logged in ", data);
      if (!data?.data?.slug) {
        toast.success(`Let's build your store!`);
        return navigate("/createStore");
      }
      navigate(`/${data?.data?.slug}`);
      toast.success(`Welcome Back!`);
    },
    onError: (error) => {
      console.error("Error:", error.message);
      toast.error(error.message || "Login failed");
    },
  });

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <Navigation />

      <div className="mt-24 flex justify-center px-4 md:mt-28">
        <div className="mx-5 w-full max-w-lg pb-16 lg:px-0">
          <p className="text-secondary-800 mb-8 text-center text-[22px] font-medium">
            Welcome back to <span className="text-primary-400">Beyaa.</span>
          </p>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight">Log in</h1>
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 rounded-sm border-slate-300 text-base"
                      {...field}
                      placeholder=""
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="min-h-[1.25rem]" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
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
                  <FormMessage className="min-h-[1.25rem]" />
                </FormItem>
              )}
            />

            {/* Actions row */}
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-secondary-900">Forget password?</span>
              <Button
                className="text-secondary-900 hover:text-secondary-300 px-1 font-medium underline"
                variant="link"
                size="sm"
              >
                Click here
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}
