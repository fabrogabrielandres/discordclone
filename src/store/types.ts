// store/types.ts
import { StreamChat } from 'stream-chat';

export interface DiscordServer {
  name: string;
  image: string;
}

// Solo para props de funciones (no para stores)
export interface CreateServerParams {
  client: StreamChat;
  name: string;
  imageUrl: string;
  userIds: string[];
}

export interface CreateCallParams {
  videoClient: any; // StreamVideoClient
  server: DiscordServer;
  channelName: string;
  userIds: string[];
}

export interface CreateChannelParams {
  client: StreamChat;
  name: string;
  category: string;
  userIds: string[];
  serverName: string;
}