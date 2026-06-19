"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Mail, Phone } from "lucide-react";
import CustomDateTimePicker from "./CustomDateTimePicker";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission for Phase 1 UI
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessOpen(true);
    }, 1500);
  };

  return (
    <section id="booking" className="py-16 md:py-24 relative overflow-hidden">
      {/* Massive Desktop Wow Factor Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-primary/10 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse duration-[10000ms]"></div>
      <div className="absolute top-1/2 right-[-10%] w-[800px] h-[800px] bg-background-alt rounded-full mix-blend-multiply filter blur-[100px] opacity-50 -translate-y-1/2 pointer-events-none"></div>

      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Connect & Create</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Ready to bring your vision to life? Reach out to schedule a consultation, discuss your ideas, or book your next masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-4 bg-primary text-background p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl space-y-6 h-full flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_0_40px_rgba(85,107,47,0.3)] transition-shadow duration-700">
              
              {/* Wow Factor: Spinning Geometric Fine-Line Tattoo SVG Background */}
              <svg viewBox="0 0 200 200" className="absolute -bottom-24 -right-24 w-96 h-96 text-background/10 group-hover:text-background/20 group-hover:scale-105 transition-all duration-1000 pointer-events-none animate-[spin_120s_linear_infinite]">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <path d="M100 30 Q150 100 100 170 Q50 100 100 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="5" fill="currentColor" />
              </svg>

              {/* Wow factor animated gradient background for contact card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6">Plan B Studio</h3>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 col-span-2 md:col-span-1">
                    <svg className="w-5 h-5 md:w-5 md:h-5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-60 text-[10px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Studio Address</h4>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Address+Mall,+Oyitty+Rd,+Palayam,+Kozhikode,+Kerala+673001" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="leading-tight md:leading-snug hover:underline hover:text-white transition-colors block text-xs md:text-sm font-light"
                      >
                        Ground floor, Address Mall, 673001, Kozhikode
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <svg className="w-5 h-5 md:w-5 md:h-5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-60 text-[10px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Phone</h4>
                      <a href="tel:09895904119" className="text-xs md:text-[15px] hover:underline transition-all font-light">098959 04119</a>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <svg className="w-5 h-5 md:w-5 md:h-5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-60 text-[10px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Email</h4>
                      <a href="mailto:hello@planbstudio.com" className="text-xs md:text-[15px] hover:underline transition-all line-clamp-1 font-light">hello@planbstudio.com</a>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <svg className="w-5 h-5 md:w-5 md:h-5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-60 text-[10px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Hours</h4>
                      <p className="text-xs md:text-[15px] font-light">24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-background/20 mt-4 relative z-10 hidden md:block">
                <p className="opacity-70 text-xs leading-relaxed">
                  We maintain a highly sterile environment and strictly follow health guidelines to ensure your safety and comfort.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-8 bg-background/60 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-primary/10 relative group hover:border-primary/30 transition-colors duration-700">
              {/* Form subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_0_0_40px_rgba(85,107,47,0.05)] pointer-events-none transition-shadow duration-700"></div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-1 md:space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-1 md:space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                      placeholder="Your number"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-1.5 relative z-50">
                  <label htmlFor="date" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Preferred Date & Time</label>
                  <div className="scale-[0.95] md:scale-100 origin-top-left">
                    <CustomDateTimePicker id="date" required />
                  </div>
                </div>
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label htmlFor="placement" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Placement & Size</label>
                  <input
                    type="text"
                    id="placement"
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                    placeholder="Inner forearm, approx 4 inches"
                  />
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label htmlFor="description" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Tattoo Description</label>
                  <textarea
                    id="description"
                    required
                    rows={3}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all resize-none text-sm shadow-sm focus:shadow-md"
                    placeholder="Describe your idea in detail..."
                  ></textarea>
                </div>
                <div className="space-y-1 md:space-y-1.5">
                  <label className="text-[10px] font-medium tracking-wider uppercase opacity-80">Reference Images (Optional)</label>
                  <div className="relative border-2 border-dashed border-primary/30 rounded-lg md:rounded-xl p-4 md:p-5 text-center hover:bg-primary/10 transition-colors cursor-pointer group bg-background/30">
                    <input
                      type="file"
                      id="reference"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <svg className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      <p className="text-sm text-primary">
                        {fileName ? (
                          <span className="font-semibold">{fileName}</span>
                        ) : (
                          <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs opacity-60">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 md:py-4 bg-primary text-background rounded-lg md:rounded-xl font-bold tracking-widest uppercase hover:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
                </button>
                <p className="text-xs text-center opacity-60 mt-6">
                  * Submitting this form does not guarantee an appointment. We will contact you to confirm the date and time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity" onClick={() => setIsSuccessOpen(false)}></div>
          
          <div className="relative bg-background-alt border border-primary/20 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_0_100px_rgba(85,107,47,0.2)] max-w-lg w-full text-center animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
            
            {/* Wow Factor: Fine-Line Diamond Watermark Background */}
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-primary opacity-[0.03] pointer-events-none animate-[spin_60s_linear_infinite]">
              <path d="M50 10 L90 50 L50 90 L10 50 Z"/>
              <path d="M50 20 L80 50 L50 80 L20 50 Z"/>
              <circle cx="50" cy="50" r="10"/>
              <line x1="50" y1="10" x2="50" y2="90"/>
              <line x1="10" y1="50" x2="90" y2="50"/>
              <circle cx="50" cy="50" r="45" strokeDasharray="2 4"/>
              <circle cx="50" cy="50" r="30" strokeDasharray="1 2"/>
            </svg>

            {/* Close Button */}
            <button 
              onClick={() => setIsSuccessOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 opacity-50 hover:opacity-100 transition-opacity z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="relative z-10">
              {/* Glowing Checkmark */}
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="relative bg-primary text-background w-full h-full rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-black mb-2 md:mb-4">Request Sent!</h3>
              <p className="opacity-70 leading-relaxed mb-6 md:mb-8 text-sm md:text-base px-2">
                Your tattoo vision has been successfully transmitted. We are reviewing your details and will get back to you shortly.
              </p>

              <div className="bg-background border border-primary/10 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-inner">
                <p className="text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-60 mb-1 md:mb-2">Want faster response?</p>
                <p className="text-base md:text-lg font-serif font-bold mb-3 md:mb-4">Message Plan B directly:</p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <a 
                    href="https://wa.me/919895904119" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#25D366] text-white rounded-lg md:rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/20 text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </a>
                  <a 
                    href="tel:09895904119"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-background border border-primary/20 rounded-lg md:rounded-xl font-bold hover:bg-primary/5 transition-colors text-sm md:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    Call Now
                  </a>
                </div>
              </div>

              <button 
                onClick={() => setIsSuccessOpen(false)}
                className="text-[10px] md:text-xs font-bold opacity-50 hover:opacity-100 uppercase tracking-widest transition-opacity"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
