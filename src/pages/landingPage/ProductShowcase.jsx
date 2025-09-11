import storeInterface from "@/assets/store-interface.jpg";

const ProductShowcase = () => {
  return (
    <section className="bg-secondary-800 relative py-20 text-white">
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <div className="animate-fade-up space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
                From products to purchases, manage everything in one dashboard
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-white/70">
                Our intuitive interface makes it easy to manage inventory,
                process orders, and track your business growth — all from a
                single, powerful dashboard.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Inventory Management",
                  desc: "Track stock levels, set low-stock alerts, and manage variants effortlessly.",
                },
                {
                  title: "Order Processing",
                  desc: "Streamlined order management with automated workflows and notifications.",
                },
                {
                  title: "Performance Insights",
                  desc: "Make data-driven decisions with comprehensive analytics and reporting.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="bg-primary-400 mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                  <div>
                    <h4 className="mb-1 font-semibold">{f.title}</h4>
                    <p className="text-white/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="animate-slide-up relative">
            <div className="relative">
              <img
                src={storeInterface}
                alt="beyaa Store Interface"
                className="h-auto w-full rounded-[var(--radius)] border border-white/10 shadow-xl"
              />
              <div className="to-primary-400/10 absolute inset-0 rounded-[var(--radius)] bg-gradient-to-br from-transparent" />
            </div>

            {/* Decorative */}
            <div className="bg-primary-400/20 absolute -top-6 -left-6 h-20 w-20 rounded-full blur-2xl" />
            <div className="bg-primary-300/20 absolute -right-6 -bottom-6 h-28 w-28 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
