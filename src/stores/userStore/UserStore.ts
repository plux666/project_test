import { create } from 'zustand';
import type { UserStore, UserStoreData } from '@/stores/userStore/types.ts';

const useUserStore = create<UserStore>((set) => ({
  user: null,
  actions: {
    setUser: (userData: UserStoreData) => set({ user: userData }),
    clear: () => set({ user: null }),
  },
}));

export const useUserSelector = () => useUserStore((state) => state.user);

export const useUserActions = () => useUserStore((state) => state.actions);
