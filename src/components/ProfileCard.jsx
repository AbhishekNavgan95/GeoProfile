import React from 'react'
import { Button } from './ui/button'
import { useCurrentUser } from '@/stores/currentUserStore';

const ProfileCard = ({ user }) => {

    const { setCurrentUser, currentUser } = useCurrentUser();

    return (
        <div className={`py-2 rounded-lg px-3 cursor-pointer flex justify-between items-center min-w-[300px] ${currentUser?.$id === user?.$id ? "bg-white-800" : ""}`}>
            <span className='flex gap-3'>
                <img loading='lazy' className='rounded-full aspect-square object-cover border-2 border-white-200 h-12 w-12' src={user?.image} alt="" />
                <span>
                    <h2 className='font-semibold'>
                        {user?.name}
                    </h2>
                    <p className='line-clamp-1 text-sm text-white-500'>{user?.description}</p>
                </span>
            </span>
            <span>
                <Button onClick={() => setCurrentUser(user)} className='' size='sm'>Summary</Button>
            </span>
        </div>
    )
}

export default ProfileCard