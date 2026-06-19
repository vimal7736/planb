"use client";

import Image from "next/image";
import { useState } from "react";

const PORTFOLIO_IMAGES = [
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

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<typeof PORTFOLIO_IMAGES[0] | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  return (
    <section id="portfolio" className="py-16 bg-background-alt/30">
      <div className="w-full px-4 md:px-12 xl:px-24">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">Selected Works</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            A collection of recent tattoos. Every piece is custom-designed and tailored to the individual.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
          {PORTFOLIO_IMAGES.map((img) => (
            <div 
              key={img.id} 
              className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-background-alt cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover transition-all duration-1000 group-hover:scale-125 ${
                  loadedImages[img.id] ? "opacity-100 blur-0" : "opacity-0 blur-md scale-105"
                }`}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                loading="lazy"
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [img.id]: true }))}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-colors duration-500 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-serif text-lg md:text-xl font-bold translate-y-4 group-hover:translate-y-0 transform">
                  {img.title}
                </span>
                <span className="text-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs md:text-sm mt-2 translate-y-4 group-hover:translate-y-0 transform delay-75 pointer-events-none">
                  {img.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-square md:aspect-auto md:h-[75vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain animate-in fade-in zoom-in duration-300"
            />
          </div>

          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
            <h3 className="text-white font-serif text-2xl tracking-wide">{selectedImage.title}</h3>
            <p className="text-white/60 mt-2 text-sm font-light tracking-wide uppercase">{selectedImage.desc}</p>
          </div>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
