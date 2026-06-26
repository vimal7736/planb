"use client";

import { useLoader } from "./LoaderProvider";

export default function Offers({ title, description, btnText }: { title?: string, description?: string, btnText?: string }) {
  const { triggerLoader } = useLoader();

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerLoader(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  if (!title && !description) return null;

  return (
    <section className="w-full bg-primary py-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="w-full px-4 md:px-12 xl:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-background">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-background"></span>
            </span>
            <p className="font-serif font-bold text-lg tracking-wide uppercase">
              {title || "Special Event"}
            </p>
          </div>
          
          <p className="text-background/90 text-sm md:text-base text-center md:text-left font-medium">
            {description}
          </p>
          
          <button 
            onClick={handleBookingClick}
            className="px-6 py-2 bg-background text-primary text-sm font-bold uppercase tracking-wider rounded-full hover:scale-95 transition-transform shadow-lg shrink-0"
          >
            {btnText || "Claim Offer"}
          </button>
        </div>
      </div>
    </section>
  );
}
