import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
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
import { useNavigate } from "react-router-dom"

const DataTable = ({ users = [], handleDeleteUser = () => { }}) => {

    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto border border-black-600 rounded-lg">
            <table className="min-w-full h-full bg-white">

                <thead className="whitespace-nowrap bg-white-200">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            Name
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            Email
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            Contact
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            location
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            intrests
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-black-800">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                    {
                        users.map((user) => (
                            <tr key={user?.$id} className="odd:bg-white-900 border-b border-black-600">
                                
                                <td className="p-4 text-sm text-black  m-1">
                                    <div className=' flex gap-2 items-center'>
                                        <img className='w-8 min-h-8 rounded-full' loading='lazy' src={user?.image} alt={user?.name} />
                                        {
                                            user?.name
                                        }
                                    </div>
                                </td>

                                <td className="p-4 text-sm text-black  m-1">
                                    <a className='hover:underline' href={`mailto:${user?.email}`}>
                                        {
                                            user?.email
                                        }
                                    </a>
                                </td>

                                <td className="p-4 text-sm text-black m-1">
                                    <a className='hover:underline' href={`tel:${user?.phone}`}>
                                        {
                                            user?.contact_no
                                        }
                                    </a>
                                </td>

                                <td className="p-4 text-sm text-black m-1">
                                    <div className=''>
                                        {user?.city}, {user?.state}, {user?.country}
                                    </div>
                                </td>

                                <td className="p-4 text-sm text-black m-1">
                                    <div className=''>
                                        {user?.interests}
                                    </div>
                                </td>

                                <td className="p-4 text-sm text-black m-1">
                                    <DropdownMenu>
                                        <Button size='sm' className='h-6'>
                                            <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                                        </Button>
                                        <DropdownMenuContent className='flex flex-col gap-2 p-2'>
                                            <button onClick={() => navigate(`/user/${user?.$id}/map`)}>View on map</button>
                                            <button onClick={() => navigate('form')}>Update</button>
                                            <AlertDialog className='flex flex-col p-2'>
                                                <AlertDialogTrigger>
                                                    Delete
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            The user's data will be deleted permanantly!
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction>
                                                            <Button onClick={() => handleDeleteUser(user)}>Continue</Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;