"use client";

import { useState, useEffect } from "react";
import { supabase, Service } from "@/lib/supabase";

const DEFAULT_ICON = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    const element = document.getElementById('services');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-12 md:py-24 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Services & Specialties</h2>
            <p className="max-w-2xl mx-auto opacity-70 leading-relaxed font-light">
              Elevating the craft of tattooing through precision, artistry, and a dedication to minimalist aesthetics. 
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
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
