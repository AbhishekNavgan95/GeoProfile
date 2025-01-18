import { getUser } from '@/config/Appwrite';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineEmail, MdOutlineLocationCity, MdPhone } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { FaArrowRight } from "react-icons/fa6";
import { useloadingStore } from '@/stores/loadingStore';
import Spinner from '@/components/Spinner';

const UserDetails = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const {loading, setLoading} = useloadingStore();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            const response = await getUser(id);
            setUser(response)
            setLoading(false)
        }

        if (id) {
            fetchUser();
        }
    }, [id])

    if(loading) {
        return (
            <div className='h-screen grid place-items-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <section className='relative w-full h-screen bg-black-700 grid place-items-center'>
            <Button onClick={() => navigate('/')} className='absolute top-0 left-0 m-4 flex gap-1 hover:gap-3 transition-all duration-200' variant='secondary'> <FaArrowRight className='rotate-180' /> Home</Button>

            <div className='bg-white-700 p-5 rounded-lg flex justify-center items-start gap-5 max-w-[700px] shadow-lg shadow-black-900'>
                <img loading='lazy' src={user?.image} className='border-2 border-white-200 rounded-full overflow-hidden h-[200px] min-w-[200px] aspect-square' alt="" />
                <span className='text-white-200'>

                    <h1 className='text-4xl font-bold text-white-200'>{user?.name}</h1>

                    <div className='my-2'>
                        <h2 className='mt-1 text-sm flex items-center gap-2'><MdOutlineEmail />  {user?.email}</h2>
                        <h3 className='mt-1 text-sm flex items-center gap-2'><MdOutlineLocationCity />  {user?.city}, {user?.state}</h3>
                        <h3 className='mt-1 text-sm flex items-center gap-2'><MdPhone />  {user?.contact_no}</h3>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 my-4'><span className='font-semibold'>Intrests:</span>  {user?.interests}</p>
                        <p className='text-lg text-white-300'>
                            {user?.description}
                        </p>
                    </div>

                    <Button onClick={() => navigate('map')} className='mt-4 flex gap-1 hover:gap-3 transition-all duration-200'>View on map <FaArrowRight /></Button>
                </span>
            </div>
        </section>
    )
}

export default UserDetails