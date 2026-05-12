// hooks/useCreateServerFlow.ts
import { useUIStore } from '../store/uiStore';
import { useCreateServer } from './useCreateServer';

interface CreateFullServerParams {
    chatClient: any;
    //   videoClient: StreamVideoClient;
    name: string;
    imageUrl: string;
    userIds: string[];
}

export function useCreateServerFlow() {
    const createServer = useCreateServer();
    const { setCallId } = useUIStore();

    // Aquí después agregaremos useCreateCall

    const createFullServer = async (params: CreateFullServerParams) => {
        const { chatClient, name, imageUrl, userIds } = params;

        // Paso 1: Crear servidor
        const newServer = await createServer.mutateAsync({
            client: chatClient,
            name,
            imageUrl,
            userIds,
        });

        // Paso 2: Crear call (opcional - después lo agregamos)
        // const callId = await createCall.mutateAsync({...});
        // setCallId(callId);

        return newServer;
    };

    return {
        createFullServer,
        isLoading: createServer.isPending,
        error: createServer.error,
    };
}