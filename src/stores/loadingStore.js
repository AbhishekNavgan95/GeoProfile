import { create } from "zustand";

export const useloadingStore = create((set) => ({
  loading: false,
  setLoading: (val) => set((state) => ({loading: val})),
}));
