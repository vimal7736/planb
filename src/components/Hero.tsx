"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
  "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg",
  "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg",
  "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg",
  "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000); // Change image every 3 seconds to allow the 2s transition to finish
    
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-14 overflow-hidden bg-background">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-background-alt rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse-slow"></div>

      <div className="w-full px-4 md:px-12 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left pt-12 md:pt-0 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif tracking-tighter text-foreground leading-[0.9]">
              FINE LINE <br />
              <span className="text-primary italic font-light">&</span> CUSTOM <br />
              DESIGN.
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-md mx-auto md:mx-0 font-light text-foreground">
              Minimalist, elegant, and timeless tattoo art crafted specifically for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="#booking" 
              className="px-8 py-4 bg-primary text-background rounded-full font-medium transition-all transform hover:scale-95 active:scale-90 neumorphic-inset text-center"
            >
              Request Appointment
            </Link>
            <Link 
              href="#portfolio" 
              className="px-8 py-4 border-2 border-primary/30 text-primary rounded-full font-medium hover:bg-primary/5 transition-colors text-center"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="flex-1 w-full relative">
          <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-background-alt group">
            {HERO_IMAGES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Tattoo Portfolio Image ${index + 1}`}
                fill
                priority={index < 2}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`absolute inset-0 object-cover transition-all duration-[2000ms] ease-in-out ${
                  index === currentImageIndex && loadedImages[index]
                    ? "opacity-100 scale-100 blur-0 z-10" 
                    : "opacity-0 scale-105 blur-sm z-0"
                }`}
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [index]: true }))}
              />
            ))}
            {/* Overlay for contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
