import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { cities, states } from '@/data/staticData';
import { Button } from '../../components/ui/button'; import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createUser, updateUser } from '@/config/Appwrite';
import { useNavigate } from 'react-router-dom';
import { useloadingProgress } from '@/stores/loadingProgressStore';
import { useloadingStore } from '@/stores/loadingStore';

const UserForm = ({ selectedUser = null }) => {
    const { setLoadingProgress } = useloadingProgress();
    const { loading, setLoading } = useloadingStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        setValue
    } = useForm()
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUser) {
            setValue("name", selectedUser?.name);
            setValue("email", selectedUser?.email);
            setValue("phone", selectedUser?.contact_no);
            setValue("city", selectedUser?.city);
            setValue("state", selectedUser?.state);
            setValue("country", selectedUser?.country);
            setValue("image", selectedUser?.image);
            setValue('description', selectedUser?.description)
            setValue('interests', selectedUser?.interests)
            setValue('lat', selectedUser?.lat)
            setValue('lng', selectedUser?.lng)
        }
    }, [selectedUser])

    const submitHandler = async (data) => {
        setLoading(true)
        const newUser = {
            ...data,
            contact_no: data.phone,
            phone: undefined
        }

        if (selectedUser) {
            setLoadingProgress(40)
            newUser.$id = selectedUser?.$id

            const response = await updateUser(newUser)
            if (response) {
                reset()
                navigate(-1)
            }
        } else {
            setLoadingProgress(40)
            const response = await createUser(newUser)
            if (response) {
                reset()
                navigate(-1)
            }
        }
        setLoadingProgress(100)
        setLoading(false)
    }

    return (
        <form className=' flex gap-y-5 flex-col' onSubmit={handleSubmit(submitHandler)}>

            {/* name and email */}
            <div className='flex gap-y-3 gap-x-5'>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="name">Name</label>
                    <Input
                        type="text"
                        id='name'
                        placeholder='Name'
                        className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                        {...register("name", { required: true })}
                    />
                    {
                        errors.name && <span className='text-xs text-red-600'>Name is required</span>
                    }
                </span>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="email">Email</label>
                    <Input
                        type="email"
                        id='email'
                        placeholder='sample@example.com'
                        className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && <span className='text-xs text-red-600'>Email is required</span>
                    }
                </span>
            </div>

            {/* contact and image */}
            <div className='flex gap-y-3 gap-x-5'>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="phone">Contact Number</label>
                    <Input
                        type="text"
                        id='phone'
                        placeholder='123-456-7890'
                        className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                        {...register("phone", { required: true })}
                    />
                    {
                        errors.phone && <span className='text-xs text-red-600'>Phone is required</span>
                    }
                </span>
                {
                    !selectedUser && (
                        <span className='flex flex-col items-start w-full'>
                            <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="image">Profile Image</label>
                            <Input
                                type="file"
                                id='image'
                                accept="image/*"
                                className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                                {...register("image")}
                            />
                        </span>
                    )
                }
            </div>


            {/* Description and Interests*/}
            <div className='flex gap-y-3 gap-x-5'>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="phone">Description</label>
                    <Textarea
                        rows='4'
                        type="text"
                        id='phone'
                        placeholder='Write something here...'
                        className='w-full bg-white-800 shadow-sm shadow-black-700 placeholder:text-white-400 border-white-700'
                        {...register("description", { required: true })}
                    ></Textarea>
                    {
                        errors.description && <span className='text-xs text-red-600'>Description is required</span>
                    }
                </span>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="image">Interests</label>
                    <Textarea
                        rows='4'
                        type="text"
                        id='phone'
                        placeholder='Gaming, cycling, hiking...'
                        className='w-full bg-white-800 shadow-sm shadow-black-700 placeholder:text-white-400 border-white-700'
                        {...register("interests", { required: true })}
                    ></Textarea>
                    {
                        errors.interests && <span className='text-xs text-red-600'>Interests are required</span>
                    }
                </span>
            </div>

            {/* longitude and latitude */}
            <div className='flex gap-y-3 gap-x-5'>
                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="latitude">Latitude</label>
                    <Input
                        type="text"
                        id='latitude'
                        placeholder='135.502661'
                        className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                        {...register("lat", { required: true })}
                    />
                    {
                        errors.lat && <span className='text-xs text-red-600'>Latitude is required</span>
                    }
                </span>

                <span className='flex flex-col items-start w-full'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="longitude">Longitude</label>
                    <Input
                        type="text"
                        id='longitude'
                        placeholder='34.691444'
                        className='w-full placeholder:text-white-400 shadow-sm shadow-black-700 border-black-500'
                        {...register("lng", { required: true })}
                    />
                    {
                        errors.lng && <span className='text-xs text-red-600'>Longitude is required</span>
                    }
                </span>
            </div>

            {/* select boxes */}
            <div className='flex flex-col md:flex-row gap-y-3 gap-x-5'>
                <div className='flex gap-y-3 gap-x-5 w-full'>
                    {/* City Select */}
                    <span className='w-full'>
                        <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="city">City</label>
                        <Controller
                            name='city'
                            control={control}
                            rules={{ required: 'City is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full border-white-600 text-white-400">
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-black-600 text-white-200 border-white-600'>
                                        {cities.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.city && <span className='text-xs text-red-600'>{errors.city.message}</span>} {/* Display error */}
                    </span>

                    {/* State Select */}
                    <span className='w-full'>
                        <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="state">State</label>
                        <Controller
                            name='state'
                            control={control}
                            rules={{ required: 'State is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full border-white-600 text-white-400">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-black-600 text-white-200 border-white-600'>
                                        {states.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.state && <span className='text-xs text-red-600'>{errors.state.message}</span>} {/* Display error */}
                    </span>
                </div>

                {/* Country Select */}
                <div className='min-w-[200px]'>
                    <label className='text-sm text-white-200 mb-1 font-thin' htmlFor="country">Country</label>
                    <Controller
                        name='country'
                        control={control}
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full border-white-600 text-white-400">
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent className='bg-black-600 text-white-200 border-white-600'>
                                    <SelectItem value="India">India</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.country && <span className='text-xs text-red-600'>{errors.country.message}</span>} {/* Display error */}
                </div>

            </div>

            <div className='w-full'>
                <Button disabled={loading} type='submit' className='w-full'>Submit</Button>
            </div>
        </form>
    )
}

export default UserForm