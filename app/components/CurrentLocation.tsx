"use client";
import { useEffect, useState } from "react";

export default function MyLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
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

  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}
