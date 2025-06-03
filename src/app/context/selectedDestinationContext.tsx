// context/DestinationContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Destination {
  name: string;
  coord: {
    lat: number;
    lng: number;
  };
}

type DestinationContextType = {
  selectedDestination: Destination | null;
  setSelectedDestination: (destination: Destination | null) => void;
};

const DestinationContext = createContext<DestinationContextType | undefined>(
  undefined
);

export const DestinationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  return (
    <DestinationContext.Provider
      value={{ selectedDestination, setSelectedDestination }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = (): DestinationContextType => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error("useDestination must be used within a DestinationProvider");
  }
  return context;
};
