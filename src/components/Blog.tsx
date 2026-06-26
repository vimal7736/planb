"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase, Article } from "@/lib/supabase";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  const ITEMS_PER_PAGE = 9; // Compact view: 3 rows of 3

  const totalPages = Math.max(1, Math.ceil(articles.length / ITEMS_PER_PAGE));
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="w-full px-2 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Journal & Guides</h2>
            <p className="max-w-2xl mx-auto opacity-70 leading-relaxed font-light text-sm md:text-base">
              Explore our latest articles on tattoo aftercare, design inspiration, and studio news.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-12 opacity-60">Loading journal...</div>
            ) : paginatedArticles.length === 0 ? (
              <div className="col-span-3 text-center py-12 opacity-60">No articles published yet.</div>
            ) : (
              paginatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col bg-background-alt rounded-xl md:rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative aspect-square md:aspect-video w-full overflow-hidden">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 md:px-3 py-0.5 md:py-1 bg-background/90 backdrop-blur-md rounded-full text-[8px] md:text-xs font-bold uppercase tracking-wider text-primary">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-2 md:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-[8px] md:text-xs opacity-50 mb-1 md:mb-2">
                        {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <h3 className="text-[10px] md:text-lg lg:text-xl font-serif font-bold leading-tight mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-3 md:line-clamp-none">
                        {article.title}
                      </h3>
                      <p className="hidden md:block text-xs lg:text-sm opacity-70 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-4 flex items-center justify-end md:justify-start gap-1 md:gap-2 text-primary font-bold text-[8px] md:text-xs uppercase tracking-widest group-hover:gap-2 md:group-hover:gap-4 transition-all">
                      <span className="hidden md:inline">Read Article</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
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
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="px-6 py-2 border border-primary/20 rounded-full hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none transition-all font-medium tracking-wider text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
