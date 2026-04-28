import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CloseMark } from '../Icons';
import UserRow from '../ChannelList/CreateChannelForm/UserRow';
import { UserObject } from '@/src/types/UserObject';


interface FormState {
  serverName: string;
  serverImage: string;
  users: UserObject[];
}

const CreateServerForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const showCreateServerForm = params.get('createServer');
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue
  } = useForm<FormState>({
    defaultValues: {
      serverName: '',
      serverImage: '',
      users: []
    }
  });

  // Controlar apertura/cierre del dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (showCreateServerForm === 'true') {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [showCreateServerForm]);

  // Limpiar URL cuando se cierra el dialog (usando onClose en el elemento)
  const handleClose = () => {
    if (showCreateServerForm === 'true') {
      router.replace('/');
      reset();
    }
  };

  const serverName = watch('serverName');
  const serverImage = watch('serverImage');
  const selectedUsers = watch('users');
  const isButtonDisabled = !serverName || !serverImage || selectedUsers.length <= 1 || isSubmitting;

  const onSubmit = async (data: FormState) => {
    try {
      console.log('Form data:', data);
      
      // Aquí va tu lógica para crear el servidor
      
      // Limpiar y cerrar
      router.replace('/');
      reset();
    } catch (error) {
      console.error('Error creating server:', error);
    }
  };

  const handleUserChange = (user: UserObject, checked: boolean) => {
    const currentUsers = selectedUsers;
    if (checked) {
      setValue('users', [...currentUsers, user], { shouldValidate: true });
    } else {
      setValue('users', currentUsers.filter((u) => u.id !== user.id), { shouldValidate: true });
    }
  };

  const mockUsers: UserObject[] = [
    { id: '1', name: 'Juan Pérez', image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastOnline: '2024-01-15T10:00:00Z' },
    { id: '2', name: 'María García', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastOnline: '2024-01-14T15:30:00Z' },
    { id: '3', name: 'Carlos López', image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastOnline: '2024-01-13T09:15:00Z' },
    { id: '4', name: 'Ana Martínez', image: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastOnline: '2024-01-12T18:45:00Z' },
    { id: '5', name: 'Pedro Sánchez', image: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastOnline: '2024-01-11T12:00:00Z' },
  ];

  return (
    <dialog
      className='fixed inset-0 z-10 rounded-xl backdrop:bg-black/50 m-auto p-0 w-full max-w-md'
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className='w-full flex items-center justify-between py-8 px-6'>
        <h2 className='text-3xl font-semibold text-gray-600'>
          Create new server
        </h2>
        <Link href='/'>
          <CloseMark className='w-10 h-10 text-gray-400 hover:text-gray-600 cursor-pointer' />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 px-6'>
        <label className='labelTitle' htmlFor='serverName'>
          Server Name
        </label>
        <div className='flex items-center bg-gray-100 rounded'>
          <span className='text-2xl p-2 text-gray-500'>#</span>
          <input
            type='text'
            id='serverName'
            {...register('serverName', {
              required: 'Server name is required',
              minLength: {
                value: 3,
                message: 'Server name must be at least 3 characters'
              }
            })}
            className='flex-1 p-2 bg-gray-100 outline-none rounded-r'
            placeholder='Enter server name'
          />
        </div>
        {errors.serverName && (
          <p className='text-red-500 text-sm mt-1'>{errors.serverName.message}</p>
        )}

        <label className='labelTitle' htmlFor='serverImage'>
          Image URL
        </label>
        <div className='flex items-center bg-gray-100 rounded'>
          <span className='text-2xl p-2 text-gray-500'>#</span>
          <input
            type='text'
            id='serverImage'
            {...register('serverImage', {
              required: 'Image URL is required',
              pattern: {
                value: /^(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?(?:#.*)?$/i,
                message: 'Please enter a valid image URL (jpg, jpeg, png, gif, svg, webp)'
              }
            })}
            className='flex-1 p-2 bg-gray-100 outline-none rounded-r'
            placeholder='https://example.com/image.jpg'
          />
        </div>
        {errors.serverImage && (
          <p className='text-red-500 text-sm mt-1'>{errors.serverImage.message}</p>
        )}

        <h2 className='mb-2 labelTitle'>Add Users</h2>
        <div className='max-h-64 overflow-y-scroll border rounded p-2'>
          {mockUsers.map((user) => (
            <UserRow
              user={user}
              key={user.id}
              userChanged={handleUserChange}
            />
          ))}
        </div>
        {selectedUsers.length <= 1 && selectedUsers.length > 0 && (
          <p className='text-red-500 text-sm mt-1'>You must select at least 2 users</p>
        )}

        <div className='flex space-x-6 items-center justify-end p-6 bg-gray-200 -mx-6 -mb-2 mt-2 rounded-b-xl'>
          <Link
            href='/'
            className='font-semibold text-gray-500 hover:text-gray-700'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isButtonDisabled}
            className={`bg-[#5865F2] rounded py-2 px-4 text-white font-bold uppercase transition-colors ${isButtonDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#4752C4]'
              }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Server'}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default CreateServerForm;