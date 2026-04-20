import { User } from 'stream-chat';

export type Homestate = {
  apiKey: string;
  user: User;
  token: string;
};

export type DiscordServer = {
  name: string;
  image: string | undefined;
};

export interface RegisterUserRequest {
  userId: string;
  email: string;
}

export interface RegisterUserResponse {
  success?: boolean;
  message?: string;
  streamRegistered?: boolean;
}

export interface TokenRequest {
  userId: string;
}

export interface TokenResponse {
  token: string;
}