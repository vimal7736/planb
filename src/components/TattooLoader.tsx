"use client";

import { useEffect, useState } from "react";

export default function TattooLoader({ isVisible }: { isVisible: boolean }) {
  const [render, setRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setRender(true);
  }, [isVisible]);

  const handleAnimationEnd = () => {
    if (!isVisible) setRender(false);
  };

  if (!render) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onTransitionEnd={handleAnimationEnd}
    >
      <div className="flex flex-col items-center">
        {/* Minimal Pen-Style Tattoo Machine SVG */}
        <div className="relative w-24 h-24 mb-6">
          <svg 
            viewBox="0 0 100 100" 
            className={`w-full h-full text-primary absolute inset-0 ${isVisible ? "animate-tattoo-buzz" : ""}`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transformOrigin: "bottom center", transform: "rotate(15deg)" }}
          >
            {/* Cord at top */}
            <path d="M 50 10 C 60 -10 80 20 90 0" strokeWidth="2" opacity="0.4" />
            {/* RCA Connection */}
            <rect x="42" y="10" width="16" height="10" rx="2" />
            {/* Main Pen Body */}
            <rect x="38" y="20" width="24" height="40" rx="3" className="fill-primary/5" />
            <line x1="38" y1="30" x2="62" y2="30" strokeWidth="1" opacity="0.3" />
            <line x1="38" y1="50" x2="62" y2="50" strokeWidth="1" opacity="0.3" />
            {/* Grip Section */}
            <path d="M 38 60 L 62 60 L 60 75 L 40 75 Z" />
            <line x1="41" y1="65" x2="59" y2="65" strokeWidth="1.5" />
            <line x1="40" y1="70" x2="60" y2="70" strokeWidth="1.5" />
            {/* Cartridge Tip */}
            <path d="M 43 75 L 57 75 L 52 88 L 48 88 Z" className="fill-background" />
            {/* Needle */}
            <line x1="50" y1="88" x2="50" y2="98" strokeWidth="1.5" className={`${isVisible ? "animate-needle-poke" : ""}`} />
          </svg>
          
          {/* Drawing Line Animation */}
          <svg 
            viewBox="0 0 100 20" 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path 
              d="M 5 10 Q 25 20 50 10 T 95 10" 
              className={`${isVisible ? "animate-draw-line" : ""}`}
              style={{ strokeDasharray: "100", strokeDashoffset: "100" }}
            />
          </svg>
        </div>
        
        <p className="font-serif text-sm tracking-[0.3em] uppercase opacity-80 animate-pulse mt-2">
          Preparing...
        </p>
      </div>
    </div>
  );
}
