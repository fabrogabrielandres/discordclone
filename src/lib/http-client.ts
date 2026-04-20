import { HTTP_HEADERS } from '@/src/lib/constants';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
    method: HttpMethod;
    headers?: HeadersInit;
    body?: string;
}

async function fetchRequest<T>(
    endpoint: string,
    method: HttpMethod,
    body?: unknown
): Promise<T> {
    const options: FetchOptions = {
        method,
        headers: HTTP_HEADERS.JSON,
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, options);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    // Para DELETE, puede no haber contenido
    if (method === 'DELETE' && response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const httpClient = {
    get: <T>(endpoint: string) => fetchRequest<T>(endpoint, 'GET'),

    post: <T>(endpoint: string, body: unknown) =>
        fetchRequest<T>(endpoint, 'POST', body),

    put: <T>(endpoint: string, body: unknown) =>
        fetchRequest<T>(endpoint, 'PUT', body),

    delete: <T>(endpoint: string) => fetchRequest<T>(endpoint, 'DELETE'),
};