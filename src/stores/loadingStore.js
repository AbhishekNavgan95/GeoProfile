import { create } from "zustand";

export const useloadingStore = create((set) => ({
  loading: true,
  setLoading: (val) => set((state) => ({loading: val})),
}));
