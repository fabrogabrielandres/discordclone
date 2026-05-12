// store/selectors.ts - Actualizado para Zustand UI
import { useUIStore } from './uiStore';

// Selectors UI
export const useCurrentServer = () => useUIStore((state) => state.currentServer);
export const useCallId = () => useUIStore((state) => state.callId);
export const useIsSidebarOpen = () => useUIStore((state) => state.isSidebarOpen);
export const useSelectedChannelId = () => useUIStore((state) => state.selectedChannelId);
export const useUILoading = () => useUIStore((state) => state.isLoading);
export const useUIError = () => useUIStore((state) => state.error);

// Actions UI
export const useUIActions = () => {
  const setCurrentServer = useUIStore((state) => state.setCurrentServer);
  const setCallId = useUIStore((state) => state.setCallId);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setSelectedChannelId = useUIStore((state) => state.setSelectedChannelId);
  const clearError = useUIStore((state) => state.clearError);
  
  return {
    setCurrentServer,
    setCallId,
    toggleSidebar,
    setSelectedChannelId,
    clearError,
  };
};