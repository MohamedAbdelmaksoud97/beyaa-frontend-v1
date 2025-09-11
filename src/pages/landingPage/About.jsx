"use client";

import React from "react";
import Navigation from "@/pages/landingPage/Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ShoppingCart,
  LineChart,
  PackageCheck,
  Wallet,
  Users,
  Megaphone,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutOwners() {
  const navigate = useNavigate();
  return (
    <section className="from-secondary-900 via-secondary-800 to-secondary-700 relative min-h-screen overflow-hidden bg-gradient-to-br text-white">
      {/* Top navigation */}
      <Navigation />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(var(--primary)/0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_110%_10%,hsl(var(--primary)/0.08),transparent)]"
      />

      {/* Content wrapper with spacing under fixed nav */}
      <div className="container mx-auto px-6 pt-28 pb-20 md:pt-32 md:pb-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
            Everything you need to run and grow your store
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            Beyaa keeps your daily operations simple: list products, take
            payments, track orders, and understand your sales — all in one clean
            dashboard. No bloat, no noise, just the tools that help you sell.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="px-6"
            >
              Start free
            </Button>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Benefit
            icon={<ShoppingCart className="h-5 w-5" />}
            title="Frictionless checkout"
            desc="A fast, trustworthy checkout so customers complete their purchase without drop-off."
          />
          <Benefit
            icon={<PackageCheck className="h-5 w-5" />}
            title="Effortless catalog"
            desc="Add products, manage stock, and set pricing in minutes — keep your catalog tidy."
          />
          <Benefit
            icon={<Wallet className="h-5 w-5" />}
            title="Get paid your way"
            desc="Support popular payment methods with clear fees and payouts you can rely on."
          />
          <Benefit
            icon={<LineChart className="h-5 w-5" />}
            title="Sales you can read"
            desc="Know what’s selling, where profits come from, and what to do next — at a glance."
          />
          <Benefit
            icon={<Users className="h-5 w-5" />}
            title="Customer friendly"
            desc="Order updates, clear statuses, and easy support tools keep shoppers coming back."
          />
          <Benefit
            icon={<Megaphone className="h-5 w-5" />}
            title="Grow with promos"
            desc="Run discounts and simple campaigns without breaking your pricing or margins."
          />
          <Benefit
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Built for trust"
            desc="Sensible security, clear permissions, and audited actions for peace of mind."
          />
          <Benefit
            icon={<Clock className="h-5 w-5" />}
            title="Save time daily"
            desc="Clean workflows reduce clicks and mistakes — less admin, more selling."
          />
        </div>

        {/* Outcome section */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Outcome
            title="Launch fast"
            points={[
              "Set up products and policies quickly",
              "Start accepting payments on day one",
              "No complex steps before your first sale",
            ]}
          />
          <Outcome
            title="Operate simply"
            points={[
              "See orders, stock, and sales in one place",
              "Clear statuses from checkout to delivery",
              "Smart defaults reduce busywork",
            ]}
          />
          <Outcome
            title="Grow confidently"
            points={[
              "Spot bestsellers and low inventory",
              "Run targeted discounts without chaos",
              "Keep customers informed and loyal",
            ]}
          />
        </div>

        {/* CTA strip */}
        <div className="mt-16">
          <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center md:flex-row md:text-left">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Ready to simplify your store?
                </h3>
                <p className="text-white/80">
                  Start with the essentials and add more when you need it.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/signup")}
                  size="lg"
                  className="px-6"
                >
                  Create your store
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 px-6 text-white"
                >
                  Talk to us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* Reusable pieces */

function Benefit({ icon, title, desc }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="border-primary/20 bg-primary-400/20 text-primary-400 flex h-12 w-12 items-center justify-center rounded-xl border">
          {icon}
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/80">{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function Outcome({ title, points }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-white/80">
        <ul className="list-disc space-y-2 pl-5">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
