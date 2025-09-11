import { ShoppingBag, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Easy Store Setup",
    description:
      "Launch your online store in minutes with our intuitive setup wizard.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Sales Analytics",
    description: "Track your performance with detailed analytics and insights.",
  },
  {
    icon: Zap,
    title: "Fast & Secure Checkout",
    description:
      "Optimized checkout process that converts visitors into customers.",
  },
];

const ValueProposition = () => {
  return (
    <section
      id="features"
      className="bg-secondary-800 relative py-20 text-white"
    >
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="animate-fade-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to succeed online
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            From setup to scaling, we've got all the tools to help your business
            thrive.
          </p>
        </div>

        <div className="animate-slide-up grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-secondary-800 rounded-[var(--radius)] border border-white/10 p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="bg-primary-400/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <f.icon className="text-primary-400 h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
              <p className="leading-relaxed text-white/70">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
