/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";

interface ListContextType {
  savedProfiles: string[];
  toggleProfile: (username: string) => void;
  isSaved: (username: string) => boolean;
}

export const ListContext = createContext<ListContextType | undefined>(undefined);

export function ListProvider({ children }: { children: ReactNode }) {
  const [savedProfiles, setSavedProfiles] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("saved_profiles");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleProfile = useCallback((username: string) => {
    setSavedProfiles((prev) => {
      const next = prev.includes(username)
        ? prev.filter((p) => p !== username)
        : [...prev, username];
      localStorage.setItem("saved_profiles", JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((username: string) => savedProfiles.includes(username), [savedProfiles]);

  const value = useMemo(() => ({ savedProfiles, toggleProfile, isSaved }), [savedProfiles, toggleProfile, isSaved]);

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
}


