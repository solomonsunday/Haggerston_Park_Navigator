import React, { useEffect, useState } from "react";

const getCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  console.log(selectedDestination, " ===> selectedDestination");

  const GetUserSelectedDestination = ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    setSelectedDestination({ lat, lng });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("Permission denied or unavailable");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);
  return {
    currentLocation,
    selectedDestination,
    setSelectedDestination,
    setCurrentLocation,
    GetUserSelectedDestination,
    error,
  };
};
export default getCurrentLocation;
