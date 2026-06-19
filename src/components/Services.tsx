"use client";

import { useState, useEffect } from "react";

const SERVICES = [
  {
    title: "Fine Line",
    desc: "Delicate, single-needle precision for elegant and timeless minimalist designs.",
    rotation: -15,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
    )
  },
  {
    title: "Realism",
    desc: "Highly detailed, scaled-down realistic portraits and objects with extreme accuracy.",
    rotation: -5,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    )
  },
  {
    title: "Black & Grey",
    desc: "Classic monochromatic pieces utilizing varying shades of black ink for depth.",
    rotation: 5,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.512 15H9v5.488A9.025 9.025 0 013.512 15z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 20.488V15h5.488A9.025 9.025 0 0115 20.488z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.512 9H9V3.512A9.025 9.025 0 003.512 9z"></path></svg>
    )
  },
  {
    title: "Custom",
    desc: "Collaborative, one-on-one sessions to design a completely unique tattoo.",
    rotation: 15,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
    )
  }
];

export default function Services() {
  const [isFanned, setIsFanned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">Services & Specialties</h2>
            <p className="max-w-2xl mx-auto opacity-70 leading-relaxed font-light">
              Elevating the craft of tattooing through precision, artistry, and a dedication to minimalist aesthetics. 
              <span className="md:hidden block mt-2 text-primary font-bold">Tap below to view styles.</span>
            </p>
          </div>

          <div 
            className="relative flex justify-center items-center h-[500px] md:h-[400px] cursor-pointer group"
            onClick={() => setIsFanned(!isFanned)}
            onMouseEnter={() => setIsFanned(true)}
            onMouseLeave={() => setIsFanned(false)}
          >
            {SERVICES.map((service, idx) => (
              <div 
                key={idx}
                className="absolute w-40 h-56 md:w-56 md:h-72 bg-background border border-primary/20 shadow-2xl flex flex-col justify-start pt-6 md:pt-8 items-center text-center transition-all duration-500 rounded-2xl backdrop-blur-md px-3 md:px-4"
                style={{
                  transform: isFanned 
                    ? isMobile
                      ? `rotate(0deg) translate(${(idx % 2 === 0 ? -1 : 1) * 85}px, ${(idx < 2 ? -1 : 1) * 115}px)`
                      : `rotate(0deg) translateX(${(idx - 1.5) * 240}px)`
                    : `rotate(${service.rotation}deg)`,
                  zIndex: isFanned ? 10 + idx : 10 - idx
                }}
              >
                <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                
                <p className="text-xs md:text-sm opacity-70 leading-relaxed max-w-[90%] mx-auto">
                  {service.desc}
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
          
        </div>
      </div>
    </section>
  );
}
