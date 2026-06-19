import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import SocialsCard from "@/components/SocialsCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const BLOG_POSTS = {
  "tattoo-aftercare": {
    title: "The Ultimate Tattoo Aftercare Guide",
    category: "Care",
    date: "Aug 12, 2026",
    image: "/tattooos/stories-ink-tattoo-care-kZuIc5Jtmfc-unsplash.jpg",
    desc: "Everything you need to know about keeping your new fine-line tattoo crisp and preventing infections during the healing process.",
    content: (
      <>
        <p>
          Getting a tattoo is only half the process; the other half is entirely up to you. Proper aftercare is crucial for ensuring your new artwork heals beautifully, maintains its crisp lines, and stays vibrant for years to come. In this guide, we will walk you through the essential steps of tattoo aftercare.
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">1. Keep the Bandage On</h2>
        <p>
          Your artist took the time to meticulously clean and wrap your new tattoo. Resist the temptation to take it off immediately! Leave the bandage or Saniderm wrap on for the amount of time recommended by your artist (usually 2 to 24 hours depending on the wrap used).
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">2. Wash Gently</h2>
        <p>
          Once you remove the bandage, gently wash the tattoo using lukewarm water and a fragrance-free, antibacterial soap. Use only your clean fingertips—no washcloths or loofahs, as they can harbor bacteria and be too abrasive on your healing skin.
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">3. Moisturize, Don't Suffocate</h2>
        <p>
          After patting the tattoo dry with a clean paper towel (never a bath towel), apply a remarkably thin layer of an artist-approved ointment or fragrance-free lotion. If your tattoo looks wet or glossy, you have applied too much.
        </p>
      </>
    )
  },
  "custom-design": {
    title: "How to Choose Your Custom Design",
    category: "Inspiration",
    date: "Jul 28, 2026",
    image: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
    desc: "A step-by-step walkthrough on how to collaborate with an artist and translate your abstract ideas into a beautiful, permanent design.",
    content: (
      <>
        <p>Choosing a custom design can feel overwhelming, but it doesn't have to be. The best tattoos start with a simple idea and a collaborative relationship with your artist.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Find Your Inspiration</h2>
        <p>Before booking a consultation, create a mood board. Use Pinterest, Instagram, or even photographs of nature and architecture. Your artist isn't looking for you to draw the tattoo; they are looking for the <em>feeling</em> and <em>style</em> you want to achieve.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Trust the Artist</h2>
        <p>A good fine-line artist understands how ink ages in the skin. If they suggest making an element larger or removing a tiny detail, trust their expertise. What looks good on paper doesn't always translate perfectly to the curved, moving canvas of the human body.</p>
      </>
    )
  },
  "placement-pain": {
    title: "Understanding Placement and Pain",
    category: "Education",
    date: "Jun 15, 2026",
    image: "/tattooos/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg",
    desc: "Not all skin is created equal. We break down the tattoo pain chart and help you decide the best placement for your next piece.",
    content: (
      <>
        <p>One of the most common questions we get is: "How bad is it going to hurt?" The truth is, tattoo pain is entirely subjective, but placement plays a massive role in your overall comfort during the session.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Easy Spots</h2>
        <p>If this is your first tattoo, consider the outer thigh, the forearm, or the outer bicep. These areas have thicker skin and more muscle/fat padding, making them highly tolerable for most clients.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Spicy Zones</h2>
        <p>Ribs, sternum, tops of the feet, and the inner bicep are notoriously more sensitive. The skin here is thin, and you are working directly over bone or nerve clusters. While fine-line tattooing is generally less traumatic than traditional heavy-handed styles, be prepared to practice some deep breathing if you choose these placements.</p>
      </>
    )
  },
  "history-fine-line": {
    title: "The Rise of Fine-Line Tattooing",
    category: "Culture",
    date: "May 02, 2026",
    image: "/tattooos/eugene-chystiakov-udEtTnAcSD8-unsplash.jpg",
    desc: "Explore the modern evolution of single-needle artistry and why minimal, delicate tattoos are dominating the industry.",
    content: (
      <>
        <p>Fine-line tattooing has exploded in popularity over the last decade, transitioning from a niche subculture to the mainstream. This delicate art form relies on immense precision and a deep understanding of skin mechanics.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Shift to Minimalism</h2>
        <p>As tattoos become more widely accepted in professional environments, clients are opting for smaller, more elegant designs that mimic fine art and illustration rather than bold traditional tattoos.</p>
      </>
    )
  },
  "first-studio-visit": {
    title: "Preparing for Your First Studio Visit",
    category: "Guide",
    date: "Apr 18, 2026",
    image: "/tattooos/jj-jordan-eenumTwM6Ec-unsplash.jpg",
    desc: "Nervous about your first tattoo? Here is a comprehensive checklist of what to eat, wear, and expect on appointment day.",
    content: (
      <>
        <p>Walking into a tattoo studio for the first time can be intimidating, but it shouldn't be. Here is exactly what you need to do to prepare for a smooth and comfortable session.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Hydrate and Eat</h2>
        <p>Never show up on an empty stomach. Eat a heavy, carb-rich meal beforehand to stabilize your blood sugar, and drink plenty of water starting the day before.</p>
      </>
    )
  },
  "cover-ups": {
    title: "Cover-Ups: What You Need to Know",
    category: "Education",
    date: "Mar 30, 2026",
    image: "/tattooos/tattoo-1.png",
    desc: "Thinking about hiding an old mistake? Learn the limitations and possibilities of fine-line cover-up tattoos.",
    content: (
      <>
        <p>Covering an old tattoo with fine-line work is notoriously difficult because fine-line styles rely on negative space (empty skin) to create contrast.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Rules of Cover-Ups</h2>
        <p>To successfully hide old ink, the new design must be significantly larger, darker, and strategically placed. In many cases, we recommend laser fading before attempting a delicate cover-up.</p>
      </>
    )
  },
  "minimalist-geometry": {
    title: "Minimalist Geometry Trends",
    category: "Inspiration",
    date: "Feb 14, 2026",
    image: "/tattooos/tattoo-2.png",
    desc: "Discover the breathtaking beauty of dotwork mandalas, sacred geometry, and perfectly straight linework.",
    content: (
      <>
        <p>Geometric tattoos represent the intersection of mathematics and art. Creating a perfectly straight line or a flawless circle on a curved human body requires intense technical mastery.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Power of Dotwork</h2>
        <p>Many geometric pieces utilize dotwork shading (stippling) instead of solid black or grey wash. This technique heals beautifully and creates a soft, textured fade that ages incredibly well.</p>
      </>
    )
  },
  "micro-tattoos": {
    title: "Micro-Tattoos vs. Traditional Ink",
    category: "Education",
    date: "Jan 22, 2026",
    image: "/tattooos/tattoo-3.png",
    desc: "A deep dive into how extremely tiny tattoos age over time compared to bold, traditional styles.",
    content: (
      <>
        <p>Micro-tattoos are beautiful, but they come with unique challenges. The human immune system constantly attacks tattoo ink, causing it to slowly spread and blur under the skin over decades.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Design Considerations</h2>
        <p>If you want a tattoo the size of a coin, it cannot have intricate details. The design must be incredibly simple with wide negative spaces to ensure it doesn't merge into a black blob five years from now.</p>
      </>
    )
  },
  "botanical-art": {
    title: "Botanical Art: Flora in Ink",
    category: "Inspiration",
    date: "Dec 05, 2025",
    image: "/tattooos/tattoo-4.png",
    desc: "Why floral and nature-inspired designs continue to be the most requested pieces in our studio.",
    content: (
      <>
        <p>Botanical tattoos are timeless. Unlike rigid geometric shapes, organic forms like vines, leaves, and petals can be custom-designed to perfectly flow along the unique curves of your body.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Custom Placement</h2>
        <p>A master artist will often freehand botanical elements directly onto the skin with a marker before tattooing, ensuring the design perfectly contours around muscles and bones.</p>
      </>
    )
  },
  "sterile-equipment": {
    title: "The Importance of Sterile Equipment",
    category: "Safety",
    date: "Nov 19, 2025",
    image: "/tattooos/tattoo-5.png",
    desc: "Behind the scenes at Plan B: An inside look at our rigorous hospital-grade sterilization processes.",
    content: (
      <>
        <p>Your safety is our absolute priority. A high-end tattoo studio must adhere to sterilization protocols that rival minor medical procedures.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Single-Use Everything</h2>
        <p>Every needle, ink cap, and barrier film used during your session is entirely single-use and disposed of immediately in hazardous waste containers. We never reuse needles under any circumstances.</p>
      </>
    )
  },
  "healed-vs-fresh": {
    title: "Healed vs. Fresh: Realistic Expectations",
    category: "Care",
    date: "Oct 11, 2025",
    image: "/tattooos/tattoo-6.png",
    desc: "Tattoos look different once the skin has completely settled. Here are side-by-side comparisons of fresh and fully healed work.",
    content: (
      <>
        <p>When you leave the studio, your tattoo is bright, dark, and glossy. However, after it heals, a layer of epidermis regrows over the ink, giving it a slightly softer, matte appearance.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">The Healing Fade</h2>
        <p>This is completely normal. Fine-line tattoos in particular will settle into the skin and lighten by about 10-20%. This soft, muted look is exactly what makes fine-line tattooing so elegant.</p>
      </>
    )
  },
  "script-lettering": {
    title: "A Guide to Script and Lettering",
    category: "Guide",
    date: "Sep 28, 2025",
    image: "/tattooos/akram-huseyn-smtP9zIj6qU-unsplash.jpg",
    desc: "From elegant cursive to stark typewriter fonts, learn how to pick the perfect lettering for your meaningful quote.",
    content: (
      <>
        <p>Lettering is one of the most personal forms of tattooing, but it requires careful planning. The font you choose dictates the entire vibe of the piece.</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">Sizing is Crucial</h2>
        <p>Script needs to be large enough that the loops inside the letters (like 'e' and 'o') don't close up as the tattoo ages and the ink naturally expands. Your artist will guide you on the minimum safe size for your chosen font.</p>
      </>
    )
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS[resolvedParams.slug as keyof typeof BLOG_POSTS];
  
  if (!post) {
    return { title: 'Post Not Found | Plan B' };
  }
  
  return {
    title: `${post.title} | Plan B Tattoo Studio`,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      images: [{ url: post.image }],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS[resolvedParams.slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 pt-24 md:pt-32 px-4 md:px-12 xl:px-24 w-full">
        
        {/* Back Button */}
        <Link href="/#blog" className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-bold uppercase tracking-wider text-xs md:text-sm mb-8 md:mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>

        {/* Article Header */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-center md:text-left max-w-5xl">
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-wider text-primary">
            <span className="px-3 py-1 bg-primary/10 rounded-full">{post.category}</span>
            <span className="opacity-60 text-foreground">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black font-serif tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-base md:text-xl opacity-70 leading-relaxed max-w-3xl">
            {post.desc}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-12 md:mb-16 shadow-2xl">
          <Image 
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-base md:prose-lg max-w-4xl space-y-6 md:space-y-8 opacity-80">
          {post.content}
        </div>

      </main>

      <footer className="bg-background-alt py-12 border-t border-primary/10 mt-24">
        <div className="w-full px-4 md:px-12 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-serif tracking-widest text-primary mb-4 uppercase">
              PLAN B
            </h3>
            <p className="opacity-70 text-sm max-w-xs mx-auto md:mx-0">
              © {new Date().getFullYear()} PLAN B Tattoo Studio. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <SocialsCard />
          </div>
        </div>
      </footer>
      <MobileNav />
    </>
  );
}
