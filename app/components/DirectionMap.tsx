"use client";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import getCurrentLocation from "../Hooks/useCurrentLocation";

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
  // const userDestination = { lat: 54.9779, lng: -1.6142 };
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const { currentLocation, selectedDestination, error } = getCurrentLocation();
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
            selectedDestination.lat,
            selectedDestination.lng
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
        <Marker position={center || selectedDestination} label="You are here" />
      </GoogleMap>
    </>
  );
}
