"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        setIsEntering(true);
        setTimeout(() => {
          router.push("/admin");
          router.refresh(); 
        }, 3000);
      } else {
        setError(result.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative z-[100] font-sans overflow-hidden">
      <AnimatePresence>
        {!isEntering ? (
          <motion.div 
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-background-alt border border-primary/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden will-change-transform"
          >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 mb-4 text-primary relative flex justify-center items-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transformOrigin: "bottom center", transform: "rotate(15deg)" }}
            >
              <path d="M 50 10 C 60 -10 80 20 90 0" strokeWidth="2" opacity="0.4" />
              <rect x="42" y="10" width="16" height="10" rx="2" />
              <rect x="38" y="20" width="24" height="40" rx="3" className="fill-primary/5" />
              <line x1="38" y1="30" x2="62" y2="30" strokeWidth="1" opacity="0.3" />
              <line x1="38" y1="50" x2="62" y2="50" strokeWidth="1" opacity="0.3" />
              <path d="M 38 60 L 62 60 L 60 75 L 40 75 Z" />
              <line x1="41" y1="65" x2="59" y2="65" strokeWidth="1.5" />
              <line x1="40" y1="70" x2="60" y2="70" strokeWidth="1.5" />
              <path d="M 43 75 L 57 75 L 52 88 L 48 88 Z" className="fill-background" />
              <line x1="50" y1="88" x2="50" y2="98" strokeWidth="1.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-black font-serif tracking-widest uppercase text-foreground mb-2">PLAN B</h1>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary/70">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest opacity-70 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary/60 transition-colors text-sm"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest opacity-70 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary/60 transition-colors text-sm"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-background font-bold uppercase tracking-widest text-sm rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </motion.div>
        ) : (
          <motion.div
            key="entry-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{ scale: [0.8, 1.1, 15], opacity: [0, 1, 0], rotate: [0, 5, 25] }}
              transition={{ duration: 2.8, ease: [0.25, 1, 0.3, 1] }}
              className="text-primary w-64 h-64 flex justify-center items-center will-change-transform"
              style={{ translateZ: 0 }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-primary animate-tattoo-buzz"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 50 10 C 60 -10 80 20 90 0" strokeWidth="2" opacity="0.4" />
                <rect x="42" y="10" width="16" height="10" rx="2" />
                <rect x="38" y="20" width="24" height="40" rx="3" className="fill-primary/5" />
                <line x1="38" y1="30" x2="62" y2="30" strokeWidth="1" opacity="0.3" />
                <line x1="38" y1="50" x2="62" y2="50" strokeWidth="1" opacity="0.3" />
                <path d="M 38 60 L 62 60 L 60 75 L 40 75 Z" />
                <line x1="41" y1="65" x2="59" y2="65" strokeWidth="1.5" />
                <line x1="40" y1="70" x2="60" y2="70" strokeWidth="1.5" />
                <path d="M 43 75 L 57 75 L 52 88 L 48 88 Z" className="fill-background" />
                <line x1="50" y1="88" x2="50" y2="98" strokeWidth="1.5" className="animate-needle-poke" />
              </svg>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, letterSpacing: "0.05em" }}
              animate={{ opacity: [0, 1, 0], scale: [0.95, 1.05, 1.15], letterSpacing: ["0.05em", "0.2em", "0.3em"] }}
              transition={{ duration: 2.8, ease: [0.25, 1, 0.3, 1] }}
              className="absolute font-black font-serif uppercase text-2xl md:text-5xl text-primary text-center leading-none will-change-transform"
              style={{ translateZ: 0 }}
            >
              ENTERING <br/> PLAN B
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
