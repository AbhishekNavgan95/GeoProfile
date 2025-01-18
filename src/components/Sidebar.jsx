import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo.jpg'
import { RiAdminLine } from "react-icons/ri";
import { Input } from './ui/input';
import UserList from './UserList';
import { useUserStore } from '@/stores/userStore';
import { useloadingStore } from '@/stores/loadingStore';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cities } from '@/data/staticData';

const Sidebar = () => {

  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams({
    sort: 'asc'
  });

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams)

    params.delete('slug')
    params.delete('city')
    params.set('sort', 'asc')

    setSearchParams(params)
    setText('')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => clearTimeout(timeout);
  }, [text]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedText.trim()) {
      params.set('slug', debouncedText);
    } else {
      params.delete('slug');
    }

    setSearchParams(params);
  }, [debouncedText]);

  return (
    <section className='h-screen text-white-300 py-5 flex flex-col '>

      {/* nav */}
      <nav className='flex justify-between items-center px-5  min-w-[350px]'>
        {/* logo */}
        <span className='flex items-center justify-center gap-2'>
          <img loading='lazy' className='max-w-[35px] rounded-full' src={logo} alt="" />
          <h1 className='font-semibold text-4xl'>GeoProfile</h1>
        </span>

        {/* Admin dashboard button */}
        <button onClick={() => console.log("redirect to admin dashboard")} className='text-2xl p-1'>
          <RiAdminLine />
        </button>
      </nav>

      {/* search */}
      <div className=' mt-3 px-5 min-w-[350px] flex flex-col'>
        <button onClick={handleClearFilters} className='self-end mb-2 text-xs text-green-500'>Clear</button>
        <span className='flex gap-2 rounded-lg overflow-hidden items-center bg-black-600 pr-4 focus-within:border-white-400 border border-transparent'>
          <Input value={text} onChange={(e) => setText(e.target.value)} type="text" className='border-0 w-full outline-none' placeholder="Search" />
          <FaSearch className='md:text-lg' />
        </span>
      </div>

      {/* filters */}
      <div className=' mt-3 px-5 flex gap-3'>

        {/* cities */}
        <main>
          <Select
            value={searchParams.get('city') || ''}
            onValueChange={(city) => {
              const params = new URLSearchParams(searchParams)
              params.set('city', city)
              setSearchParams(params)
            }}>
            <SelectTrigger className="w-[120px] border-none text-white-50 bg-green-700 h-7">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className='bg-black-700 text-white-200 border-black-500'>
              <SelectGroup>
                {
                  cities.map((city, i) => (
                    <SelectItem key={city + i} value={city} >{city}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </main>

        {/* sorting */}
        <span>
          <Select
            value={searchParams.get('sort')}
            onValueChange={(sort) => {
              const params = new URLSearchParams(searchParams)
              params.set('sort', sort)
              setSearchParams(params)
            }}>
            <SelectTrigger className="w-[120px] border-none text-white-50 bg-green-700 h-7">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className='bg-black-700 text-white-200 border-black-500'>
              <SelectGroup>
                <SelectItem value='asc' >Ascending</SelectItem>
                <SelectItem value='dsc' >Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>

      </div>

      {/* User listing */}
      <UserList />
    </section>
  )
}

export default Sidebar