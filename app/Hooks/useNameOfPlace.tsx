import React, { useEffect, useState } from "react";
import getCurrentLocation from "./useCurrentLocation";

const getNameOfPlace = () => {
  // This function is intended to retrieve the name of a place based on coordinates or other criteria.
  const [address, setAddress] = useState<string | null>(null);
  const { currentLocation } = getCurrentLocation();

  useEffect(() => {
    fetchAddress();
  }, [currentLocation]);

  const fetchAddress = async () => {
    try {
      if (currentLocation?.lat && currentLocation?.lng) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation?.lat},${currentLocation?.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        const data = await response.json();
        setAddress(
          data.results[0]?.formatted_address.split(",")[0] ||
            "Address not found"
        );
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return {
    address,
  };
};

export default getNameOfPlace;
