"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase, Article } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!params.slug) return;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', params.slug)
        .single();
        
      if (error || !data) {
        console.error("Error fetching article:", error);
        router.push('/');
      } else {
        setArticle(data);
      }
      setLoading(false);
    }
    
    fetchArticle();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary pb-24">
        
        {/* Navigation */}
        <nav className="w-full px-4 md:px-12 xl:px-24 py-6 md:py-8 fixed top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <header className="pt-32 pb-12 md:pt-40 md:pb-20 px-4 md:px-12 xl:px-24 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-tight mb-8">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-70 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-foreground/50"></div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {Math.max(1, Math.ceil((article.content?.length || 0) / 1000))} min read
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-foreground/50"></div>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-12 xl:px-24 mb-16 md:mb-24">
          <div className="relative w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-primary/10">
            <Image 
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="prose prose-invert prose-lg md:prose-xl w-full max-w-none prose-headings:font-serif prose-headings:font-black prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-xl">
            {article.content ? (
              <div className="whitespace-pre-wrap leading-relaxed opacity-90 font-light">
                {article.content}
              </div>
            ) : (
              <p className="text-xl italic opacity-60 leading-relaxed text-center">
                This article doesn't have any detailed content yet!
              </p>
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-primary/20 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Ready for your next tattoo?</h3>
            <p className="opacity-70 mb-8 max-w-lg mx-auto">
              If this guide inspired you, we'd love to help you bring your ideas to life. Reach out for a consultation.
            </p>
            <Link 
              href="/#booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform"
            >
              Book a Consultation
            </Link>
          </div>
        </article>

      </main>
    </>
  );
}
