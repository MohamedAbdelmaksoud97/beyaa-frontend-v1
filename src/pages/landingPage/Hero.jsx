import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
//import dashboardMockup from "@/assets/dashboard-mockup.png";
//import dashboardMockup from "@/assets/dashboard-mockup.png";
import dashboard from "@/assets/dashboard.png";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary-800 relative overflow-hidden text-white">
      {/* top separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="animate-fade-up space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
                Build, Manage, and Grow Your Store — All in One Place
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                Lightweight, powerful, and built for modern merchants. Launch
                your online store in minutes with our all-in-one platform.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => navigate("signup")}
                size="lg"
                className="group bg-primary-400 hover:bg-primary-500 text-white"
              >
                Start Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                className="group border border-white/20 bg-white/10 text-white hover:bg-white/20"
                onClick={() =>
                  window.open("/trendora", "_blank", "noopener,noreferrer")
                }
              >
                <Play className="h-5 w-5" />
                See Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="bg-primary-300 h-2 w-2 rounded-full" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-secondary-300 h-2 w-2 rounded-full" />
                Free forever plan
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="animate-slide-up relative">
            <div className="relative">
              <img
                src={dashboard}
                alt="beyaa Dashboard Preview"
                className="h-auto w-full rounded-[var(--radius)] border border-white/10 shadow-xl"
              />
              <div className="from-secondary-800/30 absolute inset-0 rounded-[var(--radius)] bg-gradient-to-t to-transparent" />
            </div>

            {/* Decorative */}
            <div className="bg-primary-400/20 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-2xl" />
            <div className="bg-primary-300/20 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* bottom separator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Hero;
