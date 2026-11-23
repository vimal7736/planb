"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Mail, Phone, RefreshCw } from "lucide-react";
import AdvancedBookingModal from "./AdvancedBookingModal";
import { supabase } from "@/lib/supabase";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: Date | null;
    time: string | null;
    duration: number | null;
    size: string | null;
  }>({
    date: null,
    time: null,
    duration: null,
    size: null,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [placement, setPlacement] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = bookingDetails.date
      ? `${bookingDetails.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}${bookingDetails.time ? ` at ${bookingDetails.time}` : ''}${bookingDetails.size ? ` (${bookingDetails.size})` : ''}`
      : 'Not specified';

    const lines = [
      '*New Tattoo Booking Request - Plan B Studio*',
      '',
      `*Name:* ${name || 'Not provided'}`,
      `*Email:* ${email || 'Not provided'}`,
      `*Phone:* ${phone || 'Not provided'}`,
      `*Preferred Date & Time:* ${formattedDate}`,
      `*Placement & Size:* ${placement || 'Not provided'}`,
      `*Description:* ${description || 'Not provided'}`,
      ...(fileName ? [`*Reference Image:* ${fileName} (will attach in chat)`] : []),
    ];

    const whatsappUrl = `https://wa.me/919895904119?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show compact confirmation & reset form
    setIsSuccessOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setPlacement("");
    setDescription("");
    setFile(null);
    setFileName(null);
    setBookingDetails({ date: null, time: null, duration: null, size: null });
    setIsSubmitting(false);
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

              <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-1 md:space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                      placeholder="Your number"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-1.5 relative z-50">
                    <label className="text-[10px] font-medium tracking-wider uppercase opacity-80">Preferred Date & Time</label>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className={`w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 rounded-lg md:rounded-xl text-left flex items-center justify-between transition-all text-sm shadow-sm hover:border-primary/50 ${
                        bookingDetails.date ? "border-primary" : "border-primary/20"
                      }`}
                    >
                      <span className={`${bookingDetails.date ? "text-foreground font-medium" : "text-foreground/50"}`}>
                        {bookingDetails.date && bookingDetails.time 
                          ? `${bookingDetails.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${bookingDetails.time} (${bookingDetails.size})`
                          : "Select Appointment Slot"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label htmlFor="placement" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Placement & Size</label>
                  <input
                    type="text"
                    id="placement"
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 border-primary/20 rounded-lg md:rounded-xl focus:outline-none focus:border-primary transition-all text-sm shadow-sm focus:shadow-md"
                    placeholder="Inner forearm, approx 4 inches"
                  />
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label htmlFor="description" className="text-[10px] font-medium tracking-wider uppercase opacity-80">Tattoo Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  className="w-full py-3 md:py-4 bg-primary text-background rounded-lg md:rounded-xl font-bold tracking-widest uppercase hover:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/20 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : "Submit Booking Request"}
                </button>
                <p className="text-xs text-center opacity-60 mt-6">
                  * Submitting this form does not guarantee an appointment. We will contact you to confirm the date and time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AdvancedBookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(date, time, duration, size) => {
          setBookingDetails({ date, time, duration, size });
        }}
      />

      {/* Compact Swal-style Confirmation Popup */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSuccessOpen(false)}
          ></div>

          <div className="relative bg-background border border-primary/20 p-6 rounded-2xl shadow-2xl max-w-xs w-full text-center animate-in zoom-in-95 fade-in duration-200">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="text-lg font-serif font-bold mb-1">Booking Confirmed!</h3>
            <p className="text-xs opacity-75 leading-relaxed mb-5">
              Your tattoo request has been sent. We&apos;ll reach out to you shortly.
            </p>

            <button
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="px-6 py-2 bg-primary text-background rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
