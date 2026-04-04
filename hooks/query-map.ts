import { STREAM_ENDPOINTS } from '@/services/endpoints';

export const ENDPOINT_RELATIONS = {
    [STREAM_ENDPOINTS.REGISTER_USER]: {
        hooks: ['useStreamState'],
        serviceFunctions: ['registerUser', 'registerAndGetStreamState'],
    },
    [STREAM_ENDPOINTS.GET_TOKEN]: {
        hooks: ['useStreamState'],
        serviceFunctions: ['getUserToken', 'getStreamState', 'registerAndGetStreamState'],
    },
} as const;

export function findHooksByEndpoint(endpoint: string): string[] {
    const relation = Object.entries(ENDPOINT_RELATIONS).find(
        ([key]) => key === endpoint
    );

    if (!relation) {
        console.warn(`No hooks found for endpoint: ${endpoint}`);
        return [];
    }

    const hookNames = relation[1].hooks;
    console.log(`Endpoint ${endpoint} → Hooks: ${hookNames.join(', ')}`);
    return [...hookNames];;
}

export function logAllRelations(): void {
    if (process.env.NODE_ENV === 'development') {
        console.group('Endpoint → Hook Relations');
        console.table(
            Object.entries(ENDPOINT_RELATIONS).map(([endpoint, data]) => ({
                Endpoint: endpoint,
                Hooks: data.hooks.join(', '),
            }))
        );
        console.groupEnd();
    }
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).__streamDebug = {
        findHooks: findHooksByEndpoint,
        showRelations: logAllRelations,
        endpoints: STREAM_ENDPOINTS,
        help: () => {
            console.log(`
Commands:
  __streamDebug.findHooks('/api/token')  - Find hooks for endpoint
  __streamDebug.showRelations()          - Show all relationships
  __streamDebug.endpoints                - Show all endpoints
      `);
        },
    };
    console.log('Stream Debug: window.__streamDebug');
}