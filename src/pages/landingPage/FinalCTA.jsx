import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary-800 relative py-20 text-white">
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="animate-fade-up space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold md:text-5xl">
              Ready to launch your store in minutes?
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
              Join thousands of merchants building successful online businesses
              with beyaa. Start your free store today — no credit card required.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => navigate("signup")}
              className="group bg-primary-400 hover:bg-primary-500 text-white shadow-lg"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border border-white/30 bg-slate-700 text-white hover:bg-white/10 hover:text-white"
            >
              Talk to Sales
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="bg-primary-300 h-2 w-2 rounded-full" />
              Setup in 5 minutes
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary-300 h-2 w-2 rounded-full" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-200 h-2 w-2 rounded-full" />
              Free migration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
