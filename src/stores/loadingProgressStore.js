import { create } from "zustand";

export const useloadingProgress = create((set) => ({
  progress: 0,
  setLoadingProgress: (val) => set((state) => ({progress: val})),
}));
