import { useEffect, useState } from "react";

const UseGetCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

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
    setCurrentLocation,
    error,
  };
};
export default UseGetCurrentLocation;
