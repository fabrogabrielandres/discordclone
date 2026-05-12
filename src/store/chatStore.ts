// store/chatStore.ts
import { create } from 'zustand';
import { StreamChat } from 'stream-chat';

interface ChatStore {
  chatClient: StreamChat | null;
  setChatClient: (client: StreamChat | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatClient: null,
  setChatClient: (client) => set({ chatClient: client }),
}));