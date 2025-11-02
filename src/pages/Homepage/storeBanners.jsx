// StoreBanners.jsx
"use client";

import React from "react";
import { NavLink } from "react-router-dom";

export default function StoreBanners({ banners = [], brandColor = "#000000" }) {
  if (!banners.length) return null;

  // newest-first
  const sortedBanners = [...banners].reverse();

  return (
    <section className="mt-12">
      <div className="space-y-6">
        {sortedBanners.map((b) => {
          const Wrapper = b.link ? NavLink : "div";
          return (
            <Wrapper
              key={b._id || b.title}
              to={b.link || undefined}
              className="relative block w-full overflow-hidden rounded-xl shadow-md transition hover:scale-[1.01] hover:shadow-lg"
            >
              {/* Banner image */}
              {b.image && (
                <img
                  src={`${import.meta.env.VITE_ASSETS_BASE}/img/banners/${b.image}`}
                  alt={b.title}
                  className="h-56 w-full object-cover sm:h-72 md:h-80"
                />
              )}

              {/* Gradient overlay on the left */}
              <div
                className="absolute inset-y-0 left-0 w-2/3"
                style={{
                  background: `linear-gradient(to right, #5f5f5f 20%, transparent 100%)`,
                }}
              />

              {/* Text overlay on the left */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 text-white sm:p-10">
                <h3 className="mb-3 max-w-[200px] text-2xl font-semibold break-words">
                  {b.title}
                </h3>
                {b.description && (
                  <p className="max-w-[300px] text-base leading-relaxed break-words whitespace-pre-wrap text-slate-100">
                    {b.description}
                  </p>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
