'use client';

import { useQuery } from '@tanstack/react-query';
import { useClerk } from '@clerk/nextjs';
import { getStreamState, registerAndGetStreamState } from '@/services/stream.service';
import type { Homestate } from '@/types/stream.types';

export function useStreamState() {
    const { user: myUser } = useClerk();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['stream', 'state', myUser?.id],
        queryFn: async (): Promise<Homestate | null> => {
            if (!myUser?.id) {
                return null;
            }

            const userId = myUser.id;
            const email = myUser.primaryEmailAddress?.emailAddress || 'Unknown';
            const needsRegistration = !myUser?.publicMetadata?.streamRegistered;

            if (needsRegistration) {
                // console.log('[useStreamState] Registering user on Stream backend');
                return registerAndGetStreamState(userId, email);
            } else {
                // console.log('[useStreamState] User already registered:', userId);
                return getStreamState(userId, email);
            }
        },
        enabled: !!myUser?.id,
    });
    return { data, isLoading, error, refetch }
}