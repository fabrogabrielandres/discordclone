// hooks/useCreateChatClient.ts
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import type {
  OwnUserResponse,
  StreamChatOptions,
  TokenOrProvider,
  UserResponse,
} from 'stream-chat';
import { useChatStore } from '../store/chatStore';

export const useCreateChatClient = ({
  apiKey,
  options,
  tokenOrProvider,
  userData,
}: {
  apiKey: string;
  tokenOrProvider: TokenOrProvider;
  userData: OwnUserResponse | UserResponse;
  options?: StreamChatOptions;
}) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { setChatClient: setGlobalChatClient } = useChatStore();
  const [cachedUserData, setCachedUserData] = useState(userData);

  if (userData.id !== cachedUserData.id) {
    setCachedUserData(userData);
  }

  const [cachedOptions] = useState(options);

  useEffect(() => {
    const client = new StreamChat(apiKey, undefined, cachedOptions);
    let didUserConnectInterrupt = false;

    const connectionPromise = client
      .connectUser(cachedUserData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) {
          setChatClient(client);
          setGlobalChatClient(client); // Guardar en Zustand
        }
      });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      setGlobalChatClient(null); // Limpiar de Zustand
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log(`Connection for user "${cachedUserData.id}" has been closed`);
        });
    };
  }, [apiKey, cachedUserData, cachedOptions, tokenOrProvider, setGlobalChatClient]);

  return chatClient;
};