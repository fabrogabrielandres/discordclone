import { DiscordServer } from '@/src/types/discordServer.types';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import CreateServerForm from './CreateServerForm';

const ServerList = () => {

    const serverList: DiscordServer[] = [
        {
            id: uuid(),
            name: "Server 1",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: uuid(),
            name: "Server 2",
            image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1572&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: uuid(),
            name: "Server 3",
            image: "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

    ]


    return (
        <div className='bg-dark-gray h-full flex flex-col items-center'>

            <div className='border-t-2 border-t-gray-300'>
                {serverList.map((server) => {
                    return (
                        <button
                            key={server.name}
                            className={`p-4 sidebar-icon 
                            `}
                        >
                            {server.image && checkIfUrl(server.image) ? (
                                <Image
                                    className='rounded-icon'
                                    src={server.image}
                                    width={50}
                                    height={50}
                                    alt='Server Icon'
                                />
                            ) : (
                                // <span className='rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm'>
                                <span className='rounded-icon bg-gray-600 w-12.5 flex items-center justify-center text-sm'>

                                    {server.name.charAt(0)}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
            <Link
                href={'/?createServer=true'}
                className='flex items-center justify-center rounded-icon bg-white text-green-500 hover:bg-green-500 hover:text-white hover:rounded-xl transition-all duration-200 p-2 my-2 text-2xl font-light h-12 w-12'
            >
                <span className='inline-block'>+</span>
            </Link>

            <CreateServerForm />

        </div>
    );

    function checkIfUrl(path: string): Boolean {
        try {
            const _ = new URL(path);
            return true;
        } catch (_) {
            return false;
        }
    }
};

export default ServerList;
