import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import { useCurrentUser } from '@/stores/currentUserStore';
import { getUsers } from '@/config/Appwrite';
import { useSearchParams } from 'react-router-dom';
import { useloadingStore } from '@/stores/loadingStore';
import { useUserStore } from '@/stores/userStore';

const UserList = () => {

    const { users , setUsers: setStoreUsers } = useUserStore();
    const { setCurrentUser, currentUser } = useCurrentUser();
    const { loading, setLoading } = useloadingStore();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const response = await getUsers({ query: searchParams.get('slug'), city: searchParams.get('city'), sort: searchParams.get('sort') });
            setStoreUsers(response?.documents)

            if (response?.documents?.length > 0) {
                setCurrentUser(response?.documents[0])
            }

            setLoading(false) 
        }

        fetchUsers();
    }, [searchParams.get('sort'), searchParams.get('city'), searchParams.get('slug')])

    return (
        <>
            {
                loading && users.length <= 0
                    ? (
                        <div className='my-24 grid place-items-center'>Loading...</div>
                    )
                    : (!loading && users.length <= 0)
                        ? (
                            <div className='mt-24 grid place-items-center'>No data found</div>
                        )
                        : (
                            <div className='flex flex-col overflow-auto h-full mt-3 px-5'>
                                {
                                    users.map((user) => (
                                        <ProfileCard key={user?.$id} user={user} />
                                    ))
                                }
                            </div>
                        )
            }
        </>
    )
}

export default UserList