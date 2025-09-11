import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Bloom Boutique",
    content:
      "beyaa helped us launch our online store in just one afternoon. The analytics are incredible!",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Owner, Craft Corner",
    content:
      "Finally, a platform that actually makes sense. Our sales have increased 200% since switching.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "CEO, Local Harvest",
    content:
      "The checkout process is so smooth. Our customers love how easy it is to purchase from us now.",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="bg-secondary-800 relative py-20 text-white">
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="animate-fade-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by small businesses to scale smarter
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Join thousands of merchants who've transformed their business with
            beyaa.
          </p>
        </div>

        <div className="animate-slide-up grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-secondary-800 rounded-[var(--radius)] border border-white/10 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="fill-primary-400 text-primary-400 h-5 w-5"
                  />
                ))}
              </div>

              <blockquote className="mb-6 leading-relaxed text-white/90">
                "{t.content}"
              </blockquote>

              <div className="border-t border-white/10 pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-white/70">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
          {[
            { k: "10k+", v: "Active Stores" },
            { k: "$50M+", v: "Sales Processed" },
            { k: "99.9%", v: "Uptime" },
            { k: "24/7", v: "Support" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-primary-400 mb-2 text-3xl font-bold">
                {s.k}
              </div>
              <div className="text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
