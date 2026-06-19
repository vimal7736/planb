"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const HERO_IMAGES = [
  "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
  "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg",
  "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg",
  "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg",
  "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg",
  "/tattooos/tattoo-1.png",
  "/tattooos/tattoo-2.png",
  "/tattooos/tattoo-3.png",
  "/tattooos/tattoo-4.png",
  "/tattooos/tattoo-5.png",
  "/tattooos/tattoo-6.png",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  // Scroll tracking state
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Image Carousel Interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll Tracker
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress specifically within this 300vh section
      let progress = -top / (height - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation values derived from scroll progress
  // Content fades out relatively early (by 25% scroll)
  const contentOpacity = Math.max(0, 1 - scrollProgress * 4);
  
  // Spiral scales up massively and rotates smoothly
  const spiralScale = 1 + scrollProgress * 30; // Scales up to 31x
  const spiralRotation = scrollProgress * 540; // 1.5 full spins
  const spiralOpacity = Math.min(1, 0.1 + scrollProgress * 2); // Fades into solid primary color
  
  // The WOW factor reveal inside the tunnel (appears after 60% scroll)
  const revealOpacity = Math.max(0, (scrollProgress - 0.6) * 2.5);
  const revealScale = 0.9 + scrollProgress * 0.1; // Gentle scale up as it reveals
  const showRevealPointerEvents = scrollProgress > 0.8;

  // The Tattoo Machine Loader (appears during the "empty" zoom phase)
  let loaderOpacity = 0;
  if (scrollProgress > 0.2 && scrollProgress <= 0.4) {
    loaderOpacity = (scrollProgress - 0.2) * 5;
  } else if (scrollProgress > 0.4 && scrollProgress <= 0.6) {
    loaderOpacity = 1;
  } else if (scrollProgress > 0.6 && scrollProgress <= 0.7) {
    loaderOpacity = Math.max(0, 1 - (scrollProgress - 0.6) * 10);
  }
  const loaderScale = 1 + (scrollProgress - 0.2) * 0.5;

  const isScrolling = scrollProgress > 0.05;

  return (
    <section ref={sectionRef} id="hero" className="relative h-[300vh] bg-background">
      {/* Sticky Container - Traps user while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center pt-14">
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-background-alt rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse-slow z-0"></div>

        {/* Massive Zooming Circular Watermark */}
        <div 
          className="absolute top-1/2 left-1/2 z-0 pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) scale(${spiralScale}) rotate(${spiralRotation}deg)`,
            opacity: spiralOpacity,
            transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
          }}
        >
          <div className="w-[600px] h-[600px] text-primary">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="heroTopCircle" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
              </defs>
              
              {/* Clean Concentric Circular Loop Paths */}
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

        {/* Tattoo Machine Loader (Visible during transition) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          style={{ 
            opacity: loaderOpacity,
            transform: `scale(${loaderScale})`,
            transition: "opacity 0.1s ease-out, transform 0.1s ease-out"
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
          <p className="font-serif text-sm tracking-[0.3em] uppercase opacity-80 animate-pulse text-primary">
            Entering the Loop...
          </p>
        </div>

        {/* WOW Factor Reveal Inside the Tunnel */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30"
          style={{ 
            opacity: revealOpacity,
            transform: `scale(${revealScale})`,
            transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
            pointerEvents: showRevealPointerEvents ? 'auto' : 'none'
          }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif tracking-widest text-primary mb-8 md:mb-12 text-center drop-shadow-[0_0_40px_rgba(85,107,47,0.3)] leading-tight">
            ENTER<br/>PLAN B STUDIO
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4">
            <Link 
              href="#booking" 
              className="px-10 py-5 bg-background text-foreground border-2 border-primary/20 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(85,107,47,0.2)] text-center"
            >
              Book Appointment
            </Link>
            <Link 
              href="#portfolio" 
              className="px-10 py-5 bg-primary text-background rounded-full font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(85,107,47,0.4)] text-center"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>

        {/* Foreground Content (Fades out quickly) */}
        <div 
          className="w-full px-4 md:px-12 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10"
          style={{ 
            opacity: contentOpacity, 
            pointerEvents: isScrolling ? 'none' : 'auto',
            transition: "opacity 0.15s ease-out" 
          }}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left pt-6 md:pt-0 max-w-2xl">
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
