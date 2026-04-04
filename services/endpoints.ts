import { API_CONFIG } from '@/lib/constants';

const API = API_CONFIG.BASE_URL;

export const STREAM_ENDPOINTS = {
  REGISTER_USER: `${API}/register-user`,
  GET_TOKEN: `${API}/token`,
} as const;