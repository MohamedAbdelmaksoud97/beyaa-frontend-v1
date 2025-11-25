"use client";

import React from "react";
import { Facebook, Instagram, Youtube, ArrowUpRight } from "lucide-react";

/**
 * Professional eCommerce Footer
 * Modern, minimal, responsive and brand-color accented (light theme)
 */
export default function StoreFooter({ footer, brandColor }) {
  if (!footer) return null;

  const social = footer.socialLinks || {};
  const quick = footer.quickLinks || {};

  const accent = brandColor || "#2664e9";

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    // tiktok: Tiktok,
  };

  return (
    <footer className="mt-16 w-full border-t border-slate-200 bg-slate-50">
      {/* Container */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* -------------- BRAND SECTION -------------- */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-2xl font-bold tracking-tight"
              style={{ color: accent }}
            >
              {footer.storeName || ""}
            </h3>

            <p className="text-sm leading-relaxed text-slate-600">
              Thank you for visiting our store. Discover quality products and a
              smooth shopping experience.
            </p>
          </div>

          {/* -------------- QUICK LINKS -------------- */}
          <div>
            <h4 className="mb-3 text-lg font-semibold text-slate-900">
              Quick Links
            </h4>

            <ul className="space-y-2">
              {Object.entries(quick).map(([label, url]) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-slate-900"
                  >
                    {label.replace(/([A-Z])/g, " $1")}
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 transition-all group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------- SOCIAL LINKS -------------- */}
          <div>
            <h4 className="mb-3 text-lg font-semibold text-slate-900">
              Follow Us
            </h4>

            <div className="flex items-center gap-4">
              {Object.entries(social).map(([key, url]) => {
                const Icon = socialIcons[key.toLowerCase()];
                if (!Icon) return null;

                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <Icon size={22} style={{ color: accent }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* -------------- COPYRIGHT -------------- */}
        <div className="mt-10 border-t border-slate-200 pt-5 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
