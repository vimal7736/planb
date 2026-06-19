"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState("rd-1");

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[400px]">
      <div className="mobile-nav-wrap w-full justify-between">
        <input
          type="radio"
          id="rd-1"
          name="mobile-nav"
          className="rd-1"
          checked={activeTab === "rd-1"}
          onChange={() => setActiveTab("rd-1")}
        />
        <label htmlFor="rd-1" className="mobile-nav-label flex-1" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
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
        <label htmlFor="rd-2" className="mobile-nav-label flex-1" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
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
        <label htmlFor="rd-3" className="mobile-nav-label flex-1" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Book</span>
        </label>

        <div className="mobile-nav-slidebar"></div>
      </div>
    </div>
  );
}
