import React from 'react'
import logo from '../assets/logo/logo.jpg'
import { RiAdminLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = ({ style }) => {
    return (
        <>
            {/* nav */}
            <nav className={`flex justify-between items-center px-5 min-w-[350px] ${style}`}>
                {/* logo */}
                <Link to={'/'}>
                    <span className='flex items-center justify-center gap-2'>
                        <img loading='lazy' className='max-w-[35px] rounded-full' src={logo} alt="" />
                        <h1 className='font-semibold text-4xl'>GeoProfile</h1>
                    </span>
                </Link>

                {/* Admin dashboard button */}
                <button onClick={() => console.log("redirect to admin dashboard")} className='text-2xl p-1'>
                    <RiAdminLine />
                </button>
            </nav>
        </>
    )
}

export default Navbar