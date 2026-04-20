export const API_CONFIG = {
  BASE_URL: '/api',
} as const;

export const STREAM_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
  IMAGE_PLACEHOLDER: 'https://getstream.io/random_png/',
} as const;

export const HTTP_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
  },
} as const;

export const QUERY_KEYS = {
  STREAM: {
    STATE: (userId: string) => ['stream', 'state', userId] as const,
  },
} as const;

