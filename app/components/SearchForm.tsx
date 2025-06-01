import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import { get } from "http";
import getCurrentLocation from "../Hooks/useCurrentLocation";
import getNameOfPlace from "../Hooks/useNameOfPlace";
import useFindLocation from "../Hooks/useFindLocation";
import { ILocationData, MapFormProps } from "../interfaces/interface";

const locations: ILocationData[] = [
  {
    name: "The Coppers",
    coord: { lat: 54.9779, lng: -1.6142 },
  },
  {
    name: "Lake Side East",
    coord: { lat: 0, lng: 0 },
  },
  {
    name: "Lake Side North",
    coord: { lat: 0, lng: 0 },
  },
  {
    name: "The Golf",
    coord: { lat: 0, lng: 0 },
  },
];

const MapForm: React.FC<MapFormProps> = ({ setFindLocation }) => {
  const { address } = getNameOfPlace();
  const {
    currentLocation,
    setSelectedDestination,
    GetUserSelectedDestination,
  } = getCurrentLocation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userLocation = currentLocation;
    setFindLocation(true);

    // GetUserSelectedDestination(destination);
    console.log(userLocation, "Form submitted");
  };

  return (
    <div className=" mt-10 flex flex-col justify-center items-center min-h-screen">
      <Welcome />
      <form action="onSubmit" className="space-y-4">
        <input
          defaultValue={`You are here,  ${
            address ? address : "Getting your current location..."
          }`}
          type="text"
          placeholder="Enter your location"
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <select
          className="border border-gray-300 rounded p-2 w-full mt-2"
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue) {
              const [lat, lng] = selectedValue.split(",");
              setSelectedDestination({
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              });
            }
          }}
        >
          <option value="">Select Destination</option>
          {locations.map((item, idx) => (
            <option key={idx} value={`${item.coord.lat}, ${item.coord.lng}`}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="w-full max-w-md">
          <button
            className="bg-slate-900 text-white px-4 py-2 rounded w-full"
            onClick={onSubmit}
            type="submit"
          >
            Find Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapForm;
