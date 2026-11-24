"use client";

import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "919895904119";

const QUICK_OPTIONS = [
  {
    label: "Custom Tattoo & Pricing",
    sublabel: "Share an idea & get a quote",
    message:
      "Hi Sanjay, I'd love to discuss a custom tattoo idea and get a quote at Plan B Studio.",
  },
  {
    label: "Check Availability",
    sublabel: "Book an upcoming session",
    message:
      "Hi Sanjay, I'd like to check your upcoming availability to book a tattoo session.",
  },
  {
    label: "Cover-Up Consultation",
    sublabel: "Redesign an existing tattoo",
    message:
      "Hi Sanjay, I'm interested in a cover-up tattoo consultation and would love your advice.",
  },
  {
    label: "General Inquiry",
    sublabel: "Ask anything about Plan B Studio",
    message:
      "Hi Sanjay, I have a quick question about getting a tattoo at Plan B Studio.",
  },
];

export default function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-28 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div
            role="dialog"
            aria-label="Direct WhatsApp message to Sanjay"
            className="w-[calc(100vw-2rem)] max-w-[310px] rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15 font-serif font-bold text-sm">
                  S
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-sm">Sanjay · Tattoo Artist</p>
                  <p className="text-[11px] text-white/75">Tap a topic to chat on WhatsApp</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp menu"
                className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* One-tap options */}
            <div className="p-2.5 space-y-1.5">
              {QUICK_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => openWhatsApp(option.message)}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-primary/15 bg-background-alt/50 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 px-3 py-2.5 text-left transition-all active:scale-[0.98] cursor-pointer group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight">
                      {option.label}
                    </p>
                    <p className="text-[11px] opacity-60 truncate mt-0.5">
                      {option.sublabel}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close WhatsApp menu" : "Chat with Sanjay on WhatsApp"}
          className="group relative flex h-13 w-13 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
          )}
          {isOpen ? (
            <X className="w-6 h-6 relative z-10" />
          ) : (
            <svg
              className="w-7 h-7 relative z-10 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.58-1.72a12.75 12.75 0 0 0 6.22 1.61h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.05A12.72 12.72 0 0 0 16.004 3.2zm0 23.33h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.58 10.58 0 0 1-1.63-5.65c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.12 7.53c0 5.88-4.78 10.65-10.66 10.65zm5.84-7.98c-.32-.16-1.9-.94-2.19-1.05-.29-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.22-.61-.38z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
