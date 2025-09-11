import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "Up to 10 products",
      "100 orders per month",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    description: "For growing businesses",
    features: [
      "Unlimited products",
      "Unlimited orders",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Marketing tools",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
];

const PricingTeaser = () => {
  const navigate = useNavigate();
  return (
    <section
      id="pricing"
      className="bg-secondary-800 relative py-20 text-white"
    >
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="animate-fade-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Start free and scale with confidence. No hidden fees, no surprises.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="animate-slide-up grid gap-6 md:grid-cols-2">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={[
                  "bg-secondary-800 rounded-[var(--radius)] border border-white/10 p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg",
                  plan.popular ? "ring-primary-400 ring-2" : "",
                ].join(" ")}
              >
                {plan.popular && (
                  <div className="mb-6 flex justify-center">
                    <span className="bg-primary-400 rounded-full px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <div className="mb-2 flex items-end justify-center gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="pb-1 text-sm text-white/70">/month</span>
                  </div>
                  <p className="text-white/70">{plan.description}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="text-primary-400 mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={() => navigate("signup")}
                  className={[
                    "group w-full",
                    plan.popular
                      ? "bg-primary-400 hover:bg-primary-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20",
                  ].join(" ")}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">
              No credit card required to start • Cancel anytime • 14-day
              money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
