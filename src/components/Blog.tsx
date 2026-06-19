"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ARTICLES = [
  {
    id: 1,
    slug: "tattoo-aftercare",
    title: "The Ultimate Tattoo Aftercare Guide",
    category: "Care",
    date: "Aug 12, 2026",
    image: "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg",
    desc: "Everything you need to know about keeping your new fine-line tattoo crisp and preventing infections during the healing process."
  },
  {
    id: 2,
    slug: "custom-design",
    title: "How to Choose Your Custom Design",
    category: "Inspiration",
    date: "Jul 28, 2026",
    image: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
    desc: "A step-by-step walkthrough on how to collaborate with an artist and translate your abstract ideas into a beautiful, permanent design."
  },
  {
    id: 3,
    slug: "placement-pain",
    title: "Understanding Placement and Pain",
    category: "Education",
    date: "Jun 15, 2026",
    image: "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg",
    desc: "Not all skin is created equal. We break down the tattoo pain chart and help you decide the best placement for your next piece."
  },
  {
    id: 4,
    slug: "history-fine-line",
    title: "The Rise of Fine-Line Tattooing",
    category: "Culture",
    date: "May 02, 2026",
    image: "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg",
    desc: "Explore the modern evolution of single-needle artistry and why minimal, delicate tattoos are dominating the industry."
  },
  {
    id: 5,
    slug: "first-studio-visit",
    title: "Preparing for Your First Studio Visit",
    category: "Guide",
    date: "Apr 18, 2026",
    image: "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg",
    desc: "Nervous about your first tattoo? Here is a comprehensive checklist of what to eat, wear, and expect on appointment day."
  },
  {
    id: 6,
    slug: "cover-ups",
    title: "Cover-Ups: What You Need to Know",
    category: "Education",
    date: "Mar 30, 2026",
    image: "/tattooos/tattoo-1.png",
    desc: "Thinking about hiding an old mistake? Learn the limitations and possibilities of fine-line cover-up tattoos."
  },
  {
    id: 7,
    slug: "minimalist-geometry",
    title: "Minimalist Geometry Trends",
    category: "Inspiration",
    date: "Feb 14, 2026",
    image: "/tattooos/tattoo-2.png",
    desc: "Discover the breathtaking beauty of dotwork mandalas, sacred geometry, and perfectly straight linework."
  },
  {
    id: 8,
    slug: "micro-tattoos",
    title: "Micro-Tattoos vs. Traditional Ink",
    category: "Education",
    date: "Jan 22, 2026",
    image: "/tattooos/tattoo-3.png",
    desc: "A deep dive into how extremely tiny tattoos age over time compared to bold, traditional styles."
  },
  {
    id: 9,
    slug: "botanical-art",
    title: "Botanical Art: Flora in Ink",
    category: "Inspiration",
    date: "Dec 05, 2025",
    image: "/tattooos/tattoo-4.png",
    desc: "Why floral and nature-inspired designs continue to be the most requested pieces in our studio."
  },
  {
    id: 10,
    slug: "sterile-equipment",
    title: "The Importance of Sterile Equipment",
    category: "Safety",
    date: "Nov 19, 2025",
    image: "/tattooos/tattoo-5.png",
    desc: "Behind the scenes at Plan B: An inside look at our rigorous hospital-grade sterilization processes."
  },
  {
    id: 11,
    slug: "healed-vs-fresh",
    title: "Healed vs. Fresh: Realistic Expectations",
    category: "Care",
    date: "Oct 11, 2025",
    image: "/tattooos/tattoo-6.png",
    desc: "Tattoos look different once the skin has completely settled. Here are side-by-side comparisons of fresh and fully healed work."
  },
  {
    id: 12,
    slug: "script-lettering",
    title: "A Guide to Script and Lettering",
    category: "Guide",
    date: "Sep 28, 2025",
    image: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
    desc: "From elegant cursive to stark typewriter fonts, learn how to pick the perfect lettering for your meaningful quote."
  }
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Compact view: 2 rows of 3
  
  const totalPages = Math.ceil(ARTICLES.length / ITEMS_PER_PAGE);
  const paginatedArticles = ARTICLES.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Journal & Guides</h2>
            <p className="max-w-2xl mx-auto opacity-70 leading-relaxed font-light">
              Explore our latest articles on tattoo aftercare, design inspiration, and studio news.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedArticles.map((article) => (
              <Link 
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col bg-background-alt rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary">
                    {article.category}
                  </div>
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[10px] md:text-xs opacity-50 mb-2">{article.date}</p>
                    <h3 className="text-base md:text-lg font-serif font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs opacity-70 line-clamp-2 leading-relaxed">
                      {article.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Article <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
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
