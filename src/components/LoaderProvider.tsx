"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import TattooLoader from "./TattooLoader";

interface LoaderContextType {
  isLoading: boolean;
  triggerLoader: (callback: () => void, duration?: number) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoader = (callback: () => void, duration: number = 1500) => {
    setIsLoading(true);
    
    // Execute callback exactly halfway through (when loader is fully opaque)
    setTimeout(() => {
      callback();
    }, duration / 2);

    // End loading screen after duration
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, triggerLoader }}>
      {children}
      <TattooLoader isVisible={isLoading} />
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
