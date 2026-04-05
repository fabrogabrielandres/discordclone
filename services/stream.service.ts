import { STREAM_ENDPOINTS } from './endpoints';
import { httpClient } from '@/lib/http-client';
import { STREAM_CONFIG } from '@/lib/constants';
import type {
    RegisterUserRequest,
    RegisterUserResponse,
    TokenRequest,
    TokenResponse,
    Homestate,
} from '@/types/stream.types';
import type { User } from 'stream-chat';

function createStreamUser(userId: string, userName: string): User {
    return {
        id: userId,
        name: userName,
        image: `${STREAM_CONFIG.IMAGE_PLACEHOLDER}?id=${userId}&name=${userName}`,
    };
}

export async function registerUser(
    userId: string,
    email: string
): Promise<RegisterUserResponse> {
    const request: RegisterUserRequest = { userId, email };
    console.log('[StreamService] Registering user:', userId);

    const response = await httpClient.post<RegisterUserResponse>(
        STREAM_ENDPOINTS.REGISTER_USER,
        request
    );

    console.log('[StreamService] User registered:', response);
    return response;
}

export async function getUserToken(userId: string): Promise<string> {
    const request: TokenRequest = { userId };
    console.log('[StreamService] Getting token for user:', userId);

    const response = await httpClient.post<TokenResponse>(
        STREAM_ENDPOINTS.GET_TOKEN,
        request
    );

    if (!response.token) {
        throw new Error('No token received from server');
    }

    console.log('[StreamService] Token retrieved');
    return response.token;
}

export async function getStreamState(
    userId: string,
    email: string
): Promise<Homestate> {
    const token = await getUserToken(userId);
    const user = createStreamUser(userId, email);

    return {
        apiKey: STREAM_CONFIG.API_KEY!,
        user,
        token,
    };
}

export async function registerAndGetStreamState(
    userId: string,
    email: string
): Promise<Homestate> {
    await registerUser(userId, email);
    return getStreamState(userId, email);
}