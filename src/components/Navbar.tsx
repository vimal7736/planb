"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLoader } from "./LoaderProvider";

export default function Navbar() {
  const [theme, setTheme] = useState("olive");
  const { triggerLoader } = useLoader();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "olive" ? "darkminimal" : "olive");
  };

  return (
    <nav className="hidden md:block sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary/20 transition-all duration-300">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="relative flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Wow Factor: Spinning Enso Loop with Text */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 text-primary pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_15s_linear_infinite] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              <defs>
                <path id="circlePath" d="M 50, 50 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" />
              </defs>
              
            {/* Clean Concentric Circular Loop Paths */}
            <path d="M 50 50 m -8 0 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M 50 50 m -16 0 a 16 16 0 1 1 32 0 a 16 16 0 1 1 -32 0" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M 50 50 m -24 0 a 24 24 0 1 1 48 0 a 24 24 0 1 1 -48 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 50 50 m -32 0 a 32 32 0 1 1 64 0 a 32 32 0 1 1 -64 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              
              <text className="text-[8px] font-bold uppercase tracking-[0.1em]" fill="currentColor">
                <textPath href="#circlePath" startOffset="0%">
                  TRAPPED IN THE LOOP • BOUND BY INK •
                </textPath>
              </text>
            </svg>
          </div>
          
          <Link href="/" className="text-xl md:text-2xl font-bold font-serif tracking-widest text-primary uppercase relative z-10 pl-8" onClick={(e) => e.preventDefault()}>
            PLAN B
          </Link>
        </div>
        
        <div className="flex gap-6 items-center text-sm font-medium">
          <div className="theme-switch">
            <input 
              type="checkbox" 
              id="theme-checkbox" 
              checked={theme === "darkminimal"}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-checkbox">
              <div></div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                </svg>
              </span>
            </label>
          </div>

          <a 
            href="#services" 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              triggerLoader(() => {
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              });
            }}
          >
            Services
          </a>
          <a 
            href="#portfolio" 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              triggerLoader(() => {
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
              });
            }}
          >
            Portfolio
          </a>
          <Link href="#reviews" className="text-foreground hover:text-primary transition-colors">Reviews</Link>
          <Link href="#about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link 
            href="#booking" 
            className="px-5 py-2 bg-primary text-background rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 shadow-md"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </nav>
  );
}
