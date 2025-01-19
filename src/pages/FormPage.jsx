import React from 'react'
import Banner from '../assets/banner.jpg'
import UserFormLayout from '@/components/UserFormLayout'

const FormPage = () => {
  return (
    <section className='relative grid grid-cols-3 text-white-200 min-h-screen'>
      <div className='w-full col-span-3 lg:col-span-2'>
        <UserFormLayout />
      </div>
      <div className='col-span-1 h-screen sticky top-0 hidden lg:block'> 
        <img src={Banner} alt="Banner" className='h-full object-cover' loading='lazy' />
      </div>
    </section>
  )
}

export default FormPage