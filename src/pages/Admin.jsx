import AdminDashboard from '@/components/AdminDashboard'
import AdminSidebar from '@/components/AdminSidebar'
import React from 'react'

const Admin = () => {
  return (
    <section className='relative text-white-200 min-h-screen w-full flex bg-black-700  gap-5'>
      <AdminDashboard />
    </section>
  )
}

export default Admin