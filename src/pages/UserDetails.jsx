import { getUser } from '@/config/Appwrite';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineEmail, MdOutlineLocationCity, MdPhone } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { FaArrowRight } from "react-icons/fa6";
import { useloadingStore } from '@/stores/loadingStore';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';

const UserDetails = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { loading, setLoading } = useloadingStore();
    const [readmore, setReadmore] = useState(false);

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

    if (loading) {
        return (
            <div className='h-screen grid place-items-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <section className='w-full h-auto md:min-h-screen bg-black-700 flex flex-col justify-start'>
            <Navbar style="w-full md:w-[800px] mx-auto text-white-200 my-5" />
            <div className='flex flex-col flex-1 items-center justify-center h-full'>
                <div className='border-4 border-white-500 bg-white-700 my-5 p-5 rounded-lg flex flex-col items-center gap-5 w-[350px] md:w-[400px] shadow-lg shadow-black-900'>
                    <img loading='lazy' src={user?.image} className='border-4 border-white-200 rounded-full overflow-hidden h-[150px] min-w-[150px] aspect-square' alt="" />
                    <span className='text-white-200 w-full'>
                        <h1 className='text-3xl font-semibold text-white-200 text-center'>{user?.name}</h1>

                        <hr className='w-full my-5 border border-white-500' />

                        <div className='my-2 flex flex-col items-start gap-2'>
                            <h2 className='text-sm flex items-center gap-2'><span className='text-green-500 font-semibold  text-lg'><MdOutlineEmail /></span>  {user?.email}</h2>
                            <h3 className='text-sm flex items-center gap-2'><span className='text-green-500 font-semibold  text-lg'><MdOutlineLocationCity /></span>  {user?.city}, {user?.state}</h3>
                            <h3 className='text-sm flex items-center gap-2'><span className='text-green-500 font-semibold  text-lg'><MdPhone /></span>  {user?.contact_no}</h3>
                        </div>

                        <hr className='w-full my-5 border border-white-500' />

                        <p className='flex items-start gap-1 my-4'><span className='font-semibold text-green-500'>Intrests:</span>  {user?.interests}.</p>

                        <hr className='w-full my-5 border border-white-500' />

                        <div className='flex flex-col items-start'>
                            <p className={`text-lg text-white-300 ${user?.description?.length > 100 ? readmore ? 'line-clamp-none' : 'line-clamp-6' : ''}`}>
                                {user?.description}
                            </p>
                            {user?.description?.length > 100 && (<button className='self-end mt-2 ' onClick={() => setReadmore((prev) => !prev)}>{!readmore ? 'show more' : 'show less'}</button>)}
                        </div>

                        <span className='flex items-center justify-between mt-4'>
                            <button onClick={() => navigate('/')} className='flex gap-1 hover:gap-3 transition-all duration-200' variant='secondary'> <FaArrowRight className='rotate-180' /></button>
                            <button onClick={() => navigate('map')} className='self-end text-green-500 font-semibold'>View on map</button>
                        </span>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default UserDetails