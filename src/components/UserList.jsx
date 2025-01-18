import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'

const UserList = ({ users, loading }) => {

    return (
        <>
            {
                loading && users.length <= 0
                    ? (
                        <div className='my-10 grid place-items-center'>Loading...</div>
                    )
                    : (!loading && users.length <= 0)
                        ? (
                            <div>No data found</div>
                        )
                        : (
                            <div className='flex flex-col gap-3 overflow-scroll h-full px-5 mt-3'>
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