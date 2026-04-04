'use client';

import { LoadingIndicator } from 'stream-chat-react';
// import MyChat from '@/components/MyChat';
import { useStreamState } from '@/hooks/queries/use-stream-state';

export default function Home() {
  const { data: myState, isLoading, error, refetch } = useStreamState();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error('[Home] Error:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-red-500">Error loading chat. Please try again.</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!myState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please sign in to continue</p>
      </div>
    );
  }

  // return <MyChat {...myState} />;
  return <h1>hola</h1>
}