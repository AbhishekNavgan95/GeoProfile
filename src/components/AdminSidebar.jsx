import React, { useState } from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { MdMenu } from "react-icons/md";


const AdminSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className='absolute top-0 left-0 m-3 text-2xl' onClick={() => setOpen((prev) => !prev)}><MdMenu /></button>
            <section onClick={() => setOpen(false)} className={`w-full h-screen fixed ${!open ? 'invisible' : 'visible'}`}>
                <div onClick={(e) => e.stopPropagation()} className={`w-[300px] h-full bg-black-600 text-white-200 px-10 py-10 transition-translate duration-300 ${!open ? 'translate-x-[-300px]' : 'translate-x-0'}`}>
                    <div>
                        <h4 className='text-4xl font-bold text-green-600'>Welcome,</h4>
                        <p className='text-lg mt-2'>How are you doing today?</p>
                    </div>


                    <div className='grid place-items-start'>
                        <div className='flex flex-col items-start gap-5 my-10 text-lg font-white-50 font-semibold w-max'>
                            <button className='text-green-600 hover:text-green-700 flex gap-2 items-center'>
                                <MdOutlineSpaceDashboard />Dashboard
                            </button>
                            <button className=' flex gap-2 items-center hover:text-green-700'>
                                <MdOutlineLogout />Logout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminSidebar