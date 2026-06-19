"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState("rd-1");
  const [theme, setTheme] = useState("olive");

  useEffect(() => {
    // Sync with existing theme if possible, or just set it
    const currentTheme = document.documentElement.getAttribute("data-theme") || "olive";
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "olive" ? "darkminimal" : "olive");
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[95%] max-w-[450px] flex items-center gap-3">
      <div className="mobile-nav-wrap w-full flex items-center justify-between">
        <input
          type="radio"
          id="rd-1"
          name="mobile-nav"
          className="rd-1"
          checked={activeTab === "rd-1"}
          onChange={() => setActiveTab("rd-1")}
        />
        <label htmlFor="rd-1" className="mobile-nav-label" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })} aria-label="Home">
          <svg className="w-5 h-5 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        </label>

        <input
          type="radio"
          id="rd-2"
          name="mobile-nav"
          className="rd-2"
          checked={activeTab === "rd-2"}
          onChange={() => setActiveTab("rd-2")}
        />
        <label htmlFor="rd-2" className="mobile-nav-label" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} aria-label="Portfolio">
          <svg className="w-5 h-5 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </label>

        <input
          type="radio"
          id="rd-3"
          name="mobile-nav"
          className="rd-3"
          checked={activeTab === "rd-3"}
          onChange={() => setActiveTab("rd-3")}
        />
        <label htmlFor="rd-3" className="mobile-nav-label" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} aria-label="Book">
          <svg className="w-5 h-5 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </label>

        <div className="mobile-nav-slidebar"></div>
      </div>

      <div className="theme-switch shrink-0 bg-background-alt rounded-full shadow-lg border border-accent-secondary" style={{ fontSize: '1.2rem', padding: '6px' }}>
          <input 
            type="checkbox" 
            id="mobile-theme-checkbox" 
            checked={theme === "darkminimal"}
            onChange={toggleTheme}
            style={{ display: 'none' }}
          />
          <label htmlFor="mobile-theme-checkbox" style={{ margin: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
            <div style={{ backgroundColor: 'var(--text-main)' }}></div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"></path>
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
              </svg>
            </span>
          </label>
        </div>
      </div>
  );
}
