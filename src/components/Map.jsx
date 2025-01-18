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

const RenderMap = () => {
    const defaultCoordinates = {
        lat: 28.7041,
        lng: 77.1025092,
    }
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [markerPosition, setMarkerPosition] = useState(defaultCoordinates);
    const [center, setCenter] = useState(defaultCoordinates)
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchUser = async () => {
        if (id) {
            setLoading(true)
            const response = await getUser(id)
            setUser(response);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [id])

    useEffect(() => {
        if (user) {
            setMarkerPosition({ lat: Number(user?.lat), lng: Number(user?.lng) })
            setCenter({ lat: Number(user?.lat), lng: Number(user?.lng) })
        } else if(currentUser) {
            setMarkerPosition({ lat: Number(currentUser?.lat), lng: Number(currentUser?.lng) })
            setCenter({ lat: Number(currentUser?.lat), lng: Number(currentUser?.lng) })
        }
    }, [user, currentUser])

    const handleCenterChange = (e) => {
        setCenter(e?.details?.center)
    }

    if (loading) {
        return (
            <div className="w-full h-screen bg-black-700 text-white-200 grid place-items-center">
                <Spinner />
            </div>
        )
    }


    return (
        <section className="h-screen relative p-2 w-full">
            <Button onClick={() => navigate(-1)} size='default' className="absolute bottom-0 left-0 z-[2] m-5 md:hidden">
                <FaArrowLeft /> Back
            </Button>
            <APIProvider
                apiKey={import.meta.env.VITE_MAP_API}
            >
                <div className="rounded-lg overflow-hidden h-full w-full">
                    <Map
                        onCameraChanged={(handleCenterChange)}
                        center={center}
                        defaultZoom={9}
                        defaultCenter={markerPosition}
                        mapId={import.meta.env.VITE_MAP_ID}
                    >
                        <InfoWindow position={markerPosition}>
                            <UserMarkerCard user={user || currentUser} />
                        </InfoWindow>
                        {/* <Marker doc={markerPosition} /> */}
                    </Map>
                </div>
            </APIProvider>
        </section>
    );
};

const UserMarkerCard = ({ user }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2">
            <span className="flex items-center gap-3">
                <img loading='lazy' src={user?.image || 'User'} className="rounded-full overflow-hidden object-cover w-7 " alt="" />
                <span>
                    <h3 className="font-semibold text-xs">{user?.name}</h3>
                    <p className="text-black-600 text-xs">{user?.email}</p>
                </span>
            </span>
            <Button className='flex gap-1 hover:gap-3 transition-all duration-200' onClick={() => navigate(`/user/${user?.$id}`)} size='sm'>View details <IoIosArrowForward /></Button>
        </div>
    )
}

const Marker = ({ doc }) => {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (doc) {
            const coordinates = { lat: Number(doc?.lat), lng: Number(doc?.lng) };
            setPosition(coordinates);
        }
    }, [doc]);

    return (
        <>
            {position && (
                <>
                    <AdvancedMarker
                        position={position}
                    >
                        <Pin background={"red"} borderColor={"yellow"} glyphColor={"orange"} />
                    </AdvancedMarker>
                </>
            )}
        </>
    );
};

export default RenderMap;
