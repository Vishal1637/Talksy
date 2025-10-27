import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Talksy-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Talksy-theme", theme);
    set({ theme });
  },
}));
