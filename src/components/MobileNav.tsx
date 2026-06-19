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
        <label htmlFor="rd-1" className="mobile-nav-label" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Home</span>
        </label>

        <input
          type="radio"
          id="rd-2"
          name="mobile-nav"
          className="rd-2"
          checked={activeTab === "rd-2"}
          onChange={() => setActiveTab("rd-2")}
        />
        <label htmlFor="rd-2" className="mobile-nav-label" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Portfolio</span>
        </label>

        <input
          type="radio"
          id="rd-3"
          name="mobile-nav"
          className="rd-3"
          checked={activeTab === "rd-3"}
          onChange={() => setActiveTab("rd-3")}
        />
        <label htmlFor="rd-3" className="mobile-nav-label" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Book</span>
        </label>

        <div className="mobile-nav-slidebar"></div>

        <div className="w-[1px] h-6 bg-accent-secondary/50 mx-1 z-10 hidden sm:block"></div>

        <div className="theme-switch shrink-0 z-10 pl-1 pr-2" style={{ fontSize: '1.2rem' }}>
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
    </div>
  );
}
