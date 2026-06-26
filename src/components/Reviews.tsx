"use client";

import { useEffect, useState } from "react";
import { supabase, Review } from "@/lib/supabase";

const ReviewCard = ({ review }: { review: Review }) => {
  // Format date relative to now roughly
  const date = new Date(review.created_at).toLocaleDateString();

  return (
    <div className="w-[260px] h-[220px] md:w-[350px] md:h-[250px] rounded-xl p-[1px] relative shrink-0 bg-[radial-gradient(circle_230px_at_0%_0%,_var(--accent-primary)_0%,_transparent_100%)] mx-2 md:mx-3 group">
      {/* Moving Glowing Dot */}
      <div className="absolute w-[4px] md:w-[5px] aspect-square bg-background shadow-[0_0_10px_var(--bg-main)] rounded-full z-10 right-[10%] top-[10%] animate-moveDot"></div>

      {/* Inner Card */}
      <div className="z-[1] w-full h-full rounded-[10px] border border-primary/20 bg-background bg-[radial-gradient(circle_280px_at_0%_0%,_var(--accent-secondary)_0%,_transparent_100%)] relative flex flex-col items-center justify-center p-4 md:p-6 text-foreground overflow-hidden">

        {/* Light Ray Effect */}
        <div className="absolute w-[220px] h-[45px] rounded-full bg-primary/30 opacity-40 shadow-[0_0_50px_var(--accent-primary)] blur-[10px] origin-[10%] top-0 left-0 rotate-[40deg] group-hover:rotate-[45deg] transition-transform duration-700"></div>

        {/* Grid Lines */}
        <div className="absolute w-full h-[1px] bg-primary/20 top-[10%] bg-gradient-to-r from-primary/50 to-primary/5"></div>
        <div className="absolute w-full h-[1px] bg-primary/10 bottom-[10%]"></div>
        <div className="absolute left-[10%] w-[1px] h-full bg-gradient-to-b from-primary/50 to-primary/5"></div>
        <div className="absolute right-[10%] w-[1px] h-full bg-primary/10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full py-1 md:py-2 px-1">
          <div className="flex gap-1 text-primary mb-1 md:mb-2">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current drop-shadow-[0_0_2px_var(--accent-primary)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            ))}
          </div>

          <p className="opacity-90 text-xs md:text-sm leading-relaxed italic mb-2 md:mb-4 flex-1 line-clamp-4 md:line-clamp-none">
            "{review.text}"
          </p>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-serif text-xs md:text-sm border border-primary/30">
              {review.client_name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-xs md:text-sm tracking-wide">{review.client_name}</p>
              <p className="text-[10px] md:text-xs opacity-50">{review.tattoo_style || date}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          // If the table doesn't exist yet, just silently fail and use the fallback data
          return;
        }

        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        // Catch any network errors silently
      }
    }
    fetchReviews();
  }, []);

  const FALLBACK_REVIEWS: Review[] = [
    {
      id: "1",
      client_name: "Sarah Jenkins",
      rating: 5,
      text: "Absolute perfection. The fine line work is incredible and the healing process was so smooth.",
      tattoo_style: "Fine Line",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      client_name: "Michael Chang",
      rating: 5,
      text: "Sanjay took my scattered ideas and turned them into a cohesive, stunning piece of art.",
      tattoo_style: "Realism",
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: "3",
      client_name: "Emma Davis",
      rating: 5,
      text: "Clean studio, professional atmosphere, and the most gentle hand. Highly recommend Plan B.",
      tattoo_style: "Geometric",
      created_at: new Date(Date.now() - 86400000 * 12).toISOString()
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  // Triple the reviews to ensure seamless infinite scroll
  const scrollItems = [...displayReviews, ...displayReviews, ...displayReviews, ...displayReviews];
  const scrollItemsReverse = [...scrollItems].reverse();

  return (
    <section id="reviews" className="py-24 bg-background-alt overflow-hidden">
      <div className="w-full px-4 md:px-12 xl:px-24 mb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Client Stories</h2>
            <p className="opacity-70 max-w-lg leading-relaxed">
              Don't just take our word for it. Read about the experiences of clients who have trusted us with their skin.
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="flex gap-1 text-primary mb-1">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className="w-6 h-6 fill-current drop-shadow-[0_0_5px_var(--accent-primary)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              ))}
            </div>
            <p className="font-bold uppercase tracking-wider text-sm">4.9/5 Average Rating</p>
          </div>
        </div>
      </div>

      <div className="relative w-full pb-8">
        {/* Gradient edge masks for smooth fade in/out */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background-alt to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background-alt to-transparent z-20 pointer-events-none"></div>

        {/* DESKTOP: Single Row Marquee */}
        <div className="hidden md:flex w-[200%] animate-marquee hover:pause-on-hover">
          {scrollItems.map((review, idx) => (
            <ReviewCard key={`desktop-${idx}`} review={review} />
          ))}
        </div>

        {/* MOBILE: Double Row Marquee */}
        <div className="flex flex-col gap-6 md:hidden">
          {/* Row 1: Moves Left */}
          <div className="flex w-[300%] animate-marquee">
            {scrollItems.map((review, idx) => (
              <ReviewCard key={`mobile-r1-${idx}`} review={review} />
            ))}
          </div>

          {/* Row 2: Moves Right */}
          <div className="flex w-[300%] animate-marquee-reverse">
            {scrollItemsReverse.map((review, idx) => (
              <ReviewCard key={`mobile-r2-${idx}`} review={review} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
