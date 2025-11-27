"use client";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "../contexts/useVerifyEmail.jsx";
import MainWrapper from "../ui/MainWrapper.jsx";
export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      mutate(token, {
        onSuccess: (data) => {
          const slug = data?.data?.slug;

          // Intelligent redirect
          setTimeout(() => {
            if (slug) {
              navigate(`/${slug}`);
            } else {
              navigate("/create-store");
            }
          }, 2000);
        },
      });
    }
  }, [token]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {isPending && (
        <>
          <h2 className="text-xl font-semibold">Verifying your email...</h2>
          <p>Please wait a moment.</p>
        </>
      )}

      {isSuccess && (
        <>
          <h2 className="text-2xl font-semibold text-green-600">
            Email Verified Successfully 🎉
          </h2>
          <p>Redirecting you…</p>
        </>
      )}

      {isError && (
        <>
          <h2 className="text-xl font-semibold text-red-600">
            Verification Failed
          </h2>
          <p>{error.message}</p>
        </>
      )}

      {!token && !isPending && (
        <p className="text-red-600">Invalid verification link.</p>
      )}
    </div>
  );
}
