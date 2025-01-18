import React, { useCallback, useEffect, useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import { useSearchParams } from "react-router-dom";

const RenderMap = () => {
    const [searchParams] = useSearchParams();
    const [markerPosition, setMarkerPosition] = useState({
        lat: 28.7041,
        lng: 77.1025092,
    });
    const [center, setCenter] = useState({
        lat: 28.7041,
        lng: 77.1025092,
    })

    useEffect(() => {
        const lat = Number(searchParams.get("lat")) || 28.7041;
        const lng = Number(searchParams.get("lng")) || 77.1025092;
        const newPosition = { lat, lng };
        setMarkerPosition(newPosition);
        setCenter(newPosition)
    }, [searchParams]);

    const handleCenterChange = (e) => {
        setCenter(e?.details?.center)
    }

    return (
        <section className="h-screen p-2 w-full">
            <APIProvider
                apiKey={import.meta.env.VITE_MAP_API_KEY}
                onLoad={() => console.log("Maps API has loaded.")}
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
                            The content of the info window is here.
                        </InfoWindow>
                        {/* <Marker doc={markerPosition} /> */}
                    </Map>
                </div>
            </APIProvider>
        </section>
    );
};

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
