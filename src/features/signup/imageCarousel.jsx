import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function ImageCarousel({
  slides = [],
  brandColor,
  heading,
  subheading,
  onSelect,
  watch,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);
  const logo = watch("logo");
  if (logo) {
    var previewUrl = URL.createObjectURL(logo) || "No Image Selected";
  }
  // listen to carousel slide changes
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      setActiveIndex(index);
      if (onSelect) {
        onSelect(slides[index].image);
      }
    };

    api.on("select", handleSelect);
    handleSelect(); // run once at mount

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, onSelect, slides]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                className={`relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl shadow-md ${
                  activeIndex === index ? "ring-2 ring-white" : ""
                }`}
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={heading || "Slide Image"}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt={heading || "Slide Image"}
                      className="h-6 w-6"
                    />
                  )}
                </div>
                {/* Text Content */}
                <div className="relative z-10 max-w-xl p-6 text-center">
                  <h2 className="mb-2 text-xl font-bold text-white">
                    {heading}
                  </h2>
                  <p className="text-md mb-4 text-white">{subheading}</p>
                  <Button
                    style={{ backgroundColor: brandColor }}
                    className="hover:bg-opacity-80 px-2 py-1 text-white transition-colors"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mb-8 flex translate-y-8 justify-center gap-10">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
