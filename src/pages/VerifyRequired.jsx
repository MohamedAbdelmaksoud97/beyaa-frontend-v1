"use client";
import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "@/services/user";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import MainWrapper from "@/ui/MainWrapper";

export default function VerifyRequired() {
  const mutation = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      toast.success("Verification email sent!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to resend verification email");
    },
  });

  return (
    <MainWrapper>
      <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-2xl font-bold">Verify Your Email</h1>
        <p className="mb-6 max-w-md text-slate-600">
          You must verify your email before creating products. Please check your
          inbox or click the button below to resend the verification email.
        </p>

        <Button
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
          className="mb-3 w-full max-w-xs"
        >
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </div>
    </MainWrapper>
  );
}
