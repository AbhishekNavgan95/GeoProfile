import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo.jpg'
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from './ui/button';

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
                <Dialog />
            </nav>
        </>
    )
}

const Dialog = () => {
    const [value, setValue] = useState('');
    const [isKeyValid, setIsKeyValid] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedKey = localStorage.getItem('securityKey') || '';
        const passkey = import.meta.env.VITE_PASSKEY;

        if (storedKey === passkey) {
            setIsKeyValid(true);
            // navigate('/admin')
        }
    }, []);

    const handleContinue = () => {
        const passkey = import.meta.env.VITE_PASSKEY;
        if (value === passkey) {
            localStorage.setItem('securityKey', value);
            navigate('/admin');
        } else {
            setError('Invalid Passkey')
        }
    };

    if (isKeyValid) return (
        <>
            <button onClick={() => navigate('/admin')} className='text-xl'>
                <RiAdminLine />
            </button>
        </>
    );

    return (
        <AlertDialog>
            <AlertDialogTrigger className='text-xl'>
                <RiAdminLine />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Please enter security pin.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Try '123456', might work if you are lucky today.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-1 items-center justify-center">
                    {
                        error && <p className='text-xs text-red-800'>Invalid Passkey!</p>
                    }
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={value}
                        onChange={(value) => setValue(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleContinue}>
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Navbar