// store/uiStore.ts - SOLO estado de UI
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DiscordServer } from './types';

interface UIStore {
  // UI State (lo que el usuario está haciendo)
  currentServer: DiscordServer | undefined;
  callId: string | undefined;
  isSidebarOpen: boolean;
  selectedChannelId: string | undefined;
  
  // UI Actions (acciones que solo afectan la UI)
  setCurrentServer: (server: DiscordServer | undefined) => void;
  setCallId: (callId: string | undefined) => void;
  toggleSidebar: () => void;
  setSelectedChannelId: (channelId: string | undefined) => void;
  
  // Loading y error SOLO para UI (no para datos)
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // Estado inicial UI
      currentServer: undefined,
      callId: undefined,
      isSidebarOpen: true,
      selectedChannelId: undefined,
      isLoading: false,
      error: null,

      // Acciones UI
      setCurrentServer: (server) => set({ currentServer: server }),
      
      setCallId: (callId) => set({ callId }),
      
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      setSelectedChannelId: (channelId) => set({ selectedChannelId: channelId }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    { name: 'UIStore' }
  )
);