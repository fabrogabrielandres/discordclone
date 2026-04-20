'use client';
import '../lib/query-map'
import { LoadingIndicator } from 'stream-chat-react';
import { useStreamState } from '@/hooks/queries/use-stream-state';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import MyChat from '@/Components/MyChat/MyChat';


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
        <>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
        </>
      </div>
    );
  }

  return <MyChat {...myState} />;
  
}