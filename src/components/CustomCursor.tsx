"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  // Motion values for smooth following
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Direct motion values for zero-latency instantaneous tracking
  const cursorX = mouseX;
  const cursorY = mouseY;

  useEffect(() => {
    // Detect touch devices (we don't want a custom cursor on mobile)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isCurrentlyHovering = !!(
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("select")
      );
      
      setIsHovering(isCurrentlyHovering);

      // High-performance direct DOM particle trail
      if (trailContainerRef.current) {
        const dist = Math.hypot(e.clientX - lastTrailPos.current.x, e.clientY - lastTrailPos.current.y);
        
        // Only spawn a particle if we moved enough distance (e.g. 15px) or if we are hovering (draw dots more frequently)
        const distanceThreshold = isCurrentlyHovering ? 10 : 25;

        if (dist > distanceThreshold) {
          lastTrailPos.current = { x: e.clientX, y: e.clientY };

          const particle = document.createElement("div");
          
          if (isCurrentlyHovering) {
            // Draw ink dots when hovering
            particle.className = "absolute rounded-full bg-primary pointer-events-none z-[9998]";
            const size = Math.random() * 4 + 2; // 2px to 6px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            // Add a little scatter
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 10;
            particle.style.left = `${e.clientX + offsetX}px`;
            particle.style.top = `${e.clientY + offsetY}px`;
            particle.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            particle.style.opacity = "0.8";
            particle.style.transform = "scale(1)";
          } else {
            // Draw tiny sparkles when moving normally
            particle.className = "absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] pointer-events-none z-[9998]";
            const size = Math.random() * 2 + 1; // 1px to 3px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            particle.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
            particle.style.opacity = "0.5";
            particle.style.transform = "scale(1) translateY(0)";
          }

          trailContainerRef.current.appendChild(particle);

          // Animate and remove
          requestAnimationFrame(() => {
            if (!isCurrentlyHovering) {
              particle.style.transform = `scale(0) translateY(${Math.random() * 20 - 10}px)`;
            } else {
              particle.style.transform = "scale(0.5)";
            }
            particle.style.opacity = "0";
          });

          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 600); // Remove after animation finishes
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);

    // Ensure cursor styling on dynamic elements is also hidden
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Container for the high-performance particle trail */}
      <div ref={trailContainerRef} className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" />

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference text-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-10%",
          translateY: "-10%",
        }}
      >
      <motion.div
        animate={{
          scale: isHovering ? 1.2 : 1,
          rotate: isHovering ? 35 : 15, // Rotate more when hovering
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-12 h-12"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-current absolute inset-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Cord at top */}
          <path d="M 50 10 C 60 -10 80 20 90 0" strokeWidth="2" opacity="0.6" />
          {/* RCA Connection */}
          <rect x="42" y="10" width="16" height="10" rx="2" />
          {/* Main Pen Body */}
          <rect x="38" y="20" width="24" height="40" rx="3" className="fill-current/10" />
          <line x1="38" y1="30" x2="62" y2="30" strokeWidth="1" opacity="0.5" />
          <line x1="38" y1="50" x2="62" y2="50" strokeWidth="1" opacity="0.5" />
          {/* Grip Section */}
          <path d="M 38 60 L 62 60 L 60 75 L 40 75 Z" />
          <line x1="41" y1="65" x2="59" y2="65" strokeWidth="1.5" />
          <line x1="40" y1="70" x2="60" y2="70" strokeWidth="1.5" />
          {/* Cartridge Tip */}
          <path d="M 43 75 L 57 75 L 52 88 L 48 88 Z" className="fill-transparent" />
          {/* Needle */}
          <motion.line 
            x1="50" y1="88" x2="50" y2="98" 
            strokeWidth="2" 
            animate={{ 
              y2: isHovering ? 105 : 98, // Needle pokes out more on hover
              stroke: isHovering ? "#ff3366" : "currentColor" // Needle turns red/accent on hover
            }}
            transition={{
              type: isHovering ? "spring" : "tween",
              bounce: 0.8,
              repeat: isHovering ? Infinity : 0,
              repeatType: "reverse",
              duration: 0.1 // Fast buzz when hovering
            }}
          />
        </svg>

        {/* Small dot exactly at the pointer tip (the needle) to help with precise clicking */}
        <motion.div 
          className="absolute rounded-full bg-white shadow-md z-10"
          animate={{
            width: isHovering ? "6px" : "4px",
            height: isHovering ? "6px" : "4px",
            opacity: isHovering ? 0 : 1, // Hide dot when buzzing to just show the needle
          }}
          style={{
            top: "98%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      </motion.div>
    </motion.div>
    </>
  );
}
