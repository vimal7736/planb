"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const BASE_IMAGES = [
  { id: 1, src: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg", alt: "Custom tattoo piece 1", title: "Eternal Bloom", desc: "Fine-line floral arrangement" },
  { id: 2, src: "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg", alt: "Custom tattoo piece 2", title: "Sacred Geometry", desc: "Minimalist dotwork mandala" },
  { id: 3, src: "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg", alt: "Custom tattoo piece 3", title: "Midnight Ink", desc: "Bold shading and linework" },
  { id: 4, src: "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg", alt: "Custom tattoo piece 4", title: "Fluid Form", desc: "Abstract natural contours" },
  { id: 5, src: "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg", alt: "Custom tattoo piece 5", title: "Delicate Branch", desc: "Botanical micro-tattoo" },
  { id: 6, src: "/tattooos/tattoo-1.png", alt: "Fine line floral tattoo on shoulder", title: "Shoulder Floral", desc: "Soft shading & fine lines" },
  { id: 7, src: "/tattooos/tattoo-2.png", alt: "Minimalist geometric tattoo on arm", title: "Geo Band", desc: "Precision geometry" },
  { id: 8, src: "/tattooos/tattoo-3.png", alt: "Abstract micro tattoo", title: "Micro Abstraction", desc: "Single needle artistry" },
  { id: 9, src: "/tattooos/tattoo-4.png", alt: "Botanical sleeve tattoo", title: "Botanical Sleeve", desc: "Flowing organic elements" },
  { id: 10, src: "/tattooos/tattoo-5.png", alt: "Delicate script tattoo", title: "Script Lettering", desc: "Elegant handwritten quote" },
  { id: 11, src: "/tattooos/tattoo-6.png", alt: "Minimalist animal tattoo", title: "Wildlife Silhouette", desc: "Minimalist animal form" },
];

// Create exactly 27 dummy images for 3 pages of 9
const PORTFOLIO_IMAGES = [
  ...BASE_IMAGES,
  ...BASE_IMAGES.map(img => ({ ...img, id: img.id + 100 })),
  ...BASE_IMAGES.map(img => ({ ...img, id: img.id + 200 })).slice(0, 5)
];

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<typeof PORTFOLIO_IMAGES[0] | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(PORTFOLIO_IMAGES.length / ITEMS_PER_PAGE);
  const paginatedImages = PORTFOLIO_IMAGES.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

        <div className="group grid grid-cols-3 gap-2 md:gap-8">
          {paginatedImages.map((img, idx) => (
            <div 
              key={img.id} 
              className="reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 ease-out group/item relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-background-alt cursor-pointer md:group-hover:opacity-40 md:hover:!opacity-100 md:hover:z-10"
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
              onClick={() => setSelectedImage(img)}
            >
              {!loadedImages[img.id] && (
                <div className="absolute inset-0 bg-primary/10 animate-pulse z-0"></div>
              )}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover transition-all duration-1000 group-hover/item:scale-125 z-10 ${
                  loadedImages[img.id] ? "opacity-100 blur-0" : "opacity-0 blur-md scale-105"
                }`}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                loading="lazy"
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [img.id]: true }))}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover/item:bg-primary/80 transition-colors duration-500 flex flex-col items-center justify-center p-4 text-center z-20">
                <span className="text-background opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 font-serif text-lg md:text-xl font-bold translate-y-4 group-hover/item:translate-y-0 transform">
                  {img.title}
                </span>
                <span className="text-background/80 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 text-xs md:text-sm mt-2 translate-y-4 group-hover/item:translate-y-0 transform delay-75 pointer-events-none">
                  {img.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
            <button
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              disabled={currentPage === 1}
              className="px-6 py-2 border border-primary/20 rounded-full hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none transition-all font-medium tracking-wider text-sm"
            >
              Previous
            </button>
            <span className="text-sm opacity-60 font-medium tracking-widest uppercase">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              disabled={currentPage === totalPages}
              className="px-6 py-2 border border-primary/20 rounded-full hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none transition-all font-medium tracking-wider text-sm"
            >
              Next
            </button>
          </div>
        )}
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
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Right side: Info */}
            <div className="w-full md:w-[350px] flex flex-col justify-center space-y-6 md:py-10">
              <div className="space-y-3">
                <h3 className="text-white font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-none">{selectedImage.title}</h3>
                <p className="text-primary-light text-sm font-medium tracking-[0.2em] uppercase text-[#a5b28b]">{selectedImage.desc}</p>
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
