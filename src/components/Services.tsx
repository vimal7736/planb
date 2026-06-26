"use client";

import { useState, useEffect } from "react";
import { supabase, Service } from "@/lib/supabase";

const DEFAULT_ICON = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);

export default function Services() {
  const [isFanned, setIsFanned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <section id="services" className="py-12 md:py-24 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Services & Specialties</h2>
            <p className="max-w-2xl mx-auto opacity-70 leading-relaxed font-light">
              Elevating the craft of tattooing through precision, artistry, and a dedication to minimalist aesthetics. 
              <span className="md:hidden block mt-2 text-primary font-bold">Tap below to view styles.</span>
            </p>
          </div>

          <div 
            className="w-full flex flex-col items-center justify-center relative"
            onMouseEnter={() => setIsFanned(true)}
            onMouseLeave={() => setIsFanned(false)}
          >
            <div 
              className={`relative flex justify-center items-center cursor-pointer group transition-all duration-500 w-full ${isFanned ? 'h-[450px] md:h-[700px]' : 'h-[380px] md:h-[400px]'}`}
              onClick={() => setIsFanned(!isFanned)}
            >
              {paginatedServices.map((service, idx) => {
                // Calculate a simulated rotation based on index since we removed it from DB
                const total = paginatedServices.length;
                const centerIdx = Math.floor(total / 2);
                const rotation = (idx - centerIdx) * 10;
                
                let translateX = 0;
                let translateY = 0;
                
                if (isFanned) {
                  if (isMobile) {
                    translateX = (idx - centerIdx) * 60;
                    translateY = Math.abs(idx - centerIdx) * 40;
                  } else {
                    if (idx < 3) {
                      // Top row (up to 3 items)
                      const row1Count = Math.min(total, 3);
                      const row1Center = (row1Count - 1) / 2;
                      translateX = (idx - row1Center) * 260;
                      translateY = total > 3 ? -150 : 0; // Only move up if there's a second row
                    } else {
                      // Bottom row (up to 3 items)
                      const row2Count = total - 3;
                      const row2Center = (row2Count - 1) / 2;
                      translateX = (idx - 3 - row2Center) * 260;
                      translateY = 150;
                    }
                  }
                }
                
                return (
                  <div 
                    key={service.id || idx}
                    className="absolute w-40 h-56 md:w-56 md:h-72 bg-background border border-primary/20 shadow-2xl flex flex-col justify-start pt-6 md:pt-8 items-center text-center transition-all duration-700 ease-out rounded-2xl backdrop-blur-md px-3 md:px-4"
                    style={{
                      transform: isFanned 
                        ? `rotate(0deg) translate(${translateX}px, ${translateY}px)`
                        : `rotate(${rotation}deg)`,
                      zIndex: isFanned ? 10 + idx : 10 - Math.abs(idx - centerIdx),
                      transitionDelay: isFanned ? `${idx * 100}ms` : `${(total - 1 - Math.abs(idx - centerIdx)) * 30}ms`
                    }}
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
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && isFanned && (
              <div 
                className="flex justify-center items-center gap-6 md:mt-4 animate-in fade-in duration-500 pb-8 z-50"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.max(1, p - 1)); }}
                  disabled={currentPage === 1}
                  className="p-2 border border-primary/30 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors cursor-pointer relative z-50"
                >
                  <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <span className="text-sm font-semibold tracking-widest uppercase opacity-70">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
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
