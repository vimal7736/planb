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
        <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm p-6 md:p-12 rounded-3xl shadow-lg border border-primary/10">
          <div className="text-center mb-8 space-y-3">
            <h2 className="text-3xl font-bold font-serif tracking-tight">Request an Appointment</h2>
            <p className="opacity-80">
              Fill out the form below with your ideas, preferred dates, and reference images. 
              We will get back to you within 48 hours to confirm your slot.
            </p>
          </div>

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
            <p className="text-xs text-center opacity-60 mt-4">
              * Submitting this form does not guarantee an appointment. We will contact you to confirm.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
