"use client";
import dynamic from "next/dynamic";
import MapForm from "./components/SearchForm";
import { useState } from "react";
import { MapWrapper } from "./components/MapWrapper";

const DirectionMap = dynamic(() => import("./components/DirectionMap"), {
  ssr: false,
});

export default function Home() {
  const [findLocation, setFindLocation] = useState<boolean>(false);

  return (
    <div className="">
      {!findLocation ? (
        <MapForm setFindLocation={setFindLocation} />
      ) : (
        <MapWrapper>
          <DirectionMap />
        </MapWrapper>
      )}
    </div>
  );
}
