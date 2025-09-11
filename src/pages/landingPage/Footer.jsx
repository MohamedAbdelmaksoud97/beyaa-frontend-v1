import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary-800 relative py-16 text-white">
      {/* separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="from-primary-300 to-primary-400 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              beyaa
            </div>
            <p className="max-w-xs leading-relaxed text-white/70">
              The modern platform for building, managing, and growing your
              online store.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-primary-400 text-white/70 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary-400 text-white/70 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary-400 text-white/70 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/70">
            © 2024 beyaa. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <a href="#" className="hover:text-primary-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
