import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import { useCurrentUser } from "@/stores/currentUserStore";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getUser } from "@/config/Appwrite";
import { useloadingStore } from "@/stores/loadingStore";
import { IoIosArrowForward } from "react-icons/io";
import Spinner from "./Spinner";
import { useloadingProgress } from "@/stores/loadingProgressStore";
import toast from "react-hot-toast";

const RenderMap = () => {

    const defaultCoordinates = {
        lat: 0,
        lng: 0,
    }
    
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const { setLoadingProgress } = useloadingProgress();

    const { id } = useParams();
    const { currentUser } = useCurrentUser();
    const [markerPosition, setMarkerPosition] = useState(defaultCoordinates);


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            setLoadingProgress(40)

            const response = await getUser(id)
            if (response) {
                setUser(response);
            }

            setLoadingProgress(100)
            setLoading(false)
        }

        if (id) {
            fetchUser();
        }
    }, [id])

    useEffect(() => {
        const coordinates = { lat: 0, lng: 0 }

        if (user) {
            coordinates.lat = Number(user?.lat)
            coordinates.lng = Number(user?.lng)
        } else if (currentUser) {
            coordinates.lat = Number(currentUser?.lat)
            coordinates.lng = Number(currentUser?.lng)
        }

        if (!(isNaN(coordinates.lat) || isNaN(coordinates.lng))) {
            setMarkerPosition(coordinates)
        } else {
            setMarkerPosition(defaultCoordinates)
        }
    }, [user, currentUser])

    if (loading) {
        return (
            <div className="w-full h-screen bg-black-700 text-white-200 grid place-items-center">
                <Spinner />
            </div>
        )
    }

    if (markerPosition.lat === 0 && markerPosition.lng === 0) {
        return (
            <div className='h-screen grid place-items-center text-white-200 text-lg'>
                No data found...
                <Button onClick={() => navigate(-1)} size='default' className="absolute bottom-0 left-0 z-[2] m-5">
                    <FaArrowLeft /> Back
                </Button>
            </div>
        )
    }

    return (
        <section className="h-screen relative p-2 w-full">
            <Button onClick={() => navigate(-1)} size='default' className="absolute bottom-0 left-0 z-[4] m-5">
                <FaArrowLeft /> Back
            </Button>
            <APIProvider
                apiKey={import.meta.env.VITE_MAP_API}
            >
                <div className="rounded-lg overflow-hidden h-full w-full">
                    <Map
                        // center={markerPosition} // locks the viewport on marked position
                        defaultZoom={9}
                        defaultCenter={markerPosition}
                        mapId={import.meta.env.VITE_MAP_ID}
                    >
                        <InfoWindow position={markerPosition}>
                            <UserMarkerCard user={user || currentUser} />
                        </InfoWindow>

                        {/* // for default marker */}
                        {/* <Marker doc={markerPosition} />  */}
                    </Map>
                </div>
            </APIProvider>
        </section>
    );
};

const UserMarkerCard = ({ user }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 min-w-[150px]">
            <span className="flex items-center gap-3">
                <img loading='lazy' src={user?.image || 'User'} alt='user' className="rounded-full overflow-hidden object-cover w-7 " />
                <span>
                    <h3 className="font-semibold text-xs">{user?.name}</h3>
                    <p className="text-black-600 text-xs">{user?.email}</p>
                </span>
            </span>
            <Button className='flex gap-1 hover:gap-3 transition-all duration-200' onClick={() => navigate(`/user/${user?.$id}`)} size='sm'>View details <IoIosArrowForward /></Button>
        </div>
    )
}

// const Marker = ({ doc }) => {
//     const [position, setPosition] = useState({ lat: 0, lng: 0 });

//     useEffect(() => {
//         if (doc) {
//             const coordinates = { lat: Number(doc?.lat), lng: Number(doc?.lng) };
//             setPosition(coordinates);
//         }
//     }, [doc]);

//     return (
//         <>
//             {position && (
//                 <>
//                     <AdvancedMarker
//                         position={position}
//                     >
//                         <Pin background={"red"} borderColor={"yellow"} glyphColor={"orange"} />
//                     </AdvancedMarker>
//                 </>
//             )}
//         </>
//     );
// };

export default RenderMap;
