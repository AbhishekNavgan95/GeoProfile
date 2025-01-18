import React from 'react'
import { Button } from './ui/button'
import { useCurrentUser } from '@/stores/currentUserStore';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const ProfileCard = ({ user }) => {

    const { setCurrentUser, currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const getWindowWidth = () => {
        const windowWidth = window.innerWidth;
        return windowWidth
    }

    const handleCurrentUserChange = () => {
        if (getWindowWidth() < 800) {
            navigate(`/user/${user?.$id}/map`)
        }
        setCurrentUser(user)
    }

    return (
        <div className={`py-2 rounded-lg px-3 cursor-pointer flex justify-between gap-1 items-center min-w-[300px] ${currentUser?.$id === user?.$id ? "bg-white-800" : ""}`}>
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
                <Button onClick={handleCurrentUserChange} className='flex gap-1 hover:gap-3 transition-all duration-200' size='sm'>Summary <IoIosArrowForward /></Button>
            </span>
        </div>
    )
}

export default ProfileCard