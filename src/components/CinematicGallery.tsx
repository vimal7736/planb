"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  date: string;
}

interface CinematicGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[]; // fallback images from Hero
}

const ITEMS_PER_PAGE = 15;

export default function CinematicGallery({ isOpen, onClose, images: fallbackImages }: CinematicGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!isInitialized) {
        setImages([]);
        setPage(1);
        setTotalPages(1);
        fetchImages(1, "All", "newest", true);
        setIsInitialized(true);
      }
    } else {
      document.body.style.overflow = "unset";
      setIsInitialized(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // When category or sort changes, reset and fetch
  useEffect(() => {
    if (!isOpen || !isInitialized) return;
    setImages([]);
    setPage(1);
    setTotalPages(1);
    fetchImages(1, selectedCategory, sortOrder, true);
  }, [selectedCategory, sortOrder]);

  const fetchImages = async (pageNumber: number, category: string, sort: "newest" | "oldest", isReset: boolean = false) => {
    setLoading(true);

    let query = supabase.from('portfolio_images').select('*', { count: 'exact' });
    
    if (category !== "All") {
      query = query.eq('category', category);
    }
    
    query = query.order('created_at', { ascending: sort === "oldest" });
    
    const from = (pageNumber - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    query = query.range(from, to);

    const { data, error, count } = await query;
    
    if (!error && data) {
      const mapped = data.map(img => ({
        id: img.id,
        src: img.image_url,
        category: img.category || 'Tattoo Art',
        date: img.created_at
      }));

      // Pagination replaces rather than appends
      setImages(mapped);
      
      if (count !== null) {
        setTotalPages(Math.max(1, Math.ceil(count / ITEMS_PER_PAGE)));
      }
    } else if (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    if (loading) return;
    setPage(newPage);
    fetchImages(newPage, selectedCategory, sortOrder, true);
    setTimeout(() => {
      document.getElementById('gallery-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const categories = ["All", "Fine Line", "Geometric", "Realism", "Minimalist"];

  // Use fallback if database returns absolutely nothing on the very first query
  const filteredAndSortedImages = (images.length === 0 && selectedCategory === "All" && totalPages === 1) ? fallbackImages : images;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] bg-background text-foreground overflow-y-auto custom-scrollbar"
        >
          {/* Subtle animated background element */}
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
          
          <div id="gallery-top" className="min-h-full px-4 md:px-8 py-10 md:py-20 max-w-[1600px] mx-auto relative z-10 scroll-mt-0">
            
            {/* Header */}
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="flex items-start justify-between mb-10 md:mb-16 gap-6"
            >
              <div>
                <h2 className="text-4xl md:text-7xl font-black font-serif tracking-tighter uppercase leading-[0.9]">
                  Plan B <br />
                  <span className="text-primary italic font-light lowercase">gallery.</span>
                </h2>
              </div>
              
              <button 
                onClick={onClose}
                className="group flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all bg-background/50 backdrop-blur-md shrink-0"
              >
                <div className="relative flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            </motion.div>

            {/* Filter & Sort Bar */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="sticky top-4 z-50 mb-10 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 bg-background/80 backdrop-blur-xl p-3 rounded-3xl border border-primary/10 shadow-sm"
            >
              {/* Categories Scrollable on Mobile */}
              <div className="w-full md:w-auto overflow-x-auto custom-scrollbar hide-scrollbar">
                <div className="flex items-center gap-2 px-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 ${
                        selectedCategory === category 
                          ? "bg-primary text-background shadow-md" 
                          : "bg-background border border-primary/20 text-foreground opacity-70 hover:opacity-100 hover:border-primary/50"
                      }`}
                    >
                      {/* Abstract icon based on category for visual flair on mobile */}
                      {category === "All" && <span className="w-2 h-2 rounded-full bg-current opacity-70" />}
                      {category === "Fine Line" && <span className="w-3 h-[1px] bg-current opacity-70" />}
                      {category === "Geometric" && <div className="w-2 h-2 border border-current rotate-45 opacity-70" />}
                      {category === "Realism" && <div className="w-2 h-2 rounded-sm bg-current opacity-70" />}
                      {category === "Minimalist" && <div className="w-1 h-1 rounded-full bg-current opacity-70" />}
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center w-full md:w-auto px-1 md:px-0 md:justify-end shrink-0">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full md:w-auto bg-background border border-primary/20 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary/50 transition-colors flex items-center justify-between md:justify-center gap-3 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    <span className="md:inline">{sortOrder === "newest" ? "Newest Works" : "Oldest Works"}</span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[120%] right-0 w-full md:w-56 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-[100] flex flex-col"
                    >
                      <button
                        onClick={() => { setSortOrder("newest"); setIsSortOpen(false); }}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-widest text-left transition-colors flex items-center gap-3 ${sortOrder === "newest" ? "text-primary bg-primary/10" : "hover:bg-primary/5"}`}
                      >
                        Newest Works
                      </button>
                      <div className="h-px w-full bg-primary/10"></div>
                      <button
                        onClick={() => { setSortOrder("oldest"); setIsSortOpen(false); }}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-widest text-left transition-colors flex items-center gap-3 ${sortOrder === "oldest" ? "text-primary bg-primary/10" : "hover:bg-primary/5"}`}
                      >
                        Oldest Works
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Masonry-style Dense Grid */}
            {/* 2 cols on very small screens, 3 on sm, 4 on md, 5 on lg, 6 on xl */}
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 md:gap-4 space-y-3 md:space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedImages.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: index * 0.05, 
                      ease: [0.16, 1, 0.3, 1] // Cinematic slow-out ease
                    }}
                    className="break-inside-avoid group relative rounded-xl md:rounded-2xl overflow-hidden bg-background-alt border border-primary/5 hover:border-primary/30 transition-all hover:shadow-lg"
                  >
                    <Image 
                      src={img.src}
                      alt={`Tattoo Work - ${img.category}`}
                      width={400} // Set a lower width base for optimization
                      height={600}
                      loading="lazy" // Native lazy loading
                      className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-[3000ms] ease-out"
                    />
                    
                    {/* Hover Overlay with Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-4 md:p-5">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-1">
                        {img.category}
                      </span>
                      <span className="text-[10px] opacity-70">
                        {new Date(img.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredAndSortedImages.length === 0 && (
              <div className="py-24 text-center opacity-50">
                <p className="font-serif text-2xl">No works found in this category.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div 
                className="flex justify-center items-center gap-6 mt-16 animate-in fade-in duration-500 pb-8 z-50"
              >
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                  className="p-2 border border-primary/30 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors cursor-pointer relative z-50"
                >
                  <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <span className="text-sm font-semibold tracking-widest uppercase opacity-70">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages || loading}
                  className="p-2 border border-primary/30 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors cursor-pointer relative z-50"
                >
                  <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            )}

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-32 text-center pb-24"
            >
              <h3 className="font-serif text-3xl md:text-5xl font-black mb-8 opacity-90">Inspired?</h3>
              <button 
                onClick={onClose}
                className="px-10 py-5 bg-primary text-background rounded-full font-bold uppercase tracking-widest hover:scale-95 transition-transform shadow-[0_0_30px_rgba(85,107,47,0.3)] text-sm md:text-base"
              >
                Return to Studio
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
