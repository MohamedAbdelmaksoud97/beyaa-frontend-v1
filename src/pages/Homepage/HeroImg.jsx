import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function HeroImg({ store }) {
  const { slug } = useParams();
  const brandHex = store?.brandColor || "#0ea5e9"; // fallback brand color

  return (
    <section className="relative isolate h-[550px] md:h-[650px]">
      {/* Background image */}
      <img
        src={`${store.heroImage}`}
        alt="Modern marble showroom with natural light"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        fetchpriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 -z-10 bg-black/50"></div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-regular text-2xl tracking-tight text-white sm:text-6xl"
          >
            {store.heading}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-md mt-6 leading-8 text-white"
          >
            {store.subHeading}
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-10"
          >
            <NavLink to={`/${slug}/products`}>
              <span
                className="inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition-transform duration-300 hover:scale-[1.05] hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: brandHex }}
              >
                Shop now
              </span>
            </NavLink>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40"></div>
    </section>
  );
}

export default HeroImg;
