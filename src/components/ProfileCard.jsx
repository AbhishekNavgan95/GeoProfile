import React from 'react'
import { Button } from './ui/button'
import { useSearchParams } from 'react-router-dom'

const ProfileCard = ({ user }) => {

    const [searchParams, setSearchParms] = useSearchParams();
    const handleOnSelectChange = () => {
        setSearchParms({ lat: user?.lat, lng: user?.lng })
    }

    return (
        <div className='cursor-pointer flex justify-between items-center'>
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
                <Button onClick={handleOnSelectChange} className='' size='sm'>Summary</Button>
            </span>
        </div >
    )
}

export default ProfileCard