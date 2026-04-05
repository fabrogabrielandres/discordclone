// services/endpoint-relations.ts
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
        if (typeof window !== 'undefined') {
            console.warn(`No hooks found for endpoint: ${endpoint}`);
        }
        return [];
    }

    const hookNames = relation[1].hooks;
    if (typeof window !== 'undefined') {
        console.log(`Endpoint ${endpoint} → Hooks: ${hookNames.join(', ')}`);
    }
    return [...hookNames];
}

export function logAllRelations(): void {
    // Solo mostrar en desarrollo del lado del cliente
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.group('📊 Endpoint → Hook Relations');
        console.table(
            Object.entries(ENDPOINT_RELATIONS).map(([endpoint, data]) => ({
                Endpoint: endpoint,
                Hooks: data.hooks.join(', '),
                'Service Functions': data.serviceFunctions.join(', '),
            }))
        );
        console.groupEnd();
    }
}

// Detectar entorno de desarrollo de Next.js de manera segura
const isDevelopment = () => {
    if (typeof window === 'undefined') return false;

    // Next.js 16 expone esto
    if ((window as any).__NEXT_DATA__) {
        return (window as any).__NEXT_DATA__.buildId === 'development';
    }

    // Fallback: verificar por hostname común de desarrollo
    return window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
};

// Configurar debug tools SOLO en desarrollo y en cliente
if (typeof window !== 'undefined' && isDevelopment()) {
    (window as any).__streamDebug = {
        findHooks: findHooksByEndpoint,
        showRelations: logAllRelations,
        endpoints: STREAM_ENDPOINTS,
        relations: ENDPOINT_RELATIONS,
        help: () => {
            console.log(`
╔══════════════════════════════════════════════════════════╗
║              🛠️  Stream Debug Tools                     ║
╠══════════════════════════════════════════════════════════╣
║  Commands:                                               ║
║  📍 __streamDebug.endpoints            - Show all endpoints
║  🔗 __streamDebug.showRelations()      - Show endpoint-hook map
║  🔍 __streamDebug.findHooks('/path')   - Find hooks for endpoint
║  📚 __streamDebug.relations            - Show full relations object
║  ❓ __streamDebug.help()               - Show this help
╚══════════════════════════════════════════════════════════╝
            `);
        },
    };

    console.log('✅ Stream Debug Tools loaded! Type __streamDebug.help() to get started');
}