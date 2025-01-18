import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo.jpg'
import { RiAdminLine } from "react-icons/ri";
import { Input } from './ui/input';
import UserList from './UserList';
import { getUsers } from '@/config/Appwrite';
import { useUserStore } from '@/stores/userStore';
import { useloadingStore } from '@/stores/loadingStore';


const Sidebar = () => {

  const { users } = useUserStore()
  const { loading } = useloadingStore();

  return (
    <section className='h-screen text-white-300 py-5'>

      {/* nav */}
      <nav className=' flex justify-between items-center px-5 '>
        {/* logo */}
        <span className='flex items-center justify-center gap-2'>
          <img className='max-w-[25px] rounded-full' src={logo} alt="" />
          <h1 className='font-semibold'>GeoProfile</h1>
        </span>

        {/* Admin dashboard button */}
        <button onClick={() => console.log("redirect to admin dashboard")} className='text-lg'>
          <RiAdminLine />
        </button>
      </nav>

      {/* search */}
      <div className=' mt-5 px-5 '>
        <Input type="email" className='border-0 outline-none' placeholder="Search" />
      </div>

      {/* filters */}
      <div className=' mt-3 px-5 '>
        filters
      </div>

      {/* User listing */}
      <UserList loading={loading} users={users} />
    </section>
  )
}

export default Sidebar