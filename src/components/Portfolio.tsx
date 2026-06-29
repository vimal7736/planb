"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { supabase, PortfolioImage } from "@/lib/supabase";

const FALLBACK_IMAGES: PortfolioImage[] = [
  { id: "1", image_url: "/real/IMG_2087.PNG", category: "Fine Line", created_at: "2024-05-15", alt_text: null },
  { id: "2", image_url: "/real/IMG_2088.JPG.jpeg", category: "Realism", created_at: "2024-04-20", alt_text: null },
  { id: "3", image_url: "/real/IMG_2089.PNG", category: "Geometric", created_at: "2024-06-01", alt_text: null },
  { id: "4", image_url: "/real/IMG_2517.PNG", category: "Minimalist", created_at: "2024-03-10", alt_text: null },
  { id: "5", image_url: "/real/IMG_2528.PNG", category: "Fine Line", created_at: "2024-05-28", alt_text: null },
  { id: "6", image_url: "/real/IMG_2529.PNG", category: "Geometric", created_at: "2024-02-14", alt_text: null },
  { id: "7", image_url: "/real/IMG_2530.PNG", category: "Realism", created_at: "2024-01-05", alt_text: null },
  { id: "8", image_url: "/real/IMG_2531.PNG", category: "Minimalist", created_at: "2024-06-12", alt_text: null },
  { id: "9", image_url: "/real/IMG_2532.PNG", category: "Fine Line", created_at: "2023-11-20", alt_text: null }
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

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(images.length / ITEMS_PER_PAGE));
  const paginatedImages = images.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  return (
    <section id="portfolio" className="py-16 bg-background-alt/30 scroll-mt-16 md:scroll-mt-24">
      <div className="w-full px-4 md:px-12 xl:px-24">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">Selected Works</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            A collection of recent tattoos. Every piece is custom-designed and tailored to the individual.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full max-w-6xl mx-auto px-1 md:px-0">
            {paginatedImages.map((img, idx) => (
              <div 
                key={img.id} 
                className="group/item relative w-full aspect-[4/5] overflow-hidden rounded-lg md:rounded-2xl bg-background-alt cursor-pointer border border-primary/10 hover:border-primary/40 transition-all hover:shadow-2xl"
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
                  sizes="(max-width: 768px) 33vw, 33vw"
                  loading="lazy"
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [img.id]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-2 md:p-6 z-20">
                  <span className="text-primary font-serif text-[10px] sm:text-xs md:text-xl font-bold translate-y-4 group-hover/item:translate-y-0 transform transition-transform duration-500 leading-tight">
                    {img.category || 'Tattoo Art'}
                  </span>
                  <span className="text-foreground/70 text-[8px] sm:text-[10px] md:text-sm mt-0.5 md:mt-1 translate-y-4 group-hover/item:translate-y-0 transform transition-transform duration-500 delay-75 leading-tight hidden sm:block md:block line-clamp-2">
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div 
              className="flex justify-center items-center gap-6 mt-12 animate-in fade-in duration-500 pb-8 z-50"
            >
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-primary/30 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors cursor-pointer relative z-50"
              >
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <span className="text-sm font-semibold tracking-widest uppercase opacity-70">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-primary/30 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors cursor-pointer relative z-50"
              >
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
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
