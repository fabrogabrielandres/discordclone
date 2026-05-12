// hooks/useCreateServer.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import { CreateServerParams, DiscordServer } from '../store/types';
import { useUIStore } from '../store/uiStore';

async function createServerAPI(params: CreateServerParams): Promise<DiscordServer> {
    const { client, name, imageUrl, userIds } = params;

    // Crear canal de bienvenida
    const channelConfig = {
        name: 'Welcome',
        members: userIds,
        data: {
            image: imageUrl,
            server: name,
            category: 'Text Channels',
        }
    };

    const messagingChannel = client.channel('messaging', uuid(), {
        ...channelConfig
    });

    await messagingChannel.create();
    console.log('[API] Server created:', name);

    return { name, image: imageUrl };
}

export function useCreateServer() {
    const queryClient = useQueryClient();
    const { setCurrentServer, setLoading, setError } = useUIStore();

    return useMutation({
        mutationFn: createServerAPI,

        onMutate: () => {
            // Antes de crear, indicamos loading en UI
            setLoading(true);
        },

        onSuccess: (newServer) => {
            // Cuando se crea exitosamente:

            // 1. Invalidar cache de servidores para recargar
            queryClient.invalidateQueries({ queryKey: ['servers'] });

            // 2. Actualizar UI store con el nuevo servidor
            setCurrentServer(newServer);

            // 3. Limpiar loading
            setLoading(false);
        },

        onError: (error: Error) => {
            // Si hay error, mostrarlo en UI
            setError(error.message);
            setLoading(false);
        },
    });
}