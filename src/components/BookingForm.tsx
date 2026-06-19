"use client";

import { useState } from "react";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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
      alert("Booking request submitted! (This is a UI demo for Phase 1)");
    }, 1500);
  };

  return (
    <section id="booking" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/2 right-[-10%] w-[800px] h-[800px] bg-background-alt rounded-full mix-blend-multiply filter blur-[100px] opacity-50 -translate-y-1/2"></div>
      
      <div className="w-full px-4 md:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Connect & Create</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Ready to bring your vision to life? Reach out to schedule a consultation, discuss your ideas, or book your next masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-4 bg-primary text-background p-8 md:p-10 rounded-3xl shadow-xl space-y-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6">Sanjay Munna</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 shrink-0 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-70 text-sm uppercase tracking-wider mb-1">Studio Address</h4>
                      <p className="leading-relaxed">Ground floor, Address Mall, 673001, Oyitty Rd, near City Stand, Palayam, Kozhikode, Kerala 673001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 shrink-0 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-70 text-sm uppercase tracking-wider mb-1">Phone</h4>
                      <a href="tel:09895904119" className="text-lg hover:underline transition-all">098959 04119</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 shrink-0 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-70 text-sm uppercase tracking-wider mb-1">Email</h4>
                      <a href="mailto:sanjay@email.com" className="text-lg hover:underline transition-all">sanjay@email.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 shrink-0 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <h4 className="font-medium opacity-70 text-sm uppercase tracking-wider mb-1">Hours</h4>
                      <p className="text-lg">Open 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-background/20 mt-8">
                <p className="opacity-70 text-sm leading-relaxed">
                  We maintain a highly sterile environment and strictly follow health guidelines to ensure your safety and comfort.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-8 bg-background/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-lg border border-primary/10">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Preferred Month/Date</label>
                <input 
                  type="text" 
                  id="date" 
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="e.g., Mid October"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="placement" className="text-sm font-medium">Placement & Size</label>
              <input 
                type="text" 
                id="placement" 
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-[#556B2F]/20 rounded-xl focus:outline-none focus:border-[#556B2F] transition-colors"
                placeholder="Inner forearm, approx 4 inches"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Tattoo Description</label>
              <textarea 
                id="description" 
                required
                rows={4}
                className="w-full px-4 py-3 bg-transparent border-2 border-[#556B2F]/20 rounded-xl focus:outline-none focus:border-[#556B2F] transition-colors resize-none"
                placeholder="Describe your idea in detail..."
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference Images (Optional)</label>
              <div className="relative border-2 border-dashed border-primary/30 rounded-xl p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer group">
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
              className="w-full py-4 bg-primary text-background rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
    </section>
  );
}
