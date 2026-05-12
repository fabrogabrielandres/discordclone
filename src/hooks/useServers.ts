// hooks/useServers.ts
import { useQuery } from '@tanstack/react-query';
import { StreamChat } from 'stream-chat';
import { DiscordServer } from '../store/types';

// Función para obtener servidores desde Stream
async function fetchServers(client: StreamChat): Promise<DiscordServer[]> {
  // Query channels para encontrar servidores
  const filters = {
    type: 'messaging',
    members: { $in: [client.userID as string] },
    'data.category': 'Text Channels', // Solo canales que son servidores
  };
  
  const channels = await client.queryChannels(filters);
  
  // Extraer servidores únicos de los canales
  const serversMap = new Map<string, DiscordServer>();
  
  channels.forEach((channel) => {
    const serverName = (channel.data as any)?.server;
    const serverImage = (channel.data as any)?.image;
    
    if (serverName && !serversMap.has(serverName)) {
      serversMap.set(serverName, {
        name: serverName,
        image: serverImage || '/default-server.png',
      });
    }
  });
  
  return Array.from(serversMap.values());
}

// Hook personalizado para usar servidores
export function useServers(client: StreamChat | null) {
  return useQuery({
    queryKey: ['servers', client?.userID],
    queryFn: () => fetchServers(client!),
    enabled: !!client, // Solo ejecutar si hay cliente
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}