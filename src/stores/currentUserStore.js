import { create } from "zustand";

export const useCurrentUser = create((set) => ({
  currentUser: {
    lat: 15.3173,
    lng: 75.7139,
  },
  setCurrentUser: (currentUser) => set((state) => ({ currentUser })),
}));
