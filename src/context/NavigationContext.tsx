import React, { createContext, useContext, useState } from "react";

export type Page =
  | "dashboard"
  | "timeline"
  | "wedding"
  | "autoedit"
  | "faceai"
  | "musicai"
  | "exports"
  | "settings";

interface NavigationContextType {
  page: Page;
  setPage: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <NavigationContext.Provider value={{ page, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }

  return context;
}
