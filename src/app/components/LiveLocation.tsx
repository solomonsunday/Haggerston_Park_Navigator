import { useEffect, useRef, useState } from "react";

const LiveLocation = () => {
  const [liveLocation, setLiveLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setLiveLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        if (watchIdRef.current) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return <div>LiveLocation</div>;
};

export default LiveLocation;
