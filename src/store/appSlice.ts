import { persist } from "zustand/middleware";

export interface AppSlice {
  language: string;
  setLanguage: (lang: string) => void;
}

export const createAppSlice = persist<AppSlice>(
  (set) => ({
    language: "en",
    setLanguage: (lang) => set({ language: lang }),
  }),
  {
    name: "app-zustand",
    partialize: (state) => ({ language: state.language } as AppSlice),
  }
);
