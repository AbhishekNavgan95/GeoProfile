import { getUsers } from '@/config/Appwrite'
import { useloadingProgress } from '@/stores/loadingProgressStore'
import { useloadingStore } from '@/stores/loadingStore'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import { Button } from './ui/button'
import DataTable from '../components/DataTable'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cities } from '@/data/staticData'

const AdminDataTable = () => {

    const [users, setUsers] = useState([])
    const { loading, setLoading } = useloadingStore();
    const { progress, setLoadingProgress } = useloadingProgress();
    const [filters, setFilters] = useState({ sort: 'asc' });

    console.log("filters: ", filters)

    useEffect(() => {

        const fetchUsers = async () => {
            setLoading(true)
            setLoadingProgress(40)
            const response = await getUsers(filters);
            if (response?.documents) {
                setUsers(response?.documents)
            }
            setLoading(false)
            setLoadingProgress(100)
        }

        fetchUsers()

    }, [filters])

    return (
        <div className='p-3 md:p-10 w-full h-full'>
            <div className='my-10'>
                <p className='text-green-500 mb-1'>Welcome Back!</p>
                <h2 className='text-4xl font-semibold  text-center md:text-start'>
                    User Management
                </h2>
                <p className='text-lg  mt-2 font-light text-center md:text-start'>
                    Effortlessly create, update, or remove users.
                </p>
            </div>

            <div className=' w-full flex-1 flex flex-col gap-3'>

                {
                    JSON.stringify(filters) !== JSON.stringify({ sort: 'asc' }) && (
                        <button onClick={() => setFilters({ sort: 'asc' })} className='text-xs md:text-sm text-red-400 self-end'>clear</button>
                    )
                }

                <div className=' flex flex-col md:flex-row justify-end gap-3'>
                    <div className=' flex justify-end gap-3'>
                        <Select value={filters?.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="City" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    cities.map((city, i) => (
                                        <SelectItem key={city + i} value={city}>{city}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        <Select value={filters?.sort} onValueChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='asc'>Ascending</SelectItem>
                                <SelectItem value='dsc'>Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className=''>Add a new user</Button>

                </div>
                {
                    loading ? (
                        <div className='flex w-full items-center justify-center min-h-[700px]'>
                            <Spinner />
                        </div>
                    ) : users.length <= 0 && !loading ? (
                        <div className='flex w-full items-center justify-center min-h-[700px]'>
                            <p>No data found...</p>
                        </div>
                    ) : (<DataTable users={users} />)
                }
            </div>
            <div className='flex flex-col items-end'>
                <Button variant='destructive' className='mt-4'>Logout</Button>
            </div>
        </div >
    )
}


export default AdminDataTable