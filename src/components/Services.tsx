"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, Service } from "@/lib/supabase";
import LuminousServiceCard from "./LuminousServiceCard";

const DEFAULT_ICON = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (data) setServices(data);
    }
    fetchServices();
  }, []);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(services.length / ITEMS_PER_PAGE));
  const paginatedServices = services.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const handleMobileScroll = () => {
    const el = carouselRef.current;
    if (!el || services.length === 0) return;
    const cardStep = el.scrollWidth / services.length;
    const idx = Math.round(el.scrollLeft / cardStep);
    setActiveMobileIdx(Math.max(0, Math.min(services.length - 1, idx)));
  };

  const scrollToMobileCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const target = el.children[idx] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    setActiveMobileIdx(idx);
  };

  return (
    <section id="services" className="py-12 md:py-24 relative overflow-hidden scroll-mt-16 md:scroll-mt-24">
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-24 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Services & Specialties</h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base opacity-70 leading-relaxed font-light">
              Elevating the craft of tattooing through precision, artistry, and a dedication to minimalist aesthetics. 
            </p>
          </div>

          {/* Mobile Compact Luminous Carousel */}
          <div className="md:hidden w-full">
            <div
              ref={carouselRef}
              onScroll={handleMobileScroll}
              className="flex gap-7 overflow-x-auto snap-x snap-mandatory py-6 px-[calc(50%-118px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {services.map((service, idx) => (
                <div key={service.id || idx} className="snap-center shrink-0">
                  <LuminousServiceCard service={service} defaultLit={idx === 0} />
                </div>
              ))}
            </div>

            {services.length > 1 && (
              <div className="flex flex-col items-center gap-2.5 mt-2">
                <div className="flex items-center justify-center gap-2">
                  {services.map((service, idx) => (
                    <button
                      key={service.id || idx}
                      type="button"
                      aria-label={`View ${service.title}`}
                      onClick={() => scrollToMobileCard(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeMobileIdx === idx
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-primary/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-45">
                  Swipe · Tap switch to illuminate
                </span>
              </div>
            )}
          </div>

          {/* Desktop Grid & Pagination */}
          <div className="hidden md:flex w-full flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
              {paginatedServices.map((service, idx) => (
                <div 
                  key={service.id || idx}
                  className="relative w-full h-56 md:h-72 bg-background border border-primary/20 shadow-xl flex flex-col justify-start pt-6 md:pt-8 items-center text-center rounded-2xl backdrop-blur-md px-3 md:px-4 group"
                >
                  <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                    {DEFAULT_ICON}
                  </div>
                  
                  <p className="text-xs md:text-sm opacity-70 leading-relaxed max-w-[90%] mx-auto">
                    {service.description}
                  </p>
                  
                  {/* Title Banner */}
                  <div className="absolute bottom-0 w-full h-12 bg-primary/10 flex justify-center items-center rounded-b-2xl border-t border-primary/10">
                    <span className="font-serif font-bold text-sm md:text-base tracking-wide text-primary">
                      {service.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
      </div>
    </section>
  );
}
