"use client";

import React from "react";
import MainWrapper from "@/ui/MainWrapper";
import { useStore } from "@/contexts/StoreContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export default function StoreAboutCard({ className = "" }) {
  const { data: store, isLoading } = useStore();
  console.log(store);
  const info = store?.storeInformation || "";

  return (
    <MainWrapper>
      <div className={`w-full ${className}`}>
        <div className="mx-auto max-w-3xl px-6 py-10 md:py-12">
          <Card className="rounded-2xl border-slate-200 bg-white text-slate-900 shadow-sm">
            <CardHeader className="space-y-2">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-md">
                <Info className="h-4 w-4" aria-hidden />
              </div>
              <CardTitle>About US</CardTitle>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-3/4 rounded bg-slate-200/80" />
                  <div className="h-4 w-2/3 rounded bg-slate-200/80" />
                  <div className="h-4 w-1/2 rounded bg-slate-200/80" />
                </div>
              ) : info ? (
                <div className="leading-relaxed break-words whitespace-pre-wrap">
                  {info}
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-600">
                  The store owner hasn’t added their about info yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainWrapper>
  );
}
