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
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const RenderMap = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const [markerPosition, setMarkerPosition] = useState({
        lat: 28.7041,
        lng: 77.1025092,
    });
    const [center, setCenter] = useState({
        lat: 28.7041,
        lng: 77.1025092,
    })

    useEffect(() => {
        setMarkerPosition({ lat: Number(currentUser?.lat), lng: Number(currentUser?.lng) })
        setCenter({ lat: Number(currentUser?.lat), lng: Number(currentUser?.lng) })
    }, [currentUser])

    const handleCenterChange = (e) => {
        setCenter(e?.details?.center)
    }

    return (
        <section className="h-screen relative p-2 w-full">
            <Button onClick={() => navigate(-1)} size='default' className="absolute bottom-0 left-0 z-[2] m-5 md:hidden">
                <FaArrowLeft /> Back
            </Button>
            <APIProvider
                apiKey={import.meta.env.VITE_MAP_API_KEY}
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
                            <UserMarkerCard user={currentUser} />
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
                <img src={user?.image || 'User'} className="rounded-full overflow-hidden object-cover w-7 " alt="" />
                <span>
                    <h3 className="font-semibold text-xs">{user?.name}</h3>
                    <p className="text-black-600 text-xs">{user?.email}</p>
                </span>
            </span>
            <Button onClick={() => navigate(`/user/${user?.$id}`)} size='sm'>View details</Button>
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
