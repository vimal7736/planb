import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import BookingForm from "@/components/BookingForm";
import SocialsCard from "@/components/SocialsCard";
import MobileNav from "@/components/MobileNav";
import Offers from "@/components/Offers";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Blog from "@/components/Blog";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const { data: contentData } = await supabase.from('site_content').select('*');
  const contentMap: Record<string, string> = {};
  if (contentData) {
    contentData.forEach(item => {
      contentMap[item.id] = item.content;
    });
  }

  // Fetch latest 15 portfolio images for the hero
  const { data: portfolioImages } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero 
          heading={contentMap['hero_heading']} 
          subheading={contentMap['hero_subheading']} 
          btnPrimary={contentMap['hero_btn_primary']}
          btnSecondary={contentMap['hero_btn_secondary']}
          btnTertiary={contentMap['hero_btn_tertiary']}
          circularText={contentMap['hero_circular_text']}
          portfolioImages={portfolioImages || []}
        />
        <Offers 
          title={contentMap['offer_title']}
          description={contentMap['offer_description']}
          btnText={contentMap['offer_btn_text']}
        />
        <Services />
        <Portfolio />
        <Reviews />
        
        {/* About Studio & Artist Section */}
        <section id="about" className="py-24 w-full px-4 md:px-12 xl:px-24">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* About Us */}
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black font-serif mb-8 tracking-tight">About Us</h2>
              <div className="space-y-6 opacity-80 leading-relaxed text-lg text-left md:text-center whitespace-pre-wrap">
                {contentMap['about_philosophy'] || `At Plan B Tattoo Studio, we believe tattoos are more than ink on skin—they're personal stories, memories, beliefs, and moments that deserve to be transformed into timeless art.`}
              </div>
            </div>

            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full"></div>

            {/* Meet the Artist */}
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black font-serif mb-4 tracking-tight">Meet the Artist</h2>
              <div className="space-y-6 opacity-80 leading-relaxed text-lg text-left md:text-center whitespace-pre-wrap">
                {contentMap['about_artist'] || `With over 10 years of experience in the tattoo industry, Sanjay N M is a passionate tattoo artist known for his precision, creativity, and commitment to excellence.`}
              </div>
            </div>
          </div>
        </section>

        <Blog />
        <BookingForm />
      </main>
      
      <footer className="bg-background-alt py-12 border-t border-primary/10">
        <div className="w-full px-4 md:px-12 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-serif tracking-widest text-primary mb-4 uppercase">
              PLAN B
            </h3>
            <p className="opacity-70 text-sm max-w-xs mx-auto md:mx-0">
              © {new Date().getFullYear()} PLAN B Tattoo Studio. All rights reserved.
              Located in the heart of the city, delivering fine-line and minimalist art.
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
