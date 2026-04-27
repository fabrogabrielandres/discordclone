
import { useCreateChatClient } from '@/src/hooks/useCreateChatClient';
import { User } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import ServerList from '../ServerList/ServerList';

export default function MyChat({
  apiKey,
  user,
  token,
}: {
  apiKey: string;
  user: User;
  token: string;
}) {
  const chatClient = useCreateChatClient({
    apiKey,
    userData: user,
    tokenOrProvider: token,
  });


  if (!chatClient) {
    return <div>Error, please try again later.</div>;
  }

  return (
    <Chat client={chatClient} theme='str-chat__theme-light'>
      <section className='flex h-screen w-screen layout'>
        <ServerList />

        {/* <div className='bg-green-500 w-72'></div> */}
        {/* <div className='bg-red-500'></div> */}
        <ChannelList  />
        <Channel>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </section>
    </Chat>
  );
}
