"use client";

import Link from "next/link";
import Image from "next/image";
import CinematicGallery, { GalleryImage } from "./CinematicGallery";
import { PremiumCard } from "./PremiumCard";
import { useEffect, useState } from "react";

const HERO_IMAGES: GalleryImage[] = [
  { id: "1", src: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg", category: "Fine Line", date: "2024-05-15" },
  { id: "2", src: "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg", category: "Realism", date: "2024-04-20" },
  { id: "3", src: "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg", category: "Geometric", date: "2024-06-01" },
  { id: "4", src: "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg", category: "Minimalist", date: "2024-03-10" },
  { id: "5", src: "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg", category: "Fine Line", date: "2024-05-28" },
  { id: "6", src: "/tattooos/tattoo-1.png", category: "Geometric", date: "2024-02-14" },
  { id: "7", src: "/tattooos/tattoo-2.png", category: "Realism", date: "2024-01-05" },
  { id: "8", src: "/tattooos/tattoo-3.png", category: "Minimalist", date: "2024-06-12" },
  { id: "9", src: "/tattooos/tattoo-4.png", category: "Fine Line", date: "2023-11-20" },
  { id: "10", src: "/tattooos/tattoo-5.png", category: "Geometric", date: "2023-12-15" },
  { id: "11", src: "/tattooos/tattoo-6.png", category: "Realism", date: "2024-05-05" },
  // Let's duplicate them to create a "dense" gallery feel with many images
  { id: "12", src: "/tattooos/tattoo-1.png", category: "Minimalist", date: "2024-06-15" },
  { id: "13", src: "/tattooos/tattoo-2.png", category: "Fine Line", date: "2024-06-18" },
  { id: "14", src: "/tattooos/tattoo-3.png", category: "Geometric", date: "2024-06-19" },
  { id: "15", src: "/tattooos/tattoo-4.png", category: "Realism", date: "2024-06-20" },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Carousel loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Button Triggered Animation (Forward & Backward)
  const animateSequence = (direction: 'forward' | 'backward') => {
    if (isAnimating) return;

    // Check if we're already at the target
    if (direction === 'forward' && animationProgress >= 1) return;
    if (direction === 'backward' && animationProgress <= 0) return;

    setIsAnimating(true);

    const duration = 3500; // 3.5 seconds for the cinematic sequence
    const start = performance.now();
    const startValue = animationProgress;
    const targetValue = direction === 'forward' ? 1 : 0;
    const valueDiff = targetValue - startValue;

    const animate = (time: number) => {
      const elapsed = time - start;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth ease-in-out sine function for a cinematic feel
      const easeInOutSine = -(Math.cos(Math.PI * rawProgress) - 1) / 2;

      setAnimationProgress(startValue + valueDiff * easeInOutSine);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimationProgress(targetValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Derived Animation Values

  // 1. Initial Text Content (Flies off to the left)
  const textOpacity = Math.max(0, 1 - animationProgress * (1 / 0.3));
  const textX = animationProgress < 0.3 ? -(animationProgress * 300) : -100;
  const textPointerEvents = animationProgress > 0.05 ? "none" : "auto";

  // 2. Spiral massive zoom and rotate (Background)
  const spiralScale = 1 + animationProgress * 30;
  const spiralRotation = animationProgress * 540;
  const spiralOpacity = Math.min(1, 0.1 + animationProgress * 2);

  // 3. Loader (Tattoo machine) fades in during the middle white space (Left Column)
  let loaderOpacity = 0;
  if (animationProgress > 0.3 && animationProgress <= 0.45) {
    loaderOpacity = (animationProgress - 0.3) * (1 / 0.15);
  } else if (animationProgress > 0.45 && animationProgress <= 0.55) {
    loaderOpacity = 1;
  } else if (animationProgress > 0.55 && animationProgress <= 0.65) {
    loaderOpacity = Math.max(0, 1 - (animationProgress - 0.55) * (1 / 0.1));
  }
  const loaderScale = 1 + (animationProgress - 0.3) * 0.5;

  // 4. Wow Factor Reveal flies in from the bottom (Left Column)
  let revealOpacity = 0;
  if (animationProgress > 0.65) {
    revealOpacity = Math.min(1, (animationProgress - 0.65) * (1 / 0.2));
  }
  const revealY = animationProgress < 0.85 ? 50 - (revealOpacity * 50) : 0;
  const revealPointerEvents = animationProgress > 0.8 ? "auto" : "none";

  return (
    <section id="hero" className="relative h-screen bg-background overflow-hidden flex items-center pt-14">
      <div className="w-full h-full relative">

        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-background-alt rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse-slow z-0"></div>

        {/* Massive Zooming Circular Watermark */}
        <div
          className="absolute top-1/2 left-1/2 z-0 pointer-events-none origin-center"
          style={{
            transform: `translate(-50%, -50%) scale(${spiralScale}) rotate(${spiralRotation}deg)`,
            opacity: spiralOpacity,
          }}
        >
          <div className="w-[600px] h-[600px] text-primary">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="heroTopCircle" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
              </defs>

              <path d="M 50 50 m -10 0 a 10 10 0 1 1 20 0 a 10 10 0 1 1 -20 0" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M 50 50 m -20 0 a 20 20 0 1 1 40 0 a 20 20 0 1 1 -40 0" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M 50 50 m -30 0 a 30 30 0 1 1 60 0 a 30 30 0 1 1 -60 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 50 m -48 0 a 48 48 0 1 1 96 0 a 48 48 0 1 1 -96 0" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 2" />

              <text className="text-[6px] font-bold uppercase tracking-[0.3em]" fill="currentColor">
                <textPath href="#heroTopCircle" startOffset="0%">
                  TRAPPED IN THE LOOP • BOUND BY INK • TRAPPED IN THE LOOP • BOUND BY INK •
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Foreground Content Layout */}
        <div className="w-full h-full px-4 md:px-12 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

          {/* Left Column - Dynamic Content (Text -> Loader -> Reveal) */}
          <div className="flex-1 w-full relative min-h-[400px] flex flex-col justify-center">

            {/* Go Back Button (Appears at the end of the sequence) */}
            <div
              className="absolute -top-12 left-0 z-50"
              style={{
                opacity: Math.max(0, (animationProgress - 0.9) * 10),
                pointerEvents: animationProgress > 0.9 ? "auto" : "none",
                transition: "opacity 0.3s ease-out"
              }}
            >
              <button
                onClick={() => animateSequence('backward')}
                className="flex items-center gap-2 px-4 py-2 text-primary/60 hover:text-primary transition-all group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Go Back</span>
              </button>
            </div>

            {/* 1. Initial Text Content */}
            <div
              className="absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8 text-center md:text-left"
              style={{
                opacity: textOpacity,
                transform: `translateX(${textX}px)`,
                pointerEvents: textPointerEvents as any,
              }}
            >
              <div className="space-y-4 md:space-y-6">
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
                  className="px-8 py-4 bg-primary text-background rounded-full font-medium transition-transform transform hover:scale-95 active:scale-90 neumorphic-inset text-center"
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

            {/* 2. Tattoo Machine Loader (Visible during transition) */}
            <div
              className="absolute inset-0 flex flex-col items-center md:items-start justify-center pointer-events-none md:pl-20"
              style={{
                opacity: loaderOpacity,
                transform: `scale(${loaderScale})`,
              }}
            >
              <div className="relative w-24 h-24 mb-6">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-primary absolute inset-0 animate-tattoo-buzz"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transformOrigin: "bottom center", transform: "rotate(15deg)" }}
                >
                  <path d="M 50 10 C 60 -10 80 20 90 0" strokeWidth="2" opacity="0.4" />
                  <rect x="42" y="10" width="16" height="10" rx="2" />
                  <rect x="38" y="20" width="24" height="40" rx="3" className="fill-primary/5" />
                  <line x1="38" y1="30" x2="62" y2="30" strokeWidth="1" opacity="0.3" />
                  <line x1="38" y1="50" x2="62" y2="50" strokeWidth="1" opacity="0.3" />
                  <path d="M 38 60 L 62 60 L 60 75 L 40 75 Z" />
                  <line x1="41" y1="65" x2="59" y2="65" strokeWidth="1.5" />
                  <line x1="40" y1="70" x2="60" y2="70" strokeWidth="1.5" />
                  <path d="M 43 75 L 57 75 L 52 88 L 48 88 Z" className="fill-background" />
                  <line x1="50" y1="88" x2="50" y2="98" strokeWidth="1.5" className="animate-needle-poke" />
                </svg>
                <svg
                  viewBox="0 0 100 20"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 text-primary"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                >
                  <path d="M 5 10 Q 25 20 50 10 T 95 10" className="animate-draw-line" style={{ strokeDasharray: "100", strokeDashoffset: "100" }} />
                </svg>
              </div>
              <p className="font-serif text-sm tracking-[0.3em] uppercase opacity-80 animate-pulse text-primary text-center md:text-left">
                Entering the Loop...
              </p>
            </div>

            {/* 3. WOW Factor Reveal */}
            <div
              className="absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8 text-center md:text-left"
              style={{
                opacity: revealOpacity,
                transform: `translateY(${revealY}px)`,
                pointerEvents: revealPointerEvents as any,
              }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif tracking-tighter text-foreground leading-[0.9]">
                ENTER <br />
                PLAN B <br />
                STUDIO.
              </h2>
              <div className="mt-8 relative inline-block group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="relative flex items-center gap-4 md:gap-6 px-4 py-3 md:px-6 md:py-4 bg-background-alt/80 backdrop-blur-md border border-primary/20 rounded-full hover:border-primary/50 transition-all duration-500 shadow-xl overflow-hidden">

                  {/* Floating Thumbnails */}
                  <div className="flex -space-x-3 md:-space-x-4">
                    {[HERO_IMAGES[0], HERO_IMAGES[1], HERO_IMAGES[2]].map((img, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-background overflow-hidden relative shadow-lg transform transition-transform duration-500 group-hover:scale-110`}
                        style={{ transitionDelay: `${i * 50}ms`, zIndex: 3 - i }}
                      >
                        <Image src={img.src} alt="thumbnail" fill className="object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Text & Icon */}
                  <div className="flex items-center gap-3 pr-2 md:pr-4">
                    <span className="font-serif font-bold text-sm md:text-base tracking-widest uppercase">
                      Explore Gallery
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enter Studio Trigger Button (Replaces Scroll Hint) */}
            <div
              className="absolute -bottom-10 md:-bottom-20 left-0 right-0 flex flex-col items-center justify-center z-40"
              style={{
                opacity: Math.max(0, 1 - animationProgress * 15),
                pointerEvents: animationProgress > 0 ? "none" : "auto",
                transition: "opacity 0.3s ease-out"
              }}
            >
              <button
                onClick={() => animateSequence('forward')}
                className="flex items-center gap-3 px-8 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all group"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] ml-[0.2em]">Enter Studio</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

          </div>

          {/* Right Column - Image Carousel OR Premium Cards */}
          <div className="flex-1 w-full h-full relative py-10 md:py-16 flex items-center justify-center">
            {/* State 1: Image Carousel (Hidden when animationProgress > 0.8) */}
            <div 
              className="absolute inset-x-0 w-full relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-background-alt group transition-all duration-1000"
              style={{
                opacity: animationProgress > 0.8 ? 0 : 1,
                transform: `scale(${animationProgress > 0.8 ? 0.95 : 1})`,
                pointerEvents: animationProgress > 0.8 ? "none" : "auto",
              }}
            >
              {HERO_IMAGES.slice(0, 11).map((img, index) => (
                <Image
                  key={img.id}
                  src={img.src}
                  alt={`Tattoo Portfolio Image ${index + 1}`}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`absolute inset-0 object-cover transition-all duration-[2000ms] ease-in-out ${index === currentImageIndex && loadedImages[index]
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-105 blur-sm z-0"
                    }`}
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [index]: true }))}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-20 pointer-events-none"></div>
            </div>

            {/* State 2: Premium Cards (Visible when animationProgress > 0.8) */}
            <div 
              className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 z-30"
              style={{
                opacity: animationProgress > 0.8 ? 1 : 0,
                transform: `scale(${animationProgress > 0.8 ? 1 : 1.05})`,
                pointerEvents: animationProgress > 0.8 ? "auto" : "none",
              }}
            >
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 md:mt-0 px-4">
                <PremiumCard 
                  title="Realism" 
                  description="Hyper-realistic portraits & nature" 
                  price="From $200" 
                  imageSrc={HERO_IMAGES[4].src} 
                  badge="PRO" 
                />
                <PremiumCard 
                  title="Fine Line" 
                  description="Delicate, minimalist precision" 
                  price="From $150" 
                  imageSrc={HERO_IMAGES[5].src} 
                  badge="NEW" 
                />
                <PremiumCard 
                  title="Geometric" 
                  description="Perfect symmetry & bold patterns" 
                  price="From $180" 
                  imageSrc={HERO_IMAGES[6].src} 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <CinematicGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={HERO_IMAGES}
      />
    </section>
  );
}
