import React from "react";
import Welcome from "./Welcome";
import getNameOfPlace from "../Hooks/useNameOfPlace";
import { MapFormProps } from "../interfaces/interface";
import { useDestination } from "../context/selectedDestinationContext";
import { locations } from "../data";

const MapForm: React.FC<MapFormProps> = ({ setFindLocation }) => {
  const { address } = getNameOfPlace();

  const { setSelectedDestination } = useDestination();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFindLocation(true);
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
                coord: { lat: parseFloat(lat), lng: parseFloat(lng) },
                name: e.target.options[e.target.selectedIndex].text,
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
