import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DiscordState {
  [key: string]: any;
}

const useDiscordStore = create<DiscordState>()(
  devtools(
    () => ({}),
    { name: 'DiscordStore' }
  )
);

export default useDiscordStore;