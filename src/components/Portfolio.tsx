"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { supabase, PortfolioImage } from "@/lib/supabase";

const FALLBACK_IMAGES: PortfolioImage[] = [
  { id: "1", image_url: "/real/IMG_2087.PNG", category: "Fine Line", created_at: "2024-05-15" },
  { id: "2", image_url: "/real/IMG_2088.JPG.jpeg", category: "Realism", created_at: "2024-04-20" },
  { id: "3", image_url: "/real/IMG_2089.PNG", category: "Geometric", created_at: "2024-06-01" },
  { id: "4", image_url: "/real/IMG_2517.PNG", category: "Minimalist", created_at: "2024-03-10" },
  { id: "5", image_url: "/real/IMG_2528.PNG", category: "Fine Line", created_at: "2024-05-28" },
  { id: "6", image_url: "/real/IMG_2529.PNG", category: "Geometric", created_at: "2024-02-14" },
  { id: "7", image_url: "/real/IMG_2530.PNG", category: "Realism", created_at: "2024-01-05" },
  { id: "8", image_url: "/real/IMG_2531.PNG", category: "Minimalist", created_at: "2024-06-12" },
  { id: "9", image_url: "/real/IMG_2532.PNG", category: "Fine Line", created_at: "2023-11-20" }
];

export default function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>(FALLBACK_IMAGES);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPortfolio() {
      const { data } = await supabase.from('portfolio_images').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) setImages(data);
      setLoading(false);
    }
    fetchPortfolio();
  }, []);

  const displayImages = images; // We'll show all images in the infinite scroll

  // Duplicate images for infinite scroll effect
  const marqueeImages = [...displayImages, ...displayImages, ...displayImages];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <section id="portfolio" className="py-16 bg-background-alt/30">
      <div className="w-full px-4 md:px-12 xl:px-24">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">Selected Works</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            A collection of recent tattoos. Every piece is custom-designed and tailored to the individual.
          </p>
        </div>

        {/* Infinite Scroll Marquee Container */}
        <div className="relative w-full overflow-hidden mt-8 -mx-4 px-4 md:-mx-12 md:px-12 xl:-mx-24 xl:px-24">
          
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] gap-4 md:gap-8 py-4">
            {marqueeImages.map((img, idx) => (
              <div 
                key={`${img.id}-${idx}`} 
                className="group/item relative w-[250px] md:w-[350px] aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl bg-background-alt cursor-pointer shrink-0 border border-primary/10 hover:border-primary/40 transition-all hover:shadow-2xl"
                onClick={() => setSelectedImage(img)}
              >
                {!loadedImages[img.id] && (
                  <div className="absolute inset-0 bg-primary/10 animate-pulse z-0"></div>
                )}
                <Image
                  src={img.image_url}
                  alt={img.alt_text || 'Portfolio image'}
                  fill
                  className={`object-cover transition-transform duration-1000 group-hover/item:scale-110 z-10 ${
                    loadedImages[img.id] ? "opacity-100 blur-0" : "opacity-0 blur-md scale-105"
                  }`}
                  sizes="(max-width: 768px) 250px, 350px"
                  loading="lazy"
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [img.id]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                  <span className="text-primary font-serif text-xl font-bold translate-y-4 group-hover/item:translate-y-0 transform transition-transform duration-500">
                    {img.category || 'Tattoo Art'}
                  </span>
                  <span className="text-foreground/70 text-sm mt-1 translate-y-4 group-hover/item:translate-y-0 transform transition-transform duration-500 delay-75">
                    {img.alt_text || 'Custom design'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {loading && <div className="py-12 text-center opacity-60">Loading gallery...</div>}
          {!loading && images.length === 0 && (
            <div className="py-12 text-center opacity-60">
              No images in the portfolio yet. Add some from the Admin Dashboard!
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-8 lg:p-12 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-6 md:gap-10 items-center cursor-default animate-in zoom-in-95 fade-in duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button inside card */}
            <button 
              className="absolute top-4 right-4 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full p-2 transition-all z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left side: Image */}
            <div className="relative w-full aspect-square md:flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.alt_text || 'Portfolio image'}
                fill
                className="object-cover"
              />
            </div>

            {/* Right side: Info */}
            <div className="w-full md:w-[350px] flex flex-col justify-center space-y-6 md:py-10">
              <div className="space-y-3">
                <h3 className="text-white font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-none">{selectedImage.category || 'Tattoo Art'}</h3>
                <p className="text-primary-light text-sm font-medium tracking-[0.2em] uppercase text-[#a5b28b]">{selectedImage.alt_text || 'Custom design'}</p>
              </div>
              
              <div className="w-16 h-[1px] bg-white/20"></div>
              
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                Every piece is meticulously designed with a focus on fine lines, fluid shading, and elegant form to perfectly complement your natural contours.
              </p>
              
              <button 
                className="mt-4 px-8 py-4 bg-white text-black text-sm font-semibold tracking-wider uppercase rounded-full hover:scale-95 transition-transform w-full md:w-auto shadow-xl"
                onClick={() => {
                  setSelectedImage(null);
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Inquire About Style
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
