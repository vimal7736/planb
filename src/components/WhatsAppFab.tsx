"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "919895904119";

const QUICK_PROMPTS = [
  "I'd like to discuss a custom tattoo idea & pricing.",
  "I want to check your availability for a session.",
  "I'm interested in a cover-up consultation.",
];

export default function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    "I'd love to discuss a tattoo idea and check your availability at Plan B Studio."
  );

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = message.trim();
    const body = trimmed
      ? /^hi\s+sanjay/i.test(trimmed)
        ? trimmed
        : `Hi Sanjay, ${trimmed}`
      : "Hi Sanjay, I'd love to discuss a tattoo idea and check your availability at Plan B Studio.";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Direct WhatsApp message to Sanjay"
          className="w-[calc(100vw-2rem)] max-w-[320px] rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-serif font-bold text-sm">
                S
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-sm">Sanjay · Tattoo Artist</p>
                <p className="text-[11px] text-white/75">Plan B Studio </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
              className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSend} className="p-3.5 space-y-3">
            {/* Greeting bubble */}
            <div className="rounded-xl rounded-tl-none bg-background-alt/80 border border-primary/10 px-3 py-2 text-xs leading-relaxed">
              <span className="font-semibold text-primary block mb-0.5">Hi Sanjay </span>
              Type your message below and continue directly on WhatsApp.
            </div>

            {/* Quick starters */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMessage(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-primary/20 bg-background-alt/50 hover:bg-primary/10 transition-colors text-left cursor-pointer"
                >
                  {prompt.length > 34 ? `${prompt.slice(0, 34)}…` : prompt}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="space-y-1.5">

              <textarea
                id="wa-direct-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your tattoo idea, placement, or preferred date..."
                className="w-full rounded-xl border border-primary/20 bg-background-alt/40 px-3 py-2 text-xs leading-relaxed focus:outline-none focus:border-[#25D366] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs py-2.5 px-4 shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Send to Sanjay on WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with Sanjay on WhatsApp"}
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
  );
}
