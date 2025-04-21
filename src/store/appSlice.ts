import { Theme } from "@/context/ThemeProvider";
import { persist } from "zustand/middleware";

export interface AppSlice {
  language: string;
  setLanguage: (lang: string) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const createAppSlice = persist<AppSlice>(
  (set) => ({
    language: "ko",
    setLanguage: (lang) => set({ language: lang }),

    theme: "light",
    setTheme: (theme) => set({ theme }),
  }),
  {
    name: "app-zustand",
    partialize: (state) => ({ language: state.language } as AppSlice),
  }
);
