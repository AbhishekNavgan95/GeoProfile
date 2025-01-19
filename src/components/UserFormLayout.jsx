import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Checkbox } from "@/components/ui/checkbox"
import { getUsers } from '@/config/Appwrite';
import { useloadingProgress } from '@/stores/loadingProgressStore';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import UserForm from './form/UserForm';
import { useNavigate } from 'react-router-dom';

const UserFormLayout = () => {

    const [updateUser, setUpdateUser] = useState(false);
    const [users, setUsers] = useState([]);
    const { setLoadingProgress } = useloadingProgress();
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingProgress(40);
            const response = await getUsers();
            if (response?.documents) [
                setUsers(response.documents)
            ]
            setLoadingProgress(100);
        }

        fetchUsers();
    }, [])

    return (
        <div className='py-10 md:py-24 p-3 md:px-10 w-full lg:w-[85%] mx-auto h-full bg-black-700'>

            <div>
                <button onClick={() => navigate(-1)} className=' flex items-center justify-start w-full gap-3 mb-3 text-green-600 hover:gap-5 transition-gap duration-300'>
                    <FaArrowLeft /> Back
                </button>
                <h2 className='text-4xl font-semibold'>Create/Update User</h2>
            </div>

            <div className='my-10'>
                <div className="flex gap-3 items-center">
                    <Checkbox checked={updateUser} onCheckedChange={() => {
                        setUpdateUser(prev => !prev);
                        setSelectedUser(null);
                    }} id="terms1" className='border-white-200' />
                    <label
                        htmlFor="terms1"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Update an existing user?
                    </label>
                </div>

                {
                    updateUser && (
                        users?.length > 0 ? (
                            <div className='mt-8'>
                                <Select onValueChange={(value) => {
                                    setSelectedUser(value);
                                }} >
                                    <SelectTrigger className="w-full border-white-600 text-white-400">
                                        <SelectValue placeholder="Select a user" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-black-600 text-white-200 border-white-600'>
                                        {
                                            users.map((user) => (
                                                <SelectItem key={user.$id} value={user.$id}>{user.name}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <p className='text-red-600 mt-2'>No users found</p>
                        )
                    )
                }

                <div className='mt-8'>
                    <UserForm selectedUser={users.filter((user) => user?.$id === selectedUser)[0]} />
                </div>

            </div>
        </div >
    )
}

export default UserFormLayout