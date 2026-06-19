import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import BookingForm from "@/components/BookingForm";
import SocialsCard from "@/components/SocialsCard";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Portfolio />
        
        {/* Simple About Section */}
        <section id="about" className="py-16 w-full px-4 md:px-12 xl:px-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-serif mb-6">About the Artist</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              With over a decade of experience, I specialize in creating delicate, fine-line tattoos that flow with the natural contours of the body. My studio offers a private, serene, and fully sterile environment where your vision is translated into lasting art.
            </p>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full"></div>
          </div>
        </section>

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
