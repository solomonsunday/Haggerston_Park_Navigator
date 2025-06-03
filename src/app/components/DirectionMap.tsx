"use client";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDestination } from "../context/selectedDestinationContext";
import UseGetCurrentLocation from "../Hooks/useCurrentLocation";

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  zIndex: 0,
};

interface MapInstance extends google.maps.Map {}

export default function DirectionMap() {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const { currentLocation, error } = UseGetCurrentLocation();
  const { selectedDestination } = useDestination();

  const center = {
    lat: currentLocation?.lat || 0,
    lng: currentLocation?.lng || 0,
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  const defaultCenter = {
    lat: currentLocation?.lat,
    lng: currentLocation?.lng,
  };

  const mapref = useRef<MapInstance | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const [map, setMap] = useState(null);

  interface MapCenter {
    lat: number;
    lng: number;
  }

  const onLoad = useCallback((map: MapInstance): void => {
    mapref.current = map;
    map.setZoom(14);

    const bounds = new window.google.maps.LatLngBounds(
      center || (defaultCenter as MapCenter)
    );
    map.fitBounds(bounds);
  }, []);

  useEffect(() => {
    if (currentLocation && selectedDestination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new google.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          ),
          destination: new google.maps.LatLng(
            selectedDestination.coord.lat,
            selectedDestination.coord.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions: ", result);
          }
        }
      );
    }
  }, [currentLocation]);

  const handleNavigate = () => {
    const origin = `${currentLocation?.lat},${currentLocation?.lng}`;
    const destination = `${selectedDestination?.coord.lat},${selectedDestination?.coord.lng}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
      "_blank"
    );
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center || selectedDestination}
        zoom={14}
        onUnmount={() => setMap(null)}
      >
        <Marker position={center || selectedDestination}></Marker>
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#FF0000",
                strokeWeight: 4,
              },
              suppressMarkers: true,
            }}
          />
        )}
        <Marker
          position={center || selectedDestination}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      </GoogleMap>
      <button
        onClick={handleNavigate}
        className="fixed bottom-10 right-4 bg-blue-600 text-white px-5 py-3 rounded"
      >
        Start Navigation
      </button>
    </>
  );
}
